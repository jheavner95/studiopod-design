import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type InlineGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type InlineAlign = "start" | "center" | "end" | "baseline" | "stretch";
export type InlineJustify = "start" | "center" | "end" | "between";

interface InlineProps {
  children: ReactNode;
  className?: string;
  gap?: InlineGap;
  align?: InlineAlign;
  justify?: InlineJustify;
  /** Wraps onto multiple lines when content overflows — the default for nearly every real usage (toolbars, badge rows, metadata). */
  wrap?: boolean;
  as?: ElementType;
}

const gapMap: Record<InlineGap, string> = {
  none: "gap-0",
  xs: "gap-1.5",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const alignMap: Record<InlineAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

const justifyMap: Record<InlineJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

/** Horizontal composition — toolbars, metadata rows, badge groups. Overflow is handled by wrapping, not by scrolling; use ScrollArea instead when a single unbroken row is required. */
export function Inline({ children, className, gap = "md", align = "center", justify = "start", wrap = true, as: Component = "div" }: InlineProps) {
  return (
    <Component
      className={cn("flex flex-row", wrap && "flex-wrap", gapMap[gap], alignMap[align], justifyMap[justify], className)}
    >
      {children}
    </Component>
  );
}
