export interface WorkflowVizStateNote {
  state: string;
  note: string;
}

export const WORKFLOW_VIZ_STATES: WorkflowVizStateNote[] = [
  { state: "Idle", note: "WorkflowNode's \"idle\" status shows a plain outlined marker with a circle icon — this node hasn't started, collapsing WorkflowStateValue's separate not-started/ready/waiting/cancelled distinctions into one, the same collapsing StateNode's own Initial already did." },
  { state: "Selected", note: "WorkflowNode's own selected prop rings the node in accent color — an interaction state layered on top of any status (a Running node can also be Selected), not folded into the status vocabulary. WorkflowSelection's own selected-id Set is what actually decides which nodes render this way." },
  { state: "Hovered", note: "Needs no prop at all: WorkflowNode renders a real <button> when onClick is supplied, so :hover is a native browser state with its own hover:bg-surface-hover treatment, the same as every other clickable Node in this tier." },
  { state: "Focused", note: "Also native, not tracked in component state — the focus-ring utility class already applied to every clickable Node in this tier renders a visible focus ring on :focus-visible." },
  { state: "Running", note: "WorkflowNode's \"running\" status shows a filled accent-tone marker with a play icon — this is the one WorkflowNodeStatus value with no counterpart collapse; it maps directly to WorkflowStateValue's own \"running\"." },
  { state: "Paused", note: "WorkflowNode's \"paused\" status shows a filled warning-tone marker with a pause icon — a genuine structural gap checked directly against WorkflowStateValue's own eight values, none of which distinguish a user-initiated halt from Waiting on an external dependency." },
  { state: "Completed", note: "WorkflowNode's \"completed\" status shows a filled success-tone marker with a checkmark, mapping directly onto WorkflowStateValue's own \"completed.\"" },
  { state: "Filtered", note: "WorkflowNode's own filtered prop dims the node and strikes its label without removing it from the canvas — an interaction/visibility state layered on top of any status, the same \"still present, de-emphasized\" treatment Dependency & Relationship Views' own Hidden status established, expressed here as a prop rather than a status value since Filtered can apply regardless of lifecycle state." },
];
