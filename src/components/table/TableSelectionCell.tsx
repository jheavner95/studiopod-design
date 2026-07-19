"use client";

import type { ChangeEvent, MouseEvent } from "react";
import { Checkbox } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useTableDensity, densityPaddingMap, headerDensityPaddingMap } from "./Table";

interface TableSelectionCellProps {
  checked: boolean;
  /**
   * Called with the next checked state, and the native change event.
   *
   * The second argument exists so a caller can read modifier keys off the
   * event — `event.nativeEvent` carries `shiftKey`, `metaKey` and friends —
   * and drive a modifier-aware selection model, the same way `TableRow` passes
   * its click event. The design system takes no position on which model that
   * is: plain-vs-shift additive selection, range selection and
   * select-through-to-anchor are all left to the caller.
   *
   * Callbacks that only need the checked state may keep a one-argument
   * signature; the second argument is additive.
   */
  onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
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
    <Component
      className={cn(as === "th" ? headerDensityPaddingMap[density] : densityPaddingMap[density], "w-10")}
      onClick={(event: MouseEvent) => event.stopPropagation()}
    >
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked, event)}
        aria-label={label}
      />
    </Component>
  );
}
