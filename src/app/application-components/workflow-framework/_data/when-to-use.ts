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
      "The pre-existing Workflow Diagram Library (src/workflows/) renders read-only canvas diagrams and timelines. Reach for this framework instead when the screen needs an interactive, operator-facing stage/step/transition surface.",
  },
  {
    title: "Bring your own business logic",
    explanation:
      "This package renders state, it doesn't decide it — gating rules, retry behavior, and a stage's aggregate status are the caller's responsibility, not something Workflow Framework computes on its own.",
  },
  {
    title: "Compose from already-certified primitives",
    explanation:
      "WorkflowHeader, WorkflowSidebar, WorkflowProgress, and WorkflowFooter each delegate to an existing Foundation or Operational component rather than a bespoke implementation — see Overview for the full region-by-region mapping.",
  },
];
