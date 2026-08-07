"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { slideUpVariants } from "./variants";
import { motionDuration, motionEase } from "@/lib/tokens";
import { useMotionPreference } from "./MotionPreference";

interface SlideUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  repeat?: boolean;
}

/** Opacity + upward-settle entrance. Default choice for cards, headings, sections. */
export function SlideUp({ children, className, delay = 0, repeat = false }: SlideUpProps) {
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
      variants={slideUpVariants}
      transition={{ duration: motionDuration.slow, ease: motionEase.standard, delay }}
    >
      {children}
    </motion.div>
  );
}
