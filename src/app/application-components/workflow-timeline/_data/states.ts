export interface TimelineStateNote {
  state: string;
  note: string;
}

export const TIMELINE_STATES: TimelineStateNote[] = [
  { state: "Pending", note: "WorkflowTimelineMarker's \"pending\" value shows a plain outlined dot — an event that hasn't started yet, queued later in the sequence." },
  { state: "Running", note: "WorkflowTimelineMarker's \"running\" value fills the dot with the accent color — the event actively in progress right now." },
  { state: "Completed", note: "WorkflowTimelineMarker's \"completed\" value swaps the dot for a checkmark — the event finished successfully." },
  { state: "Failed", note: "WorkflowTimelineMarker's \"failed\" value shows an error-tone marker with an X — the event did not complete successfully." },
  { state: "Cancelled", note: "WorkflowTimelineMarker's \"cancelled\" value shows a neutral outlined marker with a ban icon — the event was abandoned before it ran." },
  { state: "Blocked", note: "WorkflowTimelineMarker's \"blocked\" value shows a warning-tone marker with an alert icon — this event can't proceed until something outside the timeline is resolved." },
  { state: "Waiting", note: "WorkflowTimelineMarker's \"waiting\" value shows a dashed-border marker with a clock icon — paused on a real but expected dependency (e.g. an approval), distinct from Blocked (which is exceptional)." },
  { state: "Skipped", note: "WorkflowTimelineMarker's \"skipped\" value shows a skip-forward icon — an optional event the sequence bypassed. This package's own WorkflowTimelineEventStatus is independently declared rather than reusing WorkflowStateValue (no Skipped value) or WorkflowStepperStateValue (a single-cursor \"current\" concept, not a per-event state) — checked directly against both before adding a third." },
];
