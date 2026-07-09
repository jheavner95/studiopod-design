export interface TableFutureExtension {
  title: string;
  description: string;
}

export const TABLE_FUTURE_EXTENSIONS: TableFutureExtension[] = [
  { title: "Virtualized Table", description: "Renders only the rows currently in view — needed once a table regularly exceeds a few hundred rows (see Implementation Guidance)." },
  { title: "Infinite Data", description: "Loads additional rows as the user scrolls near the end of the current set, replacing manual pagination for very large collections." },
  { title: "Grouping", description: "Rows clustered under a collapsible group header — e.g. jobs grouped by platform in a cross-platform Queue Table." },
  { title: "Tree Table", description: "Rows that can contain nested child rows, expandable in place — for hierarchical data no flat table variant fits." },
  { title: "Column Resize", description: "Drag-to-resize column widths, with the result persisted per user — deferred for the same reason Panel's Resizable extension is deferred." },
  { title: "Column Reorder", description: "Drag-to-reorder columns, independent of Column Resize." },
  { title: "Saved Columns", description: "Persisting a user's chosen column visibility/order/width across sessions." },
  { title: "Pinned Columns", description: "Keeping specific columns (usually Selection or an identifying Text column) visible while the rest of a wide table scrolls horizontally." },
  { title: "Inline Editing", description: "Editing a cell's value directly in the table, without opening the record in an Inspector — the highest-complexity extension on this list." },
];
