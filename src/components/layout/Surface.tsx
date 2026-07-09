import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SurfaceElevation = "none" | "subtle" | "card" | "panel" | "floating";
export type SurfacePadding = "none" | "sm" | "md" | "lg";

interface SurfaceProps {
  children: ReactNode;
  className?: string;
  elevation?: SurfaceElevation;
  /** Off for a bare background with no boundary — most usages want this on. */
  border?: boolean;
  padding?: SurfacePadding;
  as?: ElementType;
}

const elevationMap: Record<SurfaceElevation, string> = {
  none: "shadow-none",
  subtle: "shadow-subtle",
  card: "shadow-card",
  panel: "shadow-panel",
  floating: "shadow-floating",
};

const paddingMap: Record<SurfacePadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

/** The base elevated-background treatment every panel-like component sits on — Card, Panel, and the rest of the design system's own surfaces all reduce to this. */
export function Surface({ children, className, elevation = "none", border = true, padding = "none", as: Component = "div" }: SurfaceProps) {
  return (
    <Component
      className={cn(
        "rounded-lg bg-surface",
        border && "border border-border-subtle",
        elevationMap[elevation],
        paddingMap[padding],
        className,
      )}
    >
      {children}
    </Component>
  );
}
