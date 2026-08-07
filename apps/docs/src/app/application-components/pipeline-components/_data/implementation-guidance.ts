export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Pipeline hierarchy",
    text: "This package holds no opinion on how many stages a pipeline has, or whether stages run in a fixed order — PipelineStage carries no gating logic of its own, matching Workflow Framework's own \"framework only\" stance every package in this tier already inherits.",
  },
  {
    label: "Stage ownership",
    text: "PipelineStep/PipelineStatus's status is passed directly by the caller, not derived internally — the same controlled-component contract Workflow Framework's own WorkflowStep already established, using WorkflowStateValue directly rather than a parallel Pipeline-specific type.",
  },
  {
    label: "Branch behavior",
    text: "PipelineBranch lays its children out side by side but has no opinion on whether a real pipeline run takes one branch or all of them — that decision (conditional routing vs. genuine parallel execution) is entirely the caller's own domain logic, not something this display component resolves.",
  },
  {
    label: "Gate behavior",
    text: "PipelineGate records and displays a decision — it does not enforce that a blocked gate actually prevents the next stage from rendering. A caller wanting real gating (don't render Stage 2 until Stage 1's gate is Approved) implements that check itself using the same ApprovalStateValue PipelineGate already exposes.",
  },
  {
    label: "Progress reporting",
    text: "PipelineProgress computes its own value/label from completedStages/totalStages — a caller with more granular progress (e.g. partial credit for an in-progress stage) computes its own fractional value and passes it to WorkflowProgress directly instead of going through PipelineProgress's whole-stage-count convenience wrapper.",
  },
  {
    label: "Metrics placement",
    text: "PipelineMetrics and PipelineSummary are siblings, not one wrapping the other — Summary is the pipeline's own overview stats (stage counts, blocked count), Metrics is for measured run-time numbers (throughput, duration, error rate). A screen needing both renders them as two separate StatGroup-backed regions rather than nesting one inside the other.",
  },
];
