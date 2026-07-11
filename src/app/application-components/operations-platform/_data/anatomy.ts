export interface OperationsAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const OPERATIONS_ANATOMY: OperationsAnatomyRegion[] = [
  { name: "Workspace", description: "The panel shell everything else renders inside.", component: "OperationsWorkspace (Workflow Framework's own Workflow, re-exported)" },
  { name: "Header", description: "What operational view is open, and its current state.", component: "OperationsHeader (Workflow Framework's own WorkflowHeader, re-exported)" },
  { name: "Sidebar", description: "Contextual side content — filters, a system list, related views.", component: "OperationsSidebar (Workflow Framework's own WorkflowSidebar, re-exported)" },
  { name: "Monitoring", description: "The tabular listing of monitored systems — status, latency, uptime.", component: "OperationsMonitoring (Status & Health System's own ProviderHealthPanel, re-exported)" },
  { name: "Scheduler", description: "The list of scheduled or queued tasks.", component: "OperationsScheduler (Operational's own Queue, re-exported)" },
  { name: "Automation", description: "A titled stage group for automated step-by-step progression.", component: "OperationsAutomation (Pipeline Components' own PipelineStage, re-exported)" },
  { name: "Health", description: "A full inspector-shell health composition — score, metrics, issues, recommendations.", component: "OperationsHealth (Status & Health System's own HealthPanel, re-exported)" },
  { name: "Alerts", description: "Every currently active operational alert, stacked.", component: "OperationsAlerts (Status & Health System's own OperationalAlertPanel, re-exported)" },
  { name: "Inspector", description: "A single selected operational item's own lifecycle detail.", component: "OperationsInspector (State Machine's own StateInspector, re-exported)" },
  { name: "Metrics", description: "Measured operational numbers and an at-a-glance overview row.", component: "OperationsMetrics, OperationsSummary (Pipeline Components' own PipelineMetrics/PipelineSummary, re-exported)" },
  { name: "Actions", description: "What can be done right now — Retry, Pause, Resolve.", component: "OperationsActions (Workflow Framework's own WorkflowActions, re-exported)" },
];
