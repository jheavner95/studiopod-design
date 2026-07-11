export interface MachineStateNote {
  state: string;
  note: string;
}

export const MACHINE_STATES: MachineStateNote[] = [
  { state: "Initial", note: "StateNode's \"initial\" value shows a plain outlined marker — the machine hasn't started yet. Genuinely collapses Workflow Framework's own separate \"not-started\"/\"ready\" distinction into one, since a state machine's own starting point doesn't need that split." },
  { state: "Active", note: "StateNode's \"active\" value fills the marker with the accent color — the state currently in effect." },
  { state: "Waiting", note: "StateNode's \"waiting\" value shows a dashed-border marker — paused on a real but expected dependency, distinct from Blocked." },
  { state: "Blocked", note: "StateNode's \"blocked\" value shows a warning-tone marker with an alert icon — this state can't transition until something outside the machine is resolved." },
  { state: "Completed", note: "StateNode's \"completed\" value swaps the marker for a checkmark — the machine reached this state successfully." },
  { state: "Failed", note: "StateNode's \"failed\" value shows an error-tone marker with an X — the machine reached this state because something went wrong." },
  { state: "Cancelled", note: "StateNode's \"cancelled\" value shows a struck-through label with a neutral marker — the machine (or this state specifically) was abandoned." },
  { state: "Terminal", note: "StateNode's \"terminal\" value shows a filled square marker — the machine has reached an end state with no further transitions out of it. Has no counterpart in Workflow Framework's own WorkflowStateValue at all — a genuine structural gap, checked directly, the same kind that already justified WorkflowTimelineEventStatus's Skipped and ApprovalStateValue's Rejected/Changes Requested/Expired as their own independent types. Unlike Pipeline Components' own PipelineStatus (which reuses WorkflowStateValue verbatim, since its target vocabulary differed only by a label), this package declares its own independent StateValue type." },
];
