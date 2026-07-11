"use client";

import { useEffect } from "react";

/**
 * Locks page scroll and marks everything outside the modal (the #app-root
 * wrapper in the root layout) inert while a full-page-blocking overlay
 * (Dialog, Drawer, CommandPalette) is open — so background content is
 * neither scrollable nor reachable by a screen reader's virtual cursor,
 * matching what the visual backdrop already implies. Not used by Menu/
 * Popover, which are anchored, non-full-page overlays.
 */
export function useBodyLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const root = document.getElementById("app-root");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root?.setAttribute("inert", "");
    return () => {
      document.body.style.overflow = previousOverflow;
      root?.removeAttribute("inert");
    };
  }, [active]);
}
