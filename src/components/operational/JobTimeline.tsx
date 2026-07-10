/**
 * Re-export, not a rebuild. Status & Health's own StatusTimeline (itself a
 * re-export of Inspector Panel's InspectorHistory) already covers a
 * newest-first timestamped event list exactly — a job's own execution
 * history is the same shape as a system's status-change history — so this
 * system reuses it directly rather than a third timestamped-list
 * implementation.
 */
export { StatusTimeline as JobTimeline, type StatusTimelineEntry as JobTimelineEntry } from "./StatusTimeline";
