export interface GridFutureExtension {
  title: string;
  description: string;
}

export const GRID_FUTURE_EXTENSIONS: GridFutureExtension[] = [
  { title: "Virtualization", description: "Windowed row rendering for datasets large enough that pagination alone isn't enough — deferred until a real screen actually needs more than one page's worth of rows on screen at once." },
  { title: "Pinned rows", description: "Keeping specific rows visible regardless of scroll or sort — distinct from Pinned columns below; no current gallery variant has a use for it." },
  { title: "Pinned columns", description: "DataGridColumn.sticky already pins a single column via TableHead's existing sticky prop; multi-column pinning (more than one sticky column at once, offset correctly) isn't built." },
  { title: "Column resize", description: "Drag-to-resize column widths, persisted per user — the same kind of extension Navigation's SideNavigation and Table's own Column Resize future extension defer for the same reason: no evidenced need yet." },
  { title: "Column reorder", description: "Drag-to-reorder the columns array itself — deferred alongside Column resize as a related, equally-unrequested capability." },
  { title: "Saved layouts", description: "Persisting a user's column visibility/order/sort/density choices across sessions — depends on Column resize/reorder existing first, or is at least far more useful once they do." },
  { title: "Infinite scrolling", description: "A scroll-triggered alternative to DataGridPagination's page-by-page model — a product decision each screen should make deliberately, not something DataGrid should default to." },
  { title: "Grouped rows", description: "Rows clustered under a collapsible group header (e.g. by status or date) — a genuinely different rendering model from DataGrid's flat rows.map(...), warranting its own design pass rather than a bolted-on prop." },
];
