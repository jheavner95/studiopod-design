export interface OperationsStateNote {
  state: string;
  note: string;
}

/**
 * Checked directly against every existing status vocabulary in the repo
 * (WorkflowStateValue, StateValue, ApprovalStateValue, DependencyStatusValue,
 * QueueStatusValue, HealthStatusValue, WorkflowNodeStatus) before writing
 * this file — the same discipline every prior Platform package's own
 * states.ts already established. Every state below has at least one
 * verbatim match except Monitoring, which is a disclosed close analog only,
 * the same discipline Intelligence Platform's own "Analyzing" state already
 * used. Paused is notable as a three-way verbatim match (QueueStatusValue,
 * HealthStatusValue, and WorkflowNodeStatus all carry it).
 */
export const OPERATIONS_STATES: OperationsStateNote[] = [
  { state: "Idle", note: "Maps to WorkflowNodeStatus's own \"idle\" verbatim — the same mapping Intelligence Platform's own \"Idle\" state already established; not present in WorkflowStateValue, StateValue, QueueStatusValue, or HealthStatusValue." },
  { state: "Monitoring", note: "No verbatim match anywhere — the closest analogs are HealthStatusValue's own \"syncing\" (an in-progress observation state) or WorkflowStateValue's/QueueStatusValue's own \"running\". A disclosed close analog, not a forced identical mapping, the same discipline Intelligence Platform's own \"Analyzing\" state already used." },
  { state: "Running", note: "Maps to WorkflowStateValue's, QueueStatusValue's, and WorkflowNodeStatus's own \"running\" verbatim." },
  { state: "Paused", note: "Maps to QueueStatusValue's, HealthStatusValue's, and WorkflowNodeStatus's own \"paused\" verbatim — a three-way match, the first Platform state to land on all three." },
  { state: "Healthy", note: "Maps to HealthStatusValue's own \"healthy\" verbatim, and DependencyStatusValue's own \"healthy\" verbatim." },
  { state: "Warning", note: "Maps to HealthStatusValue's own \"warning\" verbatim, and DependencyStatusValue's own \"warning\" verbatim." },
  { state: "Critical", note: "Maps to HealthStatusValue's own \"critical\" verbatim, and DependencyStatusValue's own \"critical\" verbatim." },
  { state: "Completed", note: "Maps to WorkflowStateValue's, StateValue's, ApprovalStateValue's, QueueStatusValue's, and WorkflowNodeStatus's own \"completed\" verbatim — a five-way match." },
];
