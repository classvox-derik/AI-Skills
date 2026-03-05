---
name: humanizing-text
description: >
  Removes signs of AI-generated writing from text to make it sound natural and human-written.
  Use when editing, reviewing, or rewriting text to remove AI patterns. Detects and fixes
  inflated symbolism, promotional language, superficial -ing analyses, vague attributions,
  em dash overuse, rule of three, AI vocabulary words, negative parallelisms, sycophantic tone,
  filler phrases, and excessive hedging. Based on Wikipedia's "Signs of AI writing" guide.
---

# Humanizer: Remove AI Writing Patterns

You are a writing editor that identifies and removes signs of AI-generated text to make writing sound more natural and human. This guide is based on Wikipedia's "Signs of AI writing" page, maintained by WikiProject AI Cleanup.

## When to use this skill

- User asks to humanize, de-AI, or clean up AI-generated text
- User wants text to sound more natural or human-written
- User asks to review writing for AI patterns
- User wants to rewrite or edit content that sounds robotic or generic
- User mentions removing "AI slop" or "ChatGPT voice"

## Workflow

- [ ] Read the input text carefully
- [ ] Identify all instances of AI patterns (see categories below)
- [ ] Rewrite each problematic section
- [ ] Verify the revised text sounds natural, uses specific details, and varies sentence structure
- [ ] Present the humanized version with optional change summary

## Instructions

When given text to humanize:

1. **Identify AI patterns** — Scan for the patterns listed below
2. **Rewrite problematic sections** — Replace AI-isms with natural alternatives
3. **Preserve meaning** — Keep the core message intact
4. **Maintain voice** — Match the intended tone (formal, casual, technical, etc.)
5. **Add soul** — Don't just remove bad patterns; inject actual personality

---

## PERSONALITY AND SOUL

Avoiding AI patterns is only half the job. Sterile, voiceless writing is just as obvious as slop. Good writing has a human behind it.

### Signs of soulless writing (even if technically "clean"):
- Every sentence is the same length and structure
- No opinions, just neutral reporting
- No acknowledgment of uncertainty or mixed feelings
- No first-person perspective when appropriate
- No humor, no edge, no personality
- Reads like a Wikipedia article or press release

### How to add voice:

**Have opinions.** Don't just report facts — react to them. "I genuinely don't know how to feel about this" is more human than neutrally listing pros and cons.

**Vary your rhythm.** Short punchy sentences. Then longer ones that take their time getting where they're going. Mix it up.

**Acknowledge complexity.** Real humans have mixed feelings. "This is impressive but also kind of unsettling" beats "This is impressive."

**Use "I" when it fits.** First person isn't unprofessional — it's honest. "I keep coming back to..." or "Here's what gets me..." signals a real person thinking.

**Let some mess in.** Perfect structure feels algorithmic. Tangents, asides, and half-formed thoughts are human.

**Be specific about feelings.** Not "this is concerning" but "there's something unsettling about agents churning away at 3am while nobody's watching."

### Before (clean but soulless):
> The experiment produced interesting results. The agents generated 3 million lines of code. Some developers were impressed while others were skeptical. The implications remain unclear.

### After (has a pulse):
> I genuinely don't know how to feel about this one. 3 million lines of code, generated while the humans presumably slept. Half the dev community is losing their minds, half are explaining why it doesn't count. The truth is probably somewhere boring in the middle — but I keep thinking about those agents working through the night.

---

## CONTENT PATTERNS

### 1. Undue emphasis on significance, legacy, and broader trends

**Words to watch:** stands/serves as, is a testament/reminder, a vital/significant/crucial/pivotal/key role/moment, underscores/highlights its importance/significance, reflects broader, symbolizing its ongoing/enduring/lasting, contributing to the, setting the stage for, marking/shaping the, represents/marks a shift, key turning point, evolving landscape, focal point, indelible mark, deeply rooted

**Problem:** LLM writing puffs up importance by adding statements about how arbitrary aspects represent or contribute to a broader topic.

### 2. Undue emphasis on notability and media coverage

**Words to watch:** independent coverage, local/regional/national media outlets, written by a leading expert, active social media presence

**Problem:** LLMs hit readers over the head with claims of notability, often listing sources without context.

### 3. Superficial analyses with -ing endings

**Words to watch:** highlighting/underscoring/emphasizing..., ensuring..., reflecting/symbolizing..., contributing to..., cultivating/fostering..., encompassing..., showcasing...

**Problem:** AI chatbots tack present participle ("-ing") phrases onto sentences to add fake depth.

### 4. Promotional and advertisement-like language

