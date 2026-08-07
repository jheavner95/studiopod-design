export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Horizontal scrolling",
    note: "Table's built-in ScrollArea handles this at every breakpoint — a wide table scrolls within its own bounds instead of widening the page, the same pattern CSS Grid uses elsewhere in this system.",
  },
  {
    label: "Priority columns",
    note: "Not automatically enforced — order columns by importance left to right, since that's what stays visible first when a ScrollArea is scrolled or a viewport narrows.",
  },
  {
    label: "Column hiding",
    note: "No built-in support yet. A responsive variant would conditionally omit low-priority columns below a breakpoint.",
  },
  {
    label: "Responsive stacks",
    note: "For genuinely narrow contexts (mobile), the recommended pattern is switching the same row data to a Stack of Description Lists rather than forcing a table to scroll — a decision you make at the call site, not something Table does automatically.",
  },
  {
    label: "Sticky headers",
    note: "TableHeader is sticky by default at every breakpoint — the one responsive behavior that's built in, rather than left to guidance.",
  },
];

export interface BreakpointNote {
  breakpoint: "Desktop" | "Tablet" | "Mobile";
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "Full column set, comfortable or compact density, sticky header, no horizontal scroll for most tables." },
  { breakpoint: "Tablet", note: "Same column set as desktop for most tables; wider tables with many columns rely on ScrollArea's horizontal scroll." },
  { breakpoint: "Mobile", note: "Horizontal scroll is the default fallback today; a Description List stack is the recommended alternative for tables with few columns and long values." },
];
