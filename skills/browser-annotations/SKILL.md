---
name: browser-annotations
description: Work on feedback sent from the Browser Annotations Chrome extension. Use when the user wants to send feedback, questions, or requested UI/code changes from the browser to the agent.
---

# Browser Annotations

Receive Browser Annotations feedback and work through it live.

Respect any instructions given when invoking the skill.

Start the bundled server from the repository root:

```bash
node skills/browser-annotations/server.js 3330
```

Keep it running and ask the user to point the extension at `http://127.0.0.1:3330`. If the port is busy, use the next free port and share that URL.

When annotation markdown arrives on `stdout`:

1. Read the full feedback.
2. Inspect linked element images when useful.
3. Apply the requested change or answer the question.
4. Run the narrowest useful check.
5. Reply briefly with changed files and line numbers.
