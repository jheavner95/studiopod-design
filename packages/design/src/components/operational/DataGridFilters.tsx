import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, Button, type SelectOption } from "@/components/ui";

export interface DataGridFilterDef {
  key: string;
  label: string;
  options: SelectOption[];
}

interface DataGridFiltersProps {
  filters: DataGridFilterDef[];
  activeFilters: Record<string, string | null>;
  onChange: (key: string, value: string | null) => void;
  onReset?: () => void;
  className?: string;
}

/**
 * A row of independent filter dimensions (status + type + platform, all at
 * once) plus a reset action. Foundation Forms' FilterBar already covers a
 * single active-chip dimension; grids commonly need several simultaneous
 * dimensions, which is the genuine gap this fills rather than a duplication
 * of FilterBar's own single-dimension chip row.
 */
export function DataGridFilters({ filters, activeFilters, onChange, onReset, className }: DataGridFiltersProps) {
  const activeCount = filters.filter((filter) => activeFilters[filter.key]).length;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {filters.map((filter) => (
        <Select
          key={filter.key}
          aria-label={filter.label}
          value={activeFilters[filter.key] ?? ""}
          onChange={(event) => onChange(filter.key, event.target.value || null)}
          placeholder={filter.label}
          options={filter.options}
          className="w-auto"
        />
      ))}
      {onReset && activeCount > 0 ? (
        <Button size="sm" variant="ghost" leadingIcon={<X className="size-3.5" />} onClick={onReset}>
          Reset
        </Button>
      ) : null}
    </div>
  );
}
