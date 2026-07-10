export interface WorkflowFutureExtension {
  title: string;
  description: string;
}

export const WORKFLOW_FUTURE_EXTENSIONS: WorkflowFutureExtension[] = [
  { title: "Parallel stages", description: "WorkflowStageGroup already lays stages side by side, but nothing yet models two stages genuinely running at once with independent completion — deferred until a real multi-track workflow needs it." },
  { title: "Conditional branches", description: "WorkflowTransition can carry a label today (\"if approved\"), but there's no branching primitive that shows two possible next stages from one step — a genuinely different component from a linear transition line." },
  { title: "Reusable workflow templates", description: "Saving a stage/step arrangement as a named, reusable starting point for a new workflow instance — a data-layer concern above this framework's own stateless, prop-driven components." },
  { title: "Workflow versioning", description: "Tracking that a running workflow instance was started under an older template definition than the one currently shown — depends on Reusable Workflow Templates existing first." },
  { title: "Workflow simulation", description: "Running a workflow definition against synthetic data to preview timing and bottlenecks before committing it to production — deferred pending real usage." },
  { title: "AI workflow generation", description: "Assembling a stage/step arrangement automatically from a stated goal rather than a screen hand-composing Workflow/WorkflowStage/WorkflowStep itself — deferred pending real usage." },
];
