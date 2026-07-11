export interface ProductBreakpointNote {
  breakpoint: string;
  note: string;
}

export interface ProductResponsiveTopic {
  label: string;
  note: string;
}

export const BREAKPOINT_NOTES: ProductBreakpointNote[] = [
  { breakpoint: "Desktop", note: "ProductInspector's own InspectorPanel shell sits comfortably alongside ProductWorkspace's own sidebar, showing a selected product's full lifecycle detail without crowding ProductLibrary or ProductCatalog." },
  { breakpoint: "Tablet", note: "The same layout holds until Workflow Framework's own WorkflowSidebar hides below its usual breakpoint, the same threshold every Workflow and Platform component built on Workflow already inherits." },
  { breakpoint: "Mobile", note: "ProductLibrary's own AssetBrowser falls back to its list view's responsive row treatment, ProductCatalog's DataGrid rows scroll horizontally within their own bounded container, and ProductInspector's InspectorPanel shell scrolls its own body so a long property list never pushes ProductActions off screen." },
];

export const RESPONSIVE_TOPICS: ProductResponsiveTopic[] = [
  { label: "Collapsed sidebar", note: "ProductSidebar inherits WorkflowSidebar's own collapsed prop unchanged — a caller collapsing the sidebar at narrow widths is the same opt-in convention every Workflow Framework-based surface already uses, not something this platform layer adds behavior to." },
  { label: "Inspector behavior", note: "ProductInspector has no built-in collapse of its own — a screen wanting to hide the detail view until a product is selected passes InspectorPanel's own emptyState prop (inherited unchanged through StateInspector), the same \"nothing selected\" convention every Inspector Panel-based surface already uses." },
  { label: "Library scaling", note: "ProductLibrary has no responsive behavior of its own beyond what AssetBrowser already provides — grid view reflows its card columns via minChildWidth, list view falls back to Foundation Table's own responsive row treatment, both inherited unchanged." },
];
