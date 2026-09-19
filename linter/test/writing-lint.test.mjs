import assert from "node:assert/strict";
import test from "node:test";
import { deterministicFindings, runWritingLint, textForLint } from "../src/writing-lint.mjs";

test("simplifies formatted prose and finds deterministic rules", () => {
  assert.equal(textForLint("<p>In conclusion, <b>use facts</b>.</p>", "html").text, "In conclusion, use facts .");
  assert.equal(deterministicFindings("In conclusion, this is a game-changer.").length, 2);
});

test("runs Pangram then Luna without exposing credentials", async () => {
  const calls = [];
  const fetchFn = async (url, init = {}) => {
    calls.push({ url, init });
    if (url.endsWith("/task")) return Response.json({ task_id: "task-1" });
    if (url.includes("text.external-api.pangram.com")) return Response.json({ stage: "STAGE_SUCCESS", fraction_ai: 0.02, windows: [] });
    return Response.json({ choices: [{ message: { content: JSON.stringify({ clean: true, summary: "Clean", findings: [] }) } }], usage: { total_tokens: 1 } });
  };
  const result = await runWritingLint({ text: "Use the measured result.", environment: { PANGRAM_API_KEY: "test-pangram", OPENROUTER_API_KEY: "test-openrouter" }, fetchFn });
  assert.equal(result.clean, true);
  assert.equal(result.model.model, "openai/gpt-5.6-luna");
  assert.equal(JSON.parse(calls[2].init.body).reasoning.effort, "xhigh");
  assert.equal(calls[0].init.headers["x-api-key"], "test-pangram");
  assert.equal(calls[2].init.headers.authorization, "Bearer test-openrouter");
});

test("returns degraded findings when Luna fails and never retries", async () => {
  let lunaCalls = 0;
  const fetchFn = async (url) => {
    if (url.endsWith("/task")) return Response.json({ task_id: "task-1" });
    if (url.includes("text.external-api.pangram.com")) return Response.json({ stage: "STAGE_SUCCESS", fraction_ai: 0.02, windows: [] });
    lunaCalls += 1;
    return Response.json({ error: { message: "down" } }, { status: 502 });
  };
  const result = await runWritingLint({ text: "In conclusion, use facts.", environment: { PANGRAM_API_KEY: "test", OPENROUTER_API_KEY: "test" }, fetchFn });
  assert.equal(result.degraded, true);
  assert.equal(lunaCalls, 1);
  assert.match(result.instruction, /Do not retry automatically/);
});
