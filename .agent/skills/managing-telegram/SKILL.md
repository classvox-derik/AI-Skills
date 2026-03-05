---
name: managing-telegram
description: >
  Telegram bot relay that lets you chat with Claude from your phone.
  Use when the user wants to chat with Claude via Telegram,
  start a remote control session, or relay messages between Telegram and Claude.
  Requires TELEGRAM_BOT_TOKEN and TELEGRAM_USER_ID environment variables.
  Uses the claude CLI (your subscription) — no API key needed.
---

# Telegram Relay

Chat with Claude from your phone via Telegram. The relay polls your Telegram bot for messages, sends them to the `claude` CLI (using your subscription), and returns responses to Telegram.

## When to use this skill

- User wants to chat with Claude from their phone
- User says "start a Telegram session", "remote control", or "/rc"
- User wants a mobile Claude interface

## Prerequisites

- **Node.js** 18+ installed (for native `fetch`)
- **`claude` CLI** installed and logged in (uses your Claude subscription)
- **Telegram bot** created via @BotFather
- **`TELEGRAM_BOT_TOKEN`** environment variable set (bot token from @BotFather)
- **`TELEGRAM_USER_ID`** environment variable set (your numeric Telegram user ID)

### Getting your Telegram User ID

Send `/start` to [@userinfobot](https://t.me/userinfobot) on Telegram. It replies with your numeric user ID.

## Workflow

- [ ] **1. Verify setup** — Confirm env vars are set, `node` and `claude` are available
- [ ] **2. Start relay** — Run the relay script
- [ ] **3. Chat** — Send messages from Telegram, receive Claude responses
- [ ] **4. Stop** — Press Ctrl+C to end the session

## Usage

```bash
node .agent/skills/managing-telegram/scripts/relay.mjs
```

The relay only accepts messages from your configured Telegram user ID. Conversation is maintained via a persistent `claude` session ID.

### How it works

1. Script verifies bot token via `getMe` and generates a Claude session ID
2. Long-polls `getUpdates` for new messages
3. Messages from your user ID are sent to `claude -p` with `--session-id` for continuity
4. Claude's response is sent back to your Telegram chat
5. Ctrl+C gracefully shuts down (AbortController cancels in-flight polls)

## Resources

- [scripts/relay.mjs](scripts/relay.mjs) — The relay script (zero npm dependencies)
