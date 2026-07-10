export interface ApprovalPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified six named domains — Production,
 * Publishing, Commerce, Planning, QA, Intelligence — plus a broad
 * repo-wide grep for Approval/Review/Decision/Checklist/SignOff/
 * ApprovalFlow/ReviewPanel identifiers, independently confirming rather
 * than assuming where real approval/review/decision duplication does and
 * doesn't exist.
 */
export const APPROVAL_PROMOTION_CANDIDATES: ApprovalPromotionCandidate[] = [];

export const APPROVAL_CLEAN_FINDINGS: string[] = [
  "Production: QualityGateDiagram.tsx and ValidationDiagram.tsx are both read-only status visualizations (a chained node diagram and a pass/fail rule list) — neither has an approve/reject action, a comment thread, or a decision record. \"Approval\" only ever appears as one static node label in example data, never as an interactive decision.",
  "Publishing: no standalone src/publishing/ directory exists — publishing lives inside src/capabilities/ as one capability. PublishingDiagram.tsx is a read-only capability-registry relationship diagram (the same generic pipeline every other capability diagram uses) with no approval/review/decision affordance of any kind.",
  "Commerce: CommerceDiagram.tsx is structurally identical to PublishingDiagram.tsx — a read-only relationship diagram, not an approval flow. src/platforms/components/ (10 files) has no approval/review/decision-named component either.",
  "Planning: no src/planning/ directory or component exists anywhere in the repo, confirmed independently by this audit and a prior session's own DS-3.2 audit — nothing to check for duplication.",
  "QA: Production's own QualityGateDiagram.tsx and ValidationDiagram.tsx (re-examined specifically for gate semantics) both visualize gates/rules whose pass/fail state is supplied externally — neither implements a \"gate\" a human unlocks by approving or rejecting inside the component itself.",
  "Intelligence: the only \"intelligence\"-named file in the repo is a static example data object (four architecture nodes for a diagram gallery) — no component exists for this domain, approval-related or otherwise.",
  "Operational layer: InspectorValidation.tsx delegates entirely to Foundation Feedback's own ValidationSummary (a correctness/error-display component — is this object valid — not an approve/reject decision). InspectorHistory.tsx is a generic newest-first activity log with no comment input, no approve/reject action, and no outcome field. Neither is a genuine approval/review/decision component, confirmed by direct read of both files.",
  "Broad repo-wide grep for Approval/Review/Decision/Checklist/SignOff/ApprovalFlow/ReviewPanel: Decision, ApprovalFlow, and ReviewPanel had zero matches anywhere in src/ before this package. The remaining hits were three non-exported gallery demo functions (ApprovalTimelineDemo, ApprovalWizardDemo, ApprovalWorkflowDemo) illustrating that the generic Step/Stage/Timeline primitives *can* build an approval flow — without being one themselves — plus the design system's own internal \"Approval Panel\" inventory entries (status: \"Needed\", no source file) already flagging this exact gap across three separate prior-session audits (workspace-certification's checklist, the application-components inventory, and Foundation Navigation's own Stepper.tsx catalog reuseTargets), all independently corroborating that no Approval Panel existed anywhere before this package.",
];
