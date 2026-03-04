---
name: executing-supabase-sql
description: >
  Executes SQL migrations and ad-hoc queries against a Supabase database
  using the Supabase CLI. Use when the user asks to run SQL, create tables,
  alter schemas, add RLS policies, fix database issues, push migrations,
  or modify the Supabase database in any way.
---

# Supabase SQL Executor

## When to use this skill

- User asks to run SQL against Supabase
- User asks to create, alter, or drop tables
- User asks to add or modify RLS policies
- User asks to push database migrations
- User asks to fix Supabase security warnings or linter issues
- A task requires schema changes to the Supabase database

## Workflow

- [ ] **1. Verify CLI setup** — Ensure Supabase CLI is authenticated and project is linked
- [ ] **2. Determine migration number** — Check `supabase/migrations/` for the next sequential number
- [ ] **3. Write idempotent SQL** — Create the migration file with safe-to-rerun statements
- [ ] **4. Dry-run** — Preview what will be pushed
- [ ] **5. Push** — Apply migration to the remote database
- [ ] **6. Verify** — Confirm no pending migrations remain

## Instructions

### Step 1: Verify CLI Setup

Run these checks before any database operation:

```bash
# Check CLI is authenticated
npx supabase projects list

# Check project is linked
cat supabase/.temp/project-ref
```

**If not authenticated:**
```bash
npx supabase login
```

**If not linked:** extract the project ref from the Supabase URL in `.env` or `.env.local`, then:
```bash
npx supabase link --project-ref <REF>
```

The project ref is the subdomain: `https://<REF>.supabase.co`

### Step 2: Determine Migration Number

```bash
ls supabase/migrations/
```

Use the next sequential number with a descriptive snake_case name:
`supabase/migrations/NNN_description.sql`

### Step 3: Write Idempotent SQL

**Critical:** All migrations must be safe to re-run. Follow these patterns:

| Operation | Pattern |
|---|---|
| Create table | `CREATE TABLE IF NOT EXISTS` |
| Create index | `CREATE INDEX IF NOT EXISTS` |
| Add column | Wrap in `DO $$ BEGIN ... IF NOT EXISTS ... END $$` |
| Create policy | `DROP POLICY IF EXISTS "name" ON table;` before `CREATE POLICY` |
| Enable RLS | `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` (already idempotent) |
| Drop anything | Always use `IF EXISTS` |

**RLS policy template:**
```sql
DROP POLICY IF EXISTS "Policy name" ON public.table_name;
CREATE POLICY "Policy name"
  ON public.table_name FOR SELECT
  TO authenticated
  USING (auth.uid()::text = owner_column::text);
```

**Type casting:** Always cast both sides of comparisons explicitly when comparing `auth.uid()` (UUID) against text columns:
```sql
-- Correct
auth.uid()::text = teacher_id::text

-- Wrong — will error if types don't match
auth.uid() = teacher_id
```

### Step 4: Dry-Run

Always preview before pushing:

```bash
npx supabase db push --dry-run
```

Confirm only the expected migrations are listed.

### Step 5: Push

Apply to the remote database:

```bash
echo "y" | npx supabase db push
```

### Step 6: Verify

Confirm the remote database is up to date:

```bash
npx supabase db push --dry-run
```

Expected output: `Remote database is up to date.`

## Important Rules

- **Never edit a pushed migration.** Once applied, create a new migration to make changes.
- **Never delete migration files.** The CLI tracks applied migrations by filename.
- **Service role key bypasses RLS.** Server-side code using `SUPABASE_SERVICE_ROLE_KEY` is unaffected by policies.
- **Anon key respects RLS.** Client-side code using `NEXT_PUBLIC_SUPABASE_ANON_KEY` goes through RLS — always ensure proper policies exist.
- **Lint after changes:** Run `npx supabase db lint --linked` to check for security issues.

## Quick Setup for New Projects

For projects that don't have Supabase CLI configured yet:

```bash
# 1. Login (one-time, opens browser)
npx supabase login

# 2. Initialize supabase directory structure
npx supabase init

# 3. Find and link your project
npx supabase projects list
npx supabase link --project-ref <REF>

# 4. Pull existing schema if tables already exist in the dashboard
npx supabase db pull

# 5. Now ready — create migrations and push
```
