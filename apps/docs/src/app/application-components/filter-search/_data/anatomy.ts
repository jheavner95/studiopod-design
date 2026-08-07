export interface SearchAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const SEARCH_ANATOMY: SearchAnatomyRegion[] = [
  { name: "Search", description: "The free-text query field itself.", component: "SearchField (Data Grid's own DataGridSearch underneath)" },
  { name: "Scope", description: "Narrowing where a query searches — name, tags, description, or everywhere.", component: "SearchScope (Foundation Navigation's SegmentedControl underneath)" },
  { name: "Suggestions", description: "Completions shown under the field as the user types.", component: "SearchSuggestions" },
  { name: "Filters", description: "Independent, multi-value filter dimensions — status, type, collection — narrowing results without a query.", component: "FilterBar, FilterGroup, FilterPopover, FilterChip" },
  { name: "Sort", description: "Ordering results by a field and direction.", component: "SortControl" },
  { name: "Active Filters", description: "Every currently applied search term, filter value, and sort, each individually removable.", component: "ActiveFilterList (FilterChip underneath)" },
  { name: "Result Summary", description: "How many results the current search/filter state produced.", component: "ResultSummary (also used by Data Grid's DataGridPagination and Asset Browser's AssetPagination)" },
  { name: "Saved Filters", description: "Named, reusable search/filter/sort combinations.", component: "SavedFilter" },
];
