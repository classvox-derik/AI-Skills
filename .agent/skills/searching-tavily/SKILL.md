---
name: searching-tavily
description: >
  AI-optimized web search and content extraction via the Tavily API.
  Use when the agent needs to search the web, find current information,
  research a topic, fetch news, or extract clean content from URLs.
  Requires TAVILY_API_KEY environment variable.
---

# Tavily Search

AI-optimized web search using the Tavily API. Returns clean, relevant snippets designed for AI agents rather than raw HTML.

## When to use this skill

- Agent needs to search the web for current information
- User asks to research a topic, find documentation, or look something up
- User asks for recent news or current events
- Agent needs to extract readable content from a URL
- Any task requiring up-to-date information beyond the agent's knowledge cutoff

## Prerequisites

- **Node.js** installed
- **`TAVILY_API_KEY`** environment variable set (get one at https://tavily.com)

## Workflow

- [ ] **1. Verify setup** — Confirm `TAVILY_API_KEY` is set and `node` is available
- [ ] **2. Choose operation** — Search (query) or Extract (URL content)
- [ ] **3. Run script** — Execute with appropriate options
- [ ] **4. Process results** — Use the returned answer and sources

## Search

```bash
node .agent/skills/searching-tavily/scripts/search.mjs "query"
node .agent/skills/searching-tavily/scripts/search.mjs "query" -n 10
node .agent/skills/searching-tavily/scripts/search.mjs "query" --deep
node .agent/skills/searching-tavily/scripts/search.mjs "query" --topic news
node .agent/skills/searching-tavily/scripts/search.mjs "query" --topic news --days 3
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `-n <count>` | Number of results (1–20) | 5 |
| `--deep` | Advanced search — slower but more comprehensive | off |
| `--topic <t>` | `general` or `news` | `general` |
| `--days <n>` | For news topic, limit to last n days | all |

### When to use `--deep`

Use for complex research questions that need thorough coverage. Skip for simple factual lookups.

## Extract Content from URL

Pull clean, readable content from one or more URLs:

```bash
node .agent/skills/searching-tavily/scripts/extract.mjs "https://example.com/article"
node .agent/skills/searching-tavily/scripts/extract.mjs "url1" "url2" "url3"
```

Useful when you have a URL but need the content in a clean format for processing.

## Output Format

**Search** returns:
- An AI-generated answer summary (when available)
- A list of sources with title, URL, relevance score, and content snippet

**Extract** returns:
- Full extracted content per URL
- List of any failed URLs with error reasons

## Resources

- [scripts/search.mjs](scripts/search.mjs) — Web search script
- [scripts/extract.mjs](scripts/extract.mjs) — URL content extraction script
- Tavily API docs: https://tavily.com

## Attribution

Based on [arun-8687/tavily-search](https://clawhub.ai/arun-8687/tavily-search) from ClawHub.
