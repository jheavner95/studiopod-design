export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "FilterBar lays search, every FilterGroup, and SortControl out in one flex-wrap row, with ClearFilters pushed to the far right via ml-auto." },
  { breakpoint: "Tablet", note: "The same flex-wrap row simply wraps onto a second line once it runs out of width — no separate tablet layout, FilterBar has no breakpoint-specific classes at all." },
  { breakpoint: "Mobile", note: "FilterGroup's popover trigger buttons wrap one per line if needed; each FilterPopover still anchors correctly since positioning comes from Foundation Overlay's own viewport-aware placement logic, not a fixed offset." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsed filters",
    note: "Below a screen's own breakpoint for showing every FilterGroup inline, a caller collapses the whole FilterBar behind a single \"Filters\" trigger opening a Drawer (Foundation Overlay) — this family doesn't build that collapse behavior itself, since the right collapse point is screen-specific.",
  },
  {
    label: "Popover filters",
    note: "Every FilterGroup already renders as a popover-anchored trigger button by default at every width — there's no separate 'mobile mode' to switch into, just the one interaction model throughout.",
  },
  {
    label: "Sticky search",
    note: "SearchField has no sticky positioning of its own — a caller wraps it (or the whole FilterBar) in a sticky container the same way Foundation Table's own TableToolbar is commonly pinned above a scrolling body.",
  },
];
