export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "Workflow's two-column layout shows the main stage content and WorkflowSidebar side by side, same as Inspector Panel's own two-region composition elsewhere in the library." },
  { breakpoint: "Tablet", note: "WorkflowSidebar hides below lg — a workflow's sidebar content (summary stats, related items) is secondary, not required to operate the workflow." },
  { breakpoint: "Mobile", note: "The same sidebar hide applies; WorkflowStageGroup's Grid collapses stages to a single column, and WorkflowStep/WorkflowTransition's vertical orientation is the natural fit for a narrow screen." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsed sidebar",
    note: "WorkflowSidebar's collapsed prop shrinks it to an icon-only rail rather than hiding it outright — the caller owns the toggle control (a WorkflowActions button) and the open/closed state itself; this component only renders the collapsed width.",
  },
  {
    label: "Vertical flow",
    note: "WorkflowTransition's orientation prop defaults to vertical, matching a top-to-bottom stage/step stack — the natural reading order for a linear workflow, and the only orientation that fits a narrow viewport.",
  },
  {
    label: "Sticky actions",
    note: "WorkflowFooter (a re-export of Inspector Panel's own InspectorFooter) stays pinned to the bottom of the workflow regardless of scroll position, so primary actions (Approve, Cancel) remain reachable without scrolling back up through a long stage list.",
  },
];
