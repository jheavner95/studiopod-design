"use client";

import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useTableDensity, densityPaddingMap } from "./Table";
import type { StatusTone } from "@/lib/tone";

interface TableStatusCellProps {
  label: string;
  tone?: StatusTone;
  className?: string;
}

/** A status Badge in its own cell — status gets a dedicated column rather than being buried inside a text cell, so it stays scannable down the whole column. */
export function TableStatusCell({ label, tone = "neutral", className }: TableStatusCellProps) {
  const density = useTableDensity();
  return (
    <td className={cn(densityPaddingMap[density], className)}>
      <Badge tone={tone} size="sm" className="w-fit whitespace-nowrap">
        {label}
      </Badge>
    </td>
  );
}
