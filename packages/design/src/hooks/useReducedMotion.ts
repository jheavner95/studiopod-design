"use client";

import { useMotion } from "./useMotion";

/**
 * The resolved reduced-motion state: an explicit MotionProvider override,
 * falling back to the OS-level `prefers-reduced-motion` setting. This is
 * the motion engine's own hook — distinct from framer-motion's export of
 * the same name, which only reads the OS setting.
 */
export function useReducedMotion(): boolean {
  return useMotion().reducedMotion;
}
