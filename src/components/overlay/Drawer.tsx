"use client";

import { useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion, useMotionEnabled, useFocusTrap, useEscapeKey } from "@/hooks";
import { transition } from "@/motion/utils";
import { Portal } from "./Portal";

export type DrawerEdge = "right" | "bottom";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  edge?: DrawerEdge;
  labelledBy?: string;
  dismissible?: boolean;
  className?: string;
}

const edgePanelClass: Record<DrawerEdge, string> = {
  right: "inset-y-0 right-0 h-full w-full max-w-md",
  bottom: "inset-x-0 bottom-0 max-h-[85vh] w-full",
};

const edgeOffscreen: Record<DrawerEdge, { x?: string; y?: string }> = {
  right: { x: "100%" },
  bottom: { y: "100%" },
};

/**
 * A panel that slides in from an edge without fully blocking the page behind it —
 * same focus-trap/Escape/backdrop machinery as Dialog, just docked to an edge and
 * translating in along one axis instead of scaling from center.
 */
export function Drawer({ open, onOpenChange, children, edge = "right", labelledBy, dismissible = true, className }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const offscreen = edgeOffscreen[edge];

  function close() {
    onOpenChange(false);
  }

  useFocusTrap(panelRef, open);
  useEscapeKey(close, open);

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
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelledBy}
              tabIndex={-1}
              initial={motionEnabled ? { opacity: 1, ...offscreen } : undefined}
              animate={motionEnabled ? { opacity: 1, x: 0, y: 0 } : undefined}
              exit={motionEnabled ? { opacity: 1, ...offscreen } : undefined}
              transition={motionEnabled ? transition({ duration: "normal", ease: "enter", speed }) : undefined}
              className={cn(
                "absolute flex flex-col gap-4 overflow-y-auto border-border-subtle bg-surface p-6 shadow-[var(--shadow-modal)]",
                edge === "right" ? "border-l" : "border-t",
                edgePanelClass[edge],
                className,
              )}
            >
              {children}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </Portal>
  );
}
