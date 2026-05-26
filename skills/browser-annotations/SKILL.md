---
name: browser-annotations
description: Work on feedback sent from the Browser Annotations Chrome extension. Use when the user wants to send feedback, questions, or changes from the browser to the agent.
---

# Browser Annotations

Start the Browser Annotations server and work on incoming feedback. Respect any instructions given when invoking the skill.

The bundled server prints each annotation as markdown to `stdout` as it arrives:

```bash
node skills/browser-annotations/server.js 3330
```

Ask the user to point the extension at `http://127.0.0.1:3330`. If the port is busy, use the next free port and share that URL.

Use a persistent watcher (in Claude Code, a `Monitor`) so each annotation reaches you the moment it arrives.

When a new annotation appears on `stdout`:

1. Read the full feedback.
2. Inspect linked element images when useful.
3. Apply the requested change or answer the question.
4. Run the narrowest useful check.
5. Reply briefly with changed files and line numbers.
