export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Widget sizing",
    text: "DashboardGrid's minWidgetWidth prop (280px by default) is the only sizing lever — widgets don't set their own explicit width, they fill whatever track auto-fit gives them.",
  },
  {
    label: "Dashboard composition",
    text: "Build one DashboardSection per logical group (\"Overview,\" \"Queue,\" \"Health\"), each with its own DashboardGrid — this family doesn't force a single page-wide grid for every widget on a dashboard.",
  },
  {
    label: "Refresh strategy",
    text: "DashboardSection's loading prop is caller-driven — this family holds no fetch or polling logic of its own, the same controlled-loading contract Data Grid's own loading prop already established.",
  },
  {
    label: "Metric hierarchy",
    text: "Put a dashboard's single most important number in a standalone MetricCard or TrendWidget, not buried inside a KPIWidget's equal-weight grid — StatGroup's own columns are visually equal-weight by design.",
  },
  {
    label: "Information density",
    text: "Prefer fewer, larger widgets over many small ones on a first pass — DashboardGrid's auto-fit reflow means adding widgets later doesn't require a layout rewrite.",
  },
];
