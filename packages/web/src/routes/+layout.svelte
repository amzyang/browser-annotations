<script lang="ts">
  import "./layout.css";
  import { page } from "$app/state";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();

  const siteName = "Browser Annotations";
  const siteTitle = `${siteName} — The Feedback tab for your DevTools`;
  const description =
    "A Chrome DevTools extension to send feedback to your coding agent. Select an element, add feedback, and send it to your Pi or Claude Code session, or simply copy the markdown.";
  const titlesByPath: Record<string, string> = {
    "/": siteTitle,
    "/example": "Example feedback",
    "/privacy": "Privacy",
  };
  const title = $derived(titlesByPath[page.url.pathname] ?? siteName);
  const canonicalUrl = $derived(
    `https://browser-annotations.dev${page.url.pathname}`,
  );
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <link rel="icon" href={favicon} />

  <meta
    name="theme-color"
    content="#ffffff"
    media="(prefers-color-scheme: light)"
  />
  <meta
    name="theme-color"
    content="#0e0e12"
    media="(prefers-color-scheme: dark)"
  />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={siteTitle} />
  <meta property="og:description" content={description} />
  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:url" content={canonicalUrl} />
  <meta
    property="og:image"
    content="https://browser-annotations.dev/social-preview.png"
  />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={siteTitle} />
  <meta name="twitter:description" content={description} />
  <meta
    name="twitter:image"
    content="https://browser-annotations.dev/social-preview.png"
  />
</svelte:head>

{@render children()}
