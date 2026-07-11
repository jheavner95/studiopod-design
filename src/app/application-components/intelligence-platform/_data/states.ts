export interface IntelligenceStateNote {
  state: string;
  note: string;
}

/**
 * Checked directly against every existing status vocabulary in the repo
 * (WorkflowStateValue, StateValue, ApprovalStateValue, DependencyStatusValue,
 * QueueStatusValue, HealthStatusValue, WorkflowNodeStatus) before writing
 * this file — the same discipline every prior Platform package's own
 * states.ts already established. Only Archived has no match anywhere, the
 * identical disclosed gap Product/Publishing/Commerce Platform Components
 * already found for the same state name. Idle is notable as the first
 * Platform state to map onto WorkflowNodeStatus rather than any of the six
 * other vocabularies.
 */
export const INTELLIGENCE_STATES: IntelligenceStateNote[] = [
  { state: "Idle", note: "Maps to WorkflowNodeStatus's own \"idle\" verbatim — the only vocabulary in the repo carrying this literal name; not present in WorkflowStateValue, StateValue, QueueStatusValue, or HealthStatusValue." },
  { state: "Analyzing", note: "No verbatim match — the closest analog is each vocabulary's own in-progress member under a different name (WorkflowStateValue's and QueueStatusValue's \"running\", StateValue's \"active\", HealthStatusValue's \"syncing\"). A disclosed close analog, not a forced identical mapping, the same discipline Commerce Platform's own \"Processing\" state already used." },
  { state: "Ready", note: "Maps to WorkflowStateValue's own \"ready\" verbatim." },
  { state: "Healthy", note: "Maps to HealthStatusValue's own \"healthy\" verbatim, and DependencyStatusValue's own \"healthy\" verbatim." },
  { state: "Warning", note: "Maps to HealthStatusValue's own \"warning\" verbatim, and DependencyStatusValue's own \"warning\" verbatim." },
  { state: "Critical", note: "Maps to HealthStatusValue's own \"critical\" verbatim, and DependencyStatusValue's own \"critical\" verbatim." },
  { state: "Completed", note: "Maps to WorkflowStateValue's, StateValue's, ApprovalStateValue's, QueueStatusValue's, and WorkflowNodeStatus's own \"completed\" verbatim." },
  { state: "Archived", note: "No existing lifecycle vocabulary models this — the identical disclosed gap Product, Publishing, and Commerce Platform Components' own \"Archived\" state already found. Rendered via Foundation's own free-text Badge (tone=\"neutral\")." },
];
