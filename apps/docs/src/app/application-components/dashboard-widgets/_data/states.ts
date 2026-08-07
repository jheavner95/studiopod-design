export interface DashboardStateNote {
  state: string;
  note: string;
}

export const DASHBOARD_STATES: DashboardStateNote[] = [
  { state: "Loading", note: "DashboardSection's loading prop swaps its children for Foundation Feedback's own LoadingState — the same placeholder on first mount and on a caller-triggered refresh." },
  { state: "Refreshing", note: "The same loading prop, triggered by a refresh action rather than an initial fetch — this family doesn't distinguish the two with separate props, since both replace the section's content with LoadingState until data resolves." },
  { state: "Healthy", note: "HealthIndicator's/QueueStatus's \"healthy\"-adjacent values map to StatusIndicator's success dot; HealthScore's ring turns success tone at 80 and above." },
  { state: "Warning", note: "HealthIndicator's \"warning\" value maps to StatusIndicator's warning dot; HealthIssueList's warning-severity rows use the same amber icon treatment." },
  { state: "Critical", note: "HealthIndicator's \"critical\" value maps to StatusIndicator's error dot; HealthScore's ring turns error tone below 50." },
  { state: "Empty", note: "DashboardEmptyState for a whole empty dashboard; RecommendationWidget's own emptyMessage and Queue's own QueueEmptyState cover an individual widget with nothing to show." },
  { state: "Error", note: "A widget that failed to load is a section-level concern, not a per-widget prop — wrap the failed section's DashboardSection content in Foundation Feedback's own Alert (tone=\"error\") rather than adding a second error implementation to every widget." },
  { state: "Read-only", note: "Every widget's actions/action slots are optional — a read-only dashboard is simply one where a screen never passes them, not a separate mode this family switches on." },
];
