"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { transition, resolveScaleDelta } from "../utils";
import type { MotionPrimitiveProps } from "./types";

export interface ScaleProps extends MotionPrimitiveProps {
  repeat?: boolean;
}

/** Opacity + scale entrance. Use for icons, badges, and nodes appearing "from nothing" rather than sliding in. */
export function Scale({
  duration = "normal",
  delay = "none",
  distance = "medium",
  disabled,
  repeat = false,
  children,
  className,
}: ScaleProps) {
  const motionEnabled = useMotionEnabled();
  const { speed, scale } = useMotion();
  const enabled = motionEnabled && !disabled;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  const delta = resolveScaleDelta(distance, scale);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1 - delta }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: !repeat, margin: "-80px" }}
      transition={transition({ duration, delay, ease: "enter", speed })}
    >
      {children}
    </motion.div>
  );
}
