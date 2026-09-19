import { EM_DASH_RE, SLOP_RE, STRUCTURAL_PATTERNS } from "./patterns.mjs";

function collect(regex, text, rule, family) {
  regex.lastIndex = 0;
  const matches = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      rules: [rule],
      families: [family],
    });

    if (match[0].length === 0) regex.lastIndex += 1;
  }

  return matches;
}

/**
 * Run the exact current pattern engine against plain text.
 *
 * Exact duplicate spans are merged so the benchmark measures visible linter
 * findings rather than double-counting overlapping rule families.
 */
export function lintText(text) {
  const raw = [
    ...collect(SLOP_RE, text, "combined_lexical", "lexical"),
    ...STRUCTURAL_PATTERNS.flatMap(({ name, re }) =>
      collect(re, text, name, "structural"),
    ),
    ...collect(EM_DASH_RE, text, "paired_dash", "punctuation"),
  ];

  const bySpan = new Map();
  for (const match of raw) {
    const key = `${match.start}:${match.end}`;
    const existing = bySpan.get(key);
    if (!existing) {
      bySpan.set(key, match);
      continue;
    }
    existing.rules = [...new Set([...existing.rules, ...match.rules])];
    existing.families = [...new Set([...existing.families, ...match.families])];
  }

  return [...bySpan.values()].sort(
    (a, b) => a.start - b.start || b.end - a.end,
  );
}

