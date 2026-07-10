import type { ReactNode } from "react";
import { StatusPanel } from "./StatusPanel";
import { InspectorHeader } from "./InspectorHeader";
import { InspectorSection } from "./InspectorSection";
import type { QueueStatusValue } from "./QueueStatus";
import { QueuePriority, type QueuePriorityValue } from "./QueuePriority";
import type { JobTimelineEntry } from "./JobTimeline";
import { JobTimeline } from "./JobTimeline";

const HEADER_TONE: Record<QueueStatusValue, "neutral" | "accent" | "success" | "warning" | "error"> = {
  queued: "neutral",
  running: "accent",
  completed: "success",
  failed: "error",
  retrying: "accent",
  paused: "neutral",
  cancelled: "neutral",
  blocked: "warning",
};

const HEADER_LABEL: Record<QueueStatusValue, string> = {
  queued: "Queued",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  retrying: "Retrying",
  paused: "Paused",
  cancelled: "Cancelled",
  blocked: "Blocked",
};

interface JobCardProps {
  icon?: ReactNode;
  name: ReactNode;
  type?: ReactNode;
  status: QueueStatusValue;
  priority?: QueuePriorityValue;
  progress?: ReactNode;
  timeline?: JobTimelineEntry[];
  outcome?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

/**
 * The full detail view of a single job — a StatusPanel composition
 * (Inspector Panel underneath) pairing QueueStatus/QueuePriority with a
 * progress slot, JobTimeline, and an outcome slot (a caller-composed
 * JobError or JobResults, whichever fits) — the same "caller decides which
 * fits" precedent Asset Browser's own inspector slot already established.
 */
export function JobCard({ icon, name, type, status, priority, progress, timeline, outcome, actions, className }: JobCardProps) {
  return (
    <StatusPanel
      header={<InspectorHeader icon={icon} name={name} type={type} status={{ label: HEADER_LABEL[status], tone: HEADER_TONE[status] }} />}
      footer={actions ? <div className="border-t border-border-subtle p-4">{actions}</div> : undefined}
      className={className}
    >
      {priority ? (
        <InspectorSection title="Priority" collapsible={false}>
          <QueuePriority value={priority} />
        </InspectorSection>
      ) : null}
      {progress ? (
        <InspectorSection title="Progress" collapsible={false}>
          {progress}
        </InspectorSection>
      ) : null}
      {outcome ? (
        <InspectorSection title="Outcome" collapsible={false}>
          {outcome}
        </InspectorSection>
      ) : null}
      {timeline && timeline.length > 0 ? (
        <InspectorSection title="Timeline">
          <JobTimeline entries={timeline} />
        </InspectorSection>
      ) : null}
    </StatusPanel>
  );
}
