export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Search behavior",
    text: "SearchField's value/onChange are fully controlled — this system never filters rows internally. Debouncing, matching rules, and empty-result copy are the caller's own decisions, same as Data Grid's own DataGridSearch before it.",
  },
  {
    label: "Filter grouping",
    text: "Each FilterGroup is one independent dimension holding a Set<string> of simultaneously-selected values (\"Draft\" and \"Published\" at once) — narrow the rows array by intersecting every active dimension's Set, don't try to encode cross-dimension logic inside FilterGroup itself.",
  },
  {
    label: "Sorting",
    text: "SortControl reuses Foundation Table's own SortDirection type (\"asc\" | \"desc\" | null) — a screen that also has an in-table sortable column (via Data Grid) should drive both off the same sortColumnId/sortDirection state rather than keeping two independently.",
  },
  {
    label: "Saved filters",
    text: "SavedFilter only renders named entries and reports which one is active/should be applied/saved/deleted — persisting them (localStorage, a user-preferences endpoint) is entirely the caller's decision, this family has no storage opinion of its own.",
  },
  {
    label: "Progressive disclosure",
    text: "FilterGroup's popover-per-dimension model is already progressive by default — a dimension's full option list only costs a click to see. For a screen with many dimensions, group less-common ones behind an \"More filters\" FilterPopover rather than lining up ten trigger buttons in a row.",
  },
];
