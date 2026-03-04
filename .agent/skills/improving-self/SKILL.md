---
name: improving-self
description: >
  Captures learnings, errors, and feature requests to enable continuous agent improvement.
  Use when a command fails, user corrects the agent, knowledge is outdated, a better approach
  is discovered, or a missing capability is requested. Also review learnings before major tasks.
---

# Self-Improvement

Log learnings, errors, and feature requests to `.learnings/` for continuous improvement. High-value entries get promoted to project memory files.

## When to use this skill

- A command or operation fails unexpectedly
- User corrects the agent ("No, that's wrong...", "Actually...")
- User requests a capability that doesn't exist
- An external API or tool fails
- Agent realizes its knowledge is outdated or incorrect
- A better approach is discovered for a recurring task
- Before starting a major task (review existing learnings)

## Quick Reference

| Situation | Action |
|-----------|--------|
| Command/operation fails | Log to `.learnings/ERRORS.md` |
| User corrects you | Log to `.learnings/LEARNINGS.md` (category: `correction`) |
| User wants missing feature | Log to `.learnings/FEATURE_REQUESTS.md` |
| API/external tool fails | Log to `.learnings/ERRORS.md` with integration details |
| Knowledge was outdated | Log to `.learnings/LEARNINGS.md` (category: `knowledge_gap`) |
| Found better approach | Log to `.learnings/LEARNINGS.md` (category: `best_practice`) |
| Broadly applicable learning | Promote to `CLAUDE.md` or `.github/copilot-instructions.md` |

## Workflow

- [ ] **1. Detect** — Identify a loggable event (error, correction, gap, improvement)
- [ ] **2. Check existing** — Search `.learnings/` for related entries before creating duplicates
- [ ] **3. Log** — Append entry to the appropriate file using the format below
- [ ] **4. Link** — Add `See Also` references to related entries if they exist
- [ ] **5. Evaluate promotion** — If broadly applicable, promote to project memory

## Setup

Create the `.learnings/` directory in your project root:

```bash
mkdir -p .learnings
```

Copy templates from `resources/` or create files with the headers from the format sections below.

## Entry Formats

### Learning Entry

Append to `.learnings/LEARNINGS.md`:

```markdown
## [LRN-YYYYMMDD-XXX] category

**Logged**: ISO-8601 timestamp
**Priority**: low | medium | high | critical
**Status**: pending
**Area**: frontend | backend | infra | tests | docs | config

### Summary
One-line description of what was learned

### Details
Full context: what happened, what was wrong, what's correct

### Suggested Action
Specific fix or improvement to make

### Metadata
- Source: conversation | error | user_feedback
- Related Files: path/to/file.ext
- Tags: tag1, tag2
- See Also: LRN-YYYYMMDD-XXX (if related)

---
```

**Categories:** `correction` | `knowledge_gap` | `best_practice` | `insight`

### Error Entry

Append to `.learnings/ERRORS.md`:

```markdown
## [ERR-YYYYMMDD-XXX] skill_or_command_name

**Logged**: ISO-8601 timestamp
**Priority**: high
**Status**: pending
**Area**: frontend | backend | infra | tests | docs | config

### Summary
Brief description of what failed

### Error
Actual error message or output

### Context
- Command/operation attempted
- Input or parameters used
- Environment details if relevant

### Suggested Fix
What might resolve this

### Metadata
- Reproducible: yes | no | unknown
- Related Files: path/to/file.ext
- See Also: ERR-YYYYMMDD-XXX (if recurring)

---
```

### Feature Request Entry

Append to `.learnings/FEATURE_REQUESTS.md`:

```markdown
## [FEAT-YYYYMMDD-XXX] capability_name

**Logged**: ISO-8601 timestamp
**Priority**: medium
**Status**: pending
**Area**: frontend | backend | infra | tests | docs | config

### Requested Capability
What the user wanted to do

### User Context
Why they needed it, what problem they're solving

### Complexity Estimate
simple | medium | complex

### Suggested Implementation
How this could be built

### Metadata
- Frequency: first_time | recurring
- Related Features: existing_feature_name

---
```

## ID Generation

