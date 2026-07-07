"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { transition } from "../utils";
import type { MotionDuration, MotionDelay } from "../tokens";

interface HeightRevealProps {
  open: boolean;
  duration?: MotionDuration | number;
  delay?: MotionDelay | number;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

/** Shared height-animation mechanism behind Collapse and Expand — one implementation, two names. */
export function HeightReveal({ open, duration = "normal", delay = "none", disabled, children, className }: HeightRevealProps) {
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const enabled = motionEnabled && !disabled;

  if (!enabled) {
    return open ? <div className={className}>{children}</div> : null;
  }

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={transition({ duration, delay, ease: "standard", speed })}
          className="overflow-hidden"
        >
          <div className={className}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
