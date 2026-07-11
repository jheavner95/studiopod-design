export interface IntelligenceImplementationGuidance {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: IntelligenceImplementationGuidance[] = [
  { label: "Platform composition", text: "Every one of these 12 components is a pure re-export over an already-certified Workflow or Operational component — checked directly against the platform's own composition rules before writing each file, and in every case an existing component's prop surface already covered the need with no Intelligence-specific field required. The same zero-new-wrapper-code precedent every other platform in this family already established. Unlike the others, this one leans heavily on the Dashboard Widget System and Status & Health System rather than Workflow's own Pipeline/Approval families, since recommendations/health/diagnostics/insights are exactly what those two Operational systems were already built for." },
  { label: "Workflow integration", text: "IntelligenceInspector composes State Machine directly for a single analysis' own lifecycle. IntelligenceMetrics/IntelligenceSummary compose Pipeline Components directly, the same precedent-consistent pair every other platform's own Metrics/Summary already used, over Dashboard Widget System's own KPIWidget (considered as an alternative but not chosen, to stay consistent with the established pair)." },
  { label: "Operational integration", text: "IntelligenceRecommendations composes Dashboard Widget System's own RecommendationWidget directly. IntelligenceHealth composes Status & Health System's own HealthPanel directly — chosen over the tile-shaped HealthWidget because Intelligence's own Inspector-shell workspace context matches HealthPanel's own design intent, not a dashboard-tile context. IntelligenceDiagnostics composes Status & Health's own HealthIssueList directly. IntelligenceInsights composes Dashboard Widget System's own ChartWidget directly. IntelligenceOpportunities composes Operational's own DataGrid directly, the same tabular reuse Commerce and Publishing Platform's own components already established — five of twelve components reusing Operational directly, more than any other platform in this family." },
  { label: "Health presentation", text: "IntelligenceHealth does not implement real health-check, monitoring, or scoring logic — it renders whatever score/metrics/issues/recommendations the caller supplies through HealthPanel. Whether a system is actually healthy is Business Feature logic, not something this platform component decides." },
  { label: "Recommendation presentation", text: "IntelligenceRecommendations does not implement recommendation generation, ranking, or scoring — it renders whatever RecommendationEntry[] the caller supplies through RecommendationWidget. Which recommendations actually surface is Business Feature logic." },
  { label: "Diagnostics", text: "IntelligenceDiagnostics does not implement root-cause analysis — it renders whatever HealthIssueEntry[] the caller supplies through HealthIssueList, already ranked by the caller; this component never re-sorts by severity." },
  { label: "Insight organization", text: "IntelligenceInsights does not implement data aggregation or trend calculation — it renders whatever ChartWidgetDatum[] the caller supplies through ChartWidget. The Intelligence platform's own explicit scope boundary: \"the actual analytics computation, ML inference, and data pipeline stay in Business Features... Platform only owns how an insight is displayed and navigated, not how it's computed.\"" },
];

const COMPOSITION_LABELS = ["Platform composition", "Workflow integration", "Operational integration"];

/** How these components are built — which lower tiers each one composes. */
export const INTELLIGENCE_COMPOSITION_GUIDANCE: IntelligenceImplementationGuidance[] = IMPLEMENTATION_GUIDANCE.filter(
  (item) => COMPOSITION_LABELS.includes(item.label),
);

/** What each subdomain does and does not own — grounds "When to use" against Business Feature logic. */
export const INTELLIGENCE_SCOPE_GUIDANCE: IntelligenceImplementationGuidance[] = IMPLEMENTATION_GUIDANCE.filter(
  (item) => !COMPOSITION_LABELS.includes(item.label),
);
