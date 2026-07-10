import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";
import { WorkflowTimelineMarker, type WorkflowTimelineEventStatus } from "./WorkflowTimelineMarker";

interface WorkflowTimelineLegendProps {
  /** Defaults to all 8 states — narrow this to only the states a given timeline actually uses. */
  statuses?: WorkflowTimelineEventStatus[];
  className?: string;
}

const ALL_STATUSES: WorkflowTimelineEventStatus[] = ["pending", "running", "completed", "failed", "cancelled", "blocked", "waiting", "skipped"];

const LABELS: Record<WorkflowTimelineEventStatus, string> = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  blocked: "Blocked",
  waiting: "Waiting",
  skipped: "Skipped",
};

/**
 * What each WorkflowTimelineMarker means — every status renders as marker
 * shape/tone plus a text label side by side, so the timeline's status
 * vocabulary never depends on color alone (the same color-independence
 * requirement this package's own Accessibility section documents).
 */
export function WorkflowTimelineLegend({ statuses = ALL_STATUSES, className }: WorkflowTimelineLegendProps) {
  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}>
      {statuses.map((status) => (
        <div key={status} className="flex items-center gap-2">
          <WorkflowTimelineMarker status={status} />
          <Caption className="text-ink-tertiary">{LABELS[status]}</Caption>
        </div>
      ))}
    </div>
  );
}
