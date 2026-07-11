export interface PipelineAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const PIPELINE_ANATOMY: PipelineAnatomyRegion[] = [
  { name: "Pipeline", description: "The panel shell everything else renders inside.", component: "Pipeline (Workflow Framework's own Workflow, re-exported)" },
  { name: "Stages", description: "A titled group of steps — the unit a pipeline run is built from.", component: "PipelineStage (Workflow Framework's own WorkflowStage, re-exported)" },
  { name: "Steps", description: "One step in a stage — a status marker plus a label, connected to its neighbor.", component: "PipelineStep, PipelineConnector, PipelineStatus" },
  { name: "Branches", description: "A point where the pipeline splits into two or more parallel or conditional paths.", component: "PipelineBranch" },
  { name: "Gates", description: "A checkpoint a stage must clear — an approval decision, not just a status.", component: "PipelineGate (composes Approval & Review's own ApprovalDecision)" },
  { name: "Progress", description: "\"Stage N of M\" — the run's own overall completion.", component: "PipelineProgress (Workflow Framework's own WorkflowProgress underneath)" },
  { name: "Metrics", description: "Measured numbers a run produces — throughput, duration, error rate.", component: "PipelineMetrics, PipelineSummary" },
  { name: "Actions", description: "What can be done right now — Retry, Pause, Cancel.", component: "PipelineActions (Workflow Framework's own WorkflowActions, re-exported)" },
  { name: "History", description: "The chronological record of every stage transition in this run.", component: "PipelineHistory (composes Workflow Timeline directly)" },
];
