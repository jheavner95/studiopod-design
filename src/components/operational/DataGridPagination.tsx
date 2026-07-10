import { TableFooter } from "@/components/table";
import { Pagination, type PaginationVariant } from "@/components/navigation";
import { Caption } from "@/components/ui";
import { cn } from "@/lib/utils";

interface DataGridPaginationProps {
  page: number;
  pageCount: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  variant?: PaginationVariant;
  /** Pass the grid's real column count (including the selection column, if any) so the row spans the full width. */
  colSpan: number;
  className?: string;
}

/**
 * The grid's footer row — a real <tfoot> (via Foundation Table's own
 * TableFooter, kept outside the scrolling body's row count) pairing a
 * "X–Y of Z" summary with Foundation Navigation's own Pagination, rather
 * than reimplementing page-range logic here.
 */
export function DataGridPagination({ page, pageCount, pageSize, totalCount, onPageChange, variant = "numbered", colSpan, className }: DataGridPaginationProps) {
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return (
    <TableFooter>
      <tr>
        <td colSpan={colSpan} className={cn("px-4 py-3", className)}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Caption className="text-ink-tertiary">
              {start}–{end} of {totalCount}
            </Caption>
            <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} variant={variant} />
          </div>
        </td>
      </tr>
    </TableFooter>
  );
}
