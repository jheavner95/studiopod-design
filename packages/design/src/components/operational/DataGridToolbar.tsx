import type { ReactNode } from "react";
import { TableToolbar } from "@/components/table";
import { DataGridBulkActions } from "./DataGridBulkActions";

interface DataGridToolbarProps {
  /** Search/Filters/ColumnPicker — rendered when nothing is selected. */
  children: ReactNode;
  selectedCount?: number;
  /** Action buttons — rendered inside DataGridBulkActions once selectedCount > 0. */
  bulkActions?: ReactNode;
  onClearSelection?: () => void;
  className?: string;
}

/**
 * The region above a DataGrid — delegates entirely to Foundation Table's own
 * TableToolbar (search/filter row normally, an accent-tinted bulk-action bar
 * once rows are selected) rather than declaring a second bar component.
 */
export function DataGridToolbar({ children, selectedCount = 0, bulkActions, onClearSelection, className }: DataGridToolbarProps) {
  const isBulk = selectedCount > 0 && !!bulkActions;
  return (
    <TableToolbar bulk={isBulk} className={className}>
      {isBulk ? (
        <DataGridBulkActions count={selectedCount} onClear={onClearSelection ?? (() => {})}>
          {bulkActions}
        </DataGridBulkActions>
      ) : (
        children
      )}
    </TableToolbar>
  );
}
