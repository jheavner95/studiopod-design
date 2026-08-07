"use client";

import { HeightReveal } from "./HeightReveal";
import type { MotionPrimitiveProps } from "./types";

export interface CollapseProps extends MotionPrimitiveProps {
  /** Whether the content is still shown. Defaults to true — Collapse starts open and shrinks away when set to false. */
  open?: boolean;
}

/** Shrinks content out of view to height: 0. Use for dismissible or removable content. */
export function Collapse({ open = true, duration, delay, disabled, children, className }: CollapseProps) {
  return (
    <HeightReveal open={open} duration={duration} delay={delay} disabled={disabled} className={className}>
      {children}
    </HeightReveal>
  );
}
