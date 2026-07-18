"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion, useMotionEnabled, useFocusTrap, useEscapeKey, useBodyLock } from "@/hooks";
import { transition } from "@/motion/utils";
import { Portal } from "./Portal";
import { DialogContext } from "./dialog-context";

export type DrawerEdge = "right" | "bottom";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  edge?: DrawerEdge;
  /** Override the auto-wired accessible name (DS-5K: prefer <DialogTitle>). */
  labelledBy?: string;
  /** Override the auto-wired description (DS-5K: prefer <DialogDescription>). */
  describedBy?: string;
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
 *
 * DS-5K: provides the SAME DialogContext as Dialog, so the exact same composition
 * parts (DialogHeader/Title/Description/Body/Footer/Close) compose inside a Drawer —
 * one implementation, no forked Drawer* set.
 */
export function Drawer({
  open,
  onOpenChange,
  children,
  edge = "right",
  labelledBy,
  describedBy,
  dismissible = true,
  className,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const offscreen = edgeOffscreen[edge];

  const generatedTitleId = useId();
  const generatedDescriptionId = useId();
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  function close() {
    onOpenChange(false);
  }

  useEscapeKey(close, open && dismissible);
  // useBodyLock must run before useFocusTrap — see Dialog.tsx for why the order matters.
  useBodyLock(open);
  useFocusTrap(panelRef, open);

  const ariaLabelledBy = labelledBy ?? (hasTitle ? generatedTitleId : undefined);
  const ariaDescribedBy = describedBy ?? (hasDescription ? generatedDescriptionId : undefined);

  return (
    <Portal>
      <DialogContext.Provider
        value={{
          titleId: generatedTitleId,
          descriptionId: generatedDescriptionId,
          registerTitle: setHasTitle,
          registerDescription: setHasDescription,
          close,
          dismissible,
        }}
      >
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
                aria-labelledby={ariaLabelledBy}
                aria-describedby={ariaDescribedBy}
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
      </DialogContext.Provider>
    </Portal>
  );
}
