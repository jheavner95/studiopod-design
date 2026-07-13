import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GridColumns = 2 | 3 | 4 | 6;
type GridGap = "sm" | "md" | "lg";

interface CardGridProps {
  children: ReactNode;
  columns?: GridColumns;
  gap?: GridGap;
  className?: string;
}

const columnsMap: Record<GridColumns, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  6: "sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
};

const gapMap: Record<GridGap, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

/** Responsive grid for card-based layouts (features, stats, pipeline steps). */
export function CardGrid({ children, columns = 3, gap = "md", className }: CardGridProps) {
  return <div className={cn("grid grid-cols-1", columnsMap[columns], gapMap[gap], className)}>{children}</div>;
}
