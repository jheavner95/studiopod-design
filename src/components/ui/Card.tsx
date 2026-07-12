import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardPadding = "sm" | "md" | "lg";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: CardPadding;
  as?: ElementType;
  /** Adds hover lift + border emphasis — use for clickable/linkable cards. */
  interactive?: boolean;
}

const paddingMap: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

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
        paddingMap[padding],
        interactive && INTERACTIVE_CARD_CLASSES,
        className,
      )}
    >
      {children}
    </Component>
  );
}
