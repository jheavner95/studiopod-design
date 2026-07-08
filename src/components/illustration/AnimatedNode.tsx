"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { activeNodeVariants } from "@/components/motion/variants";
import { useMotionPreference } from "@/components/motion/MotionPreference";
import type { SystemStatus } from "./StatusIndicator";

interface AnimatedNodeProps {
  status?: SystemStatus;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: "size-8", md: "size-12", lg: "size-16" };

const toneStyles: Record<SystemStatus, string> = {
  idle: "border-border bg-surface text-ink-tertiary",
  active: "border-accent-500 bg-accent-soft text-accent-400",
  success: "border-success/40 bg-success-soft text-success",
  warning: "border-warning/40 bg-warning-soft text-warning",
  error: "border-error/40 bg-error-soft text-error",
};

/** A single node in a system diagram — the atomic building block for PipelineStep and ProgressRail. */
export function AnimatedNode({ status = "idle", icon, size = "md", className }: AnimatedNodeProps) {
  const reduceMotion = useMotionPreference();
  const variantState = status === "active" ? "active" : status === "success" ? "complete" : "inactive";

  const content = (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border",
        sizeMap[size],
        toneStyles[status],
        className,
      )}
    >
      {icon}
    </div>
  );

  if (reduceMotion) return content;

  return (
    <motion.div
      className="inline-flex rounded-full"
      variants={activeNodeVariants}
      animate={variantState}
      initial="inactive"
    >
      {content}
    </motion.div>
  );
}
