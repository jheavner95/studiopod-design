export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "DashboardGrid's auto-fit columns fit as many 280px-minimum tiles per row as the viewport allows." },
  { breakpoint: "Tablet", note: "Fewer tiles fit at the same minChildWidth — no separate tablet breakpoint logic, since CSS auto-fit already recomputes the track count." },
  { breakpoint: "Mobile", note: "DashboardGrid collapses to a single column once no two 280px tiles fit side by side — the same auto-fit mechanism, not a mobile-specific override." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Widget stacking",
    note: "A widget's position in the children/items array becomes its top-to-bottom order once the grid collapses to one column — this family doesn't reorder widgets for mobile.",
  },
  {
    label: "Grid reflow",
    note: "DashboardGrid uses auto-fit (not auto-fill), so fewer widgets stay wide rather than leaving empty tracked columns — the same distinction Foundation Layout's own Grid already draws between the two strategies.",
  },
  {
    label: "Priority ordering",
    note: "DashboardGrid doesn't reorder its children at any breakpoint — a screen that wants its most important widget first puts it first in DOM order, since CSS grid auto-fit changes track count, not item order.",
  },
];
