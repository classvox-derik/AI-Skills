---
name: building-with-claude
description: Reference guide for building applications with the Claude API, based on Anthropic's official cookbooks. Covers tool use, agents, multimodal, RAG, extended thinking, prompt caching, and integrations. Use when building AI-powered features, integrating Claude into apps, or implementing agent patterns.
---

# Building with Claude

Leverage Anthropic's official Claude Cookbooks to build AI-powered applications. This skill maps common development tasks to the right cookbook recipes and patterns.

## When to Use This Skill

- Building features that use the Claude API
- Implementing tool use or function calling
- Creating AI agents or multi-agent systems
- Adding multimodal capabilities (vision, PDFs, images)
- Setting up RAG (retrieval-augmented generation)
- Optimizing with prompt caching or batch processing
- Integrating Claude with third-party services
- Implementing classification, summarization, or extraction

## Reference Repository

**Source:** [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks)
**Local clone:** `~/claude-cookbooks/` (if available)

When a cookbook is referenced below, check the local clone first, then fall back to the GitHub URL.

## Workflow

- [ ] Identify what Claude capability the feature needs
- [ ] Find the matching cookbook recipe(s) below
- [ ] Read the relevant notebook/guide for patterns and code
- [ ] Adapt the cookbook code to the project's stack
- [ ] Test the integration end-to-end

## Instructions

### Cookbook Map by Task

Use this map to find the right recipe for your task. Paths are relative to the cookbooks repo root.

#### Tool Use & Function Calling

| Recipe | Path | Use When |
|---|---|---|
| Tool use basics | `tool_use/` | First time implementing tool use |
| Customer service agent | `tool_use/customer_service_agent.ipynb` | Building support chatbots |
| Calculator tool | `tool_use/calculator_tool.ipynb` | Numeric/math integrations |
| SQL generation | `capabilities/text_to_sql.ipynb` | Natural language to database queries |
| Programmatic tool calling | `tool_use/` | Dynamic tool registration |

#### Agent Patterns

| Recipe | Path | Use When |
|---|---|---|
| Agent patterns | `patterns/agents/` | Designing agent architectures |
| Claude Agent SDK | `claude_agent_sdk/` | Building agents with the official SDK |
| Sub-agents | `misc/sub_agents.ipynb` | Multi-model orchestration (Haiku + Opus) |
| Site reliability agent | `patterns/agents/` | Infrastructure monitoring agents |

#### Multimodal (Vision, PDFs, Images)

| Recipe | Path | Use When |
|---|---|---|
| Vision getting started | `multimodal/getting_started_with_vision.ipynb` | First time using image input |
| Vision best practices | `multimodal/best_practices_for_vision.ipynb` | Optimizing image analysis |
| Chart/graph reading | `multimodal/reading_charts_graphs_powerpoints.ipynb` | Extracting data from visuals |
| Form extraction | `multimodal/how_to_transcribe_form_content.ipynb` | Processing forms and documents |
| PDF processing | `misc/pdf_upload_summarization.ipynb` | Summarizing/analyzing PDFs |

#### RAG & Retrieval

| Recipe | Path | Use When |
|---|---|---|
| RAG basics | `capabilities/retrieval_augmented_generation/` | Setting up retrieval pipelines |
| Pinecone RAG | `third_party/Pinecone/` | Vector DB with Pinecone |
| MongoDB integration | `third_party/MongoDB/` | Vector search with MongoDB |
| Wikipedia search | `third_party/Wikipedia/` | Web knowledge retrieval |
| Embeddings (Voyage) | `third_party/VoyageAI/` | Generating embeddings |

#### Classification & Extraction

| Recipe | Path | Use When |
|---|---|---|
| Classification | `capabilities/classification/` | Text/data classification |
| Summarization | `capabilities/summarization/` | Document summarization |
| Content moderation | `misc/content_moderation.ipynb` | Safety filters |
| JSON mode | `misc/how_to_enable_json_mode.ipynb` | Structured output |

#### Performance & Optimization

| Recipe | Path | Use When |
|---|---|---|
| Prompt caching | `misc/prompt_caching.ipynb` | Reducing latency and cost |
| Batch processing | `misc/batch_processing.ipynb` | High-volume API calls |
| Extended thinking | `extended_thinking/` | Complex reasoning tasks |
| Fine-tuning | `finetuning/` | Custom model behavior |
| Evaluations | `misc/building_evals.ipynb` | Measuring quality |

#### Third-Party Integrations

| Recipe | Path | Use When |
|---|---|---|
| LangChain | `third_party/LangChain/` | Using LangChain framework |
| LlamaIndex | `third_party/LlamaIndex/` | Using LlamaIndex framework |
| ElevenLabs | `third_party/ElevenLabs/` | Text-to-speech |
| Deepgram | `third_party/Deepgram/` | Speech-to-text |

### API Quick Reference

**Models (latest family — Claude 4.5/4.6):**

| Model | ID | Best For |
|---|---|---|
| Opus 4.6 | `claude-opus-4-6` | Most capable, complex tasks |
| Sonnet 4.6 | `claude-sonnet-4-6` | Balanced performance/cost |
| Haiku 4.5 | `claude-haiku-4-5-20251001` | Fast, lightweight tasks |

**Basic API call (Python):**

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude"}
    ]
)
print(message.content[0].text)
```

**Tool use (Python):**

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=[{
        "name": "get_weather",
        "description": "Get current weather for a location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "City name"}
            },
            "required": ["location"]
        }
    }],
    messages=[{"role": "user", "content": "What's the weather in London?"}]
)
```

**Multimodal (image input):**

```python
import base64

with open("image.png", "rb") as f:
    image_data = base64.standard_b64encode(f.read()).decode("utf-8")

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": image_data}},
            {"type": "text", "text": "Describe this image"}
        ]
    }]
)
```

### Key Patterns

**Structured output with tool use:**
Force JSON output by defining a tool schema and extracting `tool_use` blocks from the response.

**Prompt caching:**
Add `cache_control: {"type": "ephemeral"}` to system prompts or large context blocks to cache them across requests (reduces latency and cost).

**Extended thinking:**
Enable with `thinking={"type": "enabled", "budget_tokens": N}` for complex reasoning — the model shows its work before answering.

**Multi-turn agents:**
Loop: send message → check for `tool_use` stop reason → execute tools → send tool results back → repeat until `end_turn`.

## Resources

- [Claude Cookbooks](https://github.com/anthropics/claude-cookbooks) — Full recipe collection
- [Anthropic API Docs](https://docs.anthropic.com) — Official API reference
- [Claude API Fundamentals Course](https://github.com/anthropics/courses) — Structured learning path
