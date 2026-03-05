# Managing Telegram — Design Document

**Date:** 2026-03-05
**Skill name:** `managing-telegram`
**Path:** `.agent/skills/managing-telegram/`

## Purpose

A Telegram bot relay skill that bridges Telegram messages to a Claude Code terminal session. Enables chatting with Claude Code from your phone via Telegram.

## Architecture

Node.js long-polling relay using raw `fetch` against the Telegram Bot API. Zero npm dependencies.

```
Phone (Telegram) <-> Telegram Bot API <-> relay.mjs (stdin/stdout) <-> Claude Code
```

### How it works

1. `relay.mjs` starts and polls `getUpdates` with long-polling
2. Incoming messages from your Telegram user ID are printed to stdout
3. Stdin is read for responses, sent back via `sendMessage`
4. Access is locked to a single Telegram user ID

## Components

```
.agent/skills/managing-telegram/
├── SKILL.md              # Skill definition, setup guide, usage
└── scripts/
    └── relay.mjs         # Node.js long-polling relay (zero deps)
```

## Environment Variables

| Variable | Purpose | Scope |
|----------|---------|-------|
| `TELEGRAM_BOT_TOKEN` | Bot token from @BotFather | User global |
| `TELEGRAM_USER_ID` | Your Telegram numeric user ID | User global |

Stored in user-level config (not project-level) so they work across all projects.

## Portability

- AI-Skills is consumed as a git submodule at `.agent/skills/` in any project
- Script resolves its own path via `import.meta.url` — no hardcoded paths
- Works from any working directory: `node .agent/skills/managing-telegram/scripts/relay.mjs`

## Scope Limitations

- Text only — no images, files, or inline keyboards
- Single user — no group chat support
- No message persistence — live relay only
- No retry queue — skips messages if Telegram is unreachable

## Decisions

- **Raw fetch over npm packages** — zero dependencies, consistent with skill portability
- **Long-polling over webhooks** — no public URL required, works behind firewalls
- **User ID filtering** — simple security, no auth complexity
- **Node.js** — consistent with existing skills (searching-tavily)
