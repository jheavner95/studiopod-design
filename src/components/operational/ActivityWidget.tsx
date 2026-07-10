import type { ReactNode } from "react";
import { Panel } from "@/components/layout";
import { JobTimeline, type JobTimelineEntry } from "./JobTimeline";

interface ActivityWidgetProps {
  title: ReactNode;
  entries: JobTimelineEntry[];
  collapsedCount?: number;
  className?: string;
}

/** A recent-activity feed for a dashboard tile — Panel chrome around Queue & Job's own JobTimeline (itself a re-export of StatusTimeline/InspectorHistory), the same newest-first timestamped list already used for job history and status-change history. */
export function ActivityWidget({ title, entries, collapsedCount, className }: ActivityWidgetProps) {
  return (
    <Panel header={<span className="text-body-md font-medium text-ink-primary">{title}</span>} className={className}>
      <JobTimeline entries={entries} collapsedCount={collapsedCount} />
    </Panel>
  );
}
