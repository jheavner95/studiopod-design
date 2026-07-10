export interface GridAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

/** The ten regions a data grid is built from — every DataGrid* component below maps to exactly one. */
export const GRID_ANATOMY: GridAnatomyRegion[] = [
  { name: "Toolbar", description: "The region above the grid — search/filters normally, a bulk-action bar once rows are selected.", component: "DataGridToolbar (Foundation Table's TableToolbar underneath)" },
  { name: "Search", description: "Free-text filtering across the grid's rows.", component: "DataGridSearch (Foundation Forms' SearchInput underneath)" },
  { name: "Filters", description: "Independent filter dimensions — status, type, platform — narrowing rows without a free-text query.", component: "DataGridFilters" },
  { name: "Bulk Actions", description: "Actions that apply to every currently-selected row at once.", component: "DataGridBulkActions" },
  { name: "Columns", description: "What each row's cells mean, how they're aligned, and whether they're sortable or hidden.", component: "DataGridColumn (a type, not a component) + DataGridColumnPicker" },
  { name: "Rows", description: "One record each, rendered through the column set.", component: "DataGrid's own row rendering (Foundation Table's TableRow/TableCell underneath)" },
  { name: "Selection", description: "Which rows are currently checked, and the select-all/indeterminate header state.", component: "DataGridSelection's helpers + useDataGridSelection" },
  { name: "Pagination", description: "Moving through a result set too large to show all at once.", component: "DataGridPagination (Foundation Navigation's Pagination underneath)" },
  { name: "Empty State", description: "What renders in place of rows when there's nothing to show.", component: "DataGridEmptyState (Foundation Table's TableEmptyState underneath)" },
  { name: "Loading", description: "What renders in place of rows while data is being fetched.", component: "DataGridLoadingState (Foundation Table's TableLoadingState underneath)" },
];
