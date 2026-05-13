# Browser Annotations

[Browser Annotations](https://browser-annotations.dev/) is a Chrome DevTools extension to send feedback to your coding agent.

Select an element, add feedback, and send it to your Pi or Claude Code session.

![Sending feedback from the Chrome DevTools.](docs/screenshot.png)

## Install

Install the Chrome extension

_Coming soon to the Chrome Web Store._

Install the Pi extension

```bash
pi install npm:@browser-annotations/pi
```

Install the Claude Code plugin

```bash
/plugin marketplace add wiebekaai/browser-annotations
/plugin install claude@browser-annotations
```

## Usage

1. _(Optional)_ Set up your agent to work on your feedback
   - Pi — `/browser-annotations`
   - Claude Code — `claude --dangerously-load-development-channels plugin:claude@browser-annotations`
2. Select an element in the Chrome DevTools
3. Add your feedback in the Feedback tab (drag this tab to the left so it's easily accessible)
4. Use <img src="docs/icon-add.svg" alt="Add" /> to batch annotations. Annotations persist per website, so your feedback can span multiple pages
5. Hit <img src="docs/icon-send.svg" alt="Send" /> to send to your coding agent, or <img src="docs/icon-copy.svg" alt="Copy" /> to copy as markdown

> [!TIP]
> Copy an element's context or your feedback at any time with <kbd><kbd>⌘</kbd> <kbd>X</kbd></kbd> / <kbd><kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>X</kbd></kbd>. Handy for quick sharing.

## Features

- **Annotate elements** — Select an element and write your feedback
- **Works anywhere** — Annotate any website from your Chrome DevTools, no project setup required
- **Live agent collaboration** — Send feedback directly to your Pi or Claude Code session via a webhook
- **Copy as markdown** — Copy an element's context or your feedback at any time
- **Full context** — Includes an element's selector, position, size, viewport, and device info
- **Attach screenshots** — Optionally include a screenshot of the selected element
- **Source mapping** — Links elements to React and Svelte source code during development
- **Batch annotations** — Annotate elements across multiple pages and send them as one prompt

## Example output

```md
# Feedback

Adjust our landing page

## 1. `section.text-foreground\/70.space-y-4.\*\:max-w-\[70ch\]`

Make this text 12px

- **Page:** [http://localhost:5173/](http://localhost:5173/)
- **Device:** `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36`
- **Viewport:** 974×598
- **Device pixel ratio:** 2
- **Position:** X 24, Y 184
- **Size:** 672×232
- **Source:** [`src/routes/+page.svelte:24`](src/routes/+page.svelte)

## 2. `… > p:nth-of-type(1)`

Suggest a shorter sentence

- **Page:** [http://localhost:5173/](http://localhost:5173/)
- **Device:** `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36`
- **Viewport:** 974×598
- **Device pixel ratio:** 2
- **Position:** X 24, Y 192
- **Size:** 672×40
- **Source:** [`src/routes/+page.svelte:27`](src/routes/+page.svelte)

## 3. `section.text-foreground\/70.space-y-4.\*\:max-w-\[70ch\]`

A bit more margin between paragraphs

![Screenshot](~/Downloads/screenshot-1.png)

- **Page:** [http://localhost:5173/](http://localhost:5173/)
- **Device:** `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36`
- **Viewport:** 974×598
- **Device pixel ratio:** 2
- **Position:** X 24, Y 184
- **Size:** 672×232
- **Source:** [`src/routes/+page.svelte:24`](src/routes/+page.svelte)
```

## Keyboard shortcuts

| Action            | Shortcut                                              |
| ----------------- | ----------------------------------------------------- |
| Add               | <kbd><kbd>⌘</kbd> <kbd>Enter</kbd></kbd>              |
| Submit            | <kbd><kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>Enter</kbd></kbd> |
| Attach screenshot | <kbd><kbd>⌘</kbd> <kbd>.</kbd></kbd>                  |
| Copy current      | <kbd><kbd>⌘</kbd> <kbd>X</kbd></kbd>                  |
| Copy all          | <kbd><kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>X</kbd></kbd>     |
| Clear current     | <kbd><kbd>⌘</kbd> <kbd>K</kbd></kbd>                  |
| Clear all         | <kbd><kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>K</kbd></kbd>     |
| Cancel / Reset    | <kbd>Esc</kbd>                                        |
