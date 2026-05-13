# @browser-annotations/claude

[Browser Annotations](https://browser-annotations.dev/) is a Chrome DevTools extension to send feedback to your agent.

Select an element, add feedback, and send it to your Claude Code session.

## Install

```bash
/plugin marketplace add wiebekaai/browser-annotations
/plugin install claude@browser-annotations
```

## Usage

Set up your Claude Code session to work on your feedback

```bash
claude --dangerously-load-development-channels plugin:claude@browser-annotations
```

Then select an element in the Chrome DevTools, add your feedback in the Feedback tab, and hit send.
