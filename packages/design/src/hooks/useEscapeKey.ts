"use client";

import { useEffect } from "react";

/** Calls `handler` when Escape is pressed while active — every overlay in this system closes on Escape. */
export function useEscapeKey(handler: () => void, active: boolean): void {
  useEffect(() => {
    if (!active) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handler();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handler, active]);
}
