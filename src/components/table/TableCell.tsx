"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTableDensity, densityPaddingMap } from "./Table";

type CellAlign = "left" | "center" | "right";

interface TableCellProps {
  children?: ReactNode;
  className?: string;
  align?: CellAlign;
  /** Keeps content on one line — for short, predictable values (dates, counts) that should never wrap. */
  nowrap?: boolean;
  /** Truncates with an ellipsis instead of wrapping — pair with a title attribute or Tooltip for the full value. */
  truncate?: boolean;
  colSpan?: number;
  title?: string;
}

const alignMap: Record<CellAlign, string> = { left: "text-left", center: "text-center", right: "text-right" };

export function TableCell({ children, className, align = "left", nowrap = false, truncate = false, colSpan, title }: TableCellProps) {
  const density = useTableDensity();
  return (
    <td
      colSpan={colSpan}
      title={title}
      className={cn(
        densityPaddingMap[density],
        alignMap[align],
        "text-body-sm text-ink-secondary",
        truncate ? "max-w-0 overflow-hidden text-ellipsis whitespace-nowrap" : cn("min-w-0 break-words", nowrap && "whitespace-nowrap"),
        className,
      )}
    >
      {children}
    </td>
  );
}
