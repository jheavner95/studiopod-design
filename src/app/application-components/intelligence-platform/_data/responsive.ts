export interface IntelligenceBreakpointNote {
  breakpoint: string;
  note: string;
}

export interface IntelligenceResponsiveTopic {
  label: string;
  note: string;
}

export const BREAKPOINT_NOTES: IntelligenceBreakpointNote[] = [
  { breakpoint: "Desktop", note: "IntelligenceInspector's own InspectorPanel shell sits comfortably alongside IntelligenceWorkspace's own sidebar, showing a selected analysis' full lifecycle detail without crowding IntelligenceHealth or IntelligenceOpportunities." },
  { breakpoint: "Tablet", note: "The same layout holds until Workflow Framework's own WorkflowSidebar hides below its usual breakpoint, the same threshold every Workflow and Platform component built on Workflow already inherits." },
  { breakpoint: "Mobile", note: "IntelligenceOpportunities' own DataGrid rows scroll horizontally within their own bounded container, IntelligenceInsights' own ChartWidget bars reflow to the available width, and IntelligenceInspector's InspectorPanel shell scrolls its own body so a long property list never pushes IntelligenceActions off screen." },
];

export const RESPONSIVE_TOPICS: IntelligenceResponsiveTopic[] = [
  { label: "Collapsed sidebar", note: "IntelligenceSidebar inherits WorkflowSidebar's own collapsed prop unchanged — a caller collapsing the sidebar at narrow widths is the same opt-in convention every Workflow Framework-based surface already uses, not something this platform layer adds behavior to." },
  { label: "Inspector behavior", note: "IntelligenceInspector has no built-in collapse of its own — a screen wanting to hide the detail view until an analysis is selected passes InspectorPanel's own emptyState prop (inherited unchanged through StateInspector), the same \"nothing selected\" convention every Inspector Panel-based surface already uses." },
  { label: "Dashboard scaling", note: "IntelligenceHealth, IntelligenceRecommendations, and IntelligenceInsights have no responsive behavior of their own beyond what HealthPanel/RecommendationWidget/ChartWidget already provide — inherited unchanged, the same reuse every prior Platform package's own Dashboard section already established." },
];
