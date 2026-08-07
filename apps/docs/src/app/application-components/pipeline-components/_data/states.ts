export interface PipelineStateNote {
  state: string;
  note: string;
}

export const PIPELINE_STATES: PipelineStateNote[] = [
  { state: "Pending", note: "PipelineStatus's \"not-started\" value shows a plain outlined marker — a stage later in the run than the current one. Reuses Workflow Framework's own WorkflowStateValue verbatim; only the label reads \"Pending\" instead of \"Not Started.\"" },
  { state: "Ready", note: "PipelineStep's \"ready\" value shows the same outlined marker as Pending — a stage whose dependencies are satisfied but hasn't started executing yet." },
  { state: "Running", note: "PipelineStep's \"running\" value fills the marker with the accent color — the stage actively executing right now." },
  { state: "Waiting", note: "PipelineStep's \"waiting\" value shows an outlined marker — paused on a real but expected dependency (e.g. an upstream job), distinct from Blocked." },
  { state: "Blocked", note: "PipelineStep's \"blocked\" value shows a warning-tone marker with an alert icon — this stage can't proceed until something outside the pipeline is resolved." },
  { state: "Completed", note: "PipelineStep's \"completed\" value swaps the marker for a checkmark — the stage finished successfully." },
  { state: "Failed", note: "PipelineStep's \"failed\" value shows an error-tone marker with an X — the stage did not complete successfully." },
  { state: "Cancelled", note: "PipelineStep's \"cancelled\" value shows a struck-through label with a neutral marker — the run (or this stage specifically) was abandoned before completion. No new PipelineStateValue type was declared — checked directly against WorkflowStateValue first and found no structural gap, only a label-wording difference (Pending vs. Not Started), unlike ApprovalStateValue or WorkflowTimelineEventStatus which each needed a genuinely new value the existing types lacked." },
];
