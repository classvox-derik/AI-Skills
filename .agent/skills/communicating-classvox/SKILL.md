---
name: communicating-classvox
description: >
  Guides development of the ClassVox AI-powered parent communication platform.
  Triggers when working on ClassVox features including voice calls, messaging,
  templates, subscriptions, authentication, or EdTech communication workflows.
---

# Communicating with ClassVox

## When to use this skill

- User is working in the ClassVox project (`classvox-project/`)
- User asks about parent-teacher communication features
- User needs to modify call, template, messaging, or notification systems
- User works on subscription plans, auth, or admin features in ClassVox

## Workflow

- [ ] Identify which ClassVox subsystem is affected
- [ ] Review relevant source files in `src/`
- [ ] Implement changes following ClassVox conventions
- [ ] Validate FERPA compliance if touching student/parent data
- [ ] Test against Supabase + SignalWire + Stripe integrations

## Instructions

### Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS with custom palette (primary `#1e40af`, secondary `#059669`, accent `#eab308`)
- **Database/Auth:** Supabase (custom hybrid auth with JWT + bcrypt)
- **Voice Calls:** SignalWire (AI text-to-speech calls to parents)
- **Payments:** Stripe (subscription plans with tiered minutes)
- **Email:** AWS SES + Nodemailer
- **AI:** Anthropic Claude SDK (template suggestions, message generation)
- **Monitoring:** Sentry
- **Rate Limiting:** Upstash Redis
- **Deployment:** Vercel

### Key Directories

- `src/app/dashboard/` — Teacher dashboard (calls, analytics, students)
- `src/app/api/calls/` — Voice call creation and status endpoints
- `src/app/api/templates/` — Message template CRUD
- `src/app/api/stripe/` — Subscription and payment webhooks
- `src/app/api/webhooks/` — SignalWire call status callbacks
- `src/app/api/admin/` — Admin panel endpoints
- `src/lib/auth.ts` — Authentication utilities
- `src/lib/supabase.ts` — Supabase client configuration
- `src/lib/plan-config.ts` — Subscription tier definitions
- `src/lib/plan-validation.ts` — Plan-based feature gating
- `src/lib/email-service.ts` — Transactional email sending
- `src/lib/phone-utils.ts` — Phone number formatting
- `src/lib/language-mapping.ts` — Multilingual voice/language support
- `src/lib/webhook-security.ts` — Webhook signature verification

### Core Subsystems

**Voice Calls**
- Teachers compose a message → AI converts to speech → SignalWire places the call
- Calls track status (queued, in-progress, completed, voicemail, failed)
- Voicemail detection with custom scripts
- Call transcripts and audio recording support
- Multilingual voices (Google Neural2/WaveNet via SignalWire TeXML)

**Message Templates**
- Pre-built templates organized by category (behavior, attendance, academic, safety, IEP/ELD, holidays)
- Teachers can favorite templates
- AI-powered template suggestions via Claude SDK
- Templates support variable interpolation (student name, teacher name, etc.)

**Subscriptions**
- Tiered plans: Free Trial → Starter → Professional → School → District
- Minutes-based usage tracking with monthly rollover
- Stripe checkout + webhook-driven provisioning
- Low-minutes warnings and overage handling

**Authentication**
- Custom hybrid auth (not Supabase Auth directly)
- JWT tokens + bcrypt password hashing
- Session validation and timeout management
- OAuth-ready columns in schema

**Compliance**
- FERPA-compliant data handling
- COPPA parental consent flows
- Data breach response procedures documented
- RLS policies on Supabase tables for data isolation

### Conventions

- SQL migrations are standalone `.sql` files at project root (not in a migrations folder)
- Helper scripts use `.cjs` extension (CommonJS) for Node.js CLI tools
- API routes follow Next.js App Router conventions (`route.ts` files)
- Use Zod for request validation at API boundaries
- All phone numbers stored in E.164 format
- Forward slashes only for all paths in code and config

## Resources

- Project root: `C:/classvox-project/`
- README: `C:/classvox-project/README.md`
- Compliance docs: `C:/classvox-project/src/lib/compliance/`
