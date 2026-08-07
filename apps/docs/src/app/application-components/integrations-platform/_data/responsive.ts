export interface IntegrationsBreakpointNote {
  breakpoint: string;
  note: string;
}

export interface IntegrationsResponsiveTopic {
  label: string;
  note: string;
}

export const BREAKPOINT_NOTES: IntegrationsBreakpointNote[] = [
  { breakpoint: "Desktop", note: "IntegrationsInspector's own InspectorPanel shell sits comfortably alongside IntegrationsWorkspace's own sidebar, showing a single connection's full lifecycle detail without crowding IntegrationsProviders or IntegrationsConnections." },
  { breakpoint: "Tablet", note: "The same layout holds until Workflow Framework's own WorkflowSidebar hides below its usual breakpoint, the same threshold every Workflow and Platform component built on Workflow already inherits." },
  { breakpoint: "Mobile", note: "IntegrationsProviders' and IntegrationsConnections' own DataGrid-backed tables scroll horizontally within their own bounded container, and IntegrationsInspector's InspectorPanel shell scrolls its own body so a long property list never pushes IntegrationsActions off screen." },
];

export const RESPONSIVE_TOPICS: IntegrationsResponsiveTopic[] = [
  { label: "Collapsed sidebar", note: "IntegrationsSidebar inherits WorkflowSidebar's own collapsed prop unchanged — a caller collapsing the sidebar at narrow widths is the same opt-in convention every Workflow Framework-based surface already uses, not something this platform layer adds behavior to." },
  { label: "Inspector behavior", note: "IntegrationsInspector has no built-in collapse of its own — a screen wanting to hide the detail view until a connection is selected passes InspectorPanel's own emptyState prop (inherited unchanged through StateInspector), the same \"nothing selected\" convention every Inspector Panel-based surface already uses." },
  { label: "Table scaling", note: "IntegrationsProviders and IntegrationsConnections have no responsive behavior of their own beyond what DataGrid already provides — inherited unchanged, the same reuse Commerce Platform's own CommerceCatalog/CommerceOrders/CommerceInventory already established." },
];
