"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { transition } from "../utils";
import type { MotionDuration } from "../tokens";

export interface ConnectorFlowProps {
  orientation?: "horizontal" | "vertical";
  /** When true, an accent line draws in over the base line to signal live data flow. */
  active?: boolean;
  length?: number;
  duration?: MotionDuration | number;
  disabled?: boolean;
  className?: string;
}

/** A line between two points whose accent overlay draws in when active — the generic connector mechanism. */
export function ConnectorFlow({
  orientation = "horizontal",
  active = false,
  length = 64,
  duration = "slow",
  disabled,
  className,
}: ConnectorFlowProps) {
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const enabled = motionEnabled && !disabled;
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
      {!enabled ? (
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
          transition={transition({ duration, ease: "flow", speed })}
        />
      )}
    </svg>
  );
}
