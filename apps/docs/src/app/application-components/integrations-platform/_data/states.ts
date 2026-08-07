export interface IntegrationsStateNote {
  state: string;
  note: string;
}

/**
 * Checked directly against every existing status vocabulary in the repo
 * (WorkflowStateValue, StateValue, ApprovalStateValue, DependencyStatusValue,
 * QueueStatusValue, HealthStatusValue, WorkflowNodeStatus). Six of eight
 * states carry at least one verbatim match; Connecting (close analog only)
 * and Archived (no analog at all) are the two genuine, disclosed gaps.
 */
export const INTEGRATIONS_STATES: IntegrationsStateNote[] = [
  { state: "Disconnected", note: "Maps to DependencyStatusValue's own \"disconnected\" verbatim — the same structural-graph vocabulary Dependency & Relationship Views already established for connectivity concepts." },
  { state: "Connecting", note: "No verbatim match anywhere — the closest analog is HealthStatusValue's own \"recovering\" (a transitional state moving toward a stable outcome, the same shape as an in-progress connection attempt). A disclosed close analog, not a forced identical mapping — the same treatment Admin Platform's own \"Auditing\" state already received." },
  { state: "Connected", note: "Maps to DependencyStatusValue's own \"connected\" verbatim." },
  { state: "Syncing", note: "Maps to HealthStatusValue's own \"syncing\" verbatim — the same mapping Commerce Platform's own \"Syncing\" state already established." },
  { state: "Healthy", note: "Maps to HealthStatusValue's own \"healthy\" verbatim, and DependencyStatusValue's own \"healthy\" verbatim — a two-way match." },
  { state: "Warning", note: "Maps to HealthStatusValue's own \"warning\" verbatim, and DependencyStatusValue's own \"warning\" verbatim — a two-way match." },
  { state: "Failed", note: "Maps to WorkflowStateValue's, StateValue's, QueueStatusValue's, and WorkflowNodeStatus's own \"failed\" verbatim — a four-way match." },
  { state: "Archived", note: "No verbatim match anywhere, and no close analog either — the identical disclosed gap Product, Publishing, Commerce, and Admin Platform Components' own \"Archived\" state already found. Rendered via Foundation's own free-text Badge (tone=\"neutral\")." },
];
