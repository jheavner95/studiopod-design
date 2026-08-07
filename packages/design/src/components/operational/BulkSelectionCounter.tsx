import { Badge } from "@/components/ui";

interface BulkSelectionCounterProps {
  count: number;
  className?: string;
}

/** A standalone numeric count — for a trigger button ("Actions (12)") or anywhere else the full "N selected" sentence (BulkSelectionSummary) would be too verbose. Renders nothing at zero. */
export function BulkSelectionCounter({ count, className }: BulkSelectionCounterProps) {
  if (count === 0) return null;
  return (
    <Badge tone="accent" size="sm" className={className}>
      {count}
    </Badge>
  );
}
