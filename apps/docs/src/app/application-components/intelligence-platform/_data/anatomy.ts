export interface IntelligenceAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const INTELLIGENCE_ANATOMY: IntelligenceAnatomyRegion[] = [
  { name: "Workspace", description: "The panel shell everything else renders inside.", component: "IntelligenceWorkspace (Workflow Framework's own Workflow, re-exported)" },
  { name: "Header", description: "What analysis is open, and its current state.", component: "IntelligenceHeader (Workflow Framework's own WorkflowHeader, re-exported)" },
  { name: "Sidebar", description: "Contextual side content — filters, a category tree, related analyses.", component: "IntelligenceSidebar (Workflow Framework's own WorkflowSidebar, re-exported)" },
  { name: "Recommendations", description: "A stacked list of suggested next steps.", component: "IntelligenceRecommendations (Dashboard Widget System's own RecommendationWidget, re-exported)" },
  { name: "Opportunities", description: "The tabular listing of scored/ranked business opportunities.", component: "IntelligenceOpportunities (Operational's own DataGrid, re-exported)" },
  { name: "Health", description: "A full inspector-shell health composition — score, metrics, issues, recommendations.", component: "IntelligenceHealth (Status & Health System's own HealthPanel, re-exported)" },
  { name: "Diagnostics", description: "What's currently wrong, one row per issue, ranked by severity.", component: "IntelligenceDiagnostics (Status & Health System's own HealthIssueList, re-exported)" },
  { name: "Insights", description: "A compact column chart of a data-driven finding.", component: "IntelligenceInsights (Dashboard Widget System's own ChartWidget, re-exported)" },
  { name: "Inspector", description: "A single selected analysis' own lifecycle detail.", component: "IntelligenceInspector (State Machine's own StateInspector, re-exported)" },
  { name: "Metrics", description: "Measured intelligence numbers and an at-a-glance overview row.", component: "IntelligenceMetrics, IntelligenceSummary (Pipeline Components' own PipelineMetrics/PipelineSummary, re-exported)" },
  { name: "Actions", description: "What can be done right now — Apply, Dismiss, Archive.", component: "IntelligenceActions (Workflow Framework's own WorkflowActions, re-exported)" },
];
