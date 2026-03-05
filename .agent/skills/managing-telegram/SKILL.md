---
name: managing-telegram
description: >
  Bridges Telegram bot messages to the current Claude Code terminal session.
  Use when the user wants to chat with Claude Code from their phone via Telegram,
  start a remote control session, or relay messages between Telegram and the terminal.
  Requires TELEGRAM_BOT_TOKEN and TELEGRAM_USER_ID environment variables.
---

# Telegram Relay

Connects your Telegram bot to the current Claude Code session. Messages you send on Telegram appear in the terminal; responses are sent back to Telegram.

## When to use this skill

- User wants to chat with Claude Code from their phone
- User says "start a Telegram session", "remote control", or "/rc"
- User wants to relay messages between Telegram and the terminal

## Prerequisites

- **Node.js** installed
- **Telegram bot** created via @BotFather
- **`TELEGRAM_BOT_TOKEN`** environment variable set (bot token from @BotFather)
- **`TELEGRAM_USER_ID`** environment variable set (your numeric Telegram user ID)

### Getting your Telegram User ID

Send `/start` to [@userinfobot](https://t.me/userinfobot) on Telegram. It replies with your numeric user ID.

## Workflow

- [ ] **1. Verify setup** — Confirm env vars are set and `node` is available
- [ ] **2. Start relay** — Run the relay script
- [ ] **3. Chat** — Send messages from Telegram, receive responses
- [ ] **4. Stop** — Press Ctrl+C to end the session

## Usage

```bash
node .agent/skills/managing-telegram/scripts/relay.mjs
```

The relay prints incoming Telegram messages to stdout and reads responses from stdin. It only accepts messages from your configured Telegram user ID.

### How it works

1. Script starts and confirms bot identity via `getMe`
2. Long-polls `getUpdates` for new messages
3. Messages from your user ID are printed to stdout
4. Lines read from stdin are sent back as Telegram messages
5. Ctrl+C gracefully shuts down

## Resources

- [scripts/relay.mjs](scripts/relay.mjs) — The relay script
