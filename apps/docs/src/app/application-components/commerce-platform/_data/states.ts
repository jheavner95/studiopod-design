export interface CommerceStateNote {
  state: string;
  note: string;
}

export const COMMERCE_STATES: CommerceStateNote[] = [
  { state: "Draft", note: "No existing lifecycle vocabulary models a content publish-state, so Draft is rendered via Foundation's free-text Badge (tone=\"neutral\") rather than mapped to a shared status value." },
  { state: "Ready", note: "Maps to WorkflowStateValue's \"ready\" verbatim." },
  { state: "Syncing", note: "Maps to HealthStatusValue's \"syncing\" verbatim." },
  { state: "Processing", note: "No verbatim match — the closest analog is each vocabulary's own in-progress member under a different name (WorkflowStateValue's and QueueStatusValue's \"running,\" StateValue's \"active\")." },
  { state: "Completed", note: "Maps to WorkflowStateValue's, StateValue's, ApprovalStateValue's, and QueueStatusValue's own \"completed\" verbatim." },
  { state: "Failed", note: "Maps to WorkflowStateValue's, StateValue's, and QueueStatusValue's own \"failed\" verbatim." },
  { state: "Cancelled", note: "Maps to WorkflowStateValue's, StateValue's, ApprovalStateValue's, and QueueStatusValue's own \"cancelled\" verbatim." },
  { state: "Archived", note: "No existing lifecycle vocabulary models this state either. Rendered via Foundation's free-text Badge (tone=\"neutral\"), the same treatment as Draft." },
];
