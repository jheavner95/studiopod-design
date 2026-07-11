export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "StateInspector's own InspectorPanel shell sits comfortably alongside a StateMachine's own sidebar, showing the selected state's full detail without crowding the state list itself." },
  { breakpoint: "Tablet", note: "The same layout holds until Workflow Framework's own WorkflowSidebar hides below its usual breakpoint, the same threshold every other Workflow Component Library package already inherits." },
  { breakpoint: "Mobile", note: "StateInspector's InspectorPanel shell scrolls its own body independently of the page, so a long property list never pushes StateActions off screen — the same scrollable-body behavior every Inspector Panel-based surface already has." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsed inspector",
    note: "StateInspector has no built-in collapse of its own — a screen wanting to hide the detail view until a state is selected passes InspectorPanel's own emptyState prop (inherited unchanged), the same \"nothing selected\" convention every Inspector Panel-based surface already uses.",
  },
  {
    label: "Compact state list",
    note: "StateNode's own description line is optional — a machine with many states renders StateNode without it and shows only the marker and label, the same optional-detail convention WorkflowStep/PipelineStep's own description prop already establishes.",
  },
  {
    label: "Sticky actions",
    note: "StateActions (a re-export of WorkflowActions/InspectorActions) renders inside the machine's own sticky footer slot, so the actions a person can trigger right now stay reachable through a long state list regardless of scroll position.",
  },
];
