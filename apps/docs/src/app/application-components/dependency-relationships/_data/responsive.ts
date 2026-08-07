export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "DependencyInspector's own InspectorPanel shell sits comfortably alongside a DependencyGraph's own sidebar, showing the selected node's full upstream/downstream detail without crowding the node list itself." },
  { breakpoint: "Tablet", note: "The same layout holds until Workflow Framework's own WorkflowSidebar hides below its usual breakpoint, the same threshold every other Workflow Component Library package already inherits." },
  { breakpoint: "Mobile", note: "DependencyGroup's own Grid falls back to a single column, and DependencyInspector's InspectorPanel shell scrolls its own body independently of the page, so a long property list never pushes DependencyActions off screen." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsed graph",
    note: "DependencyGroup itself has no built-in collapse — a graph with many clusters wraps a DependencyGroup in Foundation UI's own Expandable, the same opt-in disclosure pattern Inspector Panel's own InspectorHistory already uses for overflow entries.",
  },
  {
    label: "Inspector behavior",
    note: "DependencyInspector has no built-in collapse of its own — a screen wanting to hide the detail view until a node is selected passes InspectorPanel's own emptyState prop (inherited unchanged), the same \"nothing selected\" convention every Inspector Panel-based surface already uses.",
  },
  {
    label: "Compact relationship lists",
    note: "DependencyNode's own description line is optional — a graph with many nodes renders DependencyNode without it and shows only the marker and label, the same optional-detail convention WorkflowStep/PipelineStep/StateNode's own description prop already establishes.",
  },
];
