import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GridStrategy = 1 | 2 | 3 | 4 | 5 | 6 | "auto-fit" | "auto-fill";
export type GridGap = "sm" | "md" | "lg";

interface GridProps {
  children: ReactNode;
  className?: string;
  /** A fixed responsive column count (matches CardGrid's own breakpoints), or an auto-fit/auto-fill track driven by minChildWidth. */
  columns?: GridStrategy;
  /** Only used when columns is "auto-fit" or "auto-fill" — the minimum width a column may shrink to before wrapping to a new row. */
  minChildWidth?: string;
  gap?: GridGap;
}

const fixedColumnsMap: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-6",
};

/** Exported so CardGrid — a fixed-breakpoint specialization of this same grid — shares one gap scale instead of redeclaring an identical copy. */
export const gapMap: Record<GridGap, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

/**
 * General-purpose CSS Grid. Auto-fit collapses empty tracks (fewer items
 * stay wide); auto-fill preserves empty tracks (fewer items stay
 * left-aligned at their target width) — the same distinction CSS itself
 * draws. Use CardGrid instead when the content is specifically a card
 * collection at one of its four fixed breakpoints.
 */
export function Grid({ children, className, columns = 3, minChildWidth = "240px", gap = "md" }: GridProps) {
  const isAuto = columns === "auto-fit" || columns === "auto-fill";
  return (
    <div
      className={cn("grid", !isAuto && fixedColumnsMap[columns], gapMap[gap], className)}
      style={isAuto ? { gridTemplateColumns: `repeat(${columns}, minmax(${minChildWidth}, 1fr))` } : undefined}
    >
      {children}
    </div>
  );
}
