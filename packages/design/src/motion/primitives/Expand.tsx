"use client";

import { HeightReveal } from "./HeightReveal";
import type { MotionPrimitiveProps } from "./types";

export interface ExpandProps extends MotionPrimitiveProps {
  /** Whether the content is revealed. Defaults to false — Expand starts closed and grows open. */
  open?: boolean;
}

/** Grows content into view from height: 0. Use for accordions and expandable details. */
export function Expand({ open = false, duration, delay, disabled, children, className }: ExpandProps) {
  return (
    <HeightReveal open={open} duration={duration} delay={delay} disabled={disabled} className={className}>
      {children}
    </HeightReveal>
  );
}
