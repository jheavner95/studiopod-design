export interface PublishingStateNote {
  state: string;
  note: string;
}

/**
 * Checked directly against every existing status vocabulary in the repo
 * (WorkflowStateValue, StateValue, ApprovalStateValue, DependencyStatusValue,
 * QueueStatusValue) before writing this file — the same discipline Product
 * Platform Components' own states.ts already established. Three of the eight
 * states below — Draft, Published, Archived — have no match anywhere, the
 * identical disclosed gap Product Platform found for the same three literal
 * names (a content publish lifecycle is structurally different from every
 * existing pipeline-execution or approval-decision vocabulary). A fourth,
 * Publishing, has only a same-concept different-label analog (running/
 * active), not a verbatim match. None of these are forced onto a wrong-fit
 * value or an unjustified new type — the unmatched ones render through
 * Foundation's own free-text Badge instead.
 */
export const PUBLISHING_STATES: PublishingStateNote[] = [
  { state: "Draft", note: "No existing lifecycle vocabulary models a content publish-state — the same disclosed gap Product Platform Components' own \"Draft\" state already found. Rendered via Foundation's own free-text Badge (tone=\"neutral\")." },
  { state: "Ready", note: "Maps to WorkflowStateValue's own \"ready\" verbatim." },
  { state: "Queued", note: "Maps to QueueStatusValue's own \"queued\" verbatim, rendered through PublishingQueue (= Queue)." },
  { state: "Publishing", note: "No verbatim match — the closest analog is each vocabulary's own in-progress member under a different name (WorkflowStateValue's \"running\", StateValue's \"active\", QueueStatusValue's \"running\"). A disclosed close analog, not a forced identical mapping, the same discipline StateHistory's own terminal-to-completed mapping already used." },
  { state: "Published", note: "No existing lifecycle vocabulary models this — the identical disclosed gap Product Platform Components' own \"Published\" state already found. Rendered via Foundation's own free-text Badge (tone=\"success\")." },
  { state: "Failed", note: "Maps to WorkflowStateValue's, StateValue's, and QueueStatusValue's own \"failed\" verbatim." },
  { state: "Cancelled", note: "Maps to WorkflowStateValue's, StateValue's, ApprovalStateValue's, and QueueStatusValue's own \"cancelled\" verbatim." },
  { state: "Archived", note: "No existing lifecycle vocabulary models this, and it is a genuinely distinct concept from Cancelled (a completed publication set aside, vs. a run that never finished) — the identical disclosed gap Product Platform Components' own \"Archived\" state already found. Rendered via Foundation's own free-text Badge (tone=\"neutral\")." },
];
