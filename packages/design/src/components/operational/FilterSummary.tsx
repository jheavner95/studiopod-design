import { Caption } from "@/components/ui";
import { cn } from "@/lib/utils";

interface FilterSummaryProps {
  count: number;
  className?: string;
}

/** A compact "N filters applied" label — distinct from ActiveFilterList's removable chips (this is a read-only count) and ResultSummary (a row count, not a filter count). Renders nothing at zero. */
export function FilterSummary({ count, className }: FilterSummaryProps) {
  if (count === 0) return null;
  return (
    <Caption className={cn("text-ink-tertiary", className)}>
      {count} filter{count === 1 ? "" : "s"} applied
    </Caption>
  );
}
