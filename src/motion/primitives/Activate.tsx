"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { transition } from "../utils";
import type { MotionPrimitiveProps } from "./types";

export type ActivateState = "inactive" | "active" | "complete";

export interface ActivateProps extends MotionPrimitiveProps {
  state?: ActivateState;
}

const ringColor: Record<ActivateState, string> = {
  inactive: "rgba(91, 127, 255, 0)",
  active: "rgba(91, 127, 255, 0.18)",
  complete: "rgba(52, 211, 153, 0)",
};

const scaleFor: Record<ActivateState, number> = {
  inactive: 1,
  active: 1.05,
  complete: 1,
};

/** A state-transition wrapper for system nodes moving between inactive/active/complete — scale + glow feedback. */
export function Activate({ duration = "fast", disabled, state = "inactive", children, className }: ActivateProps) {
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const enabled = motionEnabled && !disabled;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ scale: scaleFor[state], boxShadow: `0 0 0 6px ${ringColor[state]}` }}
      transition={transition({ duration, ease: "standard", speed })}
    >
      {children}
    </motion.div>
  );
}
