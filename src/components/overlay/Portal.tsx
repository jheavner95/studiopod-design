"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

function subscribe() {
  return () => {};
}

/** True once hydrated on the client — false during SSR, where document.body isn't a valid portal target. */
function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

interface PortalProps {
  children: ReactNode;
}

/** Renders children into document.body — every overlay in this family portals out of its DOM position so stacking and clipping never depend on an ancestor's overflow or z-index. */
export function Portal({ children }: PortalProps) {
  const mounted = useMounted();

  if (!mounted) return null;
  return createPortal(children, document.body);
}
