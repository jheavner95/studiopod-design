export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "WorkflowInspector's own InspectorPanel shell sits comfortably alongside WorkflowCanvas's own sidebar slot, showing the selected node's full detail without crowding WorkflowViewport." },
  { breakpoint: "Tablet", note: "The same layout holds until Workflow Framework's own WorkflowSidebar hides below its usual breakpoint, the same threshold every other Workflow Component Library package already inherits." },
  { breakpoint: "Mobile", note: "WorkflowGroup's own Grid falls back to a single column, WorkflowViewport scrolls both axes independently of the page, and WorkflowInspector's InspectorPanel shell scrolls its own body so a long property list never pushes WorkflowInspector's footer off screen." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Viewport scaling",
    note: "WorkflowViewport has no zoom/scale transform of its own — content reflows with the DOM at every breakpoint the same way every other DOM-flow component in this tier already does.",
  },
  {
    label: "Mini-map behavior",
    note: "WorkflowMiniMap's own node strip wraps (flex-wrap) rather than truncating at narrow widths — there is no viewport-position rectangle to keep in sync since no coordinate system exists yet, so nothing needs recalculating on resize.",
  },
  {
    label: "Inspector collapse",
    note: "WorkflowInspector has no built-in collapse of its own — a screen wanting to hide the detail view until a node is selected passes InspectorPanel's own emptyState prop (inherited unchanged), the same \"nothing selected\" convention every Inspector Panel-based surface already uses.",
  },
  {
    label: "Toolbar adaptation",
    note: "WorkflowToolbar's own Inline wraps its buttons onto a second line at narrow widths rather than truncating or overflowing — the same wrap behavior Inline already provides by default across this tier.",
  },
];
