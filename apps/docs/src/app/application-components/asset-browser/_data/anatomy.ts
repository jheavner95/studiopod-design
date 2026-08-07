export interface BrowserAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

/** The nine regions an asset browser is built from — every Asset* component below maps to exactly one. */
export const BROWSER_ANATOMY: BrowserAnatomyRegion[] = [
  { name: "Toolbar", description: "The region above the grid/list — search/filters/view toggle normally, a bulk-action bar once assets are selected.", component: "AssetBrowserToolbar (Data Grid's own DataGridToolbar underneath)" },
  { name: "Search", description: "Free-text filtering across the library's assets.", component: "AssetSearch (Data Grid's own DataGridSearch underneath)" },
  { name: "Filters", description: "Independent filter dimensions — type, status, collection — narrowing assets without a free-text query.", component: "AssetFilters (Data Grid's own DataGridFilters underneath)" },
  { name: "View Toggle", description: "Switching between a card grid and a table list of the same assets.", component: "AssetViewToggle (Foundation Navigation's SegmentedControl underneath)" },
  { name: "Grid/List", description: "The assets themselves, rendered as cards or table rows from the exact same data.", component: "AssetGrid and AssetList (Operational Data Grid underneath), sharing one render definition" },
  { name: "Selection", description: "Which assets are currently checked, in either view.", component: "AssetSelection's helpers (Data Grid's own selection Set<string> logic, reused unchanged)" },
  { name: "Metadata", description: "An asset's name, type, size, and other secondary details.", component: "AssetCard + AssetThumbnail + AssetMetadata (grid), or AssetList's Name/Details/Status columns" },
  { name: "Pagination", description: "Moving through a library too large to show all at once.", component: "AssetPagination for the grid view; Data Grid's own DataGridPagination for the list view" },
  { name: "Inspector Integration", description: "Showing the selected asset's full detail alongside the library.", component: "A caller-composed Operational Inspector Panel or Property Panel, passed as AssetBrowser's inspector slot — not a fourth panel implementation of its own" },
];
