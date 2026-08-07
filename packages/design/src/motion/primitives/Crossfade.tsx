"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { transition } from "../utils";
import type { MotionPrimitiveProps } from "./types";

export interface CrossfadeProps extends MotionPrimitiveProps {
  /** Changing this key fades the old content out and the new content in, in place. */
  contentKey: string | number;
}

/** Swaps between differently-keyed content with a fade, instead of both states existing at once (e.g. tab panels). */
export function Crossfade({ contentKey, duration = "fast", delay = "none", disabled, children, className }: CrossfadeProps) {
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const enabled = motionEnabled && !disabled;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={contentKey}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition({ duration, delay, ease: "standard", speed })}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
