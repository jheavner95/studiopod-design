export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "BulkActionBar shows every BulkActionButton inline via BulkActionGroup, with BulkActionMenu reserved for genuinely secondary actions." },
  { breakpoint: "Tablet", note: "The same inline row wraps onto a second line via TableToolbar's own Inline layout before anything needs to move into the overflow menu." },
  { breakpoint: "Mobile", note: "BulkSelectionSummary and the action row stack via TableToolbar/Inline's existing wrap behavior — no separate mobile layout for this family." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsed action bar",
    note: "At a screen's own narrow breakpoint, move every BulkActionButton except the single most common one into BulkActionMenu — this family doesn't decide that threshold itself, since which action stays inline is screen-specific.",
  },
  {
    label: "Overflow menu",
    note: "BulkActionMenu is the same Foundation Overlay Menu/MenuItem pattern used throughout this system, not a bespoke bulk-specific dropdown — same roving highlight, type-ahead, and Enter/Escape behavior a caller already knows from Data Grid's own DataGridColumnPicker-adjacent patterns.",
  },
  {
    label: "Sticky action bar",
    note: "BulkActionBar has no sticky positioning of its own — a caller wraps it in a sticky/fixed container the same way Foundation Table's TableToolbar is commonly pinned above a scrolling body.",
  },
];
