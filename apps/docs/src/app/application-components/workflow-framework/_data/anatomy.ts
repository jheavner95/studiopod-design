export interface WorkflowAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const WORKFLOW_ANATOMY: WorkflowAnatomyRegion[] = [
  { name: "Header", description: "What workflow this is, and its live status/progress at a glance.", component: "WorkflowHeader (Foundation Metadata's own IdentityBlock underneath)" },
  { name: "Sidebar", description: "Contextual detail alongside the main workflow — summary stats, related items.", component: "WorkflowSidebar (Foundation Layout's own Surface/ScrollArea underneath)" },
  { name: "Stages", description: "A titled group of steps — the unit a workflow is built from.", component: "WorkflowStage, WorkflowStageGroup (Foundation Layout's own Grid underneath)" },
  { name: "Steps", description: "One unit of work within a stage, each with its own independent status.", component: "WorkflowStep" },
  { name: "Transitions", description: "The connector between steps or stages — a plain line, or a named gate.", component: "WorkflowTransition" },
  { name: "Progress", description: "The workflow's own overall completion.", component: "WorkflowProgress (Foundation Feedback's own ProgressBar underneath)" },
  { name: "Summary", description: "An at-a-glance metric row — steps completed, time elapsed, blockers.", component: "WorkflowSummary (Foundation Metadata's own StatGroup underneath)" },
  { name: "Actions", description: "What can be done to the workflow right now.", component: "WorkflowActions (Operational Inspector Panel's own InspectorActions underneath)" },
  { name: "Footer", description: "A sticky bar pinning actions to the bottom of the workflow regardless of scroll.", component: "WorkflowFooter (Operational Inspector Panel's own InspectorFooter underneath)" },
];
