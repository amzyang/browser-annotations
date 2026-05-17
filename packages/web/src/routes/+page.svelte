<script lang="ts">
  import TabAnnotation from "$lib/components/TabAnnotation.svelte";
  import SendAnnotation from "$lib/components/SendAnnotation.svelte";
  import DevToolsDemo from "$lib/components/DevToolsDemo.svelte";
  import Signature from "$lib/components/Signature.svelte";
  import Icon from "$lib/Icon.svelte";
  import Logo from "$lib/Logo.svelte";

  const kbdClass =
    "bg-panel text-foreground/75 border-foreground/15 inline-flex h-5 min-w-5 -translate-y-px items-center justify-center gap-0.5 rounded-[4px] border px-1 align-middle font-mono text-[11px] leading-none shadow-[0_1px_0_color-mix(in_oklch,var(--color-foreground)_12%,transparent),inset_0_-1px_0_color-mix(in_oklch,var(--color-foreground)_4%,transparent)]";
</script>

<section
  class="relative mx-auto mt-36 hidden h-[24rem] w-[calc(100%-3rem)] max-w-5xl rounded-sm border border-[#d0d0d0] bg-white text-[#202124] max-md:mt-40 max-md:block max-md:h-auto md:block dark:border-[#56525e] dark:bg-[#26242c] dark:text-white"
  aria-labelledby="devtools-demo-title"
>
  <h2 id="devtools-demo-title" class="sr-only">
    Browser Annotations DevTools demo
  </h2>
  <p class="sr-only">
    A decorative demo of selecting an element, queueing three annotations, and
    sending them from the Feedback tab.
  </p>
  <TabAnnotation
    class="text-foreground absolute -top-2 left-8 z-10 w-44 -translate-y-full md:right-54 md:left-auto"
    aria-hidden="true"
  />
  <div class="h-full overflow-hidden rounded-[inherit]">
    <DevToolsDemo />
  </div>
  <SendAnnotation
    class="text-foreground absolute right-9 bottom-3 z-10 w-52 dark:text-white"
    aria-hidden="true"
  />
</section>

<nav
  class="text-foreground/55 mx-auto flex w-[calc(100%-3rem)] max-w-[34rem] flex-col items-center gap-4 pt-8 text-center text-xs"
  aria-label="Downloads"
>
  <a
    class="bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08] inline-flex items-center gap-2 rounded-[4px] px-5 py-3 text-base leading-none"
    href="https://chromewebstore.google.com/detail/lfkodgghploghefdcdeekohhjkofjckj"
    target="_blank"
  >
    <Logo name="chrome" class="size-5" />
    <span>Add to Chrome</span></a
  >
</nav>

<main
  class="mx-auto flex grow flex-col items-center space-y-12 p-6 pt-12 sm:py-20"
