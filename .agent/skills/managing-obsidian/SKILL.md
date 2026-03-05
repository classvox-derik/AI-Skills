---
name: managing-obsidian
description: >
  Works with Obsidian vaults and automates note management via obsidian-cli.
  Also serves as the persistent AI memory layer — ALL agent activity (conversations,
  Google Workspace actions, decisions, learnings) is logged to the 08 - Antigravity
  folder in the vault. Use when working with Obsidian notes or when any agent action
  should be persisted as memory. Requires obsidian-cli.
---

# Obsidian Vault Management

Work with Obsidian vaults (plain Markdown notes) and automate via `obsidian-cli`.

## When to use this skill

- User needs to search, create, move, or delete Obsidian notes
- User asks about their vault structure or note locations
- User wants to automate Obsidian workflows
- User needs to refactor/rename notes while preserving wikilinks
- **Every agent session** — log session summary to `08 - Antigravity/sessions/`
- **Every Google Workspace action** — log to `08 - Antigravity/google/`
- **Every significant decision or learning** — log to the appropriate subfolder

## Prerequisites

Install `obsidian-cli`:

```bash
# macOS/Linux
brew install yakitrak/yakitrak/obsidian-cli

# Windows — check releases at https://github.com/yakitrak/obsidian-cli
```

## Vault Basics

An Obsidian vault is just a normal folder on disk:

