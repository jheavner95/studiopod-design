import { Caption } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ResultSummaryProps {
  totalCount: number;
  /** Omit when the full set renders at once (no pagination) — renders "{totalCount} results" instead of a range. */
  range?: { start: number; end: number };
  itemLabel?: string;
  className?: string;
}

/**
 * The "X–Y of Z" (or plain "Z results") row-count line — the canonical form
 * of a calculation Data Grid's own DataGridPagination and Asset Browser's
 * AssetPagination each inlined identically; both now delegate to this
 * instead of computing the same start/end math twice.
 */
export function ResultSummary({ totalCount, range, itemLabel, className }: ResultSummaryProps) {
  return (
    <Caption className={cn("text-ink-tertiary", className)}>
      {range ? (
        <>
          {range.start}–{range.end} of {totalCount}
          {itemLabel ? ` ${itemLabel}` : ""}
        </>
      ) : (
        <>
          {totalCount} {itemLabel ?? "results"}
        </>
      )}
    </Caption>
  );
}
