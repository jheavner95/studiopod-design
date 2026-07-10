export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "HealthPanel's Metrics section shows Foundation Metadata's StatGroup at its full column count (2 by default here) alongside the Health Score ring." },
  { breakpoint: "Tablet", note: "StatGroup's own Grid drops to fewer columns at its own breakpoints — HealthPanel doesn't set a separate tablet-specific column count." },
  { breakpoint: "Mobile", note: "Every InspectorSection inside StatusPanel stacks full-width and stays independently collapsible, so a long panel (score + metrics + issues + recommendations) never forces horizontal scrolling." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsible metrics",
    note: "InspectorSection's own collapsible/defaultOpen props are what make a HealthPanel's Metrics or Issues section collapse on a narrow screen — this family doesn't add a second collapse mechanism.",
  },
  {
    label: "Stacked summaries",
    note: "StatusSummary's row of badges wraps via Foundation Metadata's own Inline component once it runs out of width — no separate stacked variant to maintain.",
  },
  {
    label: "Timeline behavior",
    note: "StatusTimeline (Inspector Panel's own InspectorHistory) already collapses to its own collapsedCount by default at every width — narrow screens don't need a shorter default, since the collapse behavior isn't width-driven to begin with.",
  },
];
