export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Workflow hierarchy",
    text: "A Workflow contains one or more WorkflowStage/WorkflowStageGroup elements, each stage contains one or more WorkflowStep elements — this framework enforces no deeper nesting than that; a domain that needs sub-steps composes WorkflowStep recursively itself rather than this package adding a fourth tier.",
  },
  {
    label: "Stage ownership",
    text: "WorkflowStage owns its own title and overall WorkflowStatus — it does not compute that status from its children's individual statuses; the caller (the real business-logic layer this package explicitly excludes) decides what a stage's aggregate status should be.",
  },
  {
    label: "Step ownership",
    text: "WorkflowStep's status is passed directly, not derived from a shared current-index the way Foundation Navigation's own Stepper works — this lets two steps hold independent statuses at once (one Waiting while a sibling is Blocked), which a single-cursor model can't represent.",
  },
  {
    label: "Transition rules",
    text: "WorkflowTransition carries no business logic about when a transition is allowed — it only renders a line and an optional label. Gating logic (can this stage actually proceed) is entirely the caller's responsibility, consistent with this package's \"framework only\" scope.",
  },
  {
    label: "Progress reporting",
    text: "WorkflowProgress expects a plain 0–1 value the caller computes and updates as work happens — the same contract Foundation Feedback's own ProgressBar already established, since this is a thin preset over it, not a new fill/animation implementation.",
  },
  {
    label: "Action placement",
    text: "WorkflowActions (a re-export of Inspector Panel's own InspectorActions) belongs inside a WorkflowFooter for actions that apply to the whole workflow (Approve, Cancel) — a single stage or step's own action belongs next to that stage/step directly, not hoisted into the shared footer.",
  },
];
