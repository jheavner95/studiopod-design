"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { motionDuration, motionEase } from "@/lib/tokens";
import { useMotionPreference } from "@/components/motion/MotionPreference";

interface ExpandableProps {
  /** Full header content — consumer controls layout (icon, label, chevron all live here). */
  trigger: ReactNode;
  children: ReactNode;
  /** Controlled open state. Omit to let Expandable manage its own state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

/**
 * A single collapsible region: click the trigger, the content smoothly
 * expands/collapses. Shared by WorkflowComposition's step details and
 * FAQComposition's accordion so the expand animation isn't reimplemented
 * twice. Falls back to an instant show/hide under reduced motion.
 */
export function Expandable({
  trigger,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  triggerClassName,
  contentClassName,
}: ExpandableProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const reduceMotion = useMotionPreference();

  function toggle() {
    const next = !isOpen;
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        className={cn("focus-ring flex w-full items-center gap-3 text-left", triggerClassName)}
      >
        {trigger}
      </button>
      {reduceMotion ? (
        isOpen && <div className={contentClassName}>{children}</div>
      ) : (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: motionDuration.base, ease: motionEase.standard }}
              className="overflow-hidden"
            >
              <div className={contentClassName}>{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
