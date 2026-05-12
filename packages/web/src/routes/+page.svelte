<script lang="ts">
  import TabAnnotation from "$lib/components/TabAnnotation.svelte";
  import SendAnnotation from "$lib/components/SendAnnotation.svelte";
  import DevToolsDemo from "$lib/components/DevToolsDemo.svelte";
  import Signature from "$lib/components/Signature.svelte";
  import Icon from "$lib/Icon.svelte";
  import Logo from "$lib/Logo.svelte";
</script>

<main
  class="mx-auto flex grow flex-col items-center space-y-12 p-6 sm:py-20"
>
  <section class="text-foreground/75 space-y-5 *:max-w-[70ch]">
    <h1 class="sr-only">Browser Annotations</h1>

    <p>
      <span class="text-accent" aria-hidden="true">**</span><span
        class="text-foreground">Browser Annotations</span
      ><span class="text-accent" aria-hidden="true">**</span> is a Chrome
      DevTools extension that lets you annotate elements and grab their context
      as
      <a
        class="text-foreground decoration-accent underline underline-offset-3"
        href="/example">markdown</a
      >.
    </p>

    <p>
      I reach for it all the time to send detailed feedback to Claude Code. I
      like that there's no setup, and it works on any site.
    </p>

    <p>
      If you'd like to try it, you can install the
      <a
        class="text-foreground decoration-accent inline-flex -translate-y-[0.075em] items-center gap-1 align-middle underline underline-offset-3"
        href="https://github.com/wiebekaai/browser-annotations#install"
        target="_blank"
      >
        <Logo name="chrome" class="size-4" />
        <span>Chrome extension</span></a
      >.
    </p>

    <p>
      Once installed, look for the
      <span class="text-accent" aria-hidden="true">**</span><span
        class="text-foreground">Feedback</span
      ><span class="text-accent" aria-hidden="true">**</span> tab in the
      DevTools sidebar. You may need to click the
      <Icon
        name="caret-double-right"
        class="text-foreground inline-flex size-3"
      />
      icon to find it and drag it to the left.
    </p>
    <p>
      Now, select an element to capture its context and write your annotation.
    </p>

    <p>
      Press
      <kbd
        class="text-foreground inline-flex items-center gap-0.5 align-middle"
      >
        <span class="sr-only">Command + Period</span>
        <span class="text-accent" aria-hidden="true">&lt;kbd&gt;</span>
        <Icon name="command" class="size-3.5" />
        <span aria-hidden="true">.</span>
        <span class="text-accent" aria-hidden="true">&lt;/kbd&gt;</span>
      </kbd>
      to attach a screenshot.
    </p>

    <p>
      You can queue multiple annotations with
      <kbd
        class="text-foreground inline-flex items-center gap-0.5 align-middle"
      >
        <span class="sr-only">Command + Enter</span>
        <span class="text-accent" aria-hidden="true">&lt;kbd&gt;</span>
        <Icon name="command" class="size-3.5" />
        <span aria-hidden="true">Enter</span>
        <span class="text-accent" aria-hidden="true">&lt;/kbd&gt;</span>
      </kbd>
      or press
      <kbd
        class="text-foreground inline-flex items-center gap-0.5 align-middle"
      >
        <span class="sr-only">Command + Shift + Enter</span>
        <span class="text-accent" aria-hidden="true">&lt;kbd&gt;</span>
        <Icon name="command" class="size-3.5" />
        <Icon name="arrow-fat-up" class="size-3.5" />
        <span aria-hidden="true">Enter</span>
        <span class="text-accent" aria-hidden="true">&lt;/kbd&gt;</span>
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
      and collaborate with your coding agent via the
      <a
        href="https://pi.dev/packages/@browser-annotations/pi"
        target="_blank"
        class="decoration-accent text-foreground inline-flex -translate-y-[0.075em] items-center gap-1 align-middle underline underline-offset-3"
      >
        <Logo name="pi" class="text-foreground size-4" />
        <span>Pi extension</span></a
      >
      or
      <a
        href="https://github.com/wiebekaai/browser-annotations/tree/main/packages/claude"
        target="_blank"
        class="decoration-accent text-foreground inline-flex -translate-y-[0.075em] items-center gap-1 align-middle underline underline-offset-3"
      >
        <Logo name="claude" class="size-4" />
        <span>Claude Code plugin</span></a
      >.
    </p>

    <p>
      Copy an element's context or your feedback at any time by pressing
      <kbd
        class="text-foreground inline-flex items-center gap-0.5 align-middle"
      >
        <span class="sr-only">Command + X</span>
        <span class="text-accent" aria-hidden="true">&lt;kbd&gt;</span>
        <Icon name="command" class="size-3.5" />
        <span aria-hidden="true">X</span>
        <span class="text-accent" aria-hidden="true">&lt;/kbd&gt;</span>
      </kbd>
      (current) or
      <kbd
        class="text-foreground inline-flex items-center gap-0.5 align-middle"
      >
        <span class="sr-only">Command + Shift + X</span>
        <span class="text-accent" aria-hidden="true">&lt;kbd&gt;</span>
        <Icon name="command" class="size-3.5" />
        <Icon name="arrow-fat-up" class="size-3.5" />
        <span aria-hidden="true">X</span>
        <span class="text-accent" aria-hidden="true">&lt;/kbd&gt;</span>
      </kbd>
      (all).
    </p>

    <p>Enjoy!</p>

    <Signature class="text-foreground mt-8 w-20" aria-label="Wiebe" />

    <p class="text-foreground/50 pt-4 text-xs">
      Psst. It's all open source. Check out the
      <a
        class="text-foreground/70 decoration-accent underline underline-offset-3"
        href="https://github.com/wiebekaai/browser-annotations"
        target="_blank">repository</a
      >.<br class="max-sm:hidden" />
      And here's my statement on
      <a
        class="text-foreground/70 decoration-accent underline underline-offset-3"
        href="/privacy">privacy</a
      > (I don't collect anything).
    </p>
  </section>
</main>

<section
  class="relative hidden h-[24rem] border-y border-[#d0d0d0] bg-white text-[#202124] max-sm:mt-40 max-sm:block max-sm:h-auto max-sm:border-y-0 sm:block dark:border-[#56525e] dark:bg-[#26242c] dark:text-white"
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
    class="text-foreground absolute -top-2 left-8 z-10 w-44 -translate-y-full sm:right-54 sm:left-auto"
    aria-hidden="true"
  />
  <DevToolsDemo />
  <SendAnnotation
    class="text-foreground absolute right-9 bottom-3 z-10 w-52 dark:text-white"
    aria-hidden="true"
  />
</section>

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
