import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STRUCTURAL_PADDING_MAP, type SurfacePadding } from "@/lib/spacing";

export type SurfaceElevation = "none" | "subtle" | "card" | "panel" | "floating";
/** Re-exported at this same path for compatibility — src/lib/spacing.ts is the canonical owner (DS-5A); Surface was merely the first public consumer this type's name was coined for. */
export type { SurfacePadding };

export interface SurfaceProps {
  children: ReactNode;
  className?: string;
  elevation?: SurfaceElevation;
  /** Off for a bare background with no boundary — most usages want this on. */
  border?: boolean;
  padding?: SurfacePadding;
  as?: ElementType;
  role?: string;
}

const elevationMap: Record<SurfaceElevation, string> = {
  none: "shadow-none",
  subtle: "shadow-subtle",
  card: "shadow-card",
  panel: "shadow-panel",
  floating: "shadow-floating",
};

/** The base elevated-background treatment every panel-like component sits on — Card, Panel, and the rest of the design system's own surfaces all reduce to this. */
export function Surface({ children, className, elevation = "none", border = true, padding = "none", as: Component = "div", role }: SurfaceProps) {
  return (
    <Component
      role={role}
      className={cn(
        "rounded-lg bg-surface",
        border && "border border-border-subtle",
        elevationMap[elevation],
        STRUCTURAL_PADDING_MAP[padding],
        className,
      )}
    >
      {children}
    </Component>
  );
}
