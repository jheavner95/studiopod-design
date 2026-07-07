"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

const MotionPreferenceContext = createContext<boolean | null>(null);

interface MotionPreferenceProviderProps {
  children: ReactNode;
  /**
   * Force motion on (`false`) or off (`true`) for everything inside,
   * regardless of the OS-level setting. Pass `null` (the default) to defer
   * to `prefers-reduced-motion`. Scope this provider narrowly — it's for
   * an in-app "reduce motion" toggle, not a way to disable motion globally.
   */
  reduceMotion?: boolean | null;
}

export function MotionPreferenceProvider({ children, reduceMotion = null }: MotionPreferenceProviderProps) {
  return <MotionPreferenceContext.Provider value={reduceMotion}>{children}</MotionPreferenceContext.Provider>;
}

/**
 * The single source of truth every motion/illustration primitive checks
 * before animating. Combines an explicit app-level override with the
 * OS-level `prefers-reduced-motion` signal — override wins when set.
 */
export function useMotionPreference(): boolean {
  const override = useContext(MotionPreferenceContext);
  const osPreference = useReducedMotion();
  return override ?? osPreference ?? false;
}
