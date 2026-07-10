import type { ReactNode } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableSelectionCell } from "@/components/table";
import { QueueHeader } from "./QueueHeader";
import { QueueFilters, type QueueFilterValue } from "./QueueFilters";
import { QueueRow, type QueueRowJob } from "./QueueRow";
import { QueueEmptyState, type QueueEmptyVariant } from "./QueueEmptyState";
import { BulkActionBar } from "./BulkActionBar";
import { isAllSelected, isPartiallySelected, selectAll, toggleSelection } from "./DataGridSelection";

interface QueueProps<T extends QueueRowJob> {
  title: ReactNode;
  caption: ReactNode;
  jobs: T[];
  filter?: QueueFilterValue;
  onFilterChange?: (value: QueueFilterValue) => void;
  selectable?: boolean;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  bulkActions?: ReactNode;
  getActions?: (job: T) => ReactNode;
  onRowClick?: (job: T) => void;
  emptyVariant?: QueueEmptyVariant;
  footer?: ReactNode;
  className?: string;
}

/**
 * The canonical queue view — QueueHeader/QueueFilters normally, Bulk
 * Actions' own BulkActionBar once jobs are selected (the same swap
 * DataGridToolbar already does for its own bulk mode, using Bulk Actions'
 * standalone bar since it's this package's declared composition target).
 * Rows are Foundation Table markup via QueueRow, not Data Grid's generic
 * column/accessor system — a queue row's shape is fixed, not caller-defined.
 */
export function Queue<T extends QueueRowJob>({
  title,
  caption,
  jobs,
  filter,
  onFilterChange,
  selectable = false,
  selectedIds,
  onSelectionChange,
  bulkActions,
  getActions,
  onRowClick,
  emptyVariant = "no-data",
  footer,
  className,
}: QueueProps<T>) {
  const selected = selectedIds ?? new Set<string>();
  const colSpan = (selectable ? 1 : 0) + 4 + (getActions ? 1 : 0);

  function toggleRow(id: string) {
    onSelectionChange?.(toggleSelection(selected, id));
  }

  function toggleAll() {
    onSelectionChange?.(isAllSelected(jobs, (job) => job.id, selected) ? new Set() : selectAll(jobs, (job) => job.id));
  }

  return (
    <div className={className}>
      {selectable && selected.size > 0 ? (
        <BulkActionBar count={selected.size} onClear={() => onSelectionChange?.(new Set())}>
          {bulkActions}
        </BulkActionBar>
      ) : (
        <QueueHeader title={title} count={jobs.length}>
          {onFilterChange ? <QueueFilters value={filter ?? "all"} onChange={onFilterChange} /> : null}
        </QueueHeader>
      )}
      <Table caption={caption}>
        <TableHeader>
          <TableRow>
            {selectable ? (
              <TableSelectionCell
                as="th"
                checked={isAllSelected(jobs, (job) => job.id, selected)}
                indeterminate={isPartiallySelected(jobs, (job) => job.id, selected)}
                onChange={toggleAll}
                label="Select all jobs"
              />
            ) : null}
            <TableHead>Job</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Progress</TableHead>
            {getActions ? <TableHead align="right">Actions</TableHead> : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length === 0 ? (
            <QueueEmptyState variant={emptyVariant} colSpan={colSpan} />
          ) : (
            jobs.map((job) => (
              <QueueRow
                key={job.id}
                job={job}
                selectable={selectable}
                selected={selected.has(job.id)}
                onSelectChange={() => toggleRow(job.id)}
                onClick={onRowClick ? () => onRowClick(job) : undefined}
                actions={getActions?.(job)}
              />
            ))
          )}
        </TableBody>
        {footer}
      </Table>
    </div>
  );
}
