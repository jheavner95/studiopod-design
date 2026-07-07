"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { transition } from "../utils";
import type { MotionPrimitiveProps } from "./types";

export interface FadeProps extends MotionPrimitiveProps {
  /** Re-animate every time it scrolls into view, not just the first time. */
  repeat?: boolean;
}

/** Opacity-only entrance. Use for text and metadata that shouldn't shift position. */
export function Fade({ duration = "normal", delay = "none", disabled, repeat = false, children, className }: FadeProps) {
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const enabled = motionEnabled && !disabled;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: !repeat, margin: "-80px" }}
      transition={transition({ duration, delay, ease: "enter", speed })}
    >
      {children}
    </motion.div>
  );
}
