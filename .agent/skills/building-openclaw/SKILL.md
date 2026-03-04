---
name: building-openclaw
description: >
  Guides scaffolding and development of OpenClaw-inspired clone projects.
  Triggers when user asks to create, build, or scaffold a modular web
  application following OpenClaw architecture patterns.
---

# Building OpenClaw

## When to use this skill

- User asks to scaffold a new OpenClaw-inspired project
- User wants to build a modular full-stack web application
- User references OpenClaw architecture or clone patterns

## Workflow

- [ ] Gather project requirements (target features, domain, audience)
- [ ] Select stack (default: Vue/Nuxt or Next.js + Node.js + Supabase)
- [ ] Scaffold project structure using modular layout
- [ ] Set up authentication, database, and API layer
- [ ] Add agent skills submodule for reusable capabilities
- [ ] Validate build and deployment pipeline

## Instructions

### Recommended Stack

- **Frontend:** Vue 3 + Nuxt 3 (preferred) or Next.js 14
- **Backend:** Node.js API routes or standalone Express/Fastify
- **Database:** Supabase (Postgres + Auth + Storage + Realtime)
- **Styling:** Tailwind CSS
- **Payments:** Stripe (if SaaS)
- **Deployment:** Vercel or Netlify
- **AI Integration:** Anthropic Claude SDK

### Project Scaffold

```
<project-name>/
├── src/
│   ├── app/              # Pages / routes
│   ├── components/       # Reusable UI components
│   │   ├── layout/       # Nav, Footer, Sidebar
│   │   ├── ui/           # Buttons, Cards, Modals
│   │   └── forms/        # Input components
│   ├── lib/              # Utilities, clients, config
│   ├── types/            # TypeScript type definitions
│   └── contexts/         # State management (React) or composables (Vue)
├── public/               # Static assets
├── scripts/              # CLI helpers and migrations
├── .agent/
│   └── skills/           # Git submodule → AI-Skills database
├── CLAUDE.md             # Project-specific agent instructions
├── package.json
└── README.md
```

### Modular Patterns

- **Feature folders:** Group related components, API routes, and types by feature, not by file type
- **Shared lib:** Keep utility functions, API clients, and config in `src/lib/`
- **Type safety:** TypeScript strict mode, Zod validation at API boundaries
- **Environment config:** `.env.local` for secrets, never commit `.env` files
- **Database migrations:** Standalone SQL files or migration tool (Prisma/Drizzle)

### Agent Skills Integration

Every OpenClaw-style project should include the AI-Skills database:

```bash
git submodule add <ai-skills-repo-url> .agent/skills
```

Add to the project's `CLAUDE.md`:
```markdown
## Agent Skills
Skills are loaded from `.agent/skills/` (git submodule).
Load relevant skills when the task matches a skill's trigger conditions.
```

### Checklist for New Projects

- [ ] Repository initialized with `.gitignore` (node_modules, .env*, .next/)
- [ ] Package manager configured (npm or pnpm)
- [ ] TypeScript strict mode enabled
- [ ] Tailwind CSS configured with custom theme
- [ ] Supabase client set up in `src/lib/`
- [ ] Auth flow scaffolded (login, signup, session management)
- [ ] API route structure in place
- [ ] AI-Skills submodule added at `.agent/skills/`
- [ ] CLAUDE.md written with project-specific instructions
- [ ] README.md with setup instructions

## Resources

- AI-Skills database: `C:/AI-Skills/`
- ClassVox as reference implementation: `C:/classvox-project/`
