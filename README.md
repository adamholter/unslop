# Unslop

A single agent skill for cutting AI tells without sanding away the writer's voice.

It combines the original Unslop rules with contextual de-slop checks for canned cadence, manufactured profundity, stock argument shapes, abstract claims, programmed rhythm, genre mismatch, and needless authenticity qualifiers.

The included [`linter/`](linter/README.md) is the runnable final-review pipeline: deterministic checks, Pangram 4, then GPT-5.6 Luna using all 39 rules. It has no embedded credentials.

## Install

Codex:

```sh
git clone https://github.com/adamholter/unslop.git ~/.codex/skills/unslop
```

Claude Code:

```sh
git clone https://github.com/adamholter/unslop.git ~/.claude/skills/unslop
```

## Files

- `SKILL.md`: the complete skill and all anti-patterns
- `agents/openai.yaml`: Codex display metadata and implicit invocation policy

## License

MIT
