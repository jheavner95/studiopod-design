export interface TimelineAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const TIMELINE_ANATOMY: TimelineAnatomyRegion[] = [
  { name: "Header", description: "What this timeline is, and its live status/progress at a glance.", component: "WorkflowTimelineHeader (Workflow Framework's own WorkflowHeader, re-exported)" },
  { name: "Groups", description: "Events clustered under one chronological or categorical heading — \"Today,\" \"Approvals.\"", component: "WorkflowTimelineGroup" },
  { name: "Events", description: "One occurrence in the sequence — title, optional description, actor, timestamp, and status.", component: "WorkflowTimelineEvent" },
  { name: "Markers", description: "The status dot or icon in front of each event.", component: "WorkflowTimelineMarker" },
  { name: "Connectors", description: "The line between two events, showing whether that segment has already happened.", component: "WorkflowTimelineConnector (Workflow Framework's own WorkflowTransition underneath)" },
  { name: "Filters", description: "Narrowing the timeline to one status at a time.", component: "WorkflowTimelineFilters" },
  { name: "Summary", description: "An at-a-glance metric row — total events, blocked count, last update.", component: "WorkflowTimelineSummary (Workflow Framework's own WorkflowSummary, re-exported)" },
  { name: "Legend", description: "What each marker means, spelled out so meaning never depends on color alone.", component: "WorkflowTimelineLegend" },
  { name: "Footer", description: "A sticky bar pinning Filters/Actions to the bottom of the timeline regardless of scroll.", component: "WorkflowTimelineFooter (Workflow Framework's own WorkflowFooter, re-exported)" },
];
