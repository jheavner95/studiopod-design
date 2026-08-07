export interface CommerceBreakpointNote {
  breakpoint: string;
  note: string;
}

export interface CommerceResponsiveTopic {
  label: string;
  note: string;
}

export const BREAKPOINT_NOTES: CommerceBreakpointNote[] = [
  { breakpoint: "Desktop", note: "CommerceInspector's own InspectorPanel shell sits comfortably alongside CommerceWorkspace's own sidebar, showing a selected record's full lifecycle detail without crowding CommerceCatalog, CommerceOrders, or CommerceInventory." },
  { breakpoint: "Tablet", note: "The same layout holds until Workflow Framework's own WorkflowSidebar hides below its usual breakpoint, the same threshold every Workflow and Platform component built on Workflow already inherits." },
  { breakpoint: "Mobile", note: "CommerceCatalog's, CommerceOrders', and CommerceInventory's own DataGrid rows scroll horizontally within their own bounded container, and CommerceInspector's InspectorPanel shell scrolls its own body so a long property list never pushes CommerceActions off screen." },
];

export const RESPONSIVE_TOPICS: CommerceResponsiveTopic[] = [
  { label: "Collapsed sidebar", note: "CommerceSidebar inherits WorkflowSidebar's own collapsed prop unchanged — a caller collapsing the sidebar at narrow widths is the same opt-in convention every Workflow Framework-based surface already uses, not something this platform layer adds behavior to." },
  { label: "Inspector behavior", note: "CommerceInspector has no built-in collapse of its own — a screen wanting to hide the detail view until a record is selected passes InspectorPanel's own emptyState prop (inherited unchanged through StateInspector), the same \"nothing selected\" convention every Inspector Panel-based surface already uses." },
  { label: "Table scaling", note: "CommerceCatalog, CommerceOrders, and CommerceInventory have no responsive behavior of their own beyond what DataGrid already provides — inherited unchanged, the same reuse ProductCatalog and PublishingTargets already established." },
];
