"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeInVariants } from "./variants";
import { motionDuration, motionEase } from "@/lib/tokens";
import { useMotionPreference } from "./MotionPreference";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animate every time it scrolls into view, not just the first time. */
  repeat?: boolean;
}

/** Opacity-only entrance, triggered when the element scrolls into view. */
export function FadeIn({ children, className, delay = 0, repeat = false }: FadeInProps) {
  const reduceMotion = useMotionPreference();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "-80px" }}
      variants={fadeInVariants}
      transition={{ duration: motionDuration.base, ease: motionEase.standard, delay }}
    >
      {children}
    </motion.div>
  );
}
