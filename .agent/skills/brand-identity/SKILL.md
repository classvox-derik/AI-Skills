---
name: brand-identity
description: >
  Provides the single source of truth for brand guidelines, design tokens,
  technology choices, and voice/tone. Use this skill whenever generating UI
  components, styling applications, writing copy, or creating user-facing
  assets to ensure brand consistency.
---

# Brand Identity & Guidelines

**Brand Name:** `SETUP_REQUIRED`

This skill defines the core constraints for visual design and technical implementation for the brand. You must adhere to these guidelines strictly to maintain consistency.

## ⚠️ First-Use Setup (Mandatory)

**Before performing ANY work using this skill**, check whether the brand has been configured by looking for `SETUP_REQUIRED` or `[INSERT` markers in the files below. If ANY placeholder markers remain, you **MUST** run this onboarding flow first:

### Setup Checklist

- [ ] **1. Ask for the Brand Name** — Prompt: *"What is the brand name for this project?"*
- [ ] **2. Ask for Brand Colors** — Prompt: *"What are your brand colors? I need at minimum: primary color, secondary color, and accent color (hex codes preferred)."*
- [ ] **3. Ask for Typography** — Prompt: *"What fonts should I use for headings and body text? (e.g., Inter, Roboto, etc.)"*
- [ ] **4. Ask for Tech Stack Overrides** — Prompt: *"The default tech stack is React + Tailwind CSS + shadcn/ui. Do you want to change any of these?"*
- [ ] **5. Ask for Terminology** — Prompt: *"Are there any words or phrases I should always avoid, and what should I use instead?"*
- [ ] **6. Update all resource files** — Replace every placeholder in `SKILL.md`, `resources/design-tokens.json`, and `resources/voice-tone.md` with the user's answers.
- [ ] **7. Confirm** — Show the user a summary of the configured brand and ask for approval before proceeding.

> **Rule:** Never guess or skip a placeholder. Always ask the user. Once all placeholders are filled, this section can be ignored for the remainder of the project.

## When to use this skill

- Generating or styling UI components, pages, or layouts
- Choosing colors, fonts, spacing, or border-radius values
- Writing marketing copy, error messages, documentation, or user-facing text
- Selecting frameworks, libraries, or component patterns for a project
- Creating any user-facing asset that must align with the brand

## Reference Documentation

Depending on the task you are performing, consult the specific resource files below. Do not guess brand elements; always read the corresponding file.

### For Visual Design & UI Styling

If you need exact colors, fonts, border radii, or spacing values, read:
👉 **[`resources/design-tokens.json`](resources/design-tokens.json)**

### For Coding & Component Implementation

If you are generating code, choosing libraries, or structuring UI components, read the technical constraints here:
👉 **[`resources/tech-stack.md`](resources/tech-stack.md)**

### For Copywriting & Content Generation

If you are writing marketing copy, error messages, documentation, or user-facing text, read the persona guidelines here:
👉 **[`resources/voice-tone.md`](resources/voice-tone.md)**

## Workflow

- [ ] **Check for `SETUP_REQUIRED` markers** — If found, run the First-Use Setup above
- [ ] Identify the type of task (design, code, or copy)
- [ ] Read the corresponding resource file(s) listed above
- [ ] Apply the tokens / rules / tone exactly as documented
- [ ] Verify output against the guidelines before delivering
