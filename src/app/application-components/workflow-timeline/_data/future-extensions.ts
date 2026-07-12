export interface TimelineFutureExtension {
  title: string;
  description: string;
}

export const TIMELINE_FUTURE_EXTENSIONS: TimelineFutureExtension[] = [
  { title: "Realtime updates", description: "New events streaming in (via websocket/polling) and prepending themselves live — this package's components are all stateless and prop-driven, so the streaming/merge logic itself would live entirely in the composing screen." },
  { title: "Time-range zoom", description: "Narrowing a long timeline to a specific window (\"last 24 hours,\" a custom date range) — a genuinely different capability from WorkflowTimelineFilters' own status-based narrowing." },
  { title: "Diff mode", description: "Comparing two points in a workflow's history side by side (what changed between event A and event B) is not supported." },
  { title: "Playback", description: "Stepping through a timeline's events in sequence with a scrubber/play control, similar in spirit to the Workflow Diagram Library's own usePlayback hook, but for this family's own event model rather than a diagram's node graph." },
  { title: "Annotations", description: "Letting a viewer attach a comment or note to a specific event after the fact — a data-layer and permissions concern above this package's own read-oriented components." },
  { title: "AI summaries", description: "Auto-generating a plain-language summary of a long or complex timeline (\"3 approvals, 1 retry, completed in 2 days\") rather than a viewer reading every event is not supported." },
];
