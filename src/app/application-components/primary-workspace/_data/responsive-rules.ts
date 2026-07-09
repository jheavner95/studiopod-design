export interface PrimaryWorkspaceResponsiveRule {
  dimension: string;
  desktop: string;
  tablet: string;
  mobile: string;
}

/** Five dimensions of responsive Primary Workspace behavior, each stated as a rule per breakpoint — conceptual, not tied to a literal pixel breakpoint. */
export const PRIMARY_WORKSPACE_RESPONSIVE_RULES: PrimaryWorkspaceResponsiveRule[] = [
  {
    dimension: "Supporting panels collapsing",
    desktop: "Visible alongside the Primary Working Surface, not overlapping it.",
    tablet: "Collapse behind a toggle — opened on demand, closing the Primary Working Surface behind them.",
    mobile: "Full-screen sheets, never a permanent side panel.",
  },
  {
    dimension: "Workflow controls repositioning",
    desktop: "A dedicated row, usually below or beside the Primary Working Surface.",
    tablet: "Condense to icon-plus-label; secondary controls move into Overflow.",
    mobile: "Pin to the bottom of the screen, within thumb reach, icon-only except the Primary Action.",
  },
  {
    dimension: "Canvas resizing",
    desktop: "Claims all available width once Library and Inspector collapse — see Workspace Layout's Canvas Mode.",
    tablet: "Same collapse behavior, at a smaller absolute size.",
    mobile: "Pan-and-zoom becomes the primary navigation, since the canvas can't show its full extent at once.",
  },
  {
    dimension: "Dashboard stacking",
    desktop: "A multi-column grid of metric cards.",
    tablet: "Two columns.",
    mobile: "A single column — cards stack in priority order, most important metric first.",
  },
  {
    dimension: "Queue simplification",
    desktop: "A full Table view with every column visible.",
    tablet: "Fewer columns — status and priority survive, secondary metadata drops.",
    mobile: "Collapses to a List view — one row per item, tap to open its full detail.",
  },
];
