export interface PublishingAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const PUBLISHING_ANATOMY: PublishingAnatomyRegion[] = [
  { name: "Workspace", description: "The panel shell everything else renders inside.", component: "PublishingWorkspace (Workflow Framework's own Workflow, re-exported)" },
  { name: "Header", description: "What publication is open, and its current state.", component: "PublishingHeader (Workflow Framework's own WorkflowHeader, re-exported)" },
  { name: "Sidebar", description: "Contextual side content — filters, a channel list, related publications.", component: "PublishingSidebar (Workflow Framework's own WorkflowSidebar, re-exported)" },
  { name: "Targets", description: "The tabular listing of publishing destinations — website, app store, print, marketplace.", component: "PublishingTargets (Operational's own DataGrid, re-exported)" },
  { name: "Providers", description: "The connection/service health of every publishing provider.", component: "PublishingProviders (Operational's own ProviderHealthPanel, re-exported)" },
  { name: "Queue", description: "The publish job queue awaiting or in execution.", component: "PublishingQueue (Operational's own Queue, re-exported)" },
  { name: "History", description: "A publication's own chronological record of what actually happened.", component: "PublishingHistory (State Machine's own StateHistory, re-exported)" },
  { name: "Validation", description: "Whether a publication clears its own pre-publish gate.", component: "PublishingValidationPanel (Pipeline Components' own PipelineGate, re-exported)" },
  { name: "Inspector", description: "A single selected publication's own lifecycle detail.", component: "PublishingInspector (State Machine's own StateInspector, re-exported)" },
  { name: "Metrics", description: "Measured publishing numbers and an at-a-glance overview row.", component: "PublishingMetrics, PublishingSummary (Pipeline Components' own PipelineMetrics/PipelineSummary, re-exported)" },
  { name: "Actions", description: "What can be done right now — Publish, Retry, Cancel.", component: "PublishingActions (Workflow Framework's own WorkflowActions, re-exported)" },
];
