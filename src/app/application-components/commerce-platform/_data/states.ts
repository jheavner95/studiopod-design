export interface CommerceStateNote {
  state: string;
  note: string;
}

/**
 * Checked directly against every existing status vocabulary in the repo
 * (WorkflowStateValue, StateValue, ApprovalStateValue, DependencyStatusValue,
 * QueueStatusValue, HealthStatusValue) before writing this file — the same
 * discipline Product and Publishing Platform Components' own states.ts
 * already established. Draft and Archived have no match anywhere, the
 * identical disclosed gap the two prior packages found for the same state
 * names. Syncing is the first Platform package where HealthStatusValue
 * itself supplies a literal lifecycle-state match, rather than only
 * powering a health/providers panel.
 */
export const COMMERCE_STATES: CommerceStateNote[] = [
  { state: "Draft", note: "No existing lifecycle vocabulary models a content publish-state — the same disclosed gap Product and Publishing Platform Components' own \"Draft\" state already found. Rendered via Foundation's own free-text Badge (tone=\"neutral\")." },
  { state: "Ready", note: "Maps to WorkflowStateValue's own \"ready\" verbatim." },
  { state: "Syncing", note: "Maps to HealthStatusValue's own \"syncing\" verbatim — the first Platform package where this vocabulary supplies a literal lifecycle-state match rather than only powering a Providers/health panel." },
  { state: "Processing", note: "No verbatim match — the closest analog is each vocabulary's own in-progress member under a different name (WorkflowStateValue's and QueueStatusValue's \"running\", StateValue's \"active\"). A disclosed close analog, not a forced identical mapping, the same discipline Publishing Platform's own \"Publishing\" state already used." },
  { state: "Completed", note: "Maps to WorkflowStateValue's, StateValue's, ApprovalStateValue's, and QueueStatusValue's own \"completed\" verbatim." },
  { state: "Failed", note: "Maps to WorkflowStateValue's, StateValue's, and QueueStatusValue's own \"failed\" verbatim." },
  { state: "Cancelled", note: "Maps to WorkflowStateValue's, StateValue's, ApprovalStateValue's, and QueueStatusValue's own \"cancelled\" verbatim." },
  { state: "Archived", note: "No existing lifecycle vocabulary models this — the identical disclosed gap Product and Publishing Platform Components' own \"Archived\" state already found. Rendered via Foundation's own free-text Badge (tone=\"neutral\")." },
];
