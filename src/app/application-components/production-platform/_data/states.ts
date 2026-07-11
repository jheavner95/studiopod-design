export interface ProductionStateNote {
  state: string;
  note: string;
}

export const PRODUCTION_STATES: ProductionStateNote[] = [
  { state: "Draft", note: "Maps to WorkflowStateValue's own \"not-started\" — a job or artifact that hasn't begun. No new status value: this platform composes lower-tier vocabularies per sub-concern rather than declaring its own, checked directly against all three already-certified options before writing a single line of Platform code." },
  { state: "Ready", note: "Maps to WorkflowStateValue's own \"ready\" verbatim." },
  { state: "Running", note: "Maps to WorkflowStateValue's own \"running\" for a pipeline stage, or Operational's own QueueStatusValue \"running\" for a queued job — the same concept expressed through whichever component is actually rendering it." },
  { state: "Waiting", note: "Maps to WorkflowStateValue's own \"waiting\" verbatim." },
  { state: "Blocked", note: "Maps to WorkflowStateValue's own \"blocked\" verbatim, or DependencyStatusValue's own \"blocked\" when the block is a dependency (missing artwork, unresolved font) rather than a pipeline stall." },
  { state: "Validated", note: "Not a lifecycle status at all — it's ApprovalStateValue's own \"approved\" outcome, rendered through ProductionValidationPanel (= PipelineGate = ApprovalDecision/ApprovalStatus). Checked directly against WorkflowStateValue's, StateValue's, and ApprovalStateValue's own full value lists: none has a literal \"Validated\" member, because Validated is a gate decision, not a missing lifecycle state — declaring a new ProductionStatusValue here would have duplicated ApprovalStateValue for no structural reason." },
  { state: "Completed", note: "Maps to WorkflowStateValue's own \"completed\" (or QueueStatusValue's \"completed\" for a finished job) verbatim." },
  { state: "Failed", note: "Maps to WorkflowStateValue's own \"failed\" for a pipeline stage, QueueStatusValue's own \"failed\" for a job, or ApprovalStateValue's own \"rejected\" for a validation gate — same underlying concept, different composed vocabulary depending on which component renders it." },
];
