"use client";

import type { ReactNode } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTableDensity, densityPaddingMap } from "./Table";

type CellAlign = "left" | "center" | "right";
export type SortDirection = "asc" | "desc" | null;

interface TableHeadProps {
  children: ReactNode;
  className?: string;
  align?: CellAlign;
  scope?: "col" | "row";
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
}

const alignMap: Record<CellAlign, string> = { left: "text-left", center: "text-center", right: "text-right" };

/** A column header cell, optionally sortable. Clicking cycles the sort — the demo in the Interactive Gallery below wires this to real state, not just a static icon. */
export function TableHead({ children, className, align = "left", scope = "col", sortable = false, sortDirection = null, onSort }: TableHeadProps) {
  const density = useTableDensity();
  const Icon = sortDirection === "asc" ? ArrowUp : sortDirection === "desc" ? ArrowDown : ArrowUpDown;

  return (
    <th
      scope={scope}
      aria-sort={sortable ? (sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : "none") : undefined}
      className={cn(densityPaddingMap[density], alignMap[align], "whitespace-nowrap text-metadata text-ink-tertiary", className)}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className="focus-ring inline-flex items-center gap-1 rounded-md text-metadata text-ink-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ink-secondary"
        >
          {children}
          <Icon className="size-3" aria-hidden />
        </button>
      ) : (
        children
      )}
    </th>
  );
}
