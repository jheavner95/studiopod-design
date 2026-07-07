"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { pulse as pulseVariants } from "../utils";
import type { MotionPrimitiveProps } from "./types";

export interface PulseProps extends MotionPrimitiveProps {
  /** Set false to render children statically — a completed/idle state shouldn't feel "live". */
  active?: boolean;
}

/** A gentle looping breathing effect (scale + opacity). Marks something as live or in-progress. */
export function Pulse({ duration = "hero", distance = "small", disabled, active = true, children, className }: PulseProps) {
  const motionEnabled = useMotionEnabled();
  const { speed, scale } = useMotion();
  const enabled = motionEnabled && !disabled && active;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={pulseVariants({ duration, amount: distance, speed, scale })}
      animate="idle"
    >
      {children}
    </motion.div>
  );
}
