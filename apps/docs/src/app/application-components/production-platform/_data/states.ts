export interface ProductionStateNote {
  state: string;
  note: string;
}

export const PRODUCTION_STATES: ProductionStateNote[] = [
  { state: "Draft", note: "Maps to WorkflowStateValue's \"not-started\" — a job or artifact that hasn't begun." },
  { state: "Ready", note: "Maps to WorkflowStateValue's \"ready\" verbatim." },
  { state: "Running", note: "Maps to WorkflowStateValue's \"running\" for a pipeline stage, or Operational's QueueStatusValue \"running\" for a queued job — the same concept shown through whichever component is rendering it." },
  { state: "Waiting", note: "Maps to WorkflowStateValue's \"waiting\" verbatim." },
  { state: "Blocked", note: "Maps to WorkflowStateValue's \"blocked\" verbatim, or DependencyStatusValue's \"blocked\" when the holdup is a missing dependency — unresolved artwork, a missing font — rather than a pipeline stall." },
  { state: "Validated", note: "Not a lifecycle status — it's the approved outcome from a validation gate, shown through ProductionValidationPanel." },
  { state: "Completed", note: "Maps to WorkflowStateValue's \"completed\" (or QueueStatusValue's \"completed\" for a finished job) verbatim." },
  { state: "Failed", note: "Maps to WorkflowStateValue's \"failed\" for a pipeline stage, QueueStatusValue's \"failed\" for a job, or ApprovalStateValue's \"rejected\" for a validation gate — the same underlying concept, expressed differently depending on which component renders it." },
];
