export interface AdminStateNote {
  state: string;
  note: string;
}

/**
 * Checked directly against every existing status vocabulary in the repo
 * (WorkflowStateValue, StateValue, ApprovalStateValue, DependencyStatusValue,
 * QueueStatusValue, HealthStatusValue, WorkflowNodeStatus) before writing
 * this file — the same discipline every prior Platform package's own
 * states.ts already established. Configured and Archived have no verbatim
 * match and no close analog anywhere, the identical disclosed-gap treatment
 * prior packages already gave their own "Archived" state, rendered via
 * Foundation's own free-text Badge. Disabled and Auditing are close analogs
 * only, the same discipline Operations Platform's own "Monitoring" state
 * already used.
 */
export const ADMIN_STATES: AdminStateNote[] = [
  { state: "Active", note: "Maps to StateValue's own \"active\" verbatim." },
  { state: "Pending", note: "Maps to ApprovalStateValue's own \"pending\" verbatim — the only vocabulary carrying this literal name, fitting an enrollment/approval-gated concept." },
  { state: "Disabled", note: "No verbatim match anywhere — the closest analogs are HealthStatusValue's own \"offline\" or DependencyStatusValue's own \"disconnected\" (both express \"not currently active\"). A disclosed close analog, not a forced identical mapping." },
  { state: "Configured", note: "No verbatim match anywhere, and no close analog either — none of the seven existing vocabularies express a \"setup complete, ready\" concept distinct from WorkflowStateValue's own \"ready\" or \"completed.\" A genuine, disclosed gap, rendered via Foundation's own free-text Badge (tone=\"accent\")." },
  { state: "Auditing", note: "No verbatim match anywhere — the closest analog is HealthStatusValue's own \"syncing\" (an in-progress observation/verification state), the same style of analog Operations Platform's own \"Monitoring\" state already used." },
  { state: "Healthy", note: "Maps to HealthStatusValue's own \"healthy\" verbatim, and DependencyStatusValue's own \"healthy\" verbatim." },
  { state: "Completed", note: "Maps to WorkflowStateValue's, StateValue's, ApprovalStateValue's, QueueStatusValue's, and WorkflowNodeStatus's own \"completed\" verbatim — a five-way match." },
  { state: "Archived", note: "No verbatim match anywhere, and no close analog either — the identical disclosed gap Product, Publishing, and Commerce Platform Components' own \"Archived\" state already found. Rendered via Foundation's own free-text Badge (tone=\"neutral\")." },
];
