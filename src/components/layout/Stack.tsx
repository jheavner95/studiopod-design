import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "between";

interface StackProps {
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

/** Vertical composition — the single most repeated layout shape in this codebase. Nest freely; each Stack only ever owns its own gap. */
export function Stack({ children, className, gap = "md", align = "stretch", justify = "start", as: Component = "div" }: StackProps) {
  return (
    <Component className={cn("flex flex-col", gapMap[gap], alignMap[align], justifyMap[justify], className)}>
      {children}
    </Component>
  );
}
