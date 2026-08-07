export interface WorkflowWhenToUseRule {
  title: string;
  explanation: string;
}

export const WORKFLOW_WHEN_TO_USE: WorkflowWhenToUseRule[] = [
  {
    title: "Reach for it when steps need independent status",
    explanation:
      "WorkflowStep's status is passed directly rather than derived from a shared current-index — one step can sit Waiting while a sibling is Blocked, a shape a single-cursor stepper can't represent.",
  },
  {
    title: "Not for diagram or timeline visualization",
    explanation:
      "A separate diagram library handles read-only canvas diagrams and timelines. Reach for this framework instead when the screen needs an interactive, operator-facing stage/step/transition surface people act on.",
  },
  {
    title: "Bring your own business logic",
    explanation:
      "This package renders state, it doesn't decide it — gating rules, retry behavior, and a stage's aggregate status are your application's responsibility, not something Workflow Framework computes on its own.",
  },
  {
    title: "Built on proven primitives",
    explanation:
      "WorkflowHeader, WorkflowSidebar, WorkflowProgress, and WorkflowFooter each delegate to an existing Foundation or Operational component, so behavior like focus handling and color tokens stay consistent with the rest of the system.",
  },
];
