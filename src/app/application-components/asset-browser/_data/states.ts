export interface BrowserStateNote {
  state: string;
  note: string;
}

export const BROWSER_STATES: BrowserStateNote[] = [
  { state: "Loading", note: "AssetGrid's loading prop swaps the grid for AssetLoadingState's skeleton cards; AssetList's loading prop is Data Grid's own DataGridLoadingState, inherited unchanged." },
  { state: "Empty", note: "Zero assets after the initial load renders AssetEmptyState's no-data variant (grid) or Data Grid's own DataGridEmptyState no-data variant (list) — a real absence, not a search/filter narrowing everything out." },
  { state: "Searching", note: "AssetSearch's value is entirely caller-owned — Asset Browser doesn't filter rows itself, the caller narrows rows before passing them down, the same controlled pattern Data Grid's own gallery already establishes." },
  { state: "Filtered", note: "Same as Searching — AssetFilters only reports which values are active; zero rows after filtering renders the no-results empty variant instead of no-data." },
  { state: "Selected", note: "Any non-empty selectedIds set switches AssetBrowserToolbar into its bulk-action bar and marks each selected AssetCard/list row accordingly, in either view." },
  { state: "Busy", note: "Not a distinct built-in state — a caller mid-bulk-action typically disables AssetBrowserToolbar's own bulk action buttons directly, the same rule already established for Property Panel's own Busy state." },
  { state: "Error", note: "AssetEmptyState's error variant (grid) or DataGridEmptyState's error variant (list) — a failed load, distinct from a genuine empty result." },
  { state: "Read-only", note: "Omitting selectable, onItemClick, and bulkActions renders a plain, non-interactive browser — Asset Browser never assumes a library is selectable/clickable by default, the same rule Data Grid already established." },
];
