# Managing Telegram Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a Telegram bot relay skill that bridges Telegram messages to Claude Code via stdin/stdout.

**Architecture:** Node.js long-polling relay using raw `fetch` against the Telegram Bot API. Zero npm dependencies. Polls `getUpdates`, prints incoming messages to stdout, reads stdin for responses, sends them back via `sendMessage`. Locked to a single Telegram user ID.

**Tech Stack:** Node.js (ESM), Telegram Bot API (raw fetch)

---

### Task 1: Create SKILL.md

**Files:**
- Create: `.agent/skills/managing-telegram/SKILL.md`

**Step 1: Create the skill directory**

```bash
mkdir -p .agent/skills/managing-telegram/scripts
```

**Step 2: Write SKILL.md**

Create `.agent/skills/managing-telegram/SKILL.md` with this content:

```markdown
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
```

**Step 3: Commit**

```bash
git add .agent/skills/managing-telegram/SKILL.md
git commit -m "feat: add managing-telegram skill definition"
```

---

### Task 2: Write relay.mjs — Telegram API helpers

**Files:**
- Create: `.agent/skills/managing-telegram/scripts/relay.mjs`

**Step 1: Write the Telegram API helper functions**

Create `.agent/skills/managing-telegram/scripts/relay.mjs` with env var validation, the `tg()` API caller, and `getMe` verification:

```javascript
#!/usr/bin/env node

const BOT_TOKEN = (process.env.TELEGRAM_BOT_TOKEN ?? "").trim();
const ALLOWED_USER = (process.env.TELEGRAM_USER_ID ?? "").trim();

if (!BOT_TOKEN) {
  console.error("Missing TELEGRAM_BOT_TOKEN environment variable.");
  console.error("Get one from @BotFather on Telegram.");
  process.exit(1);
}

if (!ALLOWED_USER) {
  console.error("Missing TELEGRAM_USER_ID environment variable.");
  console.error("Send /start to @userinfobot on Telegram to get your ID.");
  process.exit(1);
}

const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function tg(method, body = {}) {
  const resp = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  if (!data.ok) {
    throw new Error(`Telegram API error (${method}): ${data.description}`);
  }
  return data.result;
}

// Verify bot token is valid
const me = await tg("getMe");
console.error(`Connected as @${me.username}`);
```

**Step 2: Verify it runs**

```bash
TELEGRAM_BOT_TOKEN=your_token TELEGRAM_USER_ID=your_id node .agent/skills/managing-telegram/scripts/relay.mjs
```

Expected: prints `Connected as @yourbotname` to stderr, then hangs (no polling loop yet).

**Step 3: Commit**

```bash
git add .agent/skills/managing-telegram/scripts/relay.mjs
git commit -m "feat: add relay.mjs with Telegram API helpers"
```

---

### Task 3: Add long-polling loop

**Files:**
- Modify: `.agent/skills/managing-telegram/scripts/relay.mjs`

**Step 1: Add the polling loop after the `getMe` verification**

Append to `relay.mjs`:

```javascript
let offset = 0;
let running = true;

process.on("SIGINT", () => {
  console.error("\nShutting down...");
  running = false;
});

let chatId = null;

while (running) {
  try {
    const updates = await tg("getUpdates", {
      offset,
      timeout: 30,
      allowed_updates: ["message"],
    });

    for (const update of updates) {
      offset = update.update_id + 1;

      const msg = update.message;
      if (!msg?.text) continue;

      // Access control: only allow configured user
      if (String(msg.from.id) !== ALLOWED_USER) {
        console.error(`Ignored message from user ${msg.from.id}`);
        continue;
      }

      chatId = msg.chat.id;
      console.log(msg.text);
    }
  } catch (err) {
    console.error(`Poll error: ${err.message}`);
    // Wait before retrying on error
    await new Promise((r) => setTimeout(r, 3000));
  }
}
```

**Step 2: Test polling**

Run the script again. Send a message from Telegram to your bot. It should appear in stdout.

**Step 3: Commit**

```bash
git add .agent/skills/managing-telegram/scripts/relay.mjs
git commit -m "feat: add long-polling loop with user filtering"
```

---

### Task 4: Add stdin reading and response sending

**Files:**
- Modify: `.agent/skills/managing-telegram/scripts/relay.mjs`

**Step 1: Add stdin reader before the polling loop**

Insert this after the `getMe` verification and before `let offset = 0`:

```javascript
import { createInterface } from "node:readline";

const rl = createInterface({ input: process.stdin });

rl.on("line", async (line) => {
  const text = line.trim();
  if (!text || !chatId) return;

  try {
    // Telegram messages max 4096 chars — split if needed
    const chunks = [];
    for (let i = 0; i < text.length; i += 4096) {
      chunks.push(text.slice(i, i + 4096));
    }
    for (const chunk of chunks) {
      await tg("sendMessage", { chat_id: chatId, text: chunk });
    }
  } catch (err) {
    console.error(`Send error: ${err.message}`);
  }
});

rl.on("close", () => {
  running = false;
});
```

**Step 2: Test end-to-end**

1. Run the relay
2. Send a message from Telegram — it appears in stdout
3. Type a response in the terminal and press Enter — it appears in Telegram

**Step 3: Commit**

```bash
git add .agent/skills/managing-telegram/scripts/relay.mjs
git commit -m "feat: add stdin reading and Telegram response sending"
```

---

### Task 5: Update CLAUDE.md skill catalog

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Add catalog entry**

Add a new entry after the last skill in the Skills Catalog section of `CLAUDE.md`:

```markdown
### 13. `managing-telegram` — Telegram Bot Relay

- **Path:** `.agent/skills/managing-telegram/SKILL.md`
- **Purpose:** Bridges Telegram bot messages to the current Claude Code terminal session. Enables chatting with Claude Code from your phone via a Telegram bot relay.
- **Triggers:** User wants to chat from phone, start a Telegram session, remote control, or mentions `/rc`.
```

**Step 2: Update the directory tree**

Add `managing-telegram/` to the repository structure section in CLAUDE.md.

**Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add managing-telegram to skill catalog"
```
