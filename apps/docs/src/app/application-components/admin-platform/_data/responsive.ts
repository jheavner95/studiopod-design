export interface AdminBreakpointNote {
  breakpoint: string;
  note: string;
}

export interface AdminResponsiveTopic {
  label: string;
  note: string;
}

export const BREAKPOINT_NOTES: AdminBreakpointNote[] = [
  { breakpoint: "Desktop", note: "AdminInspector's own InspectorPanel shell sits comfortably alongside AdminWorkspace's own sidebar, showing a selected item's full lifecycle detail without crowding AdminUsers or AdminPermissions." },
  { breakpoint: "Tablet", note: "The same layout holds until Workflow Framework's own WorkflowSidebar hides below its usual breakpoint, the same threshold every Workflow and Platform component built on Workflow already inherits." },
  { breakpoint: "Mobile", note: "AdminUsers' and AdminPermissions' own DataGrid rows scroll horizontally within their own bounded container, and AdminInspector's InspectorPanel shell scrolls its own body so a long property list never pushes AdminActions off screen." },
];

export const RESPONSIVE_TOPICS: AdminResponsiveTopic[] = [
  { label: "Collapsed sidebar", note: "AdminSidebar inherits WorkflowSidebar's own collapsed prop unchanged — a caller collapsing the sidebar at narrow widths is the same opt-in convention every Workflow Framework-based surface already uses, not something this platform layer adds behavior to." },
  { label: "Inspector behavior", note: "AdminInspector has no built-in collapse of its own — a screen wanting to hide the detail view until an item is selected passes InspectorPanel's own emptyState prop (inherited unchanged through StateInspector), the same \"nothing selected\" convention every Inspector Panel-based surface already uses." },
  { label: "Table scaling", note: "AdminUsers and AdminPermissions have no responsive behavior of their own beyond what DataGrid already provides — inherited unchanged, the same reuse Commerce Platform's own CommerceCatalog/CommerceOrders/CommerceInventory already established." },
];