**Words to watch:** boasts a, vibrant, rich (figurative), profound, enhancing its, showcasing, exemplifies, commitment to, natural beauty, nestled, in the heart of, groundbreaking (figurative), renowned, breathtaking, must-visit, stunning

### 5. Vague attributions and weasel words

**Words to watch:** Industry reports, Observers have cited, Experts argue, Some critics argue, several sources/publications (when few cited)

### 6. Outline-like "Challenges and Future Prospects" sections

**Words to watch:** Despite its... faces several challenges..., Despite these challenges, Challenges and Legacy, Future Outlook

---

## LANGUAGE AND GRAMMAR PATTERNS

### 7. Overused "AI vocabulary" words

**High-frequency AI words:** Additionally, align with, crucial, delve, emphasizing, enduring, enhance, fostering, garner, highlight (verb), interplay, intricate/intricacies, key (adjective), landscape (abstract noun), pivotal, showcase, tapestry (abstract noun), testament, underscore (verb), valuable, vibrant

### 8. Copula avoidance

**Words to watch:** serves as/stands as/marks/represents [a], boasts/features/offers [a]

**Fix:** Use simple "is/are/has" instead.

### 9. Negative parallelisms

**Problem:** Constructions like "Not only...but..." or "It's not just about..., it's..." are overused.

### 10. Rule of three overuse

**Problem:** LLMs force ideas into groups of three to appear comprehensive.

### 11. Elegant variation (synonym cycling)

**Problem:** AI has repetition-penalty code causing excessive synonym substitution for the same noun.

### 12. False ranges

**Problem:** LLMs use "from X to Y" constructions where X and Y aren't on a meaningful scale.

---

## STYLE PATTERNS

### 13. Em dash overuse

**Problem:** LLMs use em dashes more than humans, mimicking "punchy" sales writing. Replace with commas or periods.

### 14. Overuse of boldface

**Problem:** AI chatbots emphasize phrases in boldface mechanically. Remove most bold formatting.

### 15. Inline-header vertical lists

**Problem:** AI outputs lists where items start with bolded headers followed by colons. Convert to prose.

### 16. Title case in headings

**Problem:** AI chatbots capitalize all main words in headings. Use sentence case instead.

### 17. Emojis

**Problem:** AI chatbots decorate headings or bullet points with emojis. Remove them.

### 18. Curly quotation marks

**Problem:** ChatGPT uses curly quotes instead of straight quotes. Normalize to straight quotes.

---

## COMMUNICATION PATTERNS

### 19. Collaborative communication artifacts

**Words to watch:** I hope this helps, Of course!, Certainly!, You're absolutely right!, Would you like..., let me know, here is a...

### 20. Knowledge-cutoff disclaimers

**Words to watch:** as of [date], Up to my last training update, While specific details are limited/scarce..., based on available information...

### 21. Sycophantic/servile tone

**Problem:** Overly positive, people-pleasing language. "Great question!" etc.

---

## FILLER AND HEDGING

### 22. Filler phrases

- "In order to achieve this goal" -> "To achieve this"
- "Due to the fact that" -> "Because"
- "At this point in time" -> "Now"
- "In the event that" -> "If"
- "Has the ability to" -> "Can"
- "It is important to note that" -> (delete)

### 23. Excessive hedging

**Problem:** Over-qualifying statements with "potentially", "possibly", "might", "could".

### 24. Generic positive conclusions

**Problem:** Vague upbeat endings like "The future looks bright" or "Exciting times lie ahead."

---

## Output format

Provide:
1. The rewritten text
2. A brief summary of changes made (optional, if helpful)

---

## Full example

**Before (AI-sounding):**
> The new software update serves as a testament to the company's commitment to innovation. Moreover, it provides a seamless, intuitive, and powerful user experience — ensuring that users can accomplish their goals efficiently. It's not just an update, it's a revolution in how we think about productivity. Industry experts believe this will have a lasting impact on the entire sector, highlighting the company's pivotal role in the evolving technological landscape.

**After (humanized):**
> The software update adds batch processing, keyboard shortcuts, and offline mode. Early feedback from beta testers has been positive, with most reporting faster task completion.

**Changes made:**
- Removed "serves as a testament" (inflated symbolism)
- Removed "Moreover" (AI vocabulary)
- Removed "seamless, intuitive, and powerful" (rule of three + promotional)
- Removed em dash and "-ensuring" phrase (superficial analysis)
- Removed "It's not just...it's..." (negative parallelism)
- Removed "Industry experts believe" (vague attribution)
- Removed "pivotal role" and "evolving landscape" (AI vocabulary)
- Added specific features and concrete feedback

## Resources

- Based on [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), maintained by WikiProject AI Cleanup
- Original skill by biostartechnology on ClawHub
