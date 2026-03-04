# Example Skill: Deployment Guard

A reference implementation showing a skill with validation loops and scripts.

## Directory Structure

```
.agent/skills/guarding-deployments/
├── SKILL.md
└── scripts/
    └── preflight.sh
```

## SKILL.md

```markdown
---
name: guarding-deployments
description: >
  Runs pre-deployment safety checks before any release. Use when the user
  mentions deploy, release, ship, or push and wants guardrails.
---

# Deployment Guard

## When to use this skill
- User is about to deploy and wants safety checks
- User asks for a pre-flight or pre-deploy validation

## Workflow
- [ ] Run `scripts/preflight.sh --check` to validate
- [ ] Review output for warnings or blockers
- [ ] If clean, proceed with deployment
- [ ] If issues found, report them and halt

## Instructions

### Pre-flight Check (Validation Loop)

1. **Plan**: Identify the deployment target and branch
2. **Validate**: Run the preflight script
   ```bash
   bash scripts/preflight.sh --check
   ```

3. **Execute**: Only deploy if validation passes

### Error Handling

- If `preflight.sh` fails, run `bash scripts/preflight.sh --help` for usage
- Never skip the validation step, even for hotfixes

```

## scripts/preflight.sh

```bash
#!/usr/bin/env bash
set -euo pipefail

case "${1:-}" in
  --check)
    echo "Running pre-flight checks..."
    # Add actual checks here
    echo "All checks passed."
    ;;
  --help)
    echo "Usage: preflight.sh [--check | --help]"
    echo "  --check  Run all pre-deployment validations"
    echo "  --help   Show this help message"
    ;;
  *)
    echo "Unknown option. Run with --help for usage."
    exit 1
    ;;
esac
```
