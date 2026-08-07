export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "ProductionInspector's own InspectorPanel shell sits comfortably alongside ProductionWorkspace's own sidebar, showing the selected artifact's full lifecycle detail without crowding ProductionCanvas." },
  { breakpoint: "Tablet", note: "The same layout holds until Workflow Framework's own WorkflowSidebar hides below its usual breakpoint, the same threshold every Workflow and Platform component built on Workflow already inherits." },
  { breakpoint: "Mobile", note: "ProductionCanvas's own WorkflowViewport scrolls both axes independently of the page, ProductionQueue's rows fall back to Foundation Table's own responsive row treatment, and ProductionInspector's InspectorPanel shell scrolls its own body so a long property list never pushes ProductionActions off screen." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsed sidebar",
    note: "ProductionSidebar inherits WorkflowSidebar's own collapsed prop unchanged — a caller collapsing the sidebar at narrow widths is the same opt-in convention every Workflow Framework-based surface already uses, not something this platform layer adds behavior to.",
  },
  {
    label: "Inspector behavior",
    note: "ProductionInspector has no built-in collapse of its own — a screen wanting to hide the detail view until an artifact is selected passes InspectorPanel's own emptyState prop (inherited unchanged through StateInspector), the same \"nothing selected\" convention every Inspector Panel-based surface already uses.",
  },
  {
    label: "Canvas scaling",
    note: "ProductionCanvas has no zoom/scale transform of its own — inherited from WorkflowViewport, which intentionally holds no coordinate system. Real pan and zoom are on the Workflow Visualization roadmap; see Future enhancements below.",
  },
];
