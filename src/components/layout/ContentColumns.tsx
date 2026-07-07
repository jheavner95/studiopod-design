import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ColumnRatio = "even" | "narrow-wide" | "wide-narrow";
type ColumnGap = "sm" | "md" | "lg";
type ColumnAlign = "start" | "center";

interface ContentColumnsProps {
  primary: ReactNode;
  secondary: ReactNode;
  ratio?: ColumnRatio;
  gap?: ColumnGap;
  align?: ColumnAlign;
  className?: string;
}

const ratioMap: Record<ColumnRatio, string> = {
  even: "md:grid-cols-2",
  "narrow-wide": "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
  "wide-narrow": "md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]",
};

const gapMap: Record<ColumnGap, string> = {
  sm: "gap-8",
  md: "gap-12",
  lg: "gap-16",
};

const alignMap: Record<ColumnAlign, string> = {
  start: "items-start",
  center: "items-center",
};

/** Two-column layout that collapses to a single stacked column on mobile. */
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
