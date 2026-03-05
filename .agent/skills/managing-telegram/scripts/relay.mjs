#!/usr/bin/env node

import { createInterface } from "node:readline";

// ── Env var validation ──────────────────────────────────────────────

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

// ── API helpers ─────────────────────────────────────────────────────

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

// ── Stdin reader ────────────────────────────────────────────────────

let chatId = null;
let running = true;

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

// ── Long-polling loop ───────────────────────────────────────────────

let offset = 0;

process.on("SIGINT", () => {
  console.error("\nShutting down...");
  running = false;
});

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
