"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedNode } from "./AnimatedNode";
import { progressLineVariants } from "@/components/motion/variants";
import { useMotionPreference } from "@/components/motion/MotionPreference";
import type { SystemStatus } from "./StatusIndicator";

interface ProgressRailStep {
  label: string;
  status: SystemStatus;
  icon?: ReactNode;
}

interface ProgressRailProps {
  steps: ProgressRailStep[];
  className?: string;
}

function getProgress(steps: ProgressRailStep[]) {
  if (steps.length <= 1) return steps.some((s) => s.status === "success" || s.status === "active") ? 1 : 0;
  let lastActiveIndex = -1;
  steps.forEach((s, i) => {
    if (s.status === "success" || s.status === "active") lastActiveIndex = i;
  });
  return lastActiveIndex <= 0 ? 0 : lastActiveIndex / (steps.length - 1);
}

/** A horizontal rail of nodes with an animated fill line showing overall pipeline progress. */
export function ProgressRail({ steps, className }: ProgressRailProps) {
  const reduceMotion = useMotionPreference();
  const progress = getProgress(steps);

  return (
    <div className={cn("relative flex w-full items-start justify-between", className)}>
      <div className="absolute left-0 right-0 top-4 h-0.5 bg-border" />
      {reduceMotion ? (
        <div
          className="absolute left-0 top-4 h-0.5 origin-left bg-accent-500"
          style={{ width: `${progress * 100}%` }}
        />
      ) : (
        <motion.div
          className="absolute left-0 top-4 h-0.5 w-full origin-left bg-accent-500"
          variants={progressLineVariants}
          initial="hidden"
          animate="visible"
          custom={progress}
        />
      )}
      {steps.map((step) => (
        <div key={step.label} className="relative z-[var(--z-raised)] flex flex-col items-center gap-2">
          <AnimatedNode status={step.status} icon={step.icon} size="sm" />
          <span className="text-caption text-ink-tertiary">{step.label}</span>
        </div>
      ))}
    </div>
  );
}
