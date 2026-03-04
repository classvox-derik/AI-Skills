# Example Skill: Code Reviewer

A reference implementation showing a heuristic-heavy skill using bullet points.

## Directory Structure

```
.agent/skills/reviewing-code/
├── SKILL.md
└── resources/
    └── review-checklist.md
```

## SKILL.md

```markdown
---
name: reviewing-code
description: >
  Performs structured code reviews with checklist-driven feedback. Use when the
  user asks to review code, check a PR, audit quality, or critique implementation.
---

# Code Reviewer

## When to use this skill
- User asks to review code or a pull request
- User wants a quality audit or code critique
- User mentions "code review" or "PR feedback"

## Workflow
- [ ] Identify files or diff to review
- [ ] Apply the review checklist
- [ ] Report findings grouped by severity

## Instructions

### Review Priorities (High Freedom — Heuristics)

- **Correctness** — Does it do what it claims?
- **Security** — Any injection, auth, or data-leak risks?
- **Performance** — Obvious N+1 queries, unbounded loops, or memory leaks?
- **Readability** — Clear naming, reasonable function length, helpful comments?
- **Testing** — Are edge cases covered?

### Severity Levels

| Level | Label | Action |
|---|---|---|
| 🔴 | Critical | Must fix before merge |
| 🟡 | Warning | Should fix, can merge with follow-up ticket |
| 🔵 | Suggestion | Nice-to-have improvement |

### Output Format

Group findings by file, then by severity:

```markdown
## `src/auth/login.ts`
- 🔴 **SQL injection risk** on line 42 — use parameterized queries
- 🟡 **Missing error handling** — `catch` block is empty on line 58
- 🔵 **Naming** — `doThing()` could be more descriptive
```

## Resources

- [Review Checklist](resources/review-checklist.md)

```
