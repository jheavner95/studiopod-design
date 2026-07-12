"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { motionDuration, motionEase } from "@/lib/tokens";
import { useMotionPreference } from "@/components/motion/MotionPreference";

/**
 * Re-mounts on every navigation (Next's template.tsx contract), giving each
 * route a brief, consistent entrance instead of a hard cut. GlobalNav lives
 * in layout.tsx, outside this file, so the persistent chrome never re-animates
 * and scroll position resets exactly as it would without this file present —
 * this only softens how the new page's content appears, entrance-only, no
 * exit animation to avoid delaying the browser's own scroll-reset.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = useMotionPreference();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionDuration.fast, ease: motionEase.standard }}
    >
      {children}
    </motion.div>
  );
}
