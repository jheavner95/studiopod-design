"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { scaleInVariants } from "./variants";
import { motionDuration, motionEase } from "@/lib/tokens";
import { useMotionPreference } from "./MotionPreference";

interface ScaleInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  repeat?: boolean;
}

/** Opacity + scale entrance. Use for icons, badges, and nodes appearing "from nothing" rather than sliding in. */
export function ScaleIn({ children, className, delay = 0, repeat = false }: ScaleInProps) {
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
      variants={scaleInVariants}
      transition={{ duration: motionDuration.base, ease: motionEase.standard, delay }}
    >
      {children}
    </motion.div>
  );
}
