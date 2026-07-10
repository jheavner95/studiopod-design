export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Health hierarchy",
    text: "HealthScore is a rollup, not a replacement for the metrics behind it — show both when space allows; a score alone can't explain why it's 62 instead of 95.",
  },
  {
    label: "Severity",
    text: "HealthIssueSeverity (critical/warning/info) and HealthStatusValue (the eight-state health vocabulary) are deliberately separate types — an individual issue's severity doesn't have to match the overall panel's status value.",
  },
  {
    label: "Metric grouping",
    text: "Use Foundation Metadata's own StatGroup columns prop to control density — 2 columns for a narrow sidebar panel, 3–4 for a full-width dashboard. HealthPanel defaults to 2, appropriate for its own Inspector-Panel-shaped container.",
  },
  {
    label: "Issue prioritization",
    text: "HealthIssueList renders issues in the order given — sort by severity (or recency) before passing the array in; this family doesn't re-rank for you.",
  },
  {
    label: "Recommendations",
    text: "HealthRecommendation is one suggestion per Alert — for several at once, stack them the same way OperationalAlertPanel stacks its own entries, rather than cramming multiple suggestions into one Alert's children.",
  },
  {
    label: "Timeline usage",
    text: "StatusTimeline expects newest-first entries already sorted by the caller (inherited from InspectorHistory, which never re-sorts) — pass a HealthIndicator as an entry's icon to show what state a system was in at each point.",
  },
];
