"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export interface ElementSize {
  width: number;
  height: number;
}

/**
 * Measures a ref'd element's rendered box via ResizeObserver. Used by
 * IllustrationCanvas to classify its own container width into a breakpoint
 * — deliberately container-based, not viewport-based, so layout responds
 * correctly even when the canvas is embedded in a narrower parent.
 */
export function useElementSize<T extends HTMLElement>(): [RefObject<T | null>, ElementSize] {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}
