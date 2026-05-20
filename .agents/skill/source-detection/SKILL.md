---
name: source-detection
description: Implement or test source detection on local development servers.
---

# Source detection

Use this when changing or validating `packages/chrome/src/sidebar/sources.ts` and the inlined copy in `selection-context.ts`.

## Rules

- Keep `SourceContext` / `SourceLocation` stable unless asked.
- Keep `sources.ts` and the inlined `getSourceContext` in `selection-context.ts` in sync.

## Browser loop

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9223 \
  --user-data-dir=/tmp/chrome-cdp-9223 \
  --no-first-run \
  --no-default-browser-check \
  --disable-search-engine-choice-screen

agent-browser --session browser-annotations-source-detection --cdp 9223
agent-browser --session browser-annotations-source-detection --cdp 9223 open http://127.0.0.1:<port>
agent-browser --session browser-annotations-source-detection --cdp 9223 wait '#target'
```

## Fixtures

Update the `Tested` comment when a fixture runs with different versions.

React, Node/pnpm:

```sh
# Tested: Node 24.15.0, Vite 8.0.13, React 19.2.6
cd /tmp
pnpm create vite ba-react --template react-ts
cd ba-react && pnpm install
pnpm dev --host 127.0.0.1 --port 5181
```

React, Bun:

```sh
# Tested: Bun 1.3.9, Vite 8.0.13, React 19.2.6
cd /tmp
bun create vite ba-react-bun --template react-ts
cd ba-react-bun && bun install
bun run dev --host 127.0.0.1 --port 5179
```

React Router:

```sh
# Tested: Node 24.15.0, Vite 8.0.13, React 19.2.6, React Router 7.15.1
cd /tmp
pnpm create vite ba-react-router --template react-ts
cd ba-react-router && pnpm add react-router
pnpm dev --host 127.0.0.1 --port 5177
```

Next.js:

```sh
# Tested: Node 24.15.0, Next.js 16.2.6, React 19.2.4
cd /tmp
pnpm create next-app ba-next --ts --eslint --app --src-dir --no-tailwind --import-alias '@/*' --use-pnpm
cd ba-next
pnpm dev --webpack -H 127.0.0.1 -p 3007
```

Svelte:

```sh
# Tested: Node 24.15.0, Vite 8.0.13, Svelte 5.55.5
cd /tmp
pnpm create vite ba-svelte --template svelte-ts
cd ba-svelte && pnpm install
pnpm dev --host 127.0.0.1 --port 5180
```

SvelteKit:

```sh
# Tested: Node 24.15.0, SvelteKit 2.57.0, Svelte 5.55.2
cd /tmp
pnpm dlx sv create ba-sveltekit --template minimal --types ts --no-add-ons --install pnpm
cd ba-sveltekit
pnpm dev --host 127.0.0.1 --port 5178
```

Add a target element to each app:

```tsx
function Card() {
  return <button id="target">Target</button>;
}
```

```svelte
<button id="target">Target</button>
```

## Quick probes

Use these to inspect framework metadata only. Validate the implementation with the current code in `packages/chrome/src/sidebar/selection-context.ts`.

React raw metadata:

```sh
agent-browser --session browser-annotations-source-detection --cdp 9223 eval '
(() => {
  const element = document.querySelector("#target");
  const key = Object.getOwnPropertyNames(element).find((k) => k.startsWith("__reactFiber$"));
  let fiber = element[key];
  const frames = [];
  while (fiber && frames.length < 8) {
    frames.push({
      tag: fiber.tag,
      type: typeof fiber.type === "function" ? fiber.type.name : String(fiber.type),
      source: fiber._debugSource ?? null,
      stack: fiber._debugStack?.stack?.split("\n").slice(0, 4) ?? null,
    });
    fiber = fiber.return;
  }
  return frames;
})()
'
```

Svelte raw metadata:

```sh
agent-browser --session browser-annotations-source-detection --cdp 9223 eval '
(() => {
  const element = document.querySelector("#target");
  return { meta: element.__svelte_meta, parent: element.parentElement?.__svelte_meta };
})()
'
```

Check that the result points at app source, not framework runtime or bundled files.
