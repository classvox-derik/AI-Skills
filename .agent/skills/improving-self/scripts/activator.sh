#!/bin/bash
# Self-Improvement Activator Hook
# Triggers on UserPromptSubmit to remind the agent about learning capture
# Keep output minimal (~50-100 tokens) to minimize overhead

set -e

cat << 'EOF'
<self-improvement-reminder>
After completing this task, evaluate if extractable knowledge emerged:
- Non-obvious solution discovered through investigation?
- Workaround for unexpected behavior?
- Project-specific pattern learned?
- Error required debugging to resolve?

If yes: Log to .learnings/ using the improving-self skill format.
If high-value (recurring, broadly applicable): Consider promotion or skill extraction.
</self-improvement-reminder>
EOF
