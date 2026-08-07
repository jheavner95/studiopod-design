export interface TableStateDoc {
  id: string;
  name: string;
  presentation: string;
}

export const TABLE_STATES: TableStateDoc[] = [
  {
    id: "loading",
    name: "Loading",
    presentation: "TableLoadingState renders skeleton rows matching the real column count — never a spinner replacing the whole table, which loses the column structure the user was about to scan.",
  },
  {
    id: "empty",
    name: "Empty",
    presentation: "TableEmptyState with a title like \"No items yet\" and, where relevant, a primary action to create the first one.",
  },
  {
    id: "no-results",
    name: "No Results",
    presentation: "TableEmptyState with a title referencing the active filter (\"No results for \\u201cQ4\\u201d\") and a clear-filters action — distinct copy from Empty, even though the markup is identical.",
  },
  {
    id: "error",
    name: "Error",
    presentation: "TableEmptyState with an error-toned title and a retry action — pairs with the Alert foundation component if the error also needs page-level visibility.",
  },
  {
    id: "offline",
    name: "Offline",
    presentation: "TableEmptyState explaining connectivity is the cause, not absence of data — stale cached rows (if any) stay visible with a banner above rather than being cleared.",
  },
  {
    id: "filtered",
    name: "Filtered",
    presentation: "Not a TableEmptyState case — the table renders normally with fewer rows, plus an active-filter summary in the Toolbar so the reduced count doesn't read as a bug.",
  },
];
