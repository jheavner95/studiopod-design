import { Pagination, type PaginationVariant } from "@/components/navigation";
import { cn } from "@/lib/utils";
import { ResultSummary } from "./ResultSummary";

interface AssetPaginationProps {
  page: number;
  pageCount: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  variant?: PaginationVariant;
  className?: string;
}

/**
 * A ResultSummary paired with Foundation Navigation's own Pagination — for
 * AssetGrid's card layout, which sits outside any <table>. Data Grid's own
 * DataGridPagination renders a real <tfoot>, the wrong shape here; AssetList
 * (built on Data Grid directly) uses DataGridPagination instead of this
 * component, since it really is inside a table there.
 */
export function AssetPagination({ page, pageCount, pageSize, totalCount, onPageChange, variant = "numbered", className }: AssetPaginationProps) {
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      <ResultSummary totalCount={totalCount} range={{ start, end }} />
      <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} variant={variant} />
    </div>
  );
}
