/**
 * Re-export, not a rebuild. Inspector Panel's own InspectorHistory (a
 * newest-first timestamped list with collapsed-by-default overflow) is
 * already fully generic — pass a HealthIndicator as an entry's icon for a
 * status-change timeline — so this system reuses it directly rather than a
 * second timestamped-list implementation.
 */
export { InspectorHistory as StatusTimeline, type InspectorHistoryEntry as StatusTimelineEntry } from "./InspectorHistory";
