import type { ReactNode } from "react";
import { TableRow, TableCell, TableSelectionCell, TableActionCell } from "@/components/table";
import { QueueStatus, type QueueStatusValue } from "./QueueStatus";
import { QueuePriority, type QueuePriorityValue } from "./QueuePriority";
import { JobProgress } from "./JobProgress";

export interface QueueRowJob {
  id: string;
  name: ReactNode;
  status: QueueStatusValue;
  priority?: QueuePriorityValue;
  /** processed/total — shown only while status is "running" or "retrying". */
  progress?: { processed: number; total: number };
}

interface QueueRowProps {
  job: QueueRowJob;
  selectable?: boolean;
  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;
  onClick?: () => void;
  actions?: ReactNode;
  className?: string;
}

/** One job's row — real Foundation Table markup (TableRow/TableCell/TableSelectionCell/TableActionCell), not a generic DataGridColumn accessor set, since a queue row's shape (name, status, priority, inline progress, actions) is fixed rather than caller-defined like Data Grid's own columns. */
export function QueueRow({ job, selectable = false, selected = false, onSelectChange, onClick, actions, className }: QueueRowProps) {
  const showProgress = (job.status === "running" || job.status === "retrying") && job.progress;

  return (
    <TableRow selected={selected} interactive={Boolean(onClick)} onClick={onClick} className={className}>
      {selectable ? <TableSelectionCell checked={selected} onChange={(checked) => onSelectChange?.(checked)} label={`Select ${typeof job.name === "string" ? job.name : "job"}`} /> : null}
      <TableCell>{job.name}</TableCell>
      <TableCell>
        <QueueStatus value={job.status} />
      </TableCell>
      <TableCell nowrap>{job.priority ? <QueuePriority value={job.priority} /> : null}</TableCell>
      <TableCell>{showProgress && job.progress ? <JobProgress processed={job.progress.processed} total={job.progress.total} /> : null}</TableCell>
      {actions ? <TableActionCell>{actions}</TableActionCell> : null}
    </TableRow>
  );
}
