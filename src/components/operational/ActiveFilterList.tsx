import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FilterChip } from "./FilterChip";

export interface ActiveFilterEntry {
  id: string;
  label: ReactNode;
  onRemove: () => void;
}

interface ActiveFilterListProps {
  entries: ActiveFilterEntry[];
  className?: string;
}

/** Every currently active search term, filter value, and sort — one removable FilterChip per entry. Renders nothing once entries is empty, so callers can render it unconditionally. */
export function ActiveFilterList({ entries, className }: ActiveFilterListProps) {
  if (entries.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} role="group" aria-label="Active filters">
      {entries.map((entry) => (
        <FilterChip key={entry.id} label={entry.label} tone="accent" onRemove={entry.onRemove} />
      ))}
    </div>
  );
}
