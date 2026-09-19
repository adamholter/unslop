import { readFile } from "node:fs/promises";

const PANGRAM_ENDPOINT = "https://text.external-api.pangram.com";
const PANGRAM_MODEL = "pangram-4";
const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const LUNA_MODEL = "openai/gpt-5.6-luna";
const MAX_CHARS = 80_000;

const phrasePatterns = [
  "in today's fast-paced", "in today's ever-changing", "in today's ever-evolving",
  "in the ever-evolving", "in the rapidly evolving", "it is important to note",
  "it's important to note", "it is worth noting", "delve into", "dive into",
  "a testament to", "stands as a testament", "at the end of the day", "when it comes to",
  "in conclusion", "in summary", "without further ado", "game-changer", "game changer",
  "unlock the potential", "unlocking the potential", "navigate the complexities",
  "the landscape of", "the realm of", "a myriad of", "seamlessly", "robust solution",
  "leverage the power", "harness the power", "more than just", "not just", "isn't just",
  "not only", "it's not about", "the key takeaway", "here's the thing", "the truth is",
  "let's explore", "let's dive", "whether you're", "from x to y", "paradigm shift",
];

function fail(message, status) {
  return Object.assign(new Error(message), { status });
}

function decodeEntities(text) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_whole, entity) => {
    if (entity[0] === "#") {
      const hex = entity[1]?.toLowerCase() === "x";
      const value = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      return Number.isFinite(value) ? String.fromCodePoint(value) : " ";
    }
    return named[entity.toLowerCase()] ?? " ";
  });
}

