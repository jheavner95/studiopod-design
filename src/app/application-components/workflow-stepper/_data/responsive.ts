export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "WorkflowStepperStep/Connector default to horizontal orientation — a full-width stepper bar with markers and labels above the wizard's content, matching Foundation Navigation's own Stepper default." },
  { breakpoint: "Tablet", note: "The horizontal bar still fits at this width for wizards with a handful of steps; a wizard with many steps switches to vertical mode below, same threshold Workflow Framework's own WorkflowSidebar already hides at." },
  { breakpoint: "Mobile", note: "WorkflowStepperStep/Connector switch to vertical orientation — markers and labels stack top to bottom, the same reading order Workflow Framework's own vertical-first stage stack already uses." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsed labels",
    note: "A wizard with many steps can render WorkflowStepperStep without a description, or hide the label entirely at very narrow widths — the marker alone (numbered or iconized) still communicates position and status; the caller decides this per its own step count, not a built-in breakpoint.",
  },
  {
    label: "Vertical mode",
    note: "Passing orientation=\"vertical\" to both WorkflowStepperStep and WorkflowStepperConnector switches the whole bar to a top-to-bottom list — the natural fit for a narrow viewport or a sidebar-hosted step list.",
  },
  {
    label: "Sticky actions",
    note: "WorkflowStepperFooter (a re-export of Workflow Framework's own WorkflowFooter) stays pinned to the bottom of the wizard regardless of scroll, so Back/Next stay reachable through a long step's own content.",
  },
];
