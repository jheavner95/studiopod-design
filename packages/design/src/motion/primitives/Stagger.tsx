"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { transition, stagger as staggerTransition, resolveDistance } from "../utils";
import type { MotionDelay, MotionDuration, MotionDistance } from "../tokens";

interface StaggerGroupProps {
  each?: MotionDelay | number;
  delay?: MotionDelay | number;
  disabled?: boolean;
  repeat?: boolean;
  children: ReactNode;
  className?: string;
}

/** Parent for a set of StaggerItem children — reveals them in sequence. */
function StaggerGroup({ each = "short", delay = "none", disabled, repeat = false, children, className }: StaggerGroupProps) {
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const enabled = motionEnabled && !disabled;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "-80px" }}
      variants={{ hidden: {}, visible: { transition: staggerTransition({ each, delay, speed }) } }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  duration?: MotionDuration | number;
  distance?: MotionDistance | number;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

/** A single entry inside a StaggerGroup. Must be a direct child to inherit timing. */
function StaggerItem({ duration = "normal", distance = "small", disabled, children, className }: StaggerItemProps) {
  const motionEnabled = useMotionEnabled();
  const { speed, scale } = useMotion();
  const enabled = motionEnabled && !disabled;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  const offset = resolveDistance(distance, scale);

  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y: offset }, visible: { opacity: 1, y: 0 } }}
      transition={transition({ duration, ease: "enter", speed })}
    >
      {children}
    </motion.div>
  );
}

export { StaggerGroup, StaggerItem };

/** Compound form: <Stagger.Group><Stagger.Item /></Stagger.Group> */
export const Stagger = { Group: StaggerGroup, Item: StaggerItem };
