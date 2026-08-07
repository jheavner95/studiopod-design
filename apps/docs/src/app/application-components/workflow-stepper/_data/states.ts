export interface StepperStateNote {
  state: string;
  note: string;
}

export const STEPPER_STATES: StepperStateNote[] = [
  { state: "Not Started", note: "WorkflowStepperStep's \"not-started\" value shows a plain numbered marker — a step later in the sequence than the current one." },
  { state: "Current", note: "WorkflowStepperStep's \"current\" value fills the marker with the accent color — the one step the wizard is actively on. Merges Workflow Framework's own separate Ready/Running distinction into one, since a wizard only ever has exactly one active step at a time." },
  { state: "Completed", note: "WorkflowStepperStep's \"completed\" value swaps the number for a checkmark — the step has been finished and its data (if any) is saved." },
  { state: "Blocked", note: "WorkflowStepperStep's \"blocked\" value shows a warning-tone marker with an alert icon — this step can't proceed until something outside the wizard is resolved." },
  { state: "Waiting", note: "WorkflowStepperStep's \"waiting\" value shows a dashed-border marker — paused on a real but expected dependency (e.g. an email confirmation), distinct from Blocked (which is exceptional)." },
  { state: "Skipped", note: "WorkflowStepperStep's \"skipped\" value shows a skip-forward icon with a struck-through label — an optional step the wizard bypassed. Has no equivalent in Workflow Framework's own 8-state vocabulary, confirmed by direct comparison before this package added it." },
  { state: "Failed", note: "WorkflowStepperStep's \"failed\" value shows an error-tone marker with an X — validation or a submission failed on this step; this package has no built-in retry, the same caller-owns-retry convention Queue & Job's own JobRetry already established." },
  { state: "Cancelled", note: "WorkflowStepperStep's \"cancelled\" value shows a struck-through label with a neutral marker — the wizard (or this step specifically) was abandoned before completion." },
];
