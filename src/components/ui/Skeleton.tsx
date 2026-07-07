import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * A loading placeholder block. Uses a plain CSS pulse (not framer-motion) so
 * it's covered by the same global `prefers-reduced-motion` rule as every
 * other animation, without needing its own reduced-motion branch.
 */
export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-surface-active", className)} />;
}
