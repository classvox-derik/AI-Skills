---
name: managing-telegram
description: >
  Telegram bot relay that lets you chat with Claude from your phone.
  Use when the user wants to chat with Claude via Telegram,
  start a remote control session, or relay messages between Telegram and Claude.
  Requires TELEGRAM_BOT_TOKEN, TELEGRAM_USER_ID, and ANTHROPIC_API_KEY environment variables.
---

# Telegram Relay

Chat with Claude from your phone via Telegram. The relay polls your Telegram bot for messages, sends them to the Claude API, and returns responses to Telegram.

## When to use this skill

- User wants to chat with Claude from their phone
- User says "start a Telegram session", "remote control", or "/rc"
- User wants a mobile Claude interface

## Prerequisites

- **Node.js** 18+ installed (for native `fetch`)
- **Telegram bot** created via @BotFather
- **`TELEGRAM_BOT_TOKEN`** environment variable set (bot token from @BotFather)
- **`TELEGRAM_USER_ID`** environment variable set (your numeric Telegram user ID)
- **`ANTHROPIC_API_KEY`** environment variable set

### Getting your Telegram User ID

Send `/start` to [@userinfobot](https://t.me/userinfobot) on Telegram. It replies with your numeric user ID.

## Workflow

- [ ] **1. Verify setup** — Confirm all 3 env vars are set and `node` is available
- [ ] **2. Start relay** — Run the relay script
- [ ] **3. Chat** — Send messages from Telegram, receive Claude responses
- [ ] **4. Stop** — Press Ctrl+C to end the session

## Usage

```bash
node .agent/skills/managing-telegram/scripts/relay.mjs
```

The relay only accepts messages from your configured Telegram user ID. Conversation history is maintained in memory (last 40 messages).

### How it works

1. Script verifies bot token via `getMe`
2. Long-polls `getUpdates` for new messages
3. Messages from your user ID are forwarded to the Claude API
4. Claude's response is sent back to your Telegram chat
5. Ctrl+C gracefully shuts down (AbortController cancels in-flight polls)

## Resources

- [scripts/relay.mjs](scripts/relay.mjs) — The relay script (zero npm dependencies)
