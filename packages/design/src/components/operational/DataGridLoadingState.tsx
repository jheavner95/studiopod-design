import { TableLoadingState } from "@/components/table";

interface DataGridLoadingStateProps {
  /** Pass the grid's real column count (including the selection column, if any). */
  columns: number;
  rows?: number;
}

/**
 * The in-grid loading state — delegates entirely to Foundation Table's own
 * TableLoadingState (skeleton <tr>/<td> rows, the only valid DOM shape
 * inside a <tbody>) rather than Foundation Feedback's LoadingState, which
 * renders a plain <div> and isn't valid table markup.
 */
export function DataGridLoadingState({ columns, rows }: DataGridLoadingStateProps) {
  return <TableLoadingState columns={columns} rows={rows} />;
}
