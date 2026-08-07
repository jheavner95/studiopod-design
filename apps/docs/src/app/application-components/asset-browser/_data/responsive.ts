export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "AssetGrid's auto-fit columns comfortably show 5-6 cards per row at a 160px minChildWidth; an Inspector/Property Panel can sit alongside in its own 320px column." },
  { breakpoint: "Tablet", note: "AssetGrid's auto-fit columns naturally drop to 2-3 per row at the same minChildWidth — no separate tablet-specific prop, Grid's own CSS auto-fit tracks handle it." },
  { breakpoint: "Mobile", note: "AssetGrid drops to a single column; an inspector slot (if present) stacks below the grid/list instead of sitting beside it, since AssetBrowser's own layout is flex-col below lg:." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Grid density",
    note: "AssetGrid's minChildWidth prop is the one density control this family exposes — a smaller value (e.g. 120px) packs more, smaller cards; a larger one (e.g. 200px) shows fewer, bigger cards. There's no separate \"density\" enum to keep in sync with column count.",
  },
  {
    label: "List mode",
    note: "AssetList inherits Data Grid's own density prop (comfortable/compact/dense) unchanged — the exact same three-tier system every Foundation Table consumer already uses.",
  },
  {
    label: "Inspector behavior",
    note: "The inspector slot is entirely the caller's composition — Asset Browser only reserves a shrink-0 lg:w-80 column for it (or lets it stack full-width below the grid/list on mobile). Whether it's an Inspector Panel or a Property Panel, and what it shows, is a decision this family deliberately leaves to the screen using it.",
  },
];