>
  <section class="text-foreground/75 space-y-7 *:max-w-[70ch]">
    <h1 class="sr-only">Browser Annotations</h1>

    <p>
      Browser Annotations is a Chrome DevTools extension to grab an element's
      context and write feedback for agents.
    </p>

    <p>
      I reach for it all the time, sending the feedback to my Pi session or
      simply copying the markdown. I like that there's no setup.
    </p>

    <p>
      If you'd like to try it, you can install the
      <a
        class="text-foreground decoration-accent inline-flex -translate-y-[0.075em] items-center gap-1.5 align-middle underline underline-offset-3"
        href="https://chromewebstore.google.com/detail/lfkodgghploghefdcdeekohhjkofjckj"
        target="_blank"
      >
        <Logo name="chrome" class="size-4" />
        <span>Chrome extension</span></a
      >.
    </p>

    <p>
      Once installed, look for the
      <kbd class={`${kbdClass} mx-0.5`}>Feedback</kbd>
      tab in the DevTools sidebar. If it's hidden, click
      <kbd class={`${kbdClass} mx-0.5`} aria-label="More tabs">
        <Icon name="caret-double-right" class="size-2.5" />
      </kbd>
      and drag the tab to the left.
    </p>
    <p>
      Now, select an element to capture its context and write your annotation.
    </p>

    <p>
      Press
      <kbd class={kbdClass}>
        <span class="sr-only">Command + Period</span>
        <Icon name="command" class="size-3" />
        <span aria-hidden="true">.</span>
      </kbd>
      to attach a screenshot.
    </p>

    <p>
      You can queue multiple annotations with
      <kbd class={kbdClass}>
        <span class="sr-only">Command + Enter</span>
        <Icon name="command" class="size-3" />
        <span aria-hidden="true">Enter</span>
      </kbd>
      or press
      <kbd class={kbdClass}>
        <span class="sr-only">Command + Shift + Enter</span>
        <Icon name="command" class="size-3" />
        <Icon name="arrow-fat-up" class="size-3" />
        <span aria-hidden="true">Enter</span>
      </kbd>
      to copy your feedback.
    </p>

    <p>
      Enable a webhook with
      <span
        class="inline-flex size-4 h-lh -translate-y-[0.075em] items-center justify-center"
        aria-label="Webhook status indicator"
      >
        <span
          class="webhook-blink bg-foreground/50 inline-flex size-2 rounded-full"
        ></span>
      </span>
      to send the feedback to your coding agent session via the
      <a
        href="https://pi.dev/packages/@browser-annotations/pi"
        target="_blank"
        class="decoration-accent text-foreground inline-flex -translate-y-[0.075em] items-center gap-1.5 align-middle underline underline-offset-3"
      >
        <Logo name="pi" class="text-foreground size-4" />
        <span>Pi extension</span></a
      >
      or
      <a
        href="https://github.com/wiebekaai/browser-annotations/tree/main/packages/claude"
        target="_blank"
        class="decoration-accent text-foreground inline-flex -translate-y-[0.075em] items-center gap-1.5 align-middle underline underline-offset-3"
      >
        <Logo name="claude" class="size-4" />
        <span>Claude Code plugin</span></a
      >.
    </p>

    <p>
      Copy an element's context or your feedback at any time by pressing
      <kbd class={kbdClass}>
        <span class="sr-only">Command + X</span>
        <Icon name="command" class="size-3" />
        <span aria-hidden="true">X</span>
      </kbd>
      (current) or
      <kbd class={kbdClass}>
        <span class="sr-only">Command + Shift + X</span>
        <Icon name="command" class="size-3" />
        <Icon name="arrow-fat-up" class="size-3" />
        <span aria-hidden="true">X</span>
      </kbd>
      (all).
    </p>

    <p>
      <a
        class="text-foreground decoration-accent inline-flex -translate-y-[0.075em] items-center gap-1.5 align-middle underline underline-offset-3"
        href="https://github.com/wiebekaai/browser-annotations"
        target="_blank"
      >
        <Logo name="github" class="size-4" />
        <span>browser-annotations</span></a
      >
      is open source. If you want a feature, feel free to open an issue or fork the
      repository.
    </p>

    <p>Enjoy!</p>

    <a href="https://offday.studio" target="_blank" aria-label="Offday Studio">
      <Signature class="text-foreground mt-10 w-20" aria-label="Wiebe" />
    </a>
  </section>
</main>

<footer
  class="text-foreground/50 flex w-full items-center justify-between gap-4 px-6 pt-12 pb-6 text-xs"
>
  <a
    class="text-foreground/70 hover:text-foreground"
    href="https://github.com/wiebekaai/browser-annotations"
    target="_blank"
    aria-label="Repository"
  >
    <Logo name="github" class="size-4" />
  </a>
  <a class="text-foreground/70 hover:text-foreground" href="/privacy">Privacy</a
  >
</footer>

<style>
  .webhook-blink {
    animation: webhook-blink 1.4s steps(1, end) infinite;
  }

  @keyframes webhook-blink {
    50% {
      background-color: var(--color-success);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .webhook-blink {
      animation: none;
    }
  }
</style>
