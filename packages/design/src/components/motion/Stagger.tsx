"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { staggerContainerVariants, slideUpVariants } from "./variants";
import { motionDuration, motionEase } from "@/lib/tokens";
import { useMotionPreference } from "./MotionPreference";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  repeat?: boolean;
}

/** Parent for a set of <StaggerItem> children — reveals them in sequence. */
export function StaggerGroup({ children, className, repeat = false }: StaggerGroupProps) {
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
      variants={staggerContainerVariants}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/** A single entry inside a <StaggerGroup>. Must be a direct child to inherit timing. */
export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduceMotion = useMotionPreference();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={slideUpVariants}
      transition={{ duration: motionDuration.slow, ease: motionEase.standard }}
    >
      {children}
    </motion.div>
  );
}
