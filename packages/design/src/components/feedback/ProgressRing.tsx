"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion, useMotionEnabled } from "@/hooks";
import { PROGRESS_TONE_CLASSES, type ProgressTone } from "./ProgressBar";

/** DS-5B: reads the stroke half of the shared fill/stroke pair ProgressBar owns — was an independent, hand-typed copy of the same four colors before this consolidation. */
const TONE_STROKE: Record<ProgressTone, string> = {
  accent: PROGRESS_TONE_CLASSES.accent.stroke,
  success: PROGRESS_TONE_CLASSES.success.stroke,
  warning: PROGRESS_TONE_CLASSES.warning.stroke,
  error: PROGRESS_TONE_CLASSES.error.stroke,
};

interface ProgressRingProps {
  /** 0–1. Ignored when indeterminate. */
  value?: number;
  indeterminate?: boolean;
  size?: number;
  strokeWidth?: number;
  tone?: ProgressTone;
  label?: string;
  className?: string;
}

/**
 * A circular counterpart to ProgressBar, for compact dashboard-style summaries
 * where a full-width bar doesn't fit — the same Determinate/Indeterminate
 * semantics and tone system.
 */
export function ProgressRing({ value = 0, indeterminate = false, size = 40, strokeWidth = 4, tone = "accent", label, className }: ProgressRingProps) {
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const clamped = Math.min(1, Math.max(0, value));
  const percentage = Math.round(clamped * 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={indeterminate ? (label ?? "Loading") : label}
      className={cn("relative inline-flex shrink-0 items-center justify-center", indeterminate && motionEnabled && "animate-spin", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} className="fill-none stroke-border" />
        {indeterminate ? (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.75}
            className={cn("fill-none", TONE_STROKE[tone])}
          />
        ) : (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={false}
            animate={{ strokeDashoffset: circumference * (1 - clamped) }}
            transition={motionEnabled ? { duration: 0.4 / speed, ease: "easeOut" } : { duration: 0 }}
            className={cn("fill-none", TONE_STROKE[tone])}
          />
        )}
      </svg>
      {!indeterminate && size >= 32 ? <span className="absolute text-caption font-medium text-ink-secondary">{percentage}%</span> : null}
    </div>
  );
}
