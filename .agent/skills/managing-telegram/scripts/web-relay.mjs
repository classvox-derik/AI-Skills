#!/usr/bin/env node
// Web-based chat relay to Claude CLI — zero dependencies
// Usage: node web-relay.mjs [port]

import http from 'node:http';
import { execSync, spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import os from 'node:os';

const PORT = parseInt(process.argv[2] || '3333', 10);
const SESSION_ID = randomUUID();

// Get LAN IP
function getLanIp() {
  const nets = os.networkInterfaces();
  for (const ifaces of Object.values(nets)) {
    for (const iface of ifaces) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
}

// Call claude CLI
async function askClaude(message) {
  return new Promise((resolve, reject) => {
    const env = { ...process.env };
    delete env.CLAUDECODE;
    const proc = spawn('claude', ['-p', '--session-id', SESSION_ID, '--output-format', 'text'], {
      shell: true,
      stdio: ['pipe', 'pipe', 'pipe'],
      env,
    });
    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', d => stdout += d);
    proc.stderr.on('data', d => stderr += d);
    proc.on('close', code => {
      if (code === 0) resolve(stdout.trim());
      else reject(new Error(stderr || `claude exited with ${code}`));
    });
    proc.stdin.write(message);
    proc.stdin.end();
  });
}

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Claude Chat</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#1a1a2e;color:#e0e0e0;height:100dvh;display:flex;flex-direction:column}
header{background:#16213e;padding:12px 16px;text-align:center;font-size:18px;font-weight:600;border-bottom:1px solid #0f3460;flex-shrink:0}
#messages{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}
.msg{max-width:85%;padding:10px 14px;border-radius:16px;line-height:1.4;font-size:15px;white-space:pre-wrap;word-wrap:break-word}
.user{align-self:flex-end;background:#0f3460;border-bottom-right-radius:4px}
.bot{align-self:flex-start;background:#2a2a4a;border-bottom-left-radius:4px}
.thinking{align-self:flex-start;color:#888;font-style:italic;padding:10px 14px}
#input-area{display:flex;gap:8px;padding:10px 12px;background:#16213e;border-top:1px solid #0f3460;flex-shrink:0}
#msg{flex:1;padding:10px 14px;border:1px solid #0f3460;border-radius:20px;background:#1a1a2e;color:#e0e0e0;font-size:16px;outline:none;resize:none;max-height:120px;line-height:1.4}
#msg:focus{border-color:#e94560}
#send{background:#e94560;color:#fff;border:none;border-radius:50%;width:42px;height:42px;font-size:20px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center}
#send:disabled{opacity:.4}
</style>
</head>
<body>
<header>Claude Code</header>
<div id="messages"></div>
<div id="input-area">
<textarea id="msg" rows="1" placeholder="Message Claude..." autofocus></textarea>
<button id="send">&#9654;</button>
</div>
<script>
const msgs=document.getElementById('messages'),input=document.getElementById('msg'),btn=document.getElementById('send');
function add(text,cls){const d=document.createElement('div');d.className='msg '+cls;d.textContent=text;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;return d}
input.addEventListener('input',()=>{input.style.height='auto';input.style.height=Math.min(input.scrollHeight,120)+'px'});
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}});
btn.addEventListener('click',send);
async function send(){
  const t=input.value.trim();if(!t)return;
  input.value='';input.style.height='auto';
  add(t,'user');
  btn.disabled=true;
  const th=document.createElement('div');th.className='thinking';th.textContent='Thinking...';msgs.appendChild(th);msgs.scrollTop=msgs.scrollHeight;
  try{
    const r=await fetch('/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:t})});
    const d=await r.json();
    th.remove();
    add(d.reply||d.error,'bot');
  }catch(e){th.remove();add('Error: '+e.message,'bot')}
  btn.disabled=false;input.focus();
}
</script>
</body>
</html>`;

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(HTML);
    return;
  }
  if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      const { message } = JSON.parse(body);
      if (!message) throw new Error('Empty message');
      console.log(`> ${message}`);
      const reply = await askClaude(message);
      console.log(`< ${reply.slice(0, 100)}...`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ reply }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }
  res.writeHead(404);
  res.end('Not found');
});

const ip = getLanIp();
server.listen(PORT, '0.0.0.0', async () => {
  const url = `http://${ip}:${PORT}`;
  console.log(`\nClaude Web Chat running at: ${url}`);
  console.log(`Session: ${SESSION_ID}\n`);
  try {
    const root = execSync('npm root -g').toString().trim();
    const { createRequire } = await import('node:module');
    const require = createRequire(import.meta.url);
    const qr = require(root + '/qrcode-terminal');
    qr.generate(url, { small: true }, code => console.log(code));
  } catch {
    console.log(`Scan or visit: ${url}\n`);
  }
});

process.on('SIGINT', () => { console.log('\nShutting down...'); process.exit(0); });
