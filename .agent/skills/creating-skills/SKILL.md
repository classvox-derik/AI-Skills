---
name: creating-skills
description: >
  Creates well-structured Antigravity agent skills from user requirements.
  Use when the user asks to build, generate, or scaffold a new skill, agent capability,
  or `.agent/skills/` directory. Handles SKILL.md authoring, helper scripts, examples,
  and resource templates.
---

# Antigravity Skill Creator

## When to use this skill

- User asks to **create**, **build**, or **scaffold** a new Antigravity skill
- User says "build me a skill for…" or "create a skill that…"
- User wants to add a new capability to their `.agent/skills/` directory
- User provides a specification and asks you to turn it into a skill

## Skill Directory Structure

Every generated skill **must** follow this hierarchy:

```
.agent/skills/<skill-name>/
├── SKILL.md          # Required — main logic and instructions
├── scripts/          # Optional — helper scripts
├── examples/         # Optional — reference implementations
└── resources/        # Optional — templates or assets
```

## Workflow

Use this checklist for every skill you create:

- [ ] **1. Gather Requirements** — Confirm the skill's purpose, triggers, and scope
- [ ] **2. Name the Skill** — Derive a gerund-form name (e.g., `testing-code`, `managing-databases`)
- [ ] **3. Draft SKILL.md** — Write frontmatter + body following the standards below
- [ ] **4. Add Supporting Files** — Create `scripts/`, `examples/`, or `resources/` only if needed
- [ ] **5. Validate** — Confirm the skill is self-contained, under 500 lines, and uses forward slashes

## SKILL.md Authoring Standards

### Frontmatter Rules

```yaml
---
name: <gerund-name>        # lowercase, hyphens, max 64 chars
description: >             # 3rd person, max 1024 chars, include trigger keywords
  Does X when Y. Use when the user mentions Z.
---
```

**Hard rules:**

- `name` must be gerund form (e.g., `deploying-apps`, not `deploy-app`)
- `name` allows only lowercase letters, numbers, and hyphens
- `name` must never contain "claude" or "anthropic"
- `description` must be written in **third person**
- `description` must include specific trigger keywords so the agent can match it

### Body Structure

Use this template for the SKILL.md body:

```markdown
# [Skill Title]

## When to use this skill
- [Trigger condition 1]
- [Trigger condition 2]

## Workflow
[Checklist or step-by-step guide]

## Instructions
[Core logic, code snippets, or rules]

## Resources
- [Links to scripts/ or resources/ if applicable]
```

### Writing Principles

- **Be concise** — Assume the agent is smart. Don't explain basic concepts.
- **Progressive disclosure** — Keep SKILL.md under 500 lines. Link to secondary files (`[See ADVANCED.md](ADVANCED.md)`) only one level deep.
- **Forward slashes only** — Always use `/` for paths, never `\`.
- **Degrees of freedom:**

| Freedom Level | Format | Use Case |
|---|---|---|
| High | Bullet points | Heuristics, guidelines |
| Medium | Code blocks / templates | Patterns to follow |
| Low | Exact commands | Fragile or critical operations |

### Feedback Loops for Complex Skills

For skills that involve multi-step or risky operations, include:

1. **Checklists** — A markdown checklist the agent copies and updates to track state
2. **Validation loops** — Plan → Validate → Execute pattern (e.g., run `--check` before `--apply`)
3. **Error handling** — Treat scripts as black boxes; instruct the agent to run `--help` if unsure

## Example: Generating a Skill

When the user says *"Build me a skill for automating deployments"*, produce:

**Path:** `.agent/skills/automating-deployments/`

**SKILL.md:**

```markdown
---
name: automating-deployments
description: >
  Automates application deployment workflows. Use when the user asks to deploy,
  release, ship, or push to production.
---

# Deployment Automation

## When to use this skill
- User asks to deploy or release an application
- User mentions CI/CD, staging, or production pushes

## Workflow
- [ ] Confirm target environment (staging / production)
- [ ] Run pre-deploy checks
- [ ] Execute deployment
- [ ] Verify health checks pass

## Instructions
[Deployment-specific logic here]
```

Then add `scripts/`, `examples/`, or `resources/` directories **only** if the skill requires them.
