export interface GridFutureExtension {
  title: string;
  description: string;
}

export const GRID_FUTURE_EXTENSIONS: GridFutureExtension[] = [
  { title: "Virtualization", description: "Windowed row rendering for datasets large enough that pagination alone isn't enough. Not included — pagination already covers every dataset size DataGrid currently handles." },
  { title: "Pinned rows", description: "Keeping specific rows visible regardless of scroll or sort — distinct from Pinned columns below; no current gallery variant has a use for it." },
  { title: "Pinned columns", description: "DataGridColumn.sticky already pins a single column via TableHead's existing sticky prop; multi-column pinning (more than one sticky column at once, offset correctly) isn't built." },
  { title: "Column resize", description: "Drag-to-resize column widths, persisted per user. Not currently supported." },
  { title: "Column reorder", description: "Drag-to-reorder the columns array itself. Not currently supported, alongside Column resize." },
  { title: "Saved layouts", description: "Persisting a user's column visibility/order/sort/density choices across sessions. Most useful alongside column resize and reorder, which aren't supported yet." },
  { title: "Infinite scrolling", description: "A scroll-triggered alternative to DataGridPagination's page-by-page model — a product decision each screen should make deliberately, not something DataGrid should default to." },
  { title: "Grouped rows", description: "Rows clustered under a collapsible group header (e.g. by status or date) — a genuinely different rendering model from DataGrid's flat rows.map(...), warranting its own design pass rather than a bolted-on prop." },
];
