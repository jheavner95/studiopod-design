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
  /** Points at an id already in `children` (a heading, a field label) — same convention as Dialog/Drawer's own labelledBy. Prefer this when the content already has visible text that names it. */
  labelledBy?: string;
  /** For content with no natural heading to point labelledBy at — a plain string name for the popover, same role a Dialog title fills. Every real Popover use in this codebase (a filter's checkbox list, a column picker) needs one or the other, since role="dialog" with neither leaves screen readers announcing an unnamed dialog. */
  "aria-label"?: string;
  className?: string;
}

/**
 * A small, anchored surface of contextual content dismissed by Escape or an outside
 * click, with focus moved in on open and restored to the trigger on close. Controlled
 * (open/onOpenChange), matching the rest of this design system's controlled-component
 * convention rather than managing hidden internal state the caller can't see.
 */
export function Popover({
  open,
  onOpenChange,
  triggerRef,
  children,
  placement = "bottom",
  align = "start",
  labelledBy,
  "aria-label": ariaLabel,
  className,
}: PopoverProps) {
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
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-label={labelledBy ? undefined : ariaLabel}
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
