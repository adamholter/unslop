# Unslop

A single agent skill for cutting AI tells without sanding away the writer's voice.

It combines the original Unslop rules with contextual de-slop checks for canned cadence, manufactured profundity, stock argument shapes, abstract claims, programmed rhythm, and genre mismatch.

## Install

Codex:

```sh
git clone https://github.com/adamholter/unslop.git ~/.codex/skills/unslop
```

Claude Code:

```sh
git clone https://github.com/adamholter/unslop.git ~/.claude/skills/unslop
```

The skill works on its own. Its final section also explains when a finished draft is worth sending through Toolbox's paid `writing.lint` action.

## Files

- `SKILL.md`: the complete skill and all anti-patterns
- `agents/openai.yaml`: Codex display metadata and implicit invocation policy

## License

MIT
