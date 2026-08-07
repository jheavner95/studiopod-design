import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ScrollDirection = "vertical" | "horizontal" | "both";

export interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
  direction?: ScrollDirection;
  /** Caps the region's height so vertical scrolling has something to do — omit to let it grow with its container. */
  maxHeight?: string;
}

const directionMap: Record<ScrollDirection, string> = {
  vertical: "overflow-y-auto overflow-x-hidden",
  horizontal: "overflow-x-auto overflow-y-hidden",
  both: "overflow-auto",
};

/**
 * A region that scrolls independently of the page — the same pattern every table in this
 * design system already reaches for by hand (overflow-x-auto), generalized and given a
 * vertical/both mode too. tabIndex={0} makes the region itself a keyboard stop so arrow keys
 * can scroll it even when its content has no focusable children of its own (e.g. a
 * horizontally-scrolling table with a leading column of plain text) — without it, a
 * keyboard-only user has no way to reach content that only overflow-x-auto exposes to a mouse.
 */
export function ScrollArea({ children, className, direction = "vertical", maxHeight }: ScrollAreaProps) {
  return (
    <div
      tabIndex={0}
      className={cn("focus-ring overscroll-contain", directionMap[direction], className)}
      style={maxHeight ? { maxHeight } : undefined}
    >
      {children}
    </div>
  );
}
