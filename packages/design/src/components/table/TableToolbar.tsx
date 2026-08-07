"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Surface, Inline } from "@/components/layout";

interface TableToolbarProps {
  children: ReactNode;
  className?: string;
  /** Switches to an accent-tinted bulk-action bar — pass this when one or more rows are selected. */
  bulk?: boolean;
}

/** The region above a Table — search/filter controls normally, or a bulk-action bar once rows are selected. Built on Surface and Inline directly rather than re-declaring border/background/flex layout. */
export function TableToolbar({ children, className, bulk = false }: TableToolbarProps) {
  return (
    <Surface border elevation="none" padding="sm" className={cn("mb-3", bulk && "border-accent-500/40 bg-accent-soft/20", className)}>
      <Inline justify="between">{children}</Inline>
    </Surface>
  );
}
