"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { transition } from "../utils";
import type { MotionPrimitiveProps } from "./types";

export interface HighlightProps extends MotionPrimitiveProps {
  /** Any value — changing it (by !==) replays the highlight flash once. */
  trigger?: unknown;
}

/** Flashes a brief accent ring once, whenever `trigger` changes — for "this just updated" moments. */
export function Highlight({ duration = "slow", delay = "none", disabled, trigger, children, className }: HighlightProps) {
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const enabled = motionEnabled && !disabled;
  const [flashKey, setFlashKey] = useState(0);
  const previous = useRef(trigger);

  useEffect(() => {
    if (trigger === previous.current) return;
    previous.current = trigger;
    setFlashKey((key) => key + 1);
  }, [trigger]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={flashKey}
      className={className}
      initial={flashKey === 0 ? false : { boxShadow: "0 0 0 4px rgba(91, 127, 255, 0.4)" }}
      animate={{ boxShadow: "0 0 0 0 rgba(91, 127, 255, 0)" }}
      transition={transition({ duration, delay, ease: "emphasis", speed })}
      style={{ borderRadius: "inherit" }}
    >
      {children}
    </motion.div>
  );
}
