export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  { breakpoint: "Desktop", note: "PipelineStep/PipelineConnector default to horizontal orientation — a full-width stage bar, matching the reading direction the pre-existing illustration PipelineStep primitive already assumes for its own repeatable node-plus-connector idiom." },
  { breakpoint: "Tablet", note: "The horizontal bar still fits for a pipeline with a handful of stages; a longer run switches to vertical mode below, the same threshold Workflow Framework's own WorkflowSidebar already hides at." },
  { breakpoint: "Mobile", note: "PipelineStep/PipelineConnector switch to vertical orientation — markers and labels stack top to bottom, the same reading order Workflow Framework's own vertical-first stage stack already uses." },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsed stages",
    note: "PipelineStage itself has no built-in collapse — a run with many stages wraps a PipelineStage in Foundation UI's own Expandable, the same opt-in disclosure pattern Inspector Panel's own InspectorHistory already uses for overflow entries.",
  },
  {
    label: "Compact metrics",
    note: "PipelineMetrics' own StatGroup composition already reflows from 3 columns to fewer as width shrinks — no separate mobile-only metrics layout exists, the same responsive behavior every other StatGroup consumer in this design system already inherits for free.",
  },
  {
    label: "Sticky actions",
    note: "PipelineActions (a re-export of Workflow Framework's own WorkflowActions) renders inside Pipeline's own sticky footer slot, so Retry/Pause/Cancel stay reachable through a long-running pipeline's own content regardless of scroll.",
  },
];
