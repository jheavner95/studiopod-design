"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { motionDuration, motionEase } from "@/lib/tokens";
import { useMotionPreference } from "@/components/motion/MotionPreference";

interface AnimatedConnectorProps {
  orientation?: "horizontal" | "vertical";
  /** When true, an accent line draws in over the base line to signal live data flow. */
  active?: boolean;
  length?: number;
  className?: string;
}

/** A line between two AnimatedNodes. The base line is always visible; the accent line animates in when active. */
export function AnimatedConnector({
  orientation = "horizontal",
  active = false,
  length = 64,
  className,
}: AnimatedConnectorProps) {
  const reduceMotion = useMotionPreference();
  const isHorizontal = orientation === "horizontal";
  const width = isHorizontal ? length : 2;
  const height = isHorizontal ? 2 : length;
  const x2 = isHorizontal ? width : width / 2;
  const y2 = isHorizontal ? height / 2 : height;
  const x1 = isHorizontal ? 0 : width / 2;
  const y1 = isHorizontal ? height / 2 : 0;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={cn("shrink-0", className)} aria-hidden>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-border-strong)" strokeWidth={2} />
      {reduceMotion ? (
        active && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-accent-500)" strokeWidth={2} />
      ) : (
        <motion.line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="var(--color-accent-500)"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: motionDuration.slower, ease: motionEase.standard }}
        />
      )}
    </svg>
  );
}
