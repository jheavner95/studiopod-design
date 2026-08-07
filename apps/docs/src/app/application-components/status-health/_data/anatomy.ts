export interface HealthAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const HEALTH_ANATOMY: HealthAnatomyRegion[] = [
  { name: "Summary", description: "A row of status badges or a metric grid, at a glance.", component: "StatusSummary (Foundation Metadata's own StatusSummary underneath), HealthSummary" },
  { name: "Health Score", description: "A single 0–100 rollup of overall health.", component: "HealthScore (Foundation Feedback's ProgressRing underneath)" },
  { name: "Metrics", description: "The individual numbers behind the summary — jobs, errors, queue depth.", component: "StatusMetric (Foundation UI's StatCard underneath) + Foundation Metadata's StatGroup" },
  { name: "Issues", description: "What's currently wrong, ranked by the caller.", component: "HealthIssueList" },
  { name: "Recommendations", description: "Suggested next steps for the issues above.", component: "HealthRecommendation (Foundation Feedback's Alert underneath)" },
  { name: "Timeline", description: "What's happened to this system's health over time, newest first.", component: "StatusTimeline (Inspector Panel's own InspectorHistory underneath)" },
  { name: "Alerts", description: "Currently active operational alerts, stacked.", component: "OperationalAlertPanel (Foundation Feedback's Alert underneath)" },
  { name: "Provider Status", description: "A tabular view of every provider's current health.", component: "ProviderHealthPanel (Operational Data Grid underneath), SyncStatusPanel" },
];
