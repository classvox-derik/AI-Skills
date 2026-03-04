---
name: finding-skills
description: >
  Discovers and installs agent skills from the open skills ecosystem.
  Use when the user asks "how do I do X", "find a skill for X", "is there a skill that can...",
  or wants to extend agent capabilities with installable skills.
---

# Find Skills

Discover and install skills from the open agent skills ecosystem using the Skills CLI (`npx skills`) and ClawHub (`npx clawhub`).

## When to use this skill

- User asks "how do I do X" where X might have an existing skill
- User says "find a skill for X" or "is there a skill for X"
- User asks "can you do X" where X is a specialized capability
- User wants to extend agent capabilities
- User wants to search for tools, templates, or workflows

## Workflow

- [ ] **1. Understand the need** — Identify the domain, task, and whether a skill likely exists
- [ ] **2. Search** — Run `npx skills find [query]` to discover matching skills
- [ ] **3. Present options** — Show skill name, purpose, and install command
- [ ] **4. Install** — If user agrees, install the skill

## Skills CLI Commands

```bash
npx skills find [query]       # Search for skills by keyword
npx skills add <package>      # Install a skill
npx skills add <pkg> -g -y    # Install globally, skip confirmation
npx skills check              # Check for updates
npx skills update             # Update all installed skills
npx skills init <name>        # Scaffold a new skill
```

Browse skills at: https://skills.sh/

## ClawHub CLI Commands

```bash
npx clawhub@latest install <name>           # Install from ClawHub registry
npx clawhub@latest install <owner>/<slug>   # Install by owner/slug
```

Browse skills at: https://clawhub.ai/

## How to Search

### Identify the query

| User says | Search query |
|-----------|-------------|
| "make my React app faster" | `npx skills find react performance` |
| "help with PR reviews" | `npx skills find pr review` |
| "create a changelog" | `npx skills find changelog` |
| "deploy to Vercel" | `npx skills find vercel deploy` |

### Present results

When skills are found, show:
1. Skill name and what it does
2. The install command
3. A link to learn more

### Common categories

| Category | Example Queries |
|----------|----------------|
| Web Development | react, nextjs, typescript, tailwind |
| Testing | testing, jest, playwright, e2e |
| DevOps | deploy, docker, kubernetes, ci-cd |
| Documentation | docs, readme, changelog, api-docs |
| Code Quality | review, lint, refactor, best-practices |
| Design | ui, ux, design-system, accessibility |
| Productivity | workflow, automation, git |

## Search Tips

- Use specific keywords: "react testing" over just "testing"
- Try alternative terms: "deploy", "deployment", "ci-cd"
- Check popular sources: `vercel-labs/agent-skills`, `ComposioHQ/awesome-claude-skills`

## When No Skills Are Found

1. Acknowledge no existing skill was found
2. Offer to help with the task directly
3. Suggest creating a custom skill: `npx skills init my-skill-name`

## Attribution

Based on [JimLiuxinghai/find-skills](https://clawhub.ai/JimLiuxinghai/find-skills) from ClawHub.
