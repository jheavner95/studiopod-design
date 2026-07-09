export interface WorkspaceMode {
  id: string;
  name: string;
  purpose: string;
  uiCharacteristics: string;
  transitions: string;
}

export const WORKSPACE_MODES: WorkspaceMode[] = [
  {
    id: "browse",
    name: "Browse",
    purpose: "Looking without committing to any one object yet.",
    uiCharacteristics: "Closest to an Asset Workspace — the Primary Working Surface here is mostly a bigger, more detailed version of the Library.",
    transitions: "Selecting an object moves to Edit, Review, or Approve, depending on the platform.",
  },
  {
    id: "create",
    name: "Create",
    purpose: "Producing a new object from nothing.",
    uiCharacteristics: "Often a Wizard or an empty Editor/Canvas — the Workflow Controls emphasize Next and Save over anything destructive.",
    transitions: "Completing creation moves to Edit (to keep refining) or Browse (to return to the Asset Workspace).",
  },
  {
    id: "edit",
    name: "Edit",
    purpose: "Refining an existing object.",
    uiCharacteristics: "An Editor or Canvas, with Save and Publish as the dominant Workflow Controls.",
    transitions: "Saving stays in Edit; Publishing moves to Review or Browse depending on whether anything downstream needs to check the work.",
  },
  {
    id: "review",
    name: "Review",
    purpose: "Evaluating someone else's (or an earlier version's) work.",
    uiCharacteristics: "Heavy use of Supporting Panels — Version Comparison and Reference Material are common — with Approve/Reject as the Workflow Controls.",
    transitions: "Approving or Rejecting both return to Browse or Monitor, having resolved the item.",
  },
  {
    id: "compare",
    name: "Compare",
    purpose: "Judging two or more objects against each other, not one object in isolation.",
    uiCharacteristics: "The Comparison View header variant, paired with a split or Dual Inspector Primary Working Surface.",
    transitions: "Resolving the comparison (picking one, or confirming both are fine) returns to Browse.",
  },
  {
    id: "approve",
    name: "Approve",
    purpose: "A narrower, decision-only variant of Review — the object itself isn't being critiqued in detail, just signed off.",
    uiCharacteristics: "Minimal Supporting Panels, a prominent Approve/Reject pair, often the only two Workflow Controls visible.",
    transitions: "Resolves directly back to Monitor or Browse — Approve mode doesn't loop back into Edit.",
  },
  {
    id: "monitor",
    name: "Monitor",
    purpose: "Ongoing awareness of something in progress, not a discrete task to complete.",
    uiCharacteristics: "A Dashboard or Queue Primary Working Surface — Workflow Controls are workspace-wide (Pause, Retry), not per-object.",
    transitions: "Selecting a specific item moves to Review or Edit for that one item.",
  },
  {
    id: "configure",
    name: "Configure",
    purpose: "Setting up how something else will behave, not producing output directly.",
    uiCharacteristics: "A Configuration Primary Working Surface — form-first, with Save as the dominant control.",
    transitions: "Saving returns to wherever Configure was entered from — it's rarely a destination on its own.",
  },
  {
    id: "analyze",
    name: "Analyze",
    purpose: "Answering a specific question by exploring data, not just observing it.",
    uiCharacteristics: "An Analytics Primary Working Surface with heavy Supporting Panels use — Secondary Metrics and comparison views.",
    transitions: "Rarely transitions to another mode directly — Analyze is often a dead-end task that concludes outside the workspace (a report, a decision made elsewhere).",
  },
];
