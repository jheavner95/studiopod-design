export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Grouping",
    text: "WorkflowTimelineGroup holds no opinion on what a group represents — a caller might group by day (\"Today,\" \"Yesterday\"), by workflow stage, or by domain (\"Production,\" \"Publishing\"). Nothing in this package infers groups from event data; the caller buckets events and supplies one WorkflowTimelineGroup per bucket.",
  },
  {
    label: "Chronology",
    text: "WorkflowTimelineEvent does not sort — like InspectorHistory before it, the caller supplies events already in the order they should render (typically newest-first, but this package doesn't enforce that direction either).",
  },
  {
    label: "Event hierarchy",
    text: "A WorkflowTimelineEvent's title is the one required text field; description, actor, and source are all optional, so a caller can render anything from a bare status change (title + timestamp only) up to a fully attributed approval record (title, description, actor, source domain, and status) from the same component.",
  },
  {
    label: "Status visualization",
    text: "WorkflowTimelineMarker is the single source of truth for status-to-marker rendering, reused unchanged by WorkflowTimelineEvent and WorkflowTimelineLegend — a caller should never hand-roll a second marker rendering for the same WorkflowTimelineEventStatus vocabulary.",
  },
  {
    label: "Filtering",
    text: "WorkflowTimelineFilters is a controlled component — it holds no filtering logic itself, only emitting the selected WorkflowTimelineFilterValue via onChange. Applying that filter (hiding non-matching events/groups, or hiding a Group entirely once empty) is the composing screen's own responsibility, the same controlled-component contract QueueFilters already established.",
  },
  {
    label: "Retention",
    text: "This package has no opinion on how far back a timeline's event history extends, or when old events are purged — that's a data-layer concern above this package's own stateless, prop-driven components, the same deferral Workflow Framework's own future-extensions already made for persistence-adjacent concerns.",
  },
];
