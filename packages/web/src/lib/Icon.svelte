<!-- Icons from https://phosphoricons.com/ (MIT) -->
<script lang="ts">
  type Name =
    | "arrow-fat-up"
    | "arrow-left"
    | "camera"
    | "caret-double-right"
    | "command"
    | "copy"
    | "crosshair-simple"
    | "paper-plane-tilt"
    | "plus"
    | "trash"
    | "x";

  let { name, class: className = "" }: { name: Name; class?: string } =
    $props();
  let iconClass = $derived(`${className}`.trim());
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 256 256"
  class={iconClass}
  aria-hidden="true"
>
  {#if name === "arrow-fat-up"}
    <rect width="256" height="256" fill="none" />
    <path
      d="M32,120l96-96,96,96H176v88a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V120Z"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
  {:else if name === "arrow-left"}
    <rect width="256" height="256" fill="none" />
    <line
      x1="216"
      y1="128"
      x2="40"
      y2="128"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <polyline
      points="112 56 40 128 112 200"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
  {:else if name === "caret-double-right"}
    <rect width="256" height="256" fill="none" />
    <polyline
      points="32 48 112 128 32 208"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <polyline
      points="144 48 224 128 144 208"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
  {:else if name === "command"}
    <rect width="256" height="256" fill="none" />
    <path
      d="M180,48h0a28,28,0,0,1,28,28v0a28,28,0,0,1-28,28H152a0,0,0,0,1,0,0V76a28,28,0,0,1,28-28Z"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <path
      d="M48,48H76a28,28,0,0,1,28,28v0a28,28,0,0,1-28,28h0A28,28,0,0,1,48,76V48A0,0,0,0,1,48,48Z"
      transform="translate(152 152) rotate(180)"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <path
      d="M152,152h28a28,28,0,0,1,28,28v0a28,28,0,0,1-28,28h0a28,28,0,0,1-28-28V152A0,0,0,0,1,152,152Z"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <path
      d="M76,152h0a28,28,0,0,1,28,28v0a28,28,0,0,1-28,28H48a0,0,0,0,1,0,0V180A28,28,0,0,1,76,152Z"
      transform="translate(152 360) rotate(-180)"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <rect
      x="104"
      y="104"
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
  {:else if name === "paper-plane-tilt"}
    <path
      fill="currentColor"
      d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"
    />
  {:else if name === "camera"}
    <rect width="256" height="256" fill="none" />
    <path
      d="M208,208H48a16,16,0,0,1-16-16V80A16,16,0,0,1,48,64H80L96,40h64l16,24h32a16,16,0,0,1,16,16V192A16,16,0,0,1,208,208Z"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <circle
      cx="128"
      cy="132"
      r="36"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
  {:else if name === "copy"}
    <rect width="256" height="256" fill="none" />
    <polyline
      points="168 168 216 168 216 40 88 40 88 88"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <rect
      x="40"
      y="88"
      width="128"
      height="128"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
  {:else if name === "crosshair-simple"}
    <rect width="256" height="256" fill="none" />
    <circle
      cx="128"
      cy="128"
      r="96"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <line
      x1="128"
      y1="32"
      x2="128"
      y2="72"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="16"
    />
    <line
      x1="128"
      y1="184"
      x2="128"
      y2="224"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="16"
    />
    <line
      x1="32"
      y1="128"
      x2="72"
      y2="128"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="16"
    />
    <line
      x1="184"
      y1="128"
      x2="224"
      y2="128"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="16"
    />
  {:else if name === "plus"}
    <rect width="256" height="256" fill="none" />
    <line
      x1="40"
      y1="128"
      x2="216"
      y2="128"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="16"
    />
    <line
      x1="128"
      y1="40"
      x2="128"
      y2="216"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="16"
    />
  {:else if name === "trash"}
    <rect width="256" height="256" fill="none" />
    <line
      x1="216"
      y1="56"
      x2="40"
      y2="56"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <line
      x1="104"
      y1="104"
      x2="104"
      y2="168"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <line
      x1="152"
      y1="104"
      x2="152"
      y2="168"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <path
      d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <path
      d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
  {:else if name === "x"}
    <rect width="256" height="256" fill="none" />
    <line
      x1="200"
      y1="56"
      x2="56"
      y2="200"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
    <line
      x1="200"
      y1="200"
      x2="56"
      y2="56"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    />
  {/if}
</svg>
