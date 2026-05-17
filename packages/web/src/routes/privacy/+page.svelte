<script lang="ts">
  import { resolve } from "$app/paths";

  const lastUpdated = "2026-05-13";
  const description =
    "Privacy policy for Browser Annotations, a Chrome DevTools extension that captures element context and annotations locally and sends them only to your configured destination.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "PrivacyPolicy"],
    "@id": "https://browser-annotations.dev/privacy#webpage",
    url: "https://browser-annotations.dev/privacy",
    name: "Privacy",
    description,
    inLanguage: "en",
    dateModified: lastUpdated,
  };
</script>

<svelte:head>
  <meta name="description" content={description} />
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
</svelte:head>

<main
  class="mx-auto flex grow flex-col items-center space-y-12 px-6 pt-4 pb-20"
>
  <section class="text-foreground/75 space-y-5 *:max-w-[70ch]">
    <a
      href={resolve("/")}
      aria-label="Back"
      class="text-foreground mb-6 inline-flex w-fit rotate-180"
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
        class="text-foreground">Privacy</span
      >
    </h1>

    <p>
      Browser Annotations is a Chrome DevTools extension that grabs element
      context and lets you add annotations to send to coding agents.
    </p>

    <p>
      It runs entirely on your machine. There is no server, account or
      analytics.
    </p>

    <p>The extension handles a few things while you use it:</p>

    <ul class="space-y-1">
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;The
        annotation text you type
      </li>
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;DOM context
        of the element you select — selector, position, size, viewport, device
        info, and the page URL
      </li>
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;An optional
        screenshot of the selected element
      </li>
    </ul>

    <p>
      Annotations, your webhook URL, and the send toggle are stored locally with <code
        class="text-foreground">chrome.storage</code
      >, scoped per website, so you can batch feedback across page loads.
      Clearing extension data in Chrome removes them.
    </p>

    <p>
      Webhook sends embed the screenshot inline in the request body. Copies save
      it to your Downloads folder under <code class="text-foreground"
        >browser-annotations/</code
      > so your agent can read it from disk. Delete the folder to remove saved screenshots.
    </p>

    <p>
      The data goes only where you tell it to — your configured webhook (your
      own Pi or Claude Code session), or your clipboard. Nothing is sent to me
      or to any third party.
    </p>

    <ul class="space-y-1">
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;No tracking
        across sites
      </li>
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;No selling or
        sharing of data
      </li>
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;No use for
        advertising or creditworthiness
      </li>
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;No remote
        code execution
      </li>
    </ul>

    <p>Three permissions are requested, all for the core feature:</p>

    <ul class="space-y-1">
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;<code
          class="text-foreground">storage</code
        > — to persist annotations between page loads
      </li>
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;<code
          class="text-foreground">downloads</code
        > — to save screenshots to disk so your agent can read them
      </li>
      <li>
        <span class="text-accent" aria-hidden="true">-</span>&nbsp;<code
          class="text-foreground">&lt;all_urls&gt;</code
        > — so the extension can read element context and capture screenshots on whichever
        site you happen to be debugging
      </li>
    </ul>

    <p>
      For questions or concerns, email me at <a
        class="text-foreground decoration-accent underline underline-offset-3"
        href="mailto:wiebe@offday.studio">wiebe@offday.studio</a
      >.
    </p>

    <p class="text-foreground/70 flex items-center gap-4 pt-4 text-xs">
      Last updated {lastUpdated}
    </p>
  </section>
</main>
