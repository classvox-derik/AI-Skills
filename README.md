# AI-Skills

Shared skills database for the Antigravity agent framework. Add this repo as a git submodule to give any project access to reusable, markdown-driven agent skills.

## Quick Start

### Add to an existing project

```bash
# From your project root
git submodule add https://github.com/classvox-derik/AI-Skills.git .agent/skills
git commit -m "Add AI-Skills submodule"
```

### Clone a project that uses this submodule

```bash
git clone --recurse-submodules <your-project-url>

# Or if already cloned without --recurse-submodules:
git submodule update --init --recursive
```

### Update skills to latest

```bash
git submodule update --remote .agent/skills
git add .agent/skills
git commit -m "Update AI-Skills to latest"
```

## Project Integration

This repo maps directly into `.agent/skills/` in your consuming project. A typical Vue/Node.js + AI agent project structure looks like:

```
your-project/
├── src/
├── package.json
├── .agent/
│   └── skills/          ← this submodule
│       ├── creating-skills/
│       └── ...future skills
└── .gitmodules
```

Skills are available to the Antigravity agent immediately after submodule init — no build step required.

## Available Skills

| Skill | Purpose |
|-------|---------|
| `creating-skills` | Meta-skill that scaffolds new skills from requirements |

See [CLAUDE.md](CLAUDE.md) for full catalog, authoring standards, and skill format documentation.

## Contributing Skills

All skill authoring happens in this repo. Consuming projects should treat the submodule as **read-only**.

1. Clone this repo directly
2. Use the `creating-skills` skill or follow the standards in [CLAUDE.md](CLAUDE.md)
3. New skills go in `.agent/skills/<gerund-name>/SKILL.md`
4. Update the Skills Catalog in CLAUDE.md to match
