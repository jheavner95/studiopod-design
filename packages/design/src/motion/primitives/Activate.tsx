"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { accentRgb, successRgb } from "@/lib/tokens";
import { transition } from "../utils";
import type { MotionPrimitiveProps } from "./types";

export type ActivateState = "inactive" | "active" | "complete";

export interface ActivateProps extends MotionPrimitiveProps {
  state?: ActivateState;
}

const ringColor: Record<ActivateState, string> = {
  inactive: `rgba(${accentRgb}, 0)`,
  active: `rgba(${accentRgb}, 0.18)`,
  complete: `rgba(${successRgb}, 0)`,
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
    return <div className={cn("rounded-full", className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("rounded-full", className)}
      animate={{ scale: scaleFor[state], boxShadow: `0 0 0 6px ${ringColor[state]}` }}
      transition={transition({ duration, ease: "standard", speed })}
    >
      {children}
    </motion.div>
  );
}