export function textForLint(value, format = "auto") {
  let text = String(value ?? "").trim();
  if (!text) throw fail("text is required", 400);
  if (text.length > MAX_CHARS * 3) throw fail("formatted input is too large to simplify safely", 413);
  const requested = String(format || "auto").toLowerCase();
  const looksHtml = requested === "html" || (requested === "auto" && /<\/?(?:html|body|main|section|article|div|p|h[1-6]|li)\b/i.test(text));
  if (looksHtml) text = text
    .replace(/<(script|style|svg|canvas|template)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(br|hr)\s*\/?\s*>/gi, "\n")
    .replace(/<\/(p|div|section|article|main|aside|header|footer|h[1-6]|li|tr|blockquote)>/gi, "\n")
    .replace(/<li\b[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, " ");
  text = decodeEntities(text)
    .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "")
    .replace(/```[\s\S]*?```/g, "\n[code omitted]\n")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/[*_~`]+/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
  if (!text) throw fail("No readable prose remained after simplifying the input", 400);
  if (text.length > MAX_CHARS) throw fail(`simplified text must be ${MAX_CHARS} characters or fewer`, 413);
  return { text, sourceFormat: looksHtml ? "html" : requested === "markdown" ? "markdown" : "text" };
}

export function deterministicFindings(text) {
  const lower = text.toLowerCase();
  const findings = [];
  for (const phrase of phrasePatterns) {
    let index = lower.indexOf(phrase);
    while (index >= 0 && findings.length < 40) {
      findings.push({ source: "rules", severity: "medium", start: index, end: index + phrase.length, excerpt: text.slice(index, index + phrase.length), problem: `Stock AI phrasing: "${text.slice(index, index + phrase.length)}".`, suggestion: "Say the concrete point directly, or delete the sentence if it adds no information.", fix: "revise" });
      index = lower.indexOf(phrase, index + phrase.length);
    }
  }
  for (const paragraph of text.split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean)) {
    const sentences = paragraph.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (paragraph.split(/\s+/).length > 110 && sentences.length >= 5) findings.push({ source: "rules", severity: "medium", excerpt: paragraph.slice(0, 180), problem: "This paragraph is long enough that excess explanation may be the AI tell.", suggestion: "Delete any sentence that does not change the reader's understanding before rewriting what remains.", fix: "delete" });
  }
  return findings.slice(0, 50);
}

async function runPangram(text, apiKey, fetchFn) {
  if (!apiKey) throw fail("Pangram linting is not configured", 503);
  const headers = { "content-type": "application/json", "x-api-key": apiKey };
  const submitted = await fetchFn(`${PANGRAM_ENDPOINT}/task`, { method: "POST", headers, body: JSON.stringify({ text, model: PANGRAM_MODEL, public_dashboard_link: false }) });
  const submission = await submitted.json().catch(() => ({}));
  if (!submitted.ok || !submission.task_id) throw fail(submission.detail || submission.error || `Pangram returned ${submitted.status}`, submitted.status === 402 ? 402 : 502);
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (attempt) await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await fetchFn(`${PANGRAM_ENDPOINT}/task/${encodeURIComponent(submission.task_id)}`, { headers: { "x-api-key": apiKey } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw fail(payload.detail || payload.error || `Pangram returned ${response.status}`, 502);
    if (payload.stage === "STAGE_SUCCESS") return payload;
    if (payload.stage === "STAGE_FAILED") throw fail("Pangram could not analyze this draft", 502);
  }
  throw fail("Pangram timed out while analyzing the draft", 504);
}

function pangramFindings(payload) {
  return (payload.windows ?? []).filter((window) => Number(window.ai_assistance_score ?? 0) >= 0.45 || /ai/i.test(String(window.label ?? ""))).slice(0, 30).map((window) => ({
    source: "pangram", severity: Number(window.ai_assistance_score ?? 0) >= 0.8 ? "high" : "medium", start: window.start_index, end: window.end_index, excerpt: window.text,
    problem: `Pangram marked this passage ${window.label || "AI-assisted"}${window.confidence ? ` with ${window.confidence} confidence` : ""}.`,
    suggestion: "Check it against the anti-slop rules. Rewrite the concrete thought, or remove the passage if it is redundant.", fix: "revise",
  }));
}

function parseJsonObject(value) {
  const cleaned = value.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("Luna returned no JSON object");
  return JSON.parse(cleaned.slice(start, end + 1));
}

async function runLuna(text, pangram, rules, context, apiKey, siteUrl, fetchFn) {
  if (!apiKey) throw fail("OpenRouter linting is not configured", 503);
  const ruleBook = await readFile(new URL("../../SKILL.md", import.meta.url), "utf8");
  const system = `You are a feedback-only public-writing linter. Do not rewrite the draft. Apply the complete instructions below in context. Do not diagnose authorship or invent criticism. Pangram is evidence, not a verdict. If a passage adds no useful information, recommend deleting it instead of replacing it. Return JSON only: {"clean":boolean,"summary":string,"findings":[{"source":"luna","severity":"high|medium|low","excerpt":string,"problem":string,"suggestion":string,"fix":"revise|delete|keep"}]}. Keep only actionable findings.\n\n${ruleBook}`;
  const headers = { authorization: `Bearer ${apiKey}`, "content-type": "application/json", "X-Title": "Unslop Writing Linter" };
  if (siteUrl) headers["HTTP-Referer"] = siteUrl;
  const response = await fetchFn(OPENROUTER_ENDPOINT, { method: "POST", headers, body: JSON.stringify({ model: LUNA_MODEL, reasoning: { effort: "xhigh", exclude: true }, response_format: { type: "json_object" }, messages: [{ role: "system", content: system }, { role: "user", content: JSON.stringify({ channel: context.channel || "auto", purpose: context.purpose || "", audience: context.audience || "", draft: text, deterministicFindings: rules, pangram }) }] }) });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw fail(payload.error?.message || `OpenRouter returned ${response.status}`, 502);
  const content = payload.choices?.[0]?.message?.content;
  if (!content) return { clean: false, summary: "Luna returned no feedback. Use the rule and Pangram findings below.", findings: [], usage: payload.usage ?? {}, degraded: true, error: "Luna returned no lint feedback" };
  try { return { ...parseJsonObject(content), usage: payload.usage ?? {}, degraded: false }; }
  catch (error) { return { clean: false, summary: "Luna returned invalid feedback. Use the rule and Pangram findings below.", findings: [], usage: payload.usage ?? {}, degraded: true, error: error instanceof Error ? error.message : "Luna returned invalid JSON" }; }
}

export async function runWritingLint({ text, format = "auto", channel, purpose, audience, environment = process.env, fetchFn = fetch } = {}) {
  const normalized = textForLint(text, format);
  const rules = deterministicFindings(normalized.text);
  const pangram = await runPangram(normalized.text, environment.PANGRAM_API_KEY, fetchFn);
  let luna;
  try { luna = await runLuna(normalized.text, pangram, rules, { channel, purpose, audience }, environment.OPENROUTER_API_KEY, environment.UNSLOP_SITE_URL, fetchFn); }
  catch (error) { luna = { clean: false, summary: "Luna failed. Use the rule and Pangram findings below.", findings: [], usage: {}, degraded: true, error: error instanceof Error ? error.message : "Luna lint failed" }; }
  const words = normalized.text.split(/\s+/).filter(Boolean).length;
  return { clean: Boolean(luna.clean) && rules.length === 0 && Number(pangram.fraction_ai ?? 0) < 0.15, summary: luna.summary || "Review the findings before revising the draft.", normalized: { sourceFormat: normalized.sourceFormat, characterCount: normalized.text.length, wordCount: words, formattingRemoved: normalized.sourceFormat !== "text" }, findings: [...rules, ...pangramFindings(pangram), ...(luna.findings ?? []).map((finding) => ({ ...finding, source: "luna" }))], pangram: { prediction: pangram.prediction, predictionShort: pangram.prediction_short, fractionAi: pangram.fraction_ai, fractionAiAssisted: pangram.fraction_ai_assisted, fractionHuman: pangram.fraction_human, dashboardLink: pangram.dashboard_link }, model: { provider: "OpenRouter", model: LUNA_MODEL, reasoningEffort: "xhigh", usage: luna.usage }, degraded: luna.degraded, warning: luna.degraded ? luna.error : undefined, estimatedPangramCostUsd: Number(((words / 100) * 0.05).toFixed(4)), instruction: luna.degraded ? "Use the saved rule and Pangram findings. Do not retry automatically." : "Revise the draft yourself. A valid fix may be deleting a passage. Relint only when useful." };
}
