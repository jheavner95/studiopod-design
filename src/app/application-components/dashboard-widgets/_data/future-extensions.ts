export interface DashboardFutureExtension {
  title: string;
  description: string;
}

export const DASHBOARD_FUTURE_EXTENSIONS: DashboardFutureExtension[] = [
  { title: "Resizable widgets", description: "Letting a caller drag a widget's own boundary rather than accepting whatever track auto-fit gives it. Not currently supported — DashboardGrid's own reflow is the only sizing behavior available." },
  { title: "Drag-and-drop layout", description: "Reordering widgets by dragging rather than editing DOM order — a genuinely different interaction model from this family's own static, caller-ordered children." },
  { title: "Saved dashboards", description: "Persisting a chosen widget arrangement per user — a data-layer concern above this family's own stateless, prop-driven components." },
  { title: "Shared dashboards", description: "A dashboard arrangement one user configures becoming visible to a team. Not currently supported — Saved Dashboards, which this would build on, isn't supported yet either." },
  { title: "Realtime streaming", description: "Live-updating widget values over a websocket or polling connection — every widget here already re-renders from plain props, so realtime is a data-layer concern above them, not a rebuild." },
  { title: "AI-generated dashboards", description: "Assembling a widget arrangement automatically from a stated goal rather than a screen hand-composing DashboardSection/DashboardGrid itself. Not currently supported." },
];
