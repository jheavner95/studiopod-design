import type { ReactNode } from "react";

export type DataGridColumnAlign = "left" | "center" | "right";

/** A responsive hint DataGrid's own callers can read (see the docs page's Responsive Behavior section) — DataGrid itself doesn't act on this yet; automatic priority-based hiding is a Future Extension, not built here. */
export type DataGridColumnPriority = "high" | "medium" | "low";

export interface DataGridColumn<T> {
  id: string;
  header: ReactNode;
  accessor: (row: T) => ReactNode;
  align?: DataGridColumnAlign;
  /** Enables the sort arrow and click handler on this column's TableHead — DataGrid is controlled (sortColumnId/sortDirection/onSortChange on the caller), it never sorts rows itself. */
  sortable?: boolean;
  /** Keeps content on one line — for short, predictable values (dates, counts, statuses). */
  nowrap?: boolean;
  /** Truncates with an ellipsis instead of wrapping — pair with a title on the cell's own content. */
  truncate?: boolean;
  /** Pins this column to the left edge of the grid's horizontal scroll area. */
  sticky?: boolean;
  priority?: DataGridColumnPriority;
}
