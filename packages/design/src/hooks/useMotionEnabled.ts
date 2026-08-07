"use client";

import { useMotion } from "./useMotion";

/**
 * The master gate every primitive checks before animating: is motion
 * allowed at all, globally? Combines the pause switch, resolved reduced
 * motion state, and spatial scale (a scale of exactly 0 means "no motion").
 * Primitives additionally check their own `disabled` prop on top of this.
 */
export function useMotionEnabled(): boolean {
  const { paused, reducedMotion, scale } = useMotion();
  return !paused && !reducedMotion && scale > 0;
}
