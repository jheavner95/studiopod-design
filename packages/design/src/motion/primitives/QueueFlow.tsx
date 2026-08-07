"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { flow, resolveDuration } from "../utils";
import type { MotionDuration } from "../tokens";

export interface QueueFlowProps {
  /** How many items appear to be moving through the queue at once. */
  count?: number;
  /** Pixel width of the track — GPU-friendly `x` transforms need a concrete distance, not a measured DOM box. */
  trackWidth?: number;
  duration?: MotionDuration | number;
  disabled?: boolean;
  className?: string;
  dotClassName?: string;
}

/** A continuous stream of items moving along a track — represents work items flowing through a queue. */
export function QueueFlow({
  count = 4,
  trackWidth = 240,
  duration = "hero",
  disabled,
  className,
  dotClassName,
}: QueueFlowProps) {
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const enabled = motionEnabled && !disabled;
  const resolvedDuration = resolveDuration(duration, speed);

  return (
    <div
      className={cn("relative h-2 overflow-hidden rounded-full bg-border", className)}
      style={{ width: trackWidth }}
    >
      {Array.from({ length: count }).map((_, index) => {
        const phase = index / count;
        const dotClasses = cn("absolute top-0 size-2 rounded-full bg-accent-500", dotClassName);

        if (!enabled) {
          return <span key={index} className={dotClasses} style={{ transform: `translateX(${phase * trackWidth}px)` }} />;
        }

        return (
          <motion.span
            key={index}
            className={dotClasses}
            initial={{ x: -8 }}
            animate={{ x: trackWidth + 8 }}
            transition={{ ...flow({ duration, speed }), delay: resolvedDuration * phase }}
          />
        );
      })}
    </div>
  );
}