| Path | Contents |
|------|----------|
| `*.md` | Notes (plain Markdown — edit with any editor) |
| `.obsidian/` | Config + plugin settings (usually don't touch) |
| `*.canvas` | Canvas files (JSON) |
| Attachments folder | Images, PDFs, etc. (configured in Obsidian settings) |

## Find Active Vaults

Obsidian tracks vaults in its config (source of truth):

- **macOS:** `~/Library/Application Support/obsidian/obsidian.json`
- **Windows:** `%APPDATA%/obsidian/obsidian.json`

```bash
obsidian-cli print-default --path-only
```

**Don't guess vault paths** — read the config or use `print-default`.

**Current default vault:** Denvista (`C:/Denvista`)

## Commands

### Set default vault (once)

```bash
obsidian-cli set-default "<vault-folder-name>"
```

### Search

```bash
obsidian-cli search "query"                # Note names
obsidian-cli search-content "query"        # Inside notes
```

### Create

```bash
obsidian-cli create "Folder/New note" --content "..." --open
```

### Move / Rename (preserves wikilinks)

```bash
obsidian-cli move "old/path/note" "new/path/note"
```

### Delete

```bash
obsidian-cli delete "path/note"
```

### Direct edits

Edit `.md` files directly — Obsidian picks up changes automatically.

---

## Antigravity — Persistent AI Memory

**ALL agent activity is logged** to `08 - Antigravity/` in the Obsidian vault. This is the agent's long-term memory — searchable, wikilinked, and visible to both humans and future AI sessions.

### Folder structure

```
08 - Antigravity/
├── activity-log.md                    # Rolling index of ALL activity
├── sessions/
│   └── YYYY-MM-DD-<slug>.md          # Session summaries
├── google/
│   ├── gmail/
│   │   └── YYYY-MM-DD-<slug>.md      # Email searches, sends, reads
│   ├── calendar/
│   │   └── YYYY-MM-DD-<slug>.md      # Event queries, creations
│   ├── drive/
│   │   └── YYYY-MM-DD-<slug>.md      # File searches, access
│   ├── sheets/
│   │   └── YYYY-MM-DD-<slug>.md      # Read/write operations
│   ├── docs/
│   │   └── YYYY-MM-DD-<slug>.md      # Exports, reads
│   └── contacts/
│       └── YYYY-MM-DD-<slug>.md      # Lookups
├── decisions/
│   └── YYYY-MM-DD-<slug>.md          # Key decisions made during sessions
└── learnings/
    └── YYYY-MM-DD-<slug>.md          # Insights, corrections, discoveries
```

### Vault base path

Write directly to disk: `C:/Denvista/08 - Antigravity/`

---

### 1. Session Logging

**At the end of every Claude Code or Antigravity agent conversation**, write a session summary.

**File:** `08 - Antigravity/sessions/YYYY-MM-DD-<slug>.md`

```markdown
---
created: YYYY-MM-DDTHH:MM
type: session
agent: claude-code | antigravity
tags: [antigravity, session, <topic-tags>]
---

# <Session Title>

## Summary
<2-3 sentence overview of what was discussed and accomplished>

## Topics Covered
- <Topic 1 — what was discussed or decided>
- <Topic 2>
- <Topic 3>

## Actions Taken
- <Action 1 — what was done, files changed, commands run>
- <Action 2>

## Decisions Made
- <Decision — and reasoning if notable>

## Open Items
- <Anything unfinished or to follow up on>

## Key Files
- <Paths to files created or modified>
```

**When to write:** Before the session ends, or when a significant chunk of work completes. Don't wait — write incrementally if the session is long.

**Slug examples:** `skill-creation-session`, `email-triage`, `obsidian-setup`, `bugfix-auth-flow`

---

### 2. Google Workspace Logging

**After every `gog` command**, write a note to the appropriate `google/` subfolder.

**File:** `08 - Antigravity/google/<service>/YYYY-MM-DD-<slug>.md`

```markdown
---
created: YYYY-MM-DDTHH:MM
service: gmail | calendar | drive | sheets | docs | contacts
action: search | send | read | create | update | delete | export | list
tags: [antigravity, gog, <service>]
---

# <Action Description>

## Command
`gog <exact command run>`

## Result Summary
<Concise summary of what was returned or accomplished>

## Key Details
<Important data: names, dates, IDs, subjects, file names>
```

| gog Action | Log To | Capture |
|------------|--------|---------|
| `gmail search` | `google/gmail/` | Query, result count, subjects, senders |
| `gmail send` | `google/gmail/` | Recipient, subject, confirmation |
| `calendar events` | `google/calendar/` | Date range, titles, times, attendees |
| `drive search` | `google/drive/` | Query, file names, IDs |
| `sheets get/update` | `google/sheets/` | Sheet ID, range, key data |
| `docs cat/export` | `google/docs/` | Doc ID, title, content summary |
| `contacts list` | `google/contacts/` | Names, emails, count |

---

### 3. Decision Logging

**When a significant decision is made** during a session, log it separately for easy retrieval.

**File:** `08 - Antigravity/decisions/YYYY-MM-DD-<slug>.md`

```markdown
---
created: YYYY-MM-DDTHH:MM
type: decision
tags: [antigravity, decision, <topic>]
---

# <Decision Title>

## Decision
<What was decided>

## Context
<Why this came up, what alternatives were considered>

## Implications
<What this affects going forward>
```

**Log when:** Architecture choices, tool selections, workflow changes, user preferences expressed.

---

### 4. Learning Logging

**When something non-obvious is discovered**, log it for future sessions.

**File:** `08 - Antigravity/learnings/YYYY-MM-DD-<slug>.md`

```markdown
---
created: YYYY-MM-DDTHH:MM
type: learning
tags: [antigravity, learning, <topic>]
---

# <Learning Title>

## What Happened
<Context — what was attempted, what went wrong or was discovered>

## The Insight
<The key takeaway>

## Apply When
<When future sessions should recall this>
```

---

### Activity Log

**Every logged note also gets a one-liner** appended to `08 - Antigravity/activity-log.md`:

```markdown
- **YYYY-MM-DD HH:MM** | `<type>` | `<action>` | <one-line summary> | [[08 - Antigravity/<path-to-note>]]
```

Types: `session`, `google`, `decision`, `learning`

---

### Retrieval — Before Acting, Search Memory

Before performing actions or answering questions about past work:

```bash
grep -r "keyword" "C:/Denvista/08 - Antigravity/" --include="*.md" -l
```

Or scan the activity log for recent entries:

```bash
tail -20 "C:/Denvista/08 - Antigravity/activity-log.md"
```

---

## Tips

- Prefer `obsidian-cli move` over `mv` to keep wikilinks intact
- Direct file edits are fine for content; use CLI for structural changes
- **Always log activity** — even quick actions. Memory compounds over time.
- Write incrementally during long sessions — don't risk losing context
- Use wikilinks (`[[note]]`) in notes to cross-reference related entries

## Attribution

Based on [steipete/obsidian](https://clawhub.ai/steipete/obsidian) from ClawHub.
