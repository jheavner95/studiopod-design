export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "State ownership",
    text: "StateNode's status is passed directly by the caller, not derived internally — the same controlled-component contract Workflow Framework's own WorkflowStep already established, using this package's own StateValue instead.",
  },
  {
    label: "Transition rules",
    text: "This package holds no opinion on which states a machine may move between — StateTransition renders a line and an optional label, nothing more. Whether a transition is allowed is entirely your own domain logic to implement, the same \"framework only\" stance Workflow Framework's own WorkflowTransition takes.",
  },
  {
    label: "Guard conditions",
    text: "StateCondition displays whether a condition holds — it does not evaluate the condition itself. A caller computes met/unmet from its own domain logic and passes the boolean in; StateCondition has no expression language or rule engine of its own.",
  },
  {
    label: "Action execution",
    text: "StateAction is a display-only record of what fires on enter/exit/transition — it does not execute anything itself. A caller wanting real side effects wires its own event handlers; StateAction's job is documenting what those handlers do, the same read-only-record stance PipelineGate's own decision display already takes for approval outcomes.",
  },
  {
    label: "History",
    text: "StateHistory doesn't sort or generate its own entries — the caller supplies StateHistoryEntry objects already in order (typically newest-first), the same contract Pipeline Components' own PipelineHistory and Approval & Review's own ReviewHistory already follow.",
  },
  {
    label: "Metrics",
    text: "StateMetrics and StateSummary are siblings, not one wrapping the other — Summary is the machine's own overview stats (state count, active count), Metrics is for measured numbers a real run produces (transitions per minute, average time-in-state). A screen needing both renders them as two separate StatGroup-backed regions, the identical relationship Pipeline Components' own PipelineMetrics/PipelineSummary already established.",
  },
];
