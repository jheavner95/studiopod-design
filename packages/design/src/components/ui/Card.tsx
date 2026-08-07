import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STRUCTURAL_PADDING_MAP, type SurfacePadding } from "@/lib/spacing";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** DS-5A: widened from sm/md/lg to include "none", matching Surface/Panel's own padding vocabulary — Card shares their exact padding scale (it always has), so it shares their type too. Purely additive; every existing sm/md/lg usage is unaffected. */
  padding?: SurfacePadding;
  as?: ElementType;
  /** Adds hover lift + border emphasis — use for clickable/linkable cards. */
  interactive?: boolean;
}

/**
 * DS-8.1 Part 8 — the one interactive-surface treatment (elevation, border,
 * shadow, timing, easing) every clickable card shares. Exported so the rare
 * surface that can't use `Card interactive` directly (e.g. a `role="button"`
 * div that can't nest real buttons inside a real `<button>`) still gets the
 * identical classes instead of hand-copying them.
 */
export const INTERACTIVE_CARD_CLASSES =
  "transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md";

/** Atomic surface container. StatCard and FeatureCard both build on this. */
export function Card({ children, className, padding = "md", as: Component = "div", interactive = false }: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-lg border border-border bg-surface",
        STRUCTURAL_PADDING_MAP[padding],
        interactive && INTERACTIVE_CARD_CLASSES,
        className,
      )}
    >
      {children}
    </Component>
  );
}
