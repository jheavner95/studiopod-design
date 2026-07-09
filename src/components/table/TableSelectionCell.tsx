"use client";

import type { MouseEvent } from "react";
import { Checkbox } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useTableDensity, densityPaddingMap } from "./Table";

interface TableSelectionCellProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  indeterminate?: boolean;
  disabled?: boolean;
  /** "th" for the select-all cell in the header row, "td" (default) for a body row. */
  as?: "td" | "th";
}

/** A single Checkbox cell for row (or select-all) selection — the same Checkbox every other selection surface in this design system already uses, never reimplemented. */
export function TableSelectionCell({ checked, onChange, label, indeterminate = false, disabled = false, as = "td" }: TableSelectionCellProps) {
  const density = useTableDensity();
  const Component = as;
  return (
    <Component className={cn(densityPaddingMap[density], "w-10")} onClick={(event: MouseEvent) => event.stopPropagation()}>
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        aria-label={label}
      />
    </Component>
  );
}
