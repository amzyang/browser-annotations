<script lang="ts">
  import { resolve } from "$app/paths";
  import Icon from "$lib/Icon.svelte";

  const demoAnnotations = [
    {
      comment: "Make this text 12px",
      selector: "section.text-foreground\\/70.space-y-4.\\*\\:max-w-\\[70ch\\]",
    },
    {
      comment: "Suggest a shorter sentence",
      selector: "… > p:nth-of-type(1)",
    },
    {
      comment: "A bit more margin between paragraphs",
      selector: "section.text-foreground\\/70.space-y-4.\\*\\:max-w-\\[70ch\\]",
    },
  ];
</script>

<div
  class="grid h-full grid-cols-[minmax(0,1fr)_26rem] max-md:h-auto max-md:grid-cols-1"
  aria-hidden="true"
>
  <div
    class="flex min-h-0 min-w-0 flex-col border-r border-[#d0d0d0] max-md:hidden dark:border-[#56525e]"
  >
    <div
      class="relative flex h-[27px] shrink-0 items-stretch gap-0.5 border-b border-[#d0d0d0] bg-[#f3f3f3] pl-1 text-[12px] font-medium dark:border-[#56525e] dark:bg-[#26242c]"
    >
      <button
        type="button"
        class="flex w-7 shrink-0 items-center justify-center text-[#5f6368] dark:text-[#c7c7c7]"
        aria-label="Inspect element"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          class="size-[18px]"
        >
          <path
            fill="currentColor"
            d="M4.5 17C4.08333 17 3.72933 16.854 3.438 16.562C3.146 16.2707 3 15.9167 3 15.5H4.5V17ZM3 13.875V12.375H4.5V13.875H3ZM3 10.75V9.25H4.5V10.75H3ZM3 7.625V6.125H4.5V7.625H3ZM3 4.5C3 4.08333 3.146 3.72933 3.438 3.438C3.72933 3.146 4.08333 3 4.5 3V4.5H3ZM6.125 17V15.5H7.625V17H6.125ZM6.125 4.5V3H7.625V4.5H6.125ZM9 17V9H17V10.5H11.562L17 15.938L15.938 17L10.5 11.562V17H9ZM9.25 4.5V3H10.75V4.5H9.25ZM12.375 4.5V3H13.875V4.5H12.375ZM15.5 7.5V6H17V7.5H15.5ZM15.5 4.5V3C15.9167 3 16.2707 3.146 16.562 3.438C16.854 3.72933 17 4.08333 17 4.5H15.5Z"
          />
        </svg>
      </button>
      <button
        type="button"
        class="mr-1 flex w-7 shrink-0 items-center justify-center text-[#5f6368] dark:text-[#c7c7c7]"
        aria-label="Toggle device toolbar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          class="size-[18px]"
        >
          <path
            fill="currentColor"
            d="M2 16V14H4V5.5C4 5.08333 4.146 4.72933 4.438 4.438C4.72933 4.146 5.08333 4 5.5 4H17V5.5H5.5V14H10V16H2ZM13 16C12.722 16 12.486 15.9027 12.292 15.708C12.0973 15.514 12 15.278 12 15V8C12 7.722 12.0973 7.486 12.292 7.292C12.486 7.09733 12.722 7 13 7H17C17.278 7 17.514 7.09733 17.708 7.292C17.9027 7.486 18 7.722 18 8V15C18 15.278 17.9027 15.514 17.708 15.708C17.514 15.9027 17.278 16 17 16H13ZM13.5 14H16.5V8.5H13.5V14Z"
          />
        </svg>
      </button>
      {#each ["Elements", "Console"] as tab, i}
        {#if i === 0}
          <span
            class="flex items-center px-2.5 text-[#1a73e8] shadow-[inset_0_-2px_0_#1a73e8] dark:bg-[#26242c] dark:text-[#cdc4ff] dark:shadow-[inset_0_-2px_0_#a9b2ff]"
            >{tab}</span
          >
        {:else}
          <span
            class="flex items-center px-2.5 text-[#5f6368] dark:text-[#c7c7c7]"
            >{tab}</span
          >
        {/if}
      {/each}
    </div>
    <div
      class="grow overflow-hidden p-1 font-mono text-[11px] leading-[1.45] text-[#202124] dark:text-[#e3e3e3]"
    >
      <p class="px-1">
        <span class="text-[#5f6368] dark:text-[#ababab]"
          >&lt;!DOCTYPE html&gt;</span
        >
      </p>
      <p class="px-1">
        <span class="text-[#5f6368] dark:text-[#8f8f8f]">▾</span>
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;html</span>
        <span class="text-[#994500] dark:text-[#a8c7fa]">lang</span>=<span
          class="text-[#1a1aa6] dark:text-[#fe8d59]">"en"</span
        >
        <span class="text-[#994500] dark:text-[#a8c7fa]">data-theme</span>=<span
          class="text-[#1a1aa6] dark:text-[#fe8d59]">"dark"</span
        >
        <span class="text-[#994500] dark:text-[#a8c7fa]"
          >data-theme-preference</span
        >=<span class="text-[#1a1aa6] dark:text-[#fe8d59]">"default"</span>
        <span class="text-[#994500] dark:text-[#a8c7fa]">data-platform</span
        >=<span class="text-[#1a1aa6] dark:text-[#fe8d59]">"apple"</span><span
          class="text-[#881280] dark:text-[#7cacf8]">&gt;</span
        >
        <span
          class="ml-0.5 rounded-sm bg-[#e8eaed] px-1 text-[10px] text-[#5f6368] dark:bg-[#3c3c3c] dark:text-[#c7c7c7]"
          >view-source</span
        >
        <span
          class="rounded-sm bg-[#e8eaed] px-1 text-[10px] text-[#5f6368] dark:bg-[#3c3c3c] dark:text-[#c7c7c7]"
          >scroll</span
        >
      </p>
      <p class="px-1 pl-4">
        <span class="text-[#5f6368] dark:text-[#8f8f8f]">▸</span>
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;head&gt;</span
        ><span class="text-[#5f6368] dark:text-[#8f8f8f]">…</span><span
          class="text-[#881280] dark:text-[#7cacf8]">&lt;/head&gt;</span
        >
      </p>
      <p class="px-1 pl-4">
        <span class="text-[#5f6368] dark:text-[#8f8f8f]">▾</span>
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;body</span>
        <span class="text-[#994500] dark:text-[#a8c7fa]"
          >data-sveltekit-preload-data</span
        >=<span class="text-[#1a1aa6] dark:text-[#fe8d59]">"hover"</span><span
          class="text-[#881280] dark:text-[#7cacf8]">&gt;</span
        >
        <span
          class="ml-0.5 rounded-sm bg-[#e8eaed] px-1 text-[10px] text-[#5f6368] dark:bg-[#3c3c3c] dark:text-[#c7c7c7]"
          >flex</span
        >
      </p>
      <p class="px-1 pl-8">
        <span class="text-[#5f6368] dark:text-[#8f8f8f]">▾</span>
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;div</span>
        <span class="text-[#994500] dark:text-[#a8c7fa]">style</span>=<span
          class="text-[#1a1aa6] dark:text-[#fe8d59]">"display: contents"</span
        ><span class="text-[#881280] dark:text-[#7cacf8]">&gt;</span>
      </p>
      <p class="px-1 pl-12 text-[#5f6368] dark:text-[#ababab]">
        &lt;!--[--&gt;
      </p>
      <p class="px-1 pl-12 text-[#5f6368] dark:text-[#ababab]">
        &lt;!--[0--&gt;
      </p>
      <p
        class="flex flex-wrap items-baseline gap-x-1 bg-[#e8f0fe] px-1 pl-12 text-[#202124] [box-shadow:inset_2px_0_0_#1a73e8] dark:bg-[#004a77] dark:text-[#e3e3e3] dark:[box-shadow:inset_2px_0_0_#7cacf8]"
      >
        <span
          ><span class="text-[#202124] dark:text-[#e3e3e3]">▾</span>
          <span class="text-[#881280] dark:text-[#7cacf8]">&lt;main</span>
          <span class="text-[#994500] dark:text-[#a8c7fa]">class</span>=<span
            class="text-[#1a1aa6] dark:text-[#fe8d59]"
            >"mx-auto flex grow flex-col items-center space-y-12 p-6 pt-12
            sm:py-20 svelte-1uha8ag"</span
          ><span class="text-[#881280] dark:text-[#7cacf8]">&gt;</span></span
        >
        <span
          class="rounded-sm bg-[#e8eaed] px-1 text-[10px] text-[#5f6368] dark:bg-[#3c3c3c] dark:text-[#c7c7c7]"
          >flex</span
        >
        <span class="text-[#1a73e8] dark:text-[#5cd5fb]">== $0</span>
      </p>
      <p class="px-1 pl-16">
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;section</span>
        <span class="text-[#994500] dark:text-[#a8c7fa]">class</span>=<span
          class="text-[#1a1aa6] dark:text-[#fe8d59]"
          >"relative mx-auto mt-36 hidden h-[24rem] w-[calc(100%-3rem)]
          max-w-5xl rounded-sm border svelte-1uha8ag"</span
        >
        <span class="text-[#994500] dark:text-[#a8c7fa]">aria-labelledby</span
        >=<span class="text-[#1a1aa6] dark:text-[#fe8d59]"
          >"devtools-demo-title"</span
        ><span class="text-[#881280] dark:text-[#7cacf8]">&gt;</span>
      </p>
      <p class="px-1 pl-16">
        <span class="text-[#5f6368] dark:text-[#8f8f8f]">▾</span>
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;section</span>
        <span class="text-[#994500] dark:text-[#a8c7fa]">class</span>=<span
          class="text-[#1a1aa6] dark:text-[#fe8d59]"
          >"text-foreground/75 space-y-7 *:max-w-[70ch] svelte-1uha8ag"</span
        ><span class="text-[#881280] dark:text-[#7cacf8]">&gt;</span>
      </p>
      <p class="px-1 pl-20">
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;h1</span>
        <span class="text-[#994500] dark:text-[#a8c7fa]">class</span>=<span
          class="text-[#1a1aa6] dark:text-[#fe8d59]"
          >"sr-only svelte-1uha8ag"</span
        ><span class="text-[#881280] dark:text-[#7cacf8]">&gt;</span>Browser
        Annotations<span class="text-[#881280] dark:text-[#7cacf8]"
          >&lt;/h1&gt;</span
        >
      </p>
      <p class="px-1 pl-20">
        <span class="text-[#5f6368] dark:text-[#8f8f8f]">▾</span>
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;p</span>
        <span class="text-[#994500] dark:text-[#a8c7fa]">class</span>=<span
          class="text-[#1a1aa6] dark:text-[#fe8d59]">"svelte-1uha8ag"</span
        ><span class="text-[#881280] dark:text-[#7cacf8]">&gt;</span>
      </p>
      <p class="px-1 pl-24">
        "Browser Annotations is a Chrome DevTools extension to grab an element's
        context and write feedback for agents."
      </p>
      <p class="px-1 pl-20">
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;/p&gt;</span>
      </p>
      <p class="px-1 pl-20">
        <span class="text-[#5f6368] dark:text-[#8f8f8f]">▸</span>
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;p</span>
        <span class="text-[#994500] dark:text-[#a8c7fa]">class</span>=<span
          class="text-[#1a1aa6] dark:text-[#fe8d59]">"svelte-1uha8ag"</span
        ><span class="text-[#881280] dark:text-[#7cacf8]">&gt;</span><span
          class="text-[#5f6368] dark:text-[#8f8f8f]">…</span
        ><span class="text-[#881280] dark:text-[#7cacf8]">&lt;/p&gt;</span>
      </p>
      <p class="px-1 pl-20">
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;p&gt;</span>If
        you'd like to try it, you can install the Chrome extension.<span
          class="text-[#881280] dark:text-[#7cacf8]">&lt;/p&gt;</span
        >
      </p>
      <p class="px-1 pl-20">
        <span class="text-[#5f6368] dark:text-[#8f8f8f]">▸</span>
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;p</span>
        <span class="text-[#994500] dark:text-[#a8c7fa]">class</span>=<span
          class="text-[#1a1aa6] dark:text-[#fe8d59]">"svelte-1uha8ag"</span
        ><span class="text-[#881280] dark:text-[#7cacf8]">&gt;</span><span
          class="text-[#5f6368] dark:text-[#8f8f8f]">…</span
        ><span class="text-[#881280] dark:text-[#7cacf8]">&lt;/p&gt;</span>
      </p>
      <p class="px-1 pl-16">
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;/section&gt;</span>
      </p>
      <p class="px-1 pl-12 text-[#5f6368] dark:text-[#ababab]">
        &lt;!--]--&gt;
      </p>
      <p class="px-1 pl-8">
        <span class="text-[#881280] dark:text-[#7cacf8]">&lt;/div&gt;</span>
      </p>
    </div>
  </div>

  <aside
    class="flex min-h-0 min-w-0 flex-col bg-white font-mono text-[#202124] antialiased max-md:h-[24rem] dark:bg-[#0e0e12] dark:text-white"
  >
    <div
      class="relative flex h-[27px] shrink-0 items-stretch border-b border-[#d0d0d0] bg-[#f3f3f3] pl-1 text-[12px] font-medium max-md:border-t dark:border-[#56525e] dark:bg-[#26242c]"
    >
      {#each ["Styles", "Feedback"] as tab}
        {#if tab === "Feedback"}
          <span
            class="flex items-center px-2.5 text-[#1a73e8] shadow-[inset_0_-2px_0_#1a73e8] dark:bg-[#26242c] dark:text-[#cdc4ff] dark:shadow-[inset_0_-2px_0_#a9b2ff]"
            >{tab}</span
          >
        {:else}
          <span
            class="flex items-center px-2.5 text-[#5f6368] dark:text-[#c7c7c7]"
            >{tab}</span
          >
        {/if}
      {/each}
    </div>

    <div
      class="text-2xs flex h-8 shrink-0 items-center border-b border-black/10 pl-1 text-black/70 dark:border-white/7 dark:text-white/80"
    >
      <span class="flex h-8 items-center">
        <span class="flex size-4 items-center justify-center p-1">
          <span class="bg-success size-1.5 rounded-full"></span>
        </span>
        <span class="max-w-48 truncate">http://127.0.0.1:3330/</span>
      </span>
      <span class="ml-auto flex">
        <span class="flex size-8 items-center justify-center">
          <Icon name="copy" class="size-3.5" />
        </span>
        <span class="flex size-8 items-center justify-center">
          <Icon name="trash" class="size-3.5" />
        </span>
      </span>
    </div>

    <ol class="flex min-h-0 grow flex-col gap-2 overflow-y-auto p-2">
      {#each demoAnnotations as annotation}
        <li>
          <article
            class="relative w-full bg-black/[0.03] p-2 pl-3 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-[var(--color-accent)] before:content-[''] dark:bg-white/2"
          >
            <p class="text-xs wrap-anywhere whitespace-pre-wrap">
              {annotation.comment}
            </p>
            <div class="mt-2 flex items-center gap-1">
              <span
                class="text-2xs flex items-center gap-1 text-black/60 dark:text-white/70"
              >
                <Icon name="crosshair-simple" class="size-3 shrink-0" />
                <span class="max-w-[28ch] min-w-0 truncate md:max-w-none">
                  {annotation.selector}
                </span>
              </span>
            </div>
          </article>
        </li>
      {/each}
    </ol>

    <form class="shrink-0 border-t border-black/10 p-2 dark:border-white/7">
      <label class="sr-only" for="demo-feedback">Feedback</label>
      <textarea
        id="demo-feedback"
        class="block min-h-[2.5rlh] w-full resize-none rounded-sm border border-black/10 bg-black/[0.02] p-2 text-xs text-[#202124] outline-none dark:border-white/5 dark:bg-white/[0.025] dark:text-white"
        readonly>Adjust our landing page</textarea
      >
      <div class="mt-2 flex items-start gap-2">
        <span
          class="text-2xs flex h-8 items-center text-black/70 dark:text-white/80"
          >Sending 3 annotations</span
        >
        <div class="ml-auto flex items-center gap-1">
          <a
            href={resolve("/example")}
            class="bg-accent hover:bg-accent/85 flex size-8 items-center justify-center rounded-sm text-white transition-colors"
            aria-label="Send demo feedback"
          >
            <Icon name="paper-plane-tilt" class="size-3.5" />
          </a>
        </div>
      </div>
    </form>
  </aside>
</div>
