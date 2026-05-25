<script lang="ts">
  import { resolve } from "$app/paths";

  const markdown = `# Feedback

Adjust our landing page

## 1. \`section.text-foreground\\/70.space-y-4.\\*\\:max-w-\\[70ch\\]\`

Make this text 12px

- **Page:** [http://localhost:5173/](http://localhost:5173/)
- **Device:** \`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36\`
- **Viewport:** 974×598
- **Device pixel ratio:** 2
- **Position:** X 24, Y 184
- **Size:** 672×232
- **Source:** [\`src/routes/+page.svelte:24\`](src/routes/+page.svelte)

## 2. \`… > p:nth-of-type(1)\`

Suggest a shorter sentence

- **Page:** [http://localhost:5173/](http://localhost:5173/)
- **Device:** \`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36\`
- **Viewport:** 974×598
- **Device pixel ratio:** 2
- **Position:** X 24, Y 192
- **Size:** 672×40
- **Source:** [\`src/routes/+page.svelte:27\`](src/routes/+page.svelte)

## 3. \`section.text-foreground\\/70.space-y-4.\\*\\:max-w-\\[70ch\\]\`

A bit more margin between paragraphs

![Screenshot](~/Downloads/screenshot-1.png)

- **Page:** [http://localhost:5173/](http://localhost:5173/)
- **Device:** \`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36\`
- **Viewport:** 974×598
- **Device pixel ratio:** 2
- **Position:** X 24, Y 184
- **Size:** 672×232
- **Source:** [\`src/routes/+page.svelte:24\`](src/routes/+page.svelte)`;
</script>

<main class="mx-auto flex w-full max-w-3xl grow flex-col gap-5 px-6 pt-4 pb-10">
  <a
    href={resolve("/")}
    aria-label="Back"
    class="text-foreground inline-flex w-fit rotate-180"
  >
    <svg
      viewBox="210 76 165 45"
      class="h-5 w-auto"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path
        d="M212.78 78.88 C223.71 85.38, 251.69 112.55, 277.87 117.09 C304.05 121.63, 354.53 108.18, 369.86 106.13 M211.54 78.42 C222.31 84.59, 250.07 110.71, 276.86 115.57 C303.65 120.43, 356.81 109.28, 372.27 107.57"
      />
      <path
        d="M350.33 119.55 C358.57 115.78, 365.03 110.93, 372.27 107.57 M350.33 119.55 C358.16 116.43, 365.34 112.82, 372.27 107.57"
      />
      <path
        d="M347.76 102.65 C356.8 103.8, 364.01 103.89, 372.27 107.57 M347.76 102.65 C356.29 104.96, 364.28 106.76, 372.27 107.57"
      />
    </svg>
  </a>

  <h1 class="mt-4 text-base">
    <span class="text-accent" aria-hidden="true">#</span>&nbsp;<span
      class="text-foreground">Example feedback</span
    >
  </h1>

  <section class="text-foreground/75 space-y-5 *:max-w-[70ch]">
    <p>
      When you copy your feedback or send it to a coding agent, it includes:
    </p>

    <ul class="space-y-1">
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;Element's
        selector, position and size
      </li>
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;Page URL,
        viewport and browser
      </li>
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;Source file,
        when on a development server (React, Svelte, Solid)
      </li>
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;Screenshot
        (optional)
      </li>
    </ul>

    <p>Here's what that looks like:</p>
  </section>

  <pre
    class="overflow-x-auto rounded-md border border-black/10 bg-black/2 p-4 text-xs leading-relaxed whitespace-pre-wrap dark:border-white/10 dark:bg-white/2.5">{markdown}</pre>
</main>
