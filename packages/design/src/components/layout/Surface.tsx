import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STRUCTURAL_PADDING_MAP, type SurfacePadding } from "@/lib/spacing";

export type SurfaceElevation = "none" | "subtle" | "card" | "panel" | "floating";
/** Re-exported at this same path for compatibility — src/lib/spacing.ts is the canonical owner (DS-5A); Surface was merely the first public consumer this type's name was coined for. */
export type { SurfacePadding };

/**
 * Surface owns exactly one element — the one `as` names, a `div` by default —
 * so it exposes that element's native contract (UX-5.7A). `role` used to be
 * declared here on its own, which was the tell: the contract was being
 * rebuilt one attribute at a time as callers needed them, and everything
 * nobody had asked for yet was silently dropped.
 *
 * This is the base every panel-like component reduces to, so the whole layout
 * family inherits the correction rather than each member re-declaring it.
 */
export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
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

/** The base elevated-background treatment every panel-like component sits on — Card, Panel, and the rest of the design system's own surfaces all reduce to this. */
export function Surface({ children, className, elevation = "none", border = true, padding = "none", as: Component = "div", ...domProps }: SurfaceProps) {
  return (
    <Component
      {...domProps}
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
