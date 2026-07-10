export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "ApprovalFlow's optional sidebar (inherited from Workflow Framework's own Workflow) sits alongside the ReviewPanel — room for both the approval stages and the reviewer's own checklist/comment workspace side by side." },
  { breakpoint: "Tablet", note: "The same layout holds until Workflow Framework's own WorkflowSidebar hides below its usual breakpoint, the same threshold every other Workflow Component Library package already inherits." },
  { breakpoint: "Mobile", note: "ReviewPanel's InspectorPanel shell scrolls its own body independently of the page, so a long checklist or comment thread never pushes ApprovalActions off screen — the same scrollable-body behavior every Inspector Panel-based surface already has." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsed review panel",
    note: "ReviewPanel has no built-in collapse of its own — a screen wanting to hide the review workspace until a request is selected passes InspectorPanel's own emptyState prop (inherited unchanged), the same \"nothing selected\" convention every Inspector Panel-based surface already uses.",
  },
  {
    label: "Sticky actions",
    note: "ApprovalActions (a re-export of WorkflowActions/InspectorActions) renders inside ReviewPanel's own sticky footer slot, so Approve/Reject/Request Changes stay reachable through a long review regardless of scroll position.",
  },
  {
    label: "Timeline integration",
    note: "ReviewHistory composes Workflow Timeline's own WorkflowTimelineGroup/WorkflowTimelineEvent/WorkflowTimelineConnector directly rather than a separate history renderer, so a request's decision history inherits Workflow Timeline's own responsive behavior (compact events, no separate breakpoint logic of its own) automatically.",
  },
];
