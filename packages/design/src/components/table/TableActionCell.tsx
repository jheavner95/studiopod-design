"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Inline } from "@/components/layout";
import { useTableDensity, densityPaddingMap } from "./Table";

interface TableActionCellProps {
  children: ReactNode;
  className?: string;
}

/** A right-aligned row of action triggers — pass Button (ghost, sm) elements as children. Cap at 2–3 visible actions (see Implementation Guidance below); anything beyond belongs behind a Menu. */
export function TableActionCell({ children, className }: TableActionCellProps) {
  const density = useTableDensity();
  return (
    <td className={cn(densityPaddingMap[density], className)}>
      <Inline gap="xs" justify="end" wrap={false}>
        {children}
      </Inline>
    </td>
  );
}
