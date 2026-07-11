"use client";

import { useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion, useMotionEnabled, useFocusTrap, useEscapeKey, useBodyLock } from "@/hooks";
import { transition } from "@/motion/utils";
import { Portal } from "./Portal";

export type DialogSize = "sm" | "md" | "full";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  /** sm for a Confirmation dialog, md (default) for a Form, full for Full content. */
  size?: DialogSize;
  labelledBy?: string;
  describedBy?: string;
  /** Closes on a backdrop click — on by default, matching this system's other dismissible overlays. */
  dismissible?: boolean;
  className?: string;
}

const sizeMap: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  full: "h-[calc(100%-2rem)] max-h-[840px] w-[calc(100%-2rem)] max-w-4xl",
};

/**
 * A focused, modal surface that blocks the rest of the page until dismissed — focus
 * trapped inside while open (Entering/Open/Exiting handled by AnimatePresence's own
 * mount lifecycle), Escape closes, and focus returns to whatever triggered it on close.
 */
export function Dialog({ open, onOpenChange, children, size = "md", labelledBy, describedBy, dismissible = true, className }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();

  function close() {
    onOpenChange(false);
  }

  useEscapeKey(close, open);
  // useBodyLock must run before useFocusTrap so its cleanup (removing #app-root's
  // inert attribute) fires before focus-trap's cleanup tries to restore focus — an
  // element inside an inert subtree cannot receive focus, so the reverse order
  // silently drops focus restoration to <body>.
  useBodyLock(open);
  useFocusTrap(panelRef, open);

  return (
    <Portal>
      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0" style={{ zIndex: "var(--z-modal)" }}>
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={motionEnabled ? { opacity: 0 } : undefined}
              animate={motionEnabled ? { opacity: 1 } : undefined}
              exit={motionEnabled ? { opacity: 0 } : undefined}
              transition={motionEnabled ? transition({ duration: "fast", ease: "standard", speed }) : undefined}
              onClick={dismissible ? close : undefined}
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                aria-describedby={describedBy}
                tabIndex={-1}
                initial={motionEnabled ? { opacity: 0, scale: 0.95, y: 8 } : undefined}
                animate={motionEnabled ? { opacity: 1, scale: 1, y: 0 } : undefined}
                exit={motionEnabled ? { opacity: 0, scale: 0.95, y: 8 } : undefined}
                transition={motionEnabled ? transition({ duration: "normal", ease: "enter", speed }) : undefined}
                className={cn(
                  "flex w-full flex-col gap-4 overflow-y-auto rounded-lg border border-border-subtle bg-surface p-6 shadow-[var(--shadow-modal)]",
                  sizeMap[size],
                  className,
                )}
              >
                {children}
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </Portal>
  );
}
