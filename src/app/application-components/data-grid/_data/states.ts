export interface GridStateNote {
  state: string;
  note: string;
}

export const GRID_STATES: GridStateNote[] = [
  { state: "Loading", note: "DataGrid's loading prop swaps the body for DataGridLoadingState's skeleton rows — the toolbar and header stay put so the grid's shape doesn't shift." },
  { state: "Empty", note: "Zero rows after the initial load renders DataGridEmptyState's no-data variant — a real absence, not a search/filter narrowing everything out." },
  { state: "Filtered", note: "Zero rows after a search or filter narrows the set renders DataGridEmptyState's no-results variant instead — same shape, different copy, since the fix is \"change your filter,\" not \"add data.\"" },
  { state: "Selected", note: "Any non-empty selectedIds set switches DataGridToolbar into its bulk-action bar and marks each selected TableRow with aria-selected." },
  { state: "Error", note: "DataGridEmptyState's error variant — a failed load, distinct from a genuine empty result." },
  { state: "Read Only", note: "Omitting selectable, onSortChange, and onRowClick renders a plain, non-interactive grid — DataGrid never assumes a grid is editable/selectable by default." },
  { state: "Busy", note: "Toggling loading on an already-populated grid (e.g. refetching after a filter change) — DataGrid doesn't special-case this differently from the initial Loading state today; see Implementation Guidance." },
];
