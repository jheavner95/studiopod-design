import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SearchField } from "./SearchField";
import { ClearFilters } from "./ClearFilters";

interface FilterBarProps {
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  /** FilterGroup / SortControl / any other filter control, laid out in a row. */
  children?: ReactNode;
  hasActiveFilters?: boolean;
  onClearAll?: () => void;
  className?: string;
}

/**
 * The standard discovery toolbar row — search, a slot for however many
 * FilterGroup/SortControl dimensions a screen needs, and a clear-all action.
 * Distinct from Foundation Forms' own FilterBar (a single active-chip
 * category row) and Data Grid's DataGridFilters (one Select per dimension):
 * this is the multi-value-per-dimension, popover-driven version used
 * throughout every StudioPOD library, queue, and operational workspace.
 */
export function FilterBar({ search, children, hasActiveFilters = false, onClearAll, className }: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {search ? <SearchField value={search.value} onChange={search.onChange} placeholder={search.placeholder} /> : null}
      {children}
      {onClearAll && hasActiveFilters ? <ClearFilters onClick={onClearAll} className="ml-auto" /> : null}
    </div>
  );
}
