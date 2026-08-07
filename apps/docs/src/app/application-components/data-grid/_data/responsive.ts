export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "Every column is visible at once; the toolbar's search, filters, and column picker sit in one row." },
  { breakpoint: "Tablet", note: "The grid keeps every column but relies on Foundation Table's own horizontal ScrollArea sooner; the toolbar wraps its controls onto a second line before anything is hidden." },
  { breakpoint: "Mobile", note: "The same horizontal scroll holds rather than collapsing into cards — DataGrid inherits Table's known gap here (see Composition below): there's no responsive row-collapse capability yet, so a genuinely mobile-first grid should keep its column count small rather than expect one to appear." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Horizontal scrolling",
    note: "DataGrid never wraps or hides columns on its own — it inherits Table's independent horizontal ScrollArea, the same behavior every Table-based view already relies on.",
  },
  {
    label: "Column priority",
    note: "DataGridColumn.priority (high/medium/low) is metadata only — a hint a caller's own responsive logic (e.g. conditionally omitting low-priority columns from the columns array below a breakpoint) can read. DataGrid doesn't act on it automatically; see Future Extensions.",
  },
  {
    label: "Hidden columns",
    note: "DataGridColumnPicker toggles a visibleIds set the caller filters columns by before passing them to DataGrid — hiding is caller-driven (build the columns array from visibleIds), not a built-in DataGrid prop, keeping the column-visibility decision in one place.",
  },
];
