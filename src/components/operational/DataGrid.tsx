"use client";

import type { ReactNode } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableSelectionCell, type TableDensity, type SortDirection } from "@/components/table";
import type { DataGridColumn } from "./DataGridColumn";
import { DataGridEmptyState, type DataGridEmptyVariant } from "./DataGridEmptyState";
import { DataGridLoadingState } from "./DataGridLoadingState";
import { isAllSelected, isPartiallySelected, selectAll, toggleSelection } from "./DataGridSelection";

export interface DataGridProps<T> {
  columns: DataGridColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  /** Announced to screen readers; visually hidden — every grid should have one, same rule as Table. */
  caption: ReactNode;
  density?: TableDensity;
  minWidth?: string;
  selectable?: boolean;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  /** A more descriptive per-row accessible name for its selection checkbox than the generic "Select row" default — e.g. (row) => row.name. */
  getRowLabel?: (row: T) => string;
  sortColumnId?: string;
  sortDirection?: SortDirection;
  onSortChange?: (columnId: string) => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  loadingRows?: number;
  emptyVariant?: DataGridEmptyVariant;
  /** Full replacement for the default DataGridEmptyState row — must be a valid <tr> element. */
  emptyState?: ReactNode;
  /** A DataGridPagination element (or any other <tfoot>-shaped content). */
  footer?: ReactNode;
  className?: string;
}

/**
 * The canonical StudioPOD data grid — the first Operational Component built
 * on the certified Foundation Layer. Composes Table, TableHeader, TableBody,
 * TableRow, TableHead, TableCell, TableSelectionCell, TableEmptyState, and
 * TableLoadingState end to end rather than reimplementing any of it; sorting
 * and selection are controlled (the caller owns the state), matching
 * TableHead's own controlled sortable design.
 */
export function DataGrid<T>({
  columns,
  rows,
  getRowId,
  caption,
  density,
  minWidth,
  selectable = false,
  selectedIds,
  onSelectionChange,
  getRowLabel,
  sortColumnId,
  sortDirection,
  onSortChange,
  onRowClick,
  loading = false,
  loadingRows,
  emptyVariant,
  emptyState,
  footer,
  className,
}: DataGridProps<T>) {
  const selected = selectedIds ?? new Set<string>();
  const totalColumns = columns.length + (selectable ? 1 : 0);
  const allSelected = isAllSelected(rows, getRowId, selected);
  const partiallySelected = isPartiallySelected(rows, getRowId, selected);

  function handleToggleAll(checked: boolean) {
    onSelectionChange?.(checked ? selectAll(rows, getRowId) : new Set());
  }

  function handleToggleRow(id: string) {
    onSelectionChange?.(toggleSelection(selected, id));
  }

  return (
    <Table density={density} minWidth={minWidth} caption={caption} className={className}>
      <TableHeader>
        <TableRow>
          {selectable ? (
            <TableSelectionCell as="th" checked={allSelected} indeterminate={partiallySelected} onChange={handleToggleAll} label="Select all rows" />
          ) : null}
          {columns.map((column) => (
            <TableHead
              key={column.id}
              align={column.align}
              sticky={column.sticky}
              sortable={column.sortable}
              sortDirection={sortColumnId === column.id ? (sortDirection ?? null) : null}
              onSort={column.sortable ? () => onSortChange?.(column.id) : undefined}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <DataGridLoadingState columns={totalColumns} rows={loadingRows} />
        ) : rows.length === 0 ? (
          (emptyState ?? <DataGridEmptyState variant={emptyVariant} colSpan={totalColumns} />)
        ) : (
          rows.map((row) => {
            const id = getRowId(row);
            const isSelected = selected.has(id);
            return (
              <TableRow key={id} selected={isSelected} interactive={!!onRowClick} onClick={onRowClick ? () => onRowClick(row) : undefined}>
                {selectable ? (
                  <TableSelectionCell
                    checked={isSelected}
                    onChange={() => handleToggleRow(id)}
                    label={getRowLabel ? `Select ${getRowLabel(row)}` : "Select row"}
                  />
                ) : null}
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} nowrap={column.nowrap} truncate={column.truncate}>
                    {column.accessor(row)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        )}
      </TableBody>
      {footer}
    </Table>
  );
}
