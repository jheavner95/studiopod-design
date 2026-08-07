"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { pulseVariants } from "./variants";
import { useMotionPreference } from "./MotionPreference";
import type { StatusTone } from "@/lib/tone";

/** DS-5B: the exact same five-value set as StatusTone (src/lib/tone.ts) — an alias, not a fresh union, since a dot's tone and a badge's tone are the same semantic concept even though their rendered recipe (solid dot vs. pill) differs. Kept as its own exported name since PulseStatus's own tone prop is more naturally read this way. */
export type PulseTone = StatusTone;

const toneMap: Record<PulseTone, string> = {
  accent: "bg-accent-500",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  neutral: "bg-neutral",
};

const sizeMap = { sm: "size-1.5", md: "size-2.5" };

interface PulseStatusProps {
  tone?: PulseTone;
  size?: "sm" | "md";
  className?: string;
  /** Set false for a static dot (completed/idle states shouldn't feel "live"). */
  active?: boolean;
}

/** A status dot with an expanding ring pulse — the "this is live" signal. */
export function PulseStatus({ tone = "accent", size = "md", active = true, className }: PulseStatusProps) {
  const reduceMotion = useMotionPreference();
  const dotClass = cn("relative rounded-full", sizeMap[size], toneMap[tone], className);

  if (!active || reduceMotion) {
    return <span className={dotClass} />;
  }

  return (
    <span className={cn("relative inline-flex", sizeMap[size])}>
      <motion.span
        className={cn("absolute inset-0 rounded-full", toneMap[tone])}
        variants={pulseVariants}
        animate="idle"
      />
      <span className={dotClass} />
    </span>
  );
}
