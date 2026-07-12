export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Horizontal scrolling",
    note: "Table's built-in ScrollArea handles this at every breakpoint — a wide table scrolls within its own bounds rather than widening the page, the same fix first diagnosed for CSS Grid overflow elsewhere in this system.",
  },
  {
    label: "Priority columns",
    note: "Not yet enforced by the components — the recommendation is to order columns by importance left to right, since that's what stays visible first when a ScrollArea is scrolled or a viewport narrows.",
  },
  {
    label: "Column hiding",
    note: "Not implemented. A responsive variant would conditionally omit low-priority TableHead/TableCell pairs below a breakpoint.",
  },
  {
    label: "Responsive stacks",
    note: "For genuinely narrow contexts (mobile), the recommended pattern is switching the same row data to a Stack of Description Lists rather than forcing a table to scroll — a decision made by the caller, not by Table itself.",
  },
  {
    label: "Sticky headers",
    note: "TableHeader is sticky by default at every breakpoint — the one responsive behavior built into the system rather than left as guidance.",
  },
];

export interface BreakpointNote {
  breakpoint: "Desktop" | "Tablet" | "Mobile";
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "Full column set, comfortable or compact density, sticky header, no horizontal scroll for most tables." },
  { breakpoint: "Tablet", note: "Same column set as desktop for most tables; wider tables (Metrics, Coverage-style matrices) rely on ScrollArea's horizontal scroll." },
  { breakpoint: "Mobile", note: "Horizontal scroll is the default fallback today; a Description List stack is the recommended alternative for tables with few columns and long values." },
];
