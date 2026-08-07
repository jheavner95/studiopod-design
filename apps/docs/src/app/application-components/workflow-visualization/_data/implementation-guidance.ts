export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Viewport management",
    text: "WorkflowViewport holds no scroll-position state of its own — it's a plain ScrollArea. A screen needing to programmatically scroll to a node (e.g. after a search) owns that ref/scrollIntoView logic itself; this package doesn't abstract it.",
  },
  {
    label: "Selection model",
    text: "WorkflowSelection's underlying useWorkflowSelection hook returns uncontrolled Set<string> state for a screen that doesn't already own selection elsewhere. A screen syncing selection with a page-level bulk-action bar should manage the Set itself and pass selectedIds down to each WorkflowNode's own selected prop, the same controlled/uncontrolled split Data Grid's own selection already offers.",
  },
  {
    label: "Node ownership",
    text: "WorkflowNode's status is passed directly by the caller, not derived internally — the same controlled-component contract Workflow Framework's own WorkflowStep already established, using this package's own WorkflowNodeStatus instead.",
  },
  {
    label: "Grouping",
    text: "WorkflowGroup (= DependencyGroup) holds no opinion on what a group represents — a caller might group by stage, by platform, or by team. Nothing in this package infers groups from graph structure; the caller clusters nodes and supplies one WorkflowGroup per cluster.",
  },
  {
    label: "Navigation",
    text: "WorkflowControls' zoom/fit buttons are inert placeholders until a caller supplies onZoomIn/onZoomOut/onFitToView — there is no default pan/zoom behavior to opt out of, since no coordinate system exists yet for those handlers to act on.",
  },
  {
    label: "Inspector integration",
    text: "WorkflowInspector composes Operational Inspector Panel's own family directly, the identical pattern StateInspector and DependencyInspector already established — properties are plain label/value pairs the caller supplies, with no special canvas awareness baked into InspectorProperty itself.",
  },
];
