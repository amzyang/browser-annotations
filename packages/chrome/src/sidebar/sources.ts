export type SourceLocation = {
  file: string;
  line: number;
  column: number;
};

export type SourceContext = {
  framework: "svelte" | "react" | "vue";
  location?: SourceLocation;
};

/**
 * Returns the first supported framework source context for an element.
 * Checks Svelte first, then React, then Vue.
 *
 * Svelte: reads `__svelte_meta` from the element or its ancestor chain (dev mode).
 * React: walks the Fiber chain looking for `_debugStack` (dev mode).
 * Vue: reads `__v_inspector` vnode prop or `data-v-inspector` attribute injected
 * by vite-plugin-vue-inspector along the ancestor chain.
 */
export function getSourceContext(element: Element): SourceContext | undefined {
  const isRecord = (value: unknown): value is Record<string, unknown> =>
    !!value && typeof value === "object";

  const getParentElement = (current: Element): Element | null => {
    if (current.parentElement) {
      return current.parentElement;
    }

    const root = current.getRootNode();
    return root instanceof ShadowRoot ? root.host : null;
  };

  const toSourceLocation = (value: unknown): SourceLocation | undefined => {
    if (!isRecord(value)) {
      return undefined;
    }

    const file = value.file;
    const line = value.line;
    const column = value.column;

    if (typeof file !== "string" || typeof line !== "number" || typeof column !== "number") {
      return undefined;
    }

    return { file, line, column };
  };

  const getSvelteMeta = (current: Element): Record<string, unknown> | undefined => {
    let next: Element | null = current;

    while (next) {
      const meta = (next as Element & { __svelte_meta?: unknown }).__svelte_meta;

      if (isRecord(meta)) {
        return meta;
      }

      next = getParentElement(next);
    }

    return undefined;
  };

  /**
   * Reads `__svelte_meta` from the element or its ancestor chain.
   * Only available in Svelte dev mode.
   *
   * @tested Svelte 4, SvelteKit 2
   */
  const getSvelteSourceContext = (): SourceContext | undefined => {
    const meta = getSvelteMeta(element);

    if (!meta) {
      return undefined;
    }

    const location = toSourceLocation(meta.loc);

    return {
      framework: "svelte",
      ...(location ? { location } : {}),
    };
  };

  type ReactFiber = {
    return: ReactFiber | null;
    _debugStack?: Error;
  };

  const getFiber = (el: Element): ReactFiber | null => {
    const key = Object.getOwnPropertyNames(el).find((k) => k.startsWith("__reactFiber$"));
    return key ? ((el as unknown as Record<string, ReactFiber>)[key] ?? null) : null;
  };

  // Parse the first non-node_modules file location from a React debug stack trace.
  const parseSourceLocation = (stack: string): SourceLocation | undefined => {
    for (const line of stack.split("\n")) {
      const match = line.match(/at .+? \(https?:\/\/[^/]+(\/[^?:]+?)(?:\?[^:]*)?:(\d+):(\d+)\)/);

      if (!match) {
        continue;
      }

      const file = match[1]!;
      const lineStr = match[2]!;
      const columnStr = match[3]!;

      if (file.includes("/node_modules/")) {
        continue;
      }

      return { file, line: Number(lineStr), column: Number(columnStr) };
    }

    return undefined;
  };

  /**
   * Walks the React Fiber chain looking for `_debugStack`.
   * Only available in React dev mode.
   *
   * @tested React 18, Next.js 14
   */
  const getReactSourceContext = (): SourceContext | undefined => {
    const fiber = getFiber(element);

    if (!fiber) {
      return undefined;
    }

    let current: ReactFiber | null = fiber;

    while (current) {
      if (current._debugStack) {
        const location = parseSourceLocation(current._debugStack.stack ?? "");

        return {
          framework: "react",
          ...(location ? { location } : {}),
        };
      }

      current = current.return;
    }

    return { framework: "react" };
  };

  const parseVueInspector = (value: unknown): SourceLocation | undefined => {
    if (typeof value !== "string") {
      return undefined;
    }

    const match = value.match(/^(.+):(\d+):(\d+)$/);

    if (!match) {
      return undefined;
    }

    return { file: match[1]!, line: Number(match[2]), column: Number(match[3]) };
  };

  type VueVNode = {
    props?: Record<string, unknown> | null;
    ctx?: { vnode?: VueVNode | null } | null;
  };

  const readVueInspector = (el: Element): SourceLocation | undefined => {
    const vnode = (el as Element & { __vnode?: VueVNode | null }).__vnode ?? null;
    const fromVnode = parseVueInspector(vnode?.props?.__v_inspector);

    if (fromVnode) {
      return fromVnode;
    }

    const fromCtx = parseVueInspector(vnode?.ctx?.vnode?.props?.__v_inspector);

    if (fromCtx) {
      return fromCtx;
    }

    return parseVueInspector(el.getAttribute("data-v-inspector"));
  };

  /**
   * Walks the DOM ancestor chain looking for `__v_inspector` on the element's
   * vnode (or the `data-v-inspector` attribute fallback) injected by
   * vite-plugin-vue-inspector.
   *
   * @tested vite-plugin-vue-inspector 5.x via vite-plugin-vue-devtools
   */
  const getVueSourceContext = (): SourceContext | undefined => {
    let next: Element | null = element;

    while (next) {
      const location = readVueInspector(next);

      if (location) {
        return { framework: "vue", location };
      }

      next = getParentElement(next);
    }

    return undefined;
  };

  return getSvelteSourceContext() ?? getReactSourceContext() ?? getVueSourceContext();
}
