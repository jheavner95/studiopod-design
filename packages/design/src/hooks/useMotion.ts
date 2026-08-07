"use client";

import { useContext } from "react";
import { MotionContext, type MotionContextValue } from "@/providers/MotionProvider";

/** The full motion engine context: scale, speed, paused, reduced motion, diagnostics, replay. */
export function useMotion(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return ctx;
}
