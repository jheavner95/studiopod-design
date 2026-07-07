"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { transition } from "../utils";
import type { MotionDuration } from "../tokens";

export interface ProgressProps {
  /** 0–1. */
  value: number;
  duration?: MotionDuration | number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
}

/** An animated fill bar/line — the generic mechanism behind progress rails and connector fills. */
export function Progress({
  value,
  duration = "slow",
  disabled,
  orientation = "horizontal",
  className,
  trackClassName,
  fillClassName,
}: ProgressProps) {
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const enabled = motionEnabled && !disabled;
  const clamped = Math.min(1, Math.max(0, value));
  const isHorizontal = orientation === "horizontal";

  const trackClasses = cn(
    "relative overflow-hidden rounded-full bg-border",
    isHorizontal ? "h-1.5 w-full" : "h-full w-1.5",
    trackClassName,
  );
  const fillClasses = cn(
    "absolute rounded-full bg-accent-500",
    isHorizontal ? "inset-y-0 left-0 w-full" : "inset-x-0 bottom-0 h-full",
    fillClassName,
  );

  if (!enabled) {
    return (
      <div className={className}>
        <div className={trackClasses}>
          <div
            className={fillClasses}
            style={isHorizontal ? { transform: `scaleX(${clamped})`, transformOrigin: "left" } : { transform: `scaleY(${clamped})`, transformOrigin: "bottom" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className={trackClasses}>
        <motion.div
          className={fillClasses}
          style={isHorizontal ? { originX: 0 } : { originY: 1 }}
          initial={false}
          animate={isHorizontal ? { scaleX: clamped } : { scaleY: clamped }}
          transition={transition({ duration, ease: "standard", speed })}
        />
      </div>
    </div>
  );
}
