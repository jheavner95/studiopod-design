"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion, useMotionEnabled, useFocusTrap, useOutsideClick, useEscapeKey } from "@/hooks";
import { transition } from "@/motion/utils";
import { Portal } from "./Portal";
import { useAnchoredPosition, type AnchorPlacement, type AnchorAlign } from "./useAnchoredPosition";

interface PopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  placement?: AnchorPlacement;
  align?: AnchorAlign;
  className?: string;
}

/**
 * A small, anchored surface of contextual content dismissed by Escape or an outside
 * click, with focus moved in on open and restored to the trigger on close. Controlled
 * (open/onOpenChange), matching the rest of this design system's controlled-component
 * convention rather than managing hidden internal state the caller can't see.
 */
export function Popover({ open, onOpenChange, triggerRef, children, placement = "bottom", align = "start", className }: PopoverProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();

  const position = useAnchoredPosition(triggerRef, contentRef, open, { placement, align, offset: 8 });

  function close() {
    onOpenChange(false);
  }

  useFocusTrap(contentRef, open);
  useOutsideClick(contentRef, close, open);
  useEscapeKey(close, open);

  return (
    <Portal>
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={contentRef}
            role="dialog"
            tabIndex={-1}
            style={{ position: "fixed", top: position.top, left: position.left, zIndex: "var(--z-overlay)" }}
            initial={motionEnabled ? { opacity: 0, scale: 0.96 } : undefined}
            animate={motionEnabled ? { opacity: 1, scale: 1 } : undefined}
            exit={motionEnabled ? { opacity: 0, scale: 0.96 } : undefined}
            transition={motionEnabled ? transition({ duration: "fast", ease: "standard", speed }) : undefined}
            className={cn(
              "min-w-48 rounded-lg border border-border-subtle bg-surface p-3 shadow-[var(--shadow-lg)]",
              className,
            )}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Portal>
  );
}
