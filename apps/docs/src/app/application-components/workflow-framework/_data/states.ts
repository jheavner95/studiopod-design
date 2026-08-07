export interface WorkflowStateNote {
  state: string;
  note: string;
}

export const WORKFLOW_STATES: WorkflowStateNote[] = [
  { state: "Not Started", note: "WorkflowStatus's \"not-started\" value maps to StatusIndicator's idle dot — nothing has happened yet, distinct from Ready (which implies it's next in line)." },
  { state: "Ready", note: "WorkflowStatus's \"ready\" value maps to StatusIndicator's idle dot — queued to begin, waiting on nothing external." },
  { state: "Running", note: "WorkflowStatus's \"running\" value maps to StatusIndicator's pulsing accent dot; WorkflowProgress reports how far along it is while this state holds." },
  { state: "Waiting", note: "WorkflowStatus's \"waiting\" value maps to StatusIndicator's idle dot — paused on an external dependency (an approval, a scheduled time), not a failure." },
  { state: "Blocked", note: "WorkflowStatus's \"blocked\" value maps to StatusIndicator's warning dot — can't proceed until something is resolved, distinct from Waiting (which is expected, not exceptional)." },
  { state: "Completed", note: "WorkflowStatus's \"completed\" value maps to StatusIndicator's non-pulsing success dot; WorkflowSummary reports the final outcome." },
  { state: "Failed", note: "WorkflowStatus's \"failed\" value maps to StatusIndicator's non-pulsing error dot — this framework has no built-in retry; that's a caller/business-logic concern, same as Queue & Job's own JobRetry pattern." },
  { state: "Cancelled", note: "WorkflowStatus's \"cancelled\" value maps to StatusIndicator's idle dot — stopped deliberately before completion, distinct from Failed (no error occurred)." },
];
