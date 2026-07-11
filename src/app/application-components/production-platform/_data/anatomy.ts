export interface ProductionAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const PRODUCTION_ANATOMY: ProductionAnatomyRegion[] = [
  { name: "Workspace", description: "The panel shell everything else renders inside.", component: "ProductionWorkspace (Workflow Framework's own Workflow, re-exported)" },
  { name: "Header", description: "What is this production run, and where does it stand.", component: "ProductionHeader (Workflow Framework's own WorkflowHeader, re-exported)" },
  { name: "Sidebar", description: "Contextual side content — filters, a mini job list, related artifacts.", component: "ProductionSidebar (Workflow Framework's own WorkflowSidebar, re-exported)" },
  { name: "Canvas", description: "The scrollable surface holding the pipeline run or dependency graph itself.", component: "ProductionCanvas (thin wrapper over Workflow Visualization's own WorkflowViewport)" },
  { name: "Pipeline", description: "The production run's own stage-by-stage progression.", component: "ProductionPipeline, ProductionStagePanel (Pipeline Components' own Pipeline/PipelineStage, re-exported)" },
  { name: "Queue", description: "The render/print job queue awaiting or in execution.", component: "ProductionQueue (Operational's own Queue, re-exported)" },
  { name: "Validation", description: "Whether an artifact clears its quality gate.", component: "ProductionValidationPanel (Pipeline Components' own PipelineGate, re-exported)" },
  { name: "Inspector", description: "A single selected artifact's own lifecycle detail and dependency graph.", component: "ProductionInspector (State Machine's own StateInspector, re-exported)" },
  { name: "Metrics", description: "Measured run-time numbers and an at-a-glance overview row.", component: "ProductionMetrics, ProductionSummary (Pipeline Components' own PipelineMetrics/PipelineSummary, re-exported)" },
  { name: "Actions", description: "What can be done right now — Approve, Retry, Cancel.", component: "ProductionActions (Workflow Framework's own WorkflowActions, re-exported)" },
];
