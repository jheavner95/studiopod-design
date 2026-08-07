export interface OperationsBreakpointNote {
  breakpoint: string;
  note: string;
}

export interface OperationsResponsiveTopic {
  label: string;
  note: string;
}

export const BREAKPOINT_NOTES: OperationsBreakpointNote[] = [
  { breakpoint: "Desktop", note: "OperationsInspector's own InspectorPanel shell sits comfortably alongside OperationsWorkspace's own sidebar, showing a selected item's full lifecycle detail without crowding OperationsMonitoring or OperationsScheduler." },
  { breakpoint: "Tablet", note: "The same layout holds until Workflow Framework's own WorkflowSidebar hides below its usual breakpoint, the same threshold every Workflow and Platform component built on Workflow already inherits." },
  { breakpoint: "Mobile", note: "OperationsMonitoring's own DataGrid rows scroll horizontally within their own bounded container, OperationsScheduler falls back to Queue's own responsive row treatment, and OperationsInspector's InspectorPanel shell scrolls its own body so a long property list never pushes OperationsActions off screen." },
];

export const RESPONSIVE_TOPICS: OperationsResponsiveTopic[] = [
  { label: "Collapsed sidebar", note: "OperationsSidebar inherits WorkflowSidebar's own collapsed prop unchanged — a caller collapsing the sidebar at narrow widths is the same opt-in convention every Workflow Framework-based surface already uses, not something this platform layer adds behavior to." },
  { label: "Inspector behavior", note: "OperationsInspector has no built-in collapse of its own — a screen wanting to hide the detail view until an item is selected passes InspectorPanel's own emptyState prop (inherited unchanged through StateInspector), the same \"nothing selected\" convention every Inspector Panel-based surface already uses." },
  { label: "Dashboard scaling", note: "OperationsHealth, OperationsMonitoring, and OperationsAlerts have no responsive behavior of their own beyond what HealthPanel/ProviderHealthPanel/OperationalAlertPanel already provide — inherited unchanged, the same reuse every prior Platform package's own Dashboard section already established." },
];
