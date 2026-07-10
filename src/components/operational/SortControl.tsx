import { ArrowDown, ArrowUp } from "lucide-react";
import { Select, Button, type SelectOption } from "@/components/ui";
import type { SortDirection } from "@/components/table";
import { cn } from "@/lib/utils";

export interface SortOption {
  value: string;
  label: string;
}

interface SortControlProps {
  options: SortOption[];
  value: string | null;
  direction: SortDirection;
  onChange: (value: string, direction: SortDirection) => void;
  className?: string;
}

/** A sort field plus direction toggle — the same SortDirection type Foundation Table's own column-header sorting uses, so a standalone control and an in-table one never disagree on what "asc"/"desc" means. */
export function SortControl({ options, value, direction, onChange, className }: SortControlProps) {
  const selectOptions: SelectOption[] = options.map((option) => ({ value: option.value, label: option.label }));

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Select
        aria-label="Sort by"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value, direction ?? "asc")}
        placeholder="Sort by"
        options={selectOptions}
        className="w-auto"
      />
      <Button
        size="sm"
        variant="secondary"
        disabled={!value}
        aria-label={direction === "desc" ? "Sort descending" : "Sort ascending"}
        onClick={() => value && onChange(value, direction === "asc" ? "desc" : "asc")}
      >
        {direction === "desc" ? <ArrowDown className="size-3.5" aria-hidden /> : <ArrowUp className="size-3.5" aria-hidden />}
      </Button>
    </div>
  );
}
