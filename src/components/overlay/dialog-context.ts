"use client";

import { createContext, useContext } from "react";

/**
 * DS-5J/DS-5K — the shared composition context for the overlay-surface family.
 *
 * Named `DialogContext` (not `OverlayContext`) deliberately: `Dialog` is the
 * canonical owner of the `Dialog*` composition set, and `Drawer` simply provides
 * the same context so the exact same sub-components compose inside it — one
 * context, no separate "overlay" abstraction layer (DS-5J Phase 4, "single
 * implementation"). It is an internal detail — not exported from the package.
 *
 * It coordinates:
 *  - `close` / `dismissible` — so `DialogClose` needs no close prop and the
 *    surface owns dismissibility.
 *  - `titleId` / `descriptionId` + `registerTitle` / `registerDescription` — so
 *    `DialogTitle`/`DialogDescription` auto-wire `aria-labelledby`/`describedby`
 *    on the surface with zero per-consumer id plumbing (DS-5J Phase 3).
 */
export interface DialogContextValue {
  /** Stable id the surface allocates for a DialogTitle to adopt. */
  titleId: string;
  /** Stable id the surface allocates for a DialogDescription to adopt. */
  descriptionId: string;
  /** DialogTitle reports presence so the surface only sets aria-labelledby when a title exists. */
  registerTitle: (present: boolean) => void;
  /** DialogDescription reports presence so the surface only sets aria-describedby when one exists. */
  registerDescription: (present: boolean) => void;
  /** Requests close — `onOpenChange(false)`. */
  close: () => void;
  /** Whether backdrop click / Escape dismiss the surface. */
  dismissible: boolean;
}

export const DialogContext = createContext<DialogContextValue | null>(null);

/** Read the surrounding Dialog/Drawer context. Throws if a composition part is used outside a surface. */
export function useDialogContext(component: string): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error(`<${component}> must be rendered inside a <Dialog> or <Drawer>.`);
  }
  return ctx;
}
