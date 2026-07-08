"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchInput } from "./SearchInput";
import { Button } from "./Button";

export interface FilterChip {
  key: string;
  label: ReactNode;
}

export interface FilterBarProps {
  className?: string;
  /** Omit to leave search out of the bar entirely. */
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  chips?: FilterChip[];
  activeChip?: string | null;
  onChipChange?: (key: string | null) => void;
  /** A segmented control, toggle, or any other custom filter control. */
  children?: ReactNode;
  /** Shown once any filter is active; omit to hide the reset action entirely. */
  onReset?: () => void;
}

/** The standard row of search + category chips + reset used to filter a list or gallery — FAQComposition's search/category UI generalized. */
export function FilterBar({ className, search, chips, activeChip, onChipChange, children, onReset }: FilterBarProps) {
  const hasActiveFilter = Boolean(search?.value) || (activeChip ?? null) !== null;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center gap-3">
        {search ? (
          <SearchInput
            value={search.value}
            onChange={search.onChange}
            placeholder={search.placeholder ?? "Search"}
            className="w-full sm:max-w-xs"
          />
        ) : null}
        {children}
        {onReset && hasActiveFilter ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={onReset}
            leadingIcon={<X className="size-3.5" />}
            className="ml-auto"
          >
            Reset
          </Button>
        ) : null}
      </div>

      {chips && chips.length > 0 ? (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <Button size="sm" variant={activeChip == null ? "secondary" : "ghost"} onClick={() => onChipChange?.(null)}>
            All
          </Button>
          {chips.map((chip) => (
            <Button
              key={chip.key}
              size="sm"
              variant={activeChip === chip.key ? "secondary" : "ghost"}
              onClick={() => onChipChange?.(chip.key)}
            >
              {chip.label}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
