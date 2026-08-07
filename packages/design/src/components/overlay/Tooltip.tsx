"use client";

import { cloneElement, isValidElement, useId, useRef, useState, type ReactElement, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion, useMotionEnabled } from "@/hooks";
import { transition } from "@/motion/utils";
import { Portal } from "./Portal";
import { useAnchoredPosition, type AnchorPlacement } from "./useAnchoredPosition";

interface TooltipProps {
  /** The label revealed on hover or focus — text only, per this system's scope. */
  label: string;
  children: ReactNode;
  placement?: AnchorPlacement;
  className?: string;
}

/**
 * Wraps a single trigger element and reveals a text label on hover or focus — never
 * hover-only, so keyboard users get the same information. Self-contained: visibility
 * is managed internally, not by the caller, matching how every real tooltip use in
 * this codebase (icon button labels, truncated text) just needs a label, not control.
 */
export function Tooltip({ label, children, placement = "top", className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const contentId = useId();

  const position = useAnchoredPosition(triggerRef, contentRef, visible, { placement, align: "center", offset: 6 });

  function show() {
    setVisible(true);
  }
  function hide() {
    setVisible(false);
  }

  // The visible tooltip text is the trigger's only description as far as assistive tech is
  // concerned — role="tooltip" on the portalled content alone doesn't reach it, since the
  // two elements aren't in the same DOM subtree. Clone the (single) trigger element to add
  // aria-describedby so screen readers announce the label, same as sighted hover/focus users get it.
  const existingDescribedBy = isValidElement(children)
    ? (children.props as { "aria-describedby"?: string })["aria-describedby"]
    : undefined;
  const describedBy = [existingDescribedBy, contentId].filter(Boolean).join(" ");
  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, { "aria-describedby": describedBy })
    : children;

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-flex"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onKeyDown={(event) => {
          if (event.key === "Escape") hide();
        }}
      >
        {trigger}
      </span>
      <Portal>
        <AnimatePresence>
          {visible ? (
            <motion.div
              ref={contentRef}
              id={contentId}
              role="tooltip"
              style={{ position: "fixed", top: position.top, left: position.left, zIndex: "var(--z-tooltip)" }}
              initial={motionEnabled ? { opacity: 0 } : undefined}
              animate={motionEnabled ? { opacity: 1 } : undefined}
              exit={motionEnabled ? { opacity: 0 } : undefined}
              transition={motionEnabled ? transition({ duration: "fast", ease: "standard", speed }) : undefined}
              className={cn(
                "pointer-events-none max-w-xs rounded-md border border-border-subtle bg-canvas-raised px-2.5 py-1.5 text-caption text-ink-primary shadow-[var(--shadow-lg)]",
                className,
              )}
            >
              {label}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Portal>
    </>
  );
}
