"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion, useMotionEnabled } from "@/hooks";
import { Progress as MotionProgress } from "@/motion";
import { Caption } from "@/components/ui";

export type ProgressTone = "accent" | "success" | "warning" | "error";

const TONE_FILL: Record<ProgressTone, string> = {
  accent: "bg-accent-500",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

interface ProgressBarProps {
  /** 0–1. Ignored when indeterminate. */
  value?: number;
  /** For a task with no knowable duration — a sliding fill instead of a fixed one. */
  indeterminate?: boolean;
  label?: ReactNode;
  showPercentage?: boolean;
  tone?: ProgressTone;
  className?: string;
}

/**
 * An animated fill bar communicating completion of a task — Determinate (a
 * known value), Indeterminate (no knowable duration), styleable as Complete
 * or Error via tone. Wraps the motion engine's own Progress primitive
 * (src/motion/primitives/Progress.tsx) for the determinate fill rather than
 * re-animating a bar from scratch; adds the role="progressbar" semantics,
 * label, and percentage this family needs on top.
 */
export function ProgressBar({ value = 0, indeterminate = false, label, showPercentage = false, tone = "accent", className }: ProgressBarProps) {
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const clamped = Math.min(1, Math.max(0, value));
  const percentage = Math.round(clamped * 100);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label || (showPercentage && !indeterminate) ? (
        <div className="flex items-center justify-between gap-2">
          {label ? <Caption className="text-ink-secondary">{label}</Caption> : <span />}
          {showPercentage && !indeterminate ? <Caption className="text-ink-tertiary">{percentage}%</Caption> : null}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={indeterminate && !label ? "Loading" : undefined}
      >
        {indeterminate ? (
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-border">
            {motionEnabled ? (
              <motion.div
                className={cn("absolute inset-y-0 w-1/3 rounded-full", TONE_FILL[tone])}
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 1.2 / speed, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : (
              <div className={cn("absolute inset-0 rounded-full opacity-60", TONE_FILL[tone])} />
            )}
          </div>
        ) : (
          <MotionProgress value={clamped} fillClassName={TONE_FILL[tone]} />
        )}
      </div>
    </div>
  );
}
