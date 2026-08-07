export interface PublishingBreakpointNote {
  breakpoint: string;
  note: string;
}

export interface PublishingResponsiveTopic {
  label: string;
  note: string;
}

export const BREAKPOINT_NOTES: PublishingBreakpointNote[] = [
  { breakpoint: "Desktop", note: "PublishingInspector's own InspectorPanel shell sits comfortably alongside PublishingWorkspace's own sidebar, showing a selected publication's full lifecycle detail without crowding PublishingTargets or PublishingQueue." },
  { breakpoint: "Tablet", note: "The same layout holds until Workflow Framework's own WorkflowSidebar hides below its usual breakpoint, the same threshold every Workflow and Platform component built on Workflow already inherits." },
  { breakpoint: "Mobile", note: "PublishingTargets' and PublishingProviders' own DataGrid rows scroll horizontally within their own bounded container, PublishingQueue falls back to Queue's own responsive row treatment, and PublishingInspector's InspectorPanel shell scrolls its own body so a long property list never pushes PublishingActions off screen." },
];

export const RESPONSIVE_TOPICS: PublishingResponsiveTopic[] = [
  { label: "Collapsed sidebar", note: "PublishingSidebar inherits WorkflowSidebar's own collapsed prop unchanged — a caller collapsing the sidebar at narrow widths is the same opt-in convention every Workflow Framework-based surface already uses, not something this platform layer adds behavior to." },
  { label: "Inspector behavior", note: "PublishingInspector has no built-in collapse of its own — a screen wanting to hide the detail view until a publication is selected passes InspectorPanel's own emptyState prop (inherited unchanged through StateInspector), the same \"nothing selected\" convention every Inspector Panel-based surface already uses." },
  { label: "Queue scaling", note: "PublishingQueue has no responsive behavior of its own beyond what Queue already provides — inherited unchanged, the same reuse Production Platform's own ProductionQueue already established." },
];
