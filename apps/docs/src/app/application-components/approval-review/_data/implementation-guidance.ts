export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Approval hierarchy",
    text: "This package holds no opinion on whether stages must complete in order — a caller building a Multi-stage Approval might require sequential sign-off, while a Commerce Approval might allow parallel review. ApprovalStage carries no gating logic of its own, matching Workflow Framework's own \"framework only\" stance.",
  },
  {
    label: "Review ownership",
    text: "ApprovalStep and ApprovalStatus's status is passed directly by the caller, not derived internally — the same controlled-component contract Workflow Framework's own WorkflowStep already established, just with this package's own 8-value ApprovalStateValue instead.",
  },
  {
    label: "Decision flow",
    text: "Whether Approve/Reject/Request Changes is enabled, and what happens next, is entirely the caller's concern — ApprovalActions supplies the buttons, ApprovalDecision records the outcome, but neither owns any workflow-transition logic itself.",
  },
  {
    label: "Checklist usage",
    text: "ReviewChecklist doesn't gate ApprovalActions on every item being checked — a caller wanting \"Approve disabled until all items are checked\" computes that itself from the same items array it already owns and passes to ReviewChecklist, the same caller-owns-validation convention Workflow Stepper's own WorkflowStepperNavigation already established for nextDisabled.",
  },
  {
    label: "Comment handling",
    text: "ReviewComment is a single controlled textarea — persisting a comment, associating it with a specific decision, or building a multi-comment thread are all data-layer concerns above this package's own stateless, prop-driven component.",
  },
  {
    label: "History",
    text: "ReviewHistory doesn't sort or generate its own entries — the caller supplies ReviewHistoryEntry objects already in order (typically newest-first), the same contract Workflow Timeline's own events and Inspector Panel's own InspectorHistory already follow.",
  },
];
