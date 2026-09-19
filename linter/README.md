# Unslop linter

This is the portable final-review pipeline used by Unslop. It keeps editing decisions with the writer and returns findings only.

It runs in this order:

1. The complete Unslop pattern engine: 106 lexical checks, 460 phrase patterns, and 11 structural rules, plus bloated-paragraph detection.
2. Pangram 4 through Pangram's task API.
3. GPT-5.6 Luna at xhigh reasoning through OpenRouter, with every Unslop rule in the prompt and the Pangram result as evidence, not a verdict.

## Setup

Use Node 18 or newer. Copy `.env.example` to `.env`, then set your own `PANGRAM_API_KEY` and `OPENROUTER_API_KEY`. The keys remain server-side. Do not expose either in a browser bundle.

```js
import { runWritingLint } from "./src/writing-lint.mjs";

const result = await runWritingLint({
  text: "Draft to review",
  format: "markdown",
  environment: process.env,
});
console.log(result);
```

Run `npm test` from this directory. Tests use mocked network responses and do not need keys.

Pangram or Luna failure returns deterministic and Pangram findings when available with `degraded: true`. The linter never retries automatically.
