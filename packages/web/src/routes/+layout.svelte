<script lang="ts">
  import "./layout.css";
  import { page } from "$app/state";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();

  const siteTitle = "Browser Annotations";
  const socialTitle = `${siteTitle} — Grab precise feedback for coding agents`;
  const description =
    "A Chrome DevTools extension to grab precise feedback for coding agents.";
  const titlesByPath: Record<string, string> = {
    "/": siteTitle,
    "/example": "Example feedback",
    "/privacy": "Privacy",
  };
  const title = $derived(titlesByPath[page.url.pathname] ?? siteTitle);
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
  <meta property="og:site_name" content={siteTitle} />
  <meta property="og:title" content={socialTitle} />
  <meta property="og:description" content={description} />
  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content="https://browser-annotations.dev/social-preview.png" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={socialTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="https://browser-annotations.dev/social-preview.png" />
</svelte:head>

{@render children()}
