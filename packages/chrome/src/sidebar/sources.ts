export type SourceLocation = {
  file: string;
  line: number;
  column: number;
};

export type SourceContext = {
  framework: "svelte" | "react" | "solid";
  location?: SourceLocation;
};

/**
 * Returns the first supported framework source context for an element.
 * Checks Svelte first, then React, then Solid.
 *
 * Svelte: reads `__svelte_meta` from the element or its ancestor chain (dev mode).
 * React: walks the Fiber chain looking for passive debug source data (dev mode).
 * Solid: detects via `window.Solid$$` (dev mode) and reads `data-source-loc`
 * attributes added by the `solid-devtools` locator.
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
    tag?: number;
    type?: unknown;
    _debugOwner?: ReactFiber | null;
    _debugSource?: {
      fileName?: unknown;
      lineNumber?: unknown;
      columnNumber?: unknown;
    } | null;
    _debugStack?: Error;
  };

  const getFiber = (el: Element): ReactFiber | null => {
    const key = Object.getOwnPropertyNames(el).find((k) => k.startsWith("__reactFiber$"));
    return key ? ((el as unknown as Record<string, ReactFiber>)[key] ?? null) : null;
  };

  const REACT_SOURCE_FILE_REGEX = /\.(jsx|tsx|ts|js)$/;
  const REACT_BUNDLED_FILE_PATTERNS = [
    /(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$/i,
    /(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$/i,
    /[-_.][\da-f]{20,}\.(js|mjs|cjs)$/i,
    /\/dist\/|\/build\/|\/\.next\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,
  ];

  const isReactSourceFile = (file: string) =>
    REACT_SOURCE_FILE_REGEX.test(file) &&
    !REACT_BUNDLED_FILE_PATTERNS.some((pattern) => pattern.test(file));

  const toReactSourceFile = (url: string): string | undefined => {
    const webpackPath = url.match(/webpack-internal:\/\/\/(?:\([^)]+\)\/)?\.\/(.+)$/)?.[1];
    const file = (webpackPath ? `/${webpackPath}` : url.replace(/^https?:\/\/[^/]+/, "")).split(
      "?",
    )[0]!;

    return isReactSourceFile(file) ? file : undefined;
  };

  // Parse the first source file location from a React debug stack trace.
  const parseReactStackLocation = (stack: string): SourceLocation | undefined => {
    for (const line of stack.split("\n")) {
      const match = line.match(/at .+? \((.+):(\d+):(\d+)\)/);

      if (!match) {
        continue;
      }

      const file = toReactSourceFile(match[1]!);

      if (!file) {
        continue;
      }

      return { file, line: Number(match[2]!), column: Number(match[3]!) };
    }

    return undefined;
  };

  const getDebugSourceLocation = (fiber: ReactFiber): SourceLocation | undefined => {
    const source = fiber._debugSource;

    if (!source || typeof source.fileName !== "string" || typeof source.lineNumber !== "number") {
      return undefined;
    }

    const file = toReactSourceFile(source.fileName);

    if (!file) {
      return undefined;
    }

    return {
      file,
      line: source.lineNumber,
      column: typeof source.columnNumber === "number" ? source.columnNumber : 1,
    };
  };

  /**
   * Walks the React Fiber chain looking for passive debug source data.
   * Does not install React DevTools hooks or mutate React internals.
   */
  const getReactSourceContext = (): SourceContext | undefined => {
    const fiber = getFiber(element);

    if (!fiber) {
      return undefined;
    }

    let current: ReactFiber | null = fiber;

    while (current) {
      const debugSourceLocation = getDebugSourceLocation(current);

      if (debugSourceLocation) {
        return { framework: "react", location: debugSourceLocation };
      }

      if (current._debugStack) {
        const stackLocation = parseReactStackLocation(current._debugStack.stack ?? "");

        if (stackLocation) {
          return { framework: "react", location: stackLocation };
        }
      }

      if (current._debugOwner?._debugStack) {
        const ownerLocation = parseReactStackLocation(current._debugOwner._debugStack.stack ?? "");

        if (ownerLocation) {
          return { framework: "react", location: ownerLocation };
        }
      }

      current = current.return;
    }

    return { framework: "react" };
  };

  const getSolidSourceContext = (): SourceContext | undefined => {
    if (!(globalThis as { Solid$$?: unknown }).Solid$$) {
      return undefined;
    }

    let next: Element | null = element;

    while (next) {
      const value = next.getAttribute?.("data-source-loc");
      const match = value?.match(/^(.+):(\d+):(\d+)$/);

      if (match) {
        const file = match[1]!.startsWith("/") ? match[1]! : `/${match[1]}`;
        return {
          framework: "solid",
          location: { file, line: Number(match[2]!), column: Number(match[3]!) },
        };
      }

      next = getParentElement(next);
    }

    return { framework: "solid" };
  };

  return getSvelteSourceContext() ?? getReactSourceContext() ?? getSolidSourceContext();
}
