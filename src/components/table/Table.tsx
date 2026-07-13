"use client";

import { createContext, useContext, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Surface, ScrollArea } from "@/components/layout";

export type TableDensity = "comfortable" | "compact" | "dense";

const TableDensityContext = createContext<TableDensity>("comfortable");

/** Read by TableCell/TableHead/TableStatusCell/TableActionCell/TableSelectionCell so density is set once, at the root, instead of threaded through every cell by hand. */
export function useTableDensity(): TableDensity {
  return useContext(TableDensityContext);
}

interface TableProps {
  children: ReactNode;
  className?: string;
  minWidth?: string;
  density?: TableDensity;
  /** Announced to screen readers; visually hidden. Every Table should have one. */
  caption?: ReactNode;
}

/**
 * The root of the foundation table system. A Surface holding a
 * horizontally-scrolling ScrollArea around the native <table> — every
 * table in StudioPOD gets independent horizontal scroll and consistent
 * borders from the layout primitives directly, instead of re-deriving
 * overflow-x-auto and rounded-lg border border-border-subtle by hand.
 */
export function Table({ children, className, minWidth = "640px", density = "comfortable", caption }: TableProps) {
  return (
    <TableDensityContext.Provider value={density}>
      <Surface border elevation="none" className="overflow-hidden">
        <ScrollArea direction="horizontal">
          <table className={cn("w-full border-collapse text-left", className)} style={{ minWidth }}>
            {caption ? <caption className="sr-only">{caption}</caption> : null}
            {children}
          </table>
        </ScrollArea>
      </Surface>
    </TableDensityContext.Provider>
  );
}

export const densityPaddingMap: Record<TableDensity, string> = {
  comfortable: "px-4 py-3",
  compact: "px-3 py-2",
  dense: "px-2 py-1.5",
};

/**
 * Header cells share body cells' horizontal padding (columns must stay aligned) but use a
 * shorter vertical measure — the header row is metadata about the data, not a row of it, and
 * should read as a lighter band above the denser body rather than matching its height 1:1.
 */
export const headerDensityPaddingMap: Record<TableDensity, string> = {
  comfortable: "px-4 py-2",
  compact: "px-3 py-1.5",
  dense: "px-2 py-1",
};
