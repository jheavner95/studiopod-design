import type { ReactNode } from "react";
import { Badge, Checkbox } from "@/components/ui";
import { FilterPopover } from "./FilterPopover";

export interface FilterGroupOption {
  value: string;
  label: ReactNode;
}

interface FilterGroupProps {
  label: string;
  options: FilterGroupOption[];
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
  className?: string;
}

/**
 * One filter dimension with multiple simultaneous values — "Status: Draft
 * and Published at once" — the genuine gap Data Grid's own DataGridFilters
 * doesn't cover (each of its dimensions holds a single Select value). Built
 * on FilterPopover + Foundation Forms' Checkbox rather than a bespoke
 * dropdown, the same composition DataGridColumnPicker already proved out
 * for column visibility.
 */
export function FilterGroup({ label, options, selected, onChange, className }: FilterGroupProps) {
  function toggle(value: string) {
    const next = new Set(selected);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    onChange(next);
  }

  return (
    <FilterPopover
      label={label}
      badge={selected.size > 0 ? <Badge size="sm" tone="accent">{selected.size}</Badge> : undefined}
      className={className}
    >
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <Checkbox key={option.value} label={option.label} checked={selected.has(option.value)} onChange={() => toggle(option.value)} />
        ))}
      </div>
    </FilterPopover>
  );
}
