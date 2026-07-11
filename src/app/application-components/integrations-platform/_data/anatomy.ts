export interface IntegrationsAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const INTEGRATIONS_ANATOMY: IntegrationsAnatomyRegion[] = [
  { name: "Workspace", description: "The panel shell everything else renders inside.", component: "IntegrationsWorkspace (Workflow Framework's own Workflow, re-exported)" },
  { name: "Header", description: "What integrations view is open, and its current state.", component: "IntegrationsHeader (Workflow Framework's own WorkflowHeader, re-exported)" },
  { name: "Sidebar", description: "Contextual side content — provider categories, connection filters, related views.", component: "IntegrationsSidebar (Workflow Framework's own WorkflowSidebar, re-exported)" },
  { name: "Providers", description: "The browsable registry of available integration providers.", component: "IntegrationsProviders (Operational's own DataGrid, re-exported)" },
  { name: "Connections", description: "A per-connection health view — status, latency, uptime.", component: "IntegrationsConnections (Status & Health's own ProviderHealthPanel, re-exported)" },
  { name: "Mappings", description: "A peer correspondence between a source field and a target field.", component: "IntegrationsMappings (Dependency & Relationship Views' own RelationshipView, re-exported)" },
  { name: "Synchronization", description: "Per-integration sync state — last synced, or in-progress percentage.", component: "IntegrationsSync (Status & Health's own SyncStatusPanel, re-exported)" },
  { name: "Diagnostics", description: "What's currently wrong, ranked by severity.", component: "IntegrationsDiagnostics (Status & Health's own HealthIssueList, re-exported)" },
  { name: "Inspector", description: "A single selected connection's own lifecycle detail.", component: "IntegrationsInspector (State Machine's own StateInspector, re-exported)" },
  { name: "Metrics", description: "Measured integration numbers and an at-a-glance overview row.", component: "IntegrationsMetrics, IntegrationsSummary (Pipeline Components' own PipelineMetrics/PipelineSummary, re-exported)" },
  { name: "Actions", description: "What can be done right now — Reconnect, Sync now, Disconnect.", component: "IntegrationsActions (Workflow Framework's own WorkflowActions, re-exported)" },
];
