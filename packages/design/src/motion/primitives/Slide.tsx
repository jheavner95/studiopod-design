"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { transition, resolveDistance } from "../utils";
import type { MotionPrimitiveProps } from "./types";

export type SlideDirection = "up" | "down" | "left" | "right";

export interface SlideProps extends MotionPrimitiveProps {
  direction?: SlideDirection;
  repeat?: boolean;
}

/** Opacity + directional translate. The default entrance for cards, headings, sections. */
export function Slide({
  duration = "normal",
  delay = "none",
  distance = "medium",
  direction = "up",
  disabled,
  repeat = false,
  children,
  className,
}: SlideProps) {
  const motionEnabled = useMotionEnabled();
  const { speed, scale } = useMotion();
  const enabled = motionEnabled && !disabled;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  const offset = resolveDistance(distance, scale);
  const initial =
    direction === "left"
      ? { opacity: 0, x: offset }
      : direction === "right"
        ? { opacity: 0, x: -offset }
        : direction === "down"
          ? { opacity: 0, y: -offset }
          : { opacity: 0, y: offset };
  const animate =
    direction === "left" || direction === "right" ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: !repeat, margin: "-80px" }}
      transition={transition({ duration, delay, ease: "enter", speed })}
    >
      {children}
    </motion.div>
  );
}
