import type { ReactNode } from "react";
import { Inline, type InlineGap } from "./Inline";

interface ClusterProps {
  children: ReactNode;
  className?: string;
  gap?: InlineGap;
}

/**
 * A wrapping group of discrete, same-weight items — tags, filter chips,
 * badge collections. Built directly on Inline (always wrapping, centered)
 * rather than reimplementing the same flex-wrap logic a second time; the
 * distinction from Inline is purpose (a cluster of peers, not a toolbar
 * or metadata row), not mechanics.
 */
export function Cluster({ children, className, gap = "sm" }: ClusterProps) {
  return (
    <Inline gap={gap} align="center" wrap className={className}>
      {children}
    </Inline>
  );
}
