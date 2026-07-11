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
  {
    title: "Responsive Row Collapse",
    description:
      "Not speculative — confirmed twice by real, failed migration attempts. The MaturityTable migration (3 columns) needed horizontal scroll at 640px against a 333px mobile viewport; the InventoryTable migration (5 columns) failed the same way, worse — 774px against 333px, clipping a Status badge and hiding Source and Priority entirely. Both hand-rolled originals instead stacked each row into a labeled card below sm:. Table's ScrollArea handles overflow correctly but has no mechanism to switch to a stacked layout below a breakpoint. Both migrations were reverted rather than shipped with a visible regression. This is now the leading direction for Table's next real capability, not a hypothetical one.",
  },
];
