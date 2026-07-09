"use client";

import { useEffect, type RefObject } from "react";

/** Calls `handler` on a pointerdown outside `ref`'s element — the standard dismiss behavior for Popover and Menu. */
export function useOutsideClick(ref: RefObject<HTMLElement | null>, handler: () => void, active: boolean): void {
  useEffect(() => {
    if (!active) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [ref, handler, active]);
}
