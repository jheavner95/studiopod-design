export interface DashboardAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const DASHBOARD_ANATOMY: DashboardAnatomyRegion[] = [
  { name: "Grid", description: "The responsive tile track every widget sits in.", component: "DashboardGrid (Foundation Layout's own Grid, auto-fit mode, underneath)" },
  { name: "Sections", description: "A titled region grouping related widgets, with its own actions row.", component: "DashboardSection" },
  { name: "Widgets", description: "The tiles themselves — metric, trend, chart, status, activity, queue, health, and recommendation.", component: "MetricCard, KPIWidget, TrendWidget, ChartWidget, StatusWidget, ActivityWidget, QueueWidget, HealthWidget, RecommendationWidget" },
  { name: "Actions", description: "What a section or widget's own header offers — a refresh button, a link out, a filter.", component: "DashboardSection's actions slot (Foundation UI's Button underneath)" },
  { name: "Refresh", description: "Reloading a section's data without navigating away.", component: "DashboardSection's loading prop (Foundation Feedback's own LoadingState underneath)" },
  { name: "Empty State", description: "A dashboard or section with nothing to show yet.", component: "DashboardEmptyState (Foundation Feedback's own EmptyState underneath)" },
];
