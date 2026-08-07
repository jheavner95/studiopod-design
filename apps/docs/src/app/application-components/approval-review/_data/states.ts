export interface ApprovalStateNote {
  state: string;
  note: string;
}

export const APPROVAL_STATES: ApprovalStateNote[] = [
  { state: "Pending", note: "ApprovalStatus's \"pending\" value shows a plain outlined dot — the request hasn't been picked up by a reviewer yet." },
  { state: "In Review", note: "ApprovalStatus's \"in-review\" value fills the dot with the accent color — a reviewer is actively working through it." },
  { state: "Approved", note: "ApprovalStatus's \"approved\" value shows a success-tone dot — the request cleared review." },
  { state: "Rejected", note: "ApprovalStatus's \"rejected\" value shows an error-tone dot — the request did not clear review." },
  { state: "Changes Requested", note: "ApprovalStatus's \"changes-requested\" value shows a warning-tone dot — the reviewer needs something changed before deciding either way." },
  { state: "Cancelled", note: "ApprovalStatus's \"cancelled\" value shows a neutral dot — the requester withdrew it before a decision was made." },
  { state: "Expired", note: "ApprovalStatus's \"expired\" value shows a warning-tone dot — no decision was made before a deadline passed." },
  { state: "Completed", note: "ApprovalStatus's \"completed\" value shows a success-tone dot — every stage in a multi-stage approval finished. This package's own 8-value ApprovalStateValue is independently declared rather than reusing WorkflowStateValue (no Rejected/Changes Requested/Expired) or WorkflowStepperStateValue (a single-cursor wizard model with the same gaps) — checked directly against both before adding a third." },
];