Format: `TYPE-YYYYMMDD-XXX`
- **TYPE**: `LRN` (learning), `ERR` (error), `FEAT` (feature)
- **YYYYMMDD**: Current date
- **XXX**: Sequential number (e.g., `001`, `002`)

## Resolving Entries

When an issue is fixed, update the entry:

1. Change `**Status**: pending` to `**Status**: resolved`
2. Add a resolution block after Metadata:

```markdown
### Resolution
- **Resolved**: ISO-8601 timestamp
- **Commit/PR**: abc123 or #42
- **Notes**: Brief description of what was done
```

Other statuses: `in_progress`, `wont_fix`, `promoted`, `promoted_to_skill`

## Promoting to Project Memory

Promote when a learning is broadly applicable — not a one-off fix.

### When to Promote

- Learning applies across multiple files/features
- Knowledge any contributor should know
- Prevents recurring mistakes
- Documents project-specific conventions

### Promotion Targets

| Learning Type | Promote To |
|---------------|------------|
| Project facts, conventions | `CLAUDE.md` |
| Agent workflows, automation | `AGENTS.md` |
| Copilot context | `.github/copilot-instructions.md` |

### How to Promote

1. **Distill** the learning into a concise rule or fact
2. **Add** to appropriate section in target file
3. **Update** original entry: set `**Status**: promoted` and add `**Promoted**: CLAUDE.md`

## Recurring Pattern Detection

If logging something similar to an existing entry:

1. **Search first**: `grep -r "keyword" .learnings/`
2. **Link entries**: Add `See Also` in Metadata
3. **Bump priority** if recurring
4. **Consider systemic fix**: Missing docs (promote), missing automation (add to AGENTS.md), or architectural problem (create ticket)

## Detection Triggers

Automatically log when you notice:

| Signal | Type | Category |
|--------|------|----------|
| "No, that's not right..." | Learning | `correction` |
| "Actually, it should be..." | Learning | `correction` |
| User provides unknown info | Learning | `knowledge_gap` |
| Documentation is outdated | Learning | `knowledge_gap` |
| Non-zero exit code | Error | — |
| Exception or stack trace | Error | — |
| "Can you also..." / "I wish..." | Feature | — |

## Priority Guidelines

| Priority | When to Use |
|----------|-------------|
| `critical` | Blocks core functionality, data loss risk, security issue |
| `high` | Significant impact, affects common workflows, recurring |
| `medium` | Moderate impact, workaround exists |
| `low` | Minor inconvenience, edge case |

## Periodic Review

Review `.learnings/` at natural breakpoints:

```bash
# Count pending items
grep -h "Status\*\*: pending" .learnings/*.md | wc -l

# High-priority pending items
grep -B5 "Priority\*\*: high" .learnings/*.md | grep "^## \["
```

## Hook Integration (Optional)

Enable automatic reminders via agent hooks. See `scripts/activator.sh` and `scripts/error-detector.sh`.

Add to `.claude/settings.json`:

```json
{
  "hooks": {
    "UserPromptSubmit": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": ".agent/skills/improving-self/scripts/activator.sh"
      }]
    }],
    "PostToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": ".agent/skills/improving-self/scripts/error-detector.sh"
      }]
    }]
  }
}
```

## Skill Extraction

When a learning qualifies (recurring, verified, non-obvious, broadly applicable), extract it as a reusable skill:

```bash
.agent/skills/improving-self/scripts/extract-skill.sh skill-name --dry-run
.agent/skills/improving-self/scripts/extract-skill.sh skill-name
```

Update the original entry with `**Status**: promoted_to_skill` and `**Skill-Path**: .agent/skills/skill-name`.

## Resources

- [resources/LEARNINGS.md](resources/LEARNINGS.md) — Learning log template
- [resources/ERRORS.md](resources/ERRORS.md) — Error log template
- [resources/FEATURE_REQUESTS.md](resources/FEATURE_REQUESTS.md) — Feature request log template
- [scripts/activator.sh](scripts/activator.sh) — Hook: learning reminder on prompt submit
- [scripts/error-detector.sh](scripts/error-detector.sh) — Hook: error detection on bash output
- [scripts/extract-skill.sh](scripts/extract-skill.sh) — Extract a learning into a standalone skill

## Attribution

Based on [peterskoett/self-improving-agent](https://github.com/peterskoett/self-improving-agent).
