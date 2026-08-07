"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { flow, resolveDistance } from "../utils";
import type { MotionPrimitiveProps } from "./types";

export interface PublishFlowProps extends MotionPrimitiveProps {
  /** Set false to freeze on the resting "published" frame. */
  active?: boolean;
}

/** A continuous "item being published" loop: rises, settles, fades, and repeats. */
export function PublishFlow({
  duration = "hero",
  distance = "medium",
  disabled,
  active = true,
  children,
  className,
}: PublishFlowProps) {
  const motionEnabled = useMotionEnabled();
  const { speed, scale } = useMotion();
  const enabled = motionEnabled && !disabled && active;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  const offset = resolveDistance(distance, scale);

  return (
    <motion.div
      className={className}
      animate={{ y: [offset, 0, 0, -offset], opacity: [0, 1, 1, 0] }}
      transition={{
        ...flow({ duration, speed }),
        times: [0, 0.25, 0.75, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
