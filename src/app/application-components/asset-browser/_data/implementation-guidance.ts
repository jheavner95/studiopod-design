export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Grid vs List",
    text: "Grid (AssetGrid) is the default for anything visual — images, artwork, style swatches — where the thumbnail itself carries most of the information. List (AssetList) is better once users need to compare fields across many rows at once (size, modified date, status) — the same render definition drives both, so switching is never a re-implementation.",
  },
  {
    label: "Selection behavior",
    text: "Selection state (selectedIds) is fully controlled by the caller and shared verbatim between AssetGrid and AssetList — toggling view mode never loses the current selection, since both views read from the same Set<string>.",
  },
  {
    label: "Inspector integration",
    text: "Pass an Operational Inspector Panel (read-heavy detail) or Property Panel (edit-heavy settings) as AssetBrowser's inspector prop once selectedIds has exactly one entry — Asset Browser doesn't decide which one fits better, or build a third option itself.",
  },
  {
    label: "Search",
    text: "AssetSearch's value/onChange are fully controlled — Asset Browser doesn't filter rows internally. Debouncing, matching rules, and empty-result copy are the caller's own decisions, the same as every other Foundation/Operational search field in this system.",
  },
  {
    label: "Filtering",
    text: "AssetFilters supports multiple simultaneous dimensions (type + status + collection, all at once) — narrow the rows array before passing it to AssetGrid/AssetList, don't try to filter after the fact inside either view.",
  },
  {
    label: "Sorting",
    text: "Grid view has no sort control of its own — cards don't have a natural column to sort by the way table rows do. List view inherits Data Grid's own sortColumnId/sortDirection/onSortChange unchanged via AssetList's column definitions.",
  },
];
