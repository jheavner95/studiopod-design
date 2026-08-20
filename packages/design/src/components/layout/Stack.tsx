import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "between";

/**
 * Stack owns one element — the one `as` names — and exposes its native
 * contract (UX-5.7A). It was closed, and UIP-3F is the record of what that
 * cost: two `data-*` test hooks were dropped at render, found by reading the
 * served HTML, and worked around with a wrapper `div`.
 */
export interface StackProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  as?: ElementType;
}

const gapMap: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-1.5",
  sm: "gap-3",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

const alignMap: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

/**
 * Vertical composition — the single most repeated layout shape in this
 * codebase. Nest freely; each Stack only ever owns its own gap.
 *
 * DS-5A: Stack's gap scale runs looser than Inline's at every shared level
 * (e.g. `md` is gap-6 here vs. gap-4 there) — audited and kept as a
 * deliberate difference, not drift: stacked vertical blocks read as more
 * separate content than items sitting in a horizontal row, so the same
 * named level earning more breathing room here is the intended contrast,
 * not two components that should agree. See
 * docs/engineering-notes/14-spacing-consolidation.md.
 */
export function Stack({ children, className, gap = "md", align = "stretch", justify = "start", as: Component = "div", ...domProps }: StackProps) {
  return (
    <Component {...domProps} className={cn("flex flex-col", gapMap[gap], alignMap[align], justifyMap[justify], className)}>
      {children}
    </Component>
  );
}
