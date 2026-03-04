# AI-Skills — Antigravity Skill Database

This repository is a **shared skills database** for the Antigravity agent framework. Skills are markdown-driven agent capabilities that live under `.agent/skills/` and are designed to be consumed by other projects via **git submodule**.

## Using Skills in Other Projects

This repo is meant to be added as a **git submodule** in consuming projects. The recommended setup:

```bash
# Add the skills database to your project
git submodule add https://github.com/classvox-derik/AI-Skills.git .agent/skills

# After cloning a project that uses this submodule
git submodule update --init --recursive
```

This maps the skills database directly into the consuming project's `.agent/skills/` directory, making all skills immediately available to the Antigravity agent.

**Updating skills in a consuming project:**
```bash
cd .agent/skills
git pull origin master
cd ../..
git add .agent/skills
git commit -m "Update skills database"
```

**Important:** Consuming projects should treat this submodule as read-only. Skill authoring and updates happen in this repo, not in downstream projects.

## Repository Structure

```
AI-Skills/
├── CLAUDE.md                          # This file — project guide
├── README.md                          # Init instructions for consuming projects
└── .agent/skills/                     # All skills live here
    ├── creating-skills/               # Meta-skill: generates new skills
    │   ├── SKILL.md                   # Main skill definition
    │   ├── examples/
    │   │   ├── code-reviewer.md       # Example: code review skill
    │   │   └── deployment-guard.md    # Example: deployment guard skill
    │   └── resources/
    │       └── skill-template.md      # Blank SKILL.md template
    ├── acting-proactively/             # Proactive agent architecture
    │   ├── SKILL.md
    │   ├── resources/
    │   │   ├── AGENTS.md
    │   │   ├── HEARTBEAT.md
    │   │   ├── MEMORY.md
    │   │   ├── ONBOARDING.md
    │   │   ├── SOUL.md
    │   │   ├── TOOLS.md
    │   │   └── USER.md
    │   ├── references/
    │   │   ├── onboarding-flow.md
    │   │   └── security-patterns.md
    │   └── scripts/
    │       └── security-audit.sh
    ├── building-openclaw/             # Core OpenClaw clone scaffolding
    │   └── SKILL.md
    ├── building-with-claude/          # Claude API & cookbooks reference
    │   └── SKILL.md
    ├── communicating-classvox/        # EdTech communication patterns
    │   └── SKILL.md
    ├── handling-errors/               # Error handling patterns
    │   └── SKILL.md
    ├── improving-self/                # Continuous self-improvement
    │   ├── SKILL.md
    │   ├── scripts/
    │   │   ├── activator.sh
    │   │   ├── error-detector.sh
    │   │   └── extract-skill.sh
    │   └── resources/
    │       ├── LEARNINGS.md
    │       ├── ERRORS.md
    │       └── FEATURE_REQUESTS.md
    ├── managing-git-workflow/         # Multi-project git helpers
    │   └── SKILL.md
    ├── finding-skills/                # Discover & install agent skills
    │   └── SKILL.md
    ├── managing-google-workspace/     # Google Workspace via gog CLI
    │   └── SKILL.md
    └── searching-tavily/              # AI-optimized web search via Tavily
        ├── SKILL.md
        └── scripts/
            ├── search.mjs
            └── extract.mjs
```

## Skills Catalog

> **Maintenance rule:** When adding or removing a skill, always update this catalog to match. Each skill gets a numbered entry with path, purpose, and triggers.

### 1. `acting-proactively` — Proactive Agent Architecture

- **Path:** `.agent/skills/acting-proactively/SKILL.md`
- **Purpose:** Transforms agents into proactive partners with memory persistence, WAL Protocol, Working Buffer, onboarding, heartbeat check-ins, security hardening, and self-improvement guardrails.
- **Triggers:** Setting up a persistent agent, need context-loss survival, want proactive behavior, need onboarding flow, or security hardening.

### 2. `creating-skills` — Skill Creator (Meta-Skill)

- **Path:** `.agent/skills/creating-skills/SKILL.md`
- **Purpose:** Scaffolds new Antigravity skills from user requirements. This is a meta-skill — it generates other skills.
- **Triggers:** User asks to create, build, scaffold, or generate a new skill.
- **Workflow:** Gather requirements → Name the skill (gerund form) → Draft SKILL.md → Add supporting files → Validate.

### 3. `building-openclaw` — OpenClaw Clone Scaffolding

- **Path:** `.agent/skills/building-openclaw/SKILL.md`
- **Purpose:** Core instructions for building and scaffolding OpenClaw-inspired clone projects.
- **Triggers:** User asks to create, build, or scaffold an OpenClaw clone or modular app.

### 4. `building-with-claude` — Claude API & Cookbooks Reference

- **Path:** `.agent/skills/building-with-claude/SKILL.md`
- **Purpose:** Reference guide for building with the Claude API, based on Anthropic's official cookbooks. Maps tasks to recipes for tool use, agents, multimodal, RAG, caching, and integrations.
- **Triggers:** User builds AI-powered features, integrates Claude API, implements agents, or needs cookbook recipes.

### 5. `communicating-classvox` — ClassVox EdTech Communication

