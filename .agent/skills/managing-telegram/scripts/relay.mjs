#!/usr/bin/env node

// ── Env var validation ──────────────────────────────────────────────

const BOT_TOKEN = (process.env.TELEGRAM_BOT_TOKEN ?? "").trim();
const ALLOWED_USER = (process.env.TELEGRAM_USER_ID ?? "").trim();
const ANTHROPIC_KEY = (process.env.ANTHROPIC_API_KEY ?? "").trim();

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

if (!ANTHROPIC_KEY) {
  console.error("Missing ANTHROPIC_API_KEY environment variable.");
  process.exit(1);
}

// ── Telegram API helpers ────────────────────────────────────────────

const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function tg(method, body = {}, signal) {
  const resp = await fetch(`${TG_API}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  const data = await resp.json();
  if (!data.ok) {
    throw new Error(`Telegram API error (${method}): ${data.description}`);
  }
  return data.result;
}

async function sendTelegram(chatId, text) {
  // Telegram messages max 4096 chars — split if needed
  for (let i = 0; i < text.length; i += 4096) {
    await tg("sendMessage", { chat_id: chatId, text: text.slice(i, i + 4096) });
  }
}

// ── Claude API helper ───────────────────────────────────────────────

const conversation = [];

async function askClaude(userMessage) {
  conversation.push({ role: "user", content: userMessage });

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: conversation,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`Claude API error (${resp.status}): ${text}`);
  }

  const data = await resp.json();
  const reply = data.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  conversation.push({ role: "assistant", content: reply });

  // Keep conversation manageable — trim to last 40 messages
  if (conversation.length > 40) {
    conversation.splice(0, conversation.length - 40);
  }

  return reply;
}

// ── Start ───────────────────────────────────────────────────────────

const me = await tg("getMe");
console.error(`Telegram connected as @${me.username}`);
console.error(`Listening for messages from user ${ALLOWED_USER}...`);

let running = true;
let offset = 0;
const abort = new AbortController();

process.on("SIGINT", () => {
  console.error("\nShutting down...");
  running = false;
  abort.abort();
});

// ── Long-polling loop ───────────────────────────────────────────────

while (running) {
  try {
    const updates = await tg("getUpdates", {
      offset,
      timeout: 30,
      allowed_updates: ["message"],
    }, abort.signal);

    for (const update of updates) {
      offset = update.update_id + 1;

      const msg = update.message;
      if (!msg?.text) continue;

      // Access control: only allow configured user
      if (String(msg.from.id) !== ALLOWED_USER) {
        console.error(`Ignored message from user ${msg.from.id}`);
        continue;
      }

      const chatId = msg.chat.id;
      console.error(`<< ${msg.text}`);

      try {
        const reply = await askClaude(msg.text);
        console.error(`>> ${reply.slice(0, 100)}${reply.length > 100 ? "..." : ""}`);
        await sendTelegram(chatId, reply);
      } catch (err) {
        console.error(`Claude error: ${err.message}`);
        await sendTelegram(chatId, "Sorry, I encountered an error. Please try again.");
      }
    }
  } catch (err) {
    if (err.name === "AbortError") break;
    console.error(`Poll error: ${err.message}`);
    if (err.message.includes("401") || err.message.includes("Unauthorized")) {
      console.error("Bot token appears invalid. Exiting.");
      process.exit(1);
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
}
