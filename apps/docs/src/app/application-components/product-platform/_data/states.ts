export interface ProductStateNote {
  state: string;
  note: string;
}

/**
 * Checked directly against every existing status vocabulary in the repo
 * (WorkflowStateValue, StateValue, ApprovalStateValue, DependencyStatusValue,
 * QueueStatusValue) before writing this file. Four of the eight states below
 * — Draft, Published, Archived, Retired — describe a content publish
 * lifecycle, a fundamentally different concept from every existing
 * vocabulary, which models pipeline execution or approval decisions, not
 * publishing. Rather than force these onto a wrong-fit value (collapsing
 * Archived and Retired onto the same "cancelled" value would lose real,
 * distinct information) or declare an unjustified new ProductStatusValue
 * union, they render through Foundation's own generic Badge — free-text
 * children plus a closed 5-value tone — the same escape hatch every generic
 * status system in this repo already provides for caller-supplied labels.
 * This is a disclosed, real gap, not a silently forced mapping.
 */
export const PRODUCT_STATES: ProductStateNote[] = [
  { state: "Draft", note: "No existing lifecycle vocabulary models a content publish-state — every existing status type is pipeline-execution or approval-decision shaped, not publishing-shaped. Rendered via Foundation's own free-text Badge (tone=\"neutral\"), not forced onto WorkflowStateValue's \"not-started.\"" },
  { state: "Ready", note: "Maps to WorkflowStateValue's own \"ready\" verbatim." },
  { state: "Published", note: "No existing lifecycle vocabulary models this — rendered via Foundation's own free-text Badge (tone=\"success\"), the same disclosed gap as Draft." },
  { state: "Archived", note: "No existing lifecycle vocabulary models this, and it is a genuinely distinct concept from Retired (hidden but recoverable, vs. permanently discontinued) — collapsing both onto WorkflowStateValue's single \"cancelled\" would lose that distinction. Rendered via Foundation's own free-text Badge (tone=\"neutral\")." },
  { state: "Validation Required", note: "Maps to ApprovalStateValue's own \"pending\" or \"in-review\" — a gate awaiting a decision, rendered through ProductValidationPanel (= PipelineGate)." },
  { state: "Validated", note: "Not a lifecycle status at all — it's ApprovalStateValue's own \"approved\" outcome, the same precedent Production Platform Components already established for its own \"Validated\" state." },
  { state: "Failed", note: "In a validation context, maps to ApprovalStateValue's own \"rejected\" outcome via ProductValidationPanel. WorkflowStateValue, StateValue, and QueueStatusValue also carry a literal \"failed\" member for pipeline/queue contexts." },
  { state: "Retired", note: "No existing lifecycle vocabulary models this, and it is deliberately kept distinct from Archived (see above). Rendered via Foundation's own free-text Badge (tone=\"error\")." },
];
