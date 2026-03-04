---
name: managing-git-workflow
description: >
  Provides multi-project git workflow helpers for branching, submodules,
  and cross-repo coordination. Triggers when user needs help with git
  strategy, submodule management, release workflow, or multi-repo tasks.
---

# Managing Git Workflow

## When to use this skill

- User needs a branching or release strategy
- User works with git submodules (e.g., AI-Skills database)
- User coordinates changes across multiple repositories
- User asks for git automation or best practices

## Workflow

- [ ] Assess current git setup and repository structure
- [ ] Identify workflow needs (branching, submodules, releases)
- [ ] Recommend and implement strategy
- [ ] Validate across affected repos

## Instructions

### Branching Strategy

Use **GitHub Flow** (simple, works for small teams):

- `main` — always deployable
- Feature branches: `feature/<short-description>`
- Bug fix branches: `fix/<short-description>`
- Never push directly to `main` — use pull requests

For projects with staging environments, add:
- `develop` — integration branch
- `release/<version>` — release candidates

### Submodule Management

The AI-Skills database uses submodules. Key commands:

```bash
# Add skills to a new project
git submodule add <ai-skills-url> .agent/skills

# Clone a project with submodules
git clone --recurse-submodules <project-url>

# Update submodule to latest
cd .agent/skills && git pull origin main && cd ../..
git add .agent/skills
git commit -m "Update AI-Skills submodule"

# Check submodule status
git submodule status
```

**Rules:**
- Consuming projects treat `.agent/skills/` as read-only
- Skill changes happen in the AI-Skills repo, then submodule refs are updated downstream
- Always commit submodule ref updates with a descriptive message

### Commit Conventions

Format: `<type>: <short description>`

| Type | Use |
|------|-----|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring (no behavior change) |
| `docs` | Documentation only |
| `chore` | Build, config, dependency updates |
| `style` | Formatting (no logic change) |
| `test` | Adding or updating tests |

Keep messages under 72 characters. Use the body for details if needed.

### Multi-Repo Coordination

When a change spans multiple repos (e.g., AI-Skills + ClassVox):

1. Make and commit changes in the upstream repo (AI-Skills) first
2. Push upstream repo
3. In the downstream repo, update the submodule ref
4. Test downstream with the updated submodule
5. Commit and push downstream

### Release Workflow

For versioned releases:

```bash
# Tag a release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Create GitHub release
gh release create v1.0.0 --title "v1.0.0" --generate-notes
```

### Safety Rules

- Never force-push to `main`
- Never commit `.env` files or secrets
- Always pull before pushing to shared branches
- Use `git stash` before switching branches with uncommitted work
- Prefer `git rebase` for feature branches, `git merge` for main

## Resources

- AI-Skills repo: `C:/AI-Skills/`
- GitHub CLI docs: `gh help`
