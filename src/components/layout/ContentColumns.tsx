import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ContentColumnsRatio = "even" | "narrow-wide" | "wide-narrow";
export type ContentColumnsGap = "sm" | "md" | "lg";
export type ContentColumnsAlign = "start" | "center";

export interface ContentColumnsProps {
  primary: ReactNode;
  secondary: ReactNode;
  ratio?: ContentColumnsRatio;
  gap?: ContentColumnsGap;
  align?: ContentColumnsAlign;
  className?: string;
}

const ratioMap: Record<ContentColumnsRatio, string> = {
  even: "md:grid-cols-2",
  "narrow-wide": "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
  "wide-narrow": "md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]",
};

const gapMap: Record<ContentColumnsGap, string> = {
  sm: "gap-8",
  md: "gap-12",
  lg: "gap-16",
};

const alignMap: Record<ContentColumnsAlign, string> = {
  start: "items-start",
  center: "items-center",
};

/**
 * Two-column layout that collapses to a single stacked column on mobile.
 *
 * DS-5A: its gap scale (gap-8/12/16) sits in a categorically larger
 * register than Stack/Inline/Grid's item-level gaps (gap-2 through gap-12)
 * — audited and kept as intentional, not drift: this is page-level column
 * separation (two major content blocks), not item-level spacing, and
 * warrants more breathing room at every named level. See
 * docs/engineering-notes/14-spacing-consolidation.md.
 */
export function ContentColumns({
  primary,
  secondary,
  ratio = "even",
  gap = "md",
  align = "center",
  className,
}: ContentColumnsProps) {
  return (
    <div className={cn("grid grid-cols-1", ratioMap[ratio], gapMap[gap], alignMap[align], className)}>
      <div>{primary}</div>
      <div>{secondary}</div>
    </div>
  );
}