- **Path:** `.agent/skills/communicating-classvox/SKILL.md`
- **Purpose:** EdTech-specific patterns for ClassVox communication features.
- **Triggers:** User works on ClassVox, classroom messaging, or EdTech notification systems.

### 6. `handling-errors` — Error Handling Patterns

- **Path:** `.agent/skills/handling-errors/SKILL.md`
- **Purpose:** Error handling patterns across languages including exceptions, Result types, circuit breakers, retry logic, and graceful degradation.
- **Triggers:** User implements error handling, designs error-resilient APIs, needs retry/circuit breaker patterns, or improves application reliability.

### 7. `managing-git-workflow` — Multi-Project Git Helpers

- **Path:** `.agent/skills/managing-git-workflow/SKILL.md`
- **Purpose:** Branching strategies, submodule management, and cross-repo coordination.
- **Triggers:** User needs git workflow automation, branching strategy, or multi-repo help.

### 8. `improving-self` — Continuous Self-Improvement

- **Path:** `.agent/skills/improving-self/SKILL.md`
- **Purpose:** Captures learnings, errors, and feature requests to `.learnings/` for continuous agent improvement. Supports promotion to project memory and skill extraction.
- **Triggers:** Command fails, user corrects agent, knowledge is outdated, better approach discovered, missing capability requested, or before starting a major task.

### 9. `finding-skills` — Discover & Install Agent Skills

- **Path:** `.agent/skills/finding-skills/SKILL.md`
- **Purpose:** Discovers and installs agent skills from the open ecosystem via `npx skills` and `npx clawhub`. Searches by keyword and presents install options.
- **Triggers:** User asks "find a skill for X", "is there a skill that can...", or wants to extend agent capabilities.

### 10. `managing-google-workspace` — Google Workspace via gog CLI

- **Path:** `.agent/skills/managing-google-workspace/SKILL.md`
- **Purpose:** Gmail, Calendar, Drive, Contacts, Sheets, and Docs access via the `gog` CLI. Requires OAuth setup.
- **Triggers:** User needs to send/search email, manage calendar events, access Drive, read/write Sheets, export Docs, or look up Contacts.

### 11. `searching-tavily` — AI-Optimized Web Search

- **Path:** `.agent/skills/searching-tavily/SKILL.md`
- **Purpose:** Web search and URL content extraction via the Tavily API. Returns clean, relevant snippets optimized for AI agents.
- **Triggers:** Agent needs to search the web, research a topic, find current information, fetch news, or extract content from URLs. Requires `TAVILY_API_KEY`.

## Example Reference Implementations

These are **not standalone skills** — they are documented examples inside the `creating-skills` skill showing how to structure real skills.

### Code Reviewer (`reviewing-code`)

- **File:** `.agent/skills/creating-skills/examples/code-reviewer.md`
- **Purpose:** Demonstrates a heuristic-heavy skill using bullet points and severity tables.
- **Pattern:** High-freedom heuristics (correctness, security, performance, readability, testing) with structured output grouped by file and severity level.

### Deployment Guard (`guarding-deployments`)

- **File:** `.agent/skills/creating-skills/examples/deployment-guard.md`
- **Purpose:** Demonstrates a skill with validation loops and helper scripts.
- **Pattern:** Plan → Validate → Execute workflow with a `scripts/preflight.sh` helper.

## Skill Authoring Standards

When creating new skills, follow these rules (enforced by the `creating-skills` skill):

### Naming

- Use **gerund form**: `reviewing-code`, `deploying-apps` (not `review-code`, `deploy-app`)
- Lowercase letters, numbers, and hyphens only. Max 64 characters.
- Never include "claude" or "anthropic" in the name.

### Directory Layout

```
.agent/skills/<skill-name>/
├── SKILL.md          # Required — main logic
├── scripts/          # Optional — helper scripts
├── examples/         # Optional — reference implementations
└── resources/        # Optional — templates or assets
```

### SKILL.md Format

- **Frontmatter:** YAML with `name` (gerund, max 64 chars) and `description` (3rd person, max 1024 chars, include trigger keywords).
- **Body sections:** `When to use this skill`, `Workflow` (checklist), `Instructions`, `Resources`.
- Max **500 lines**. Use progressive disclosure — link to secondary files one level deep.
- **Forward slashes only** for all paths.

### Instruction Freedom Levels

| Freedom | Format | Use Case |
|---|---|---|
| High | Bullet points | Heuristics, guidelines |
| Medium | Code blocks / templates | Patterns to follow |
| Low | Exact commands | Critical / fragile operations |

### Complex Skills

For multi-step or risky operations, include:
- **Checklists** the agent copies and updates to track state
- **Validation loops:** Plan → Validate → Execute (e.g., `--check` before `--apply`)
- **Error handling:** Treat scripts as black boxes; instruct the agent to run `--help` if unsure

## Quick Reference: Creating a New Skill

1. Use the `creating-skills` skill, or follow its standards manually.
2. Create `.agent/skills/<gerund-name>/SKILL.md` using the template at `.agent/skills/creating-skills/resources/skill-template.md`.
3. Add `scripts/`, `examples/`, or `resources/` directories only if needed.
4. Validate: self-contained, under 500 lines, forward slashes, gerund name.
