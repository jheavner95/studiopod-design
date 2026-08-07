import { cn } from "@/lib/utils";

export type SkeletonVariant = "block" | "text" | "circle";

interface SkeletonProps {
  /** block (default, unchanged): whatever shape className gives it. text: a single line, rounded like text. circle: a perfect circle for avatar-shaped placeholders. */
  variant?: SkeletonVariant;
  className?: string;
}

const VARIANT_CLASS: Record<SkeletonVariant, string> = {
  block: "rounded-md",
  text: "h-3 rounded-full",
  circle: "aspect-square rounded-full",
};

/**
 * A loading placeholder block. Uses a plain CSS pulse (not framer-motion) so
 * it's covered by the same global `prefers-reduced-motion` rule as every
 * other animation, without needing its own reduced-motion branch.
 */
export function Skeleton({ variant = "block", className }: SkeletonProps) {
  return <div className={cn("animate-pulse bg-surface-active", VARIANT_CLASS[variant], className)} />;
}
