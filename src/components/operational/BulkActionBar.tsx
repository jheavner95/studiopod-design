import type { ReactNode } from "react";
import { TableToolbar } from "@/components/table";
import { BulkSelectionSummary } from "./BulkSelectionSummary";

interface BulkActionBarProps {
  count: number;
  onClear?: () => void;
  children: ReactNode;
  className?: string;
}

/**
 * The standalone bulk-action bar — Data Grid's own DataGridToolbar already
 * switches Foundation Table's TableToolbar into its accent-tinted bulk mode
 * when selectedCount > 0, but that requires a caller to wire bulk/children/
 * bulkActions across two components by hand. BulkActionBar is the same
 * TableToolbar chrome (already generic — built on Surface/Inline, nothing
 * table-specific despite the name) as one ready call, for any selection
 * context: AssetGrid's cards, a Filter & Search result list, or a table row.
 */
export function BulkActionBar({ count, onClear, children, className }: BulkActionBarProps) {
  if (count === 0) return null;

  return (
    <TableToolbar bulk className={className}>
      <BulkSelectionSummary count={count} onClear={onClear} />
      {children}
    </TableToolbar>
  );
}
