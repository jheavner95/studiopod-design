import { SegmentedControl } from "@/components/navigation";
import type { WorkflowTimelineEventStatus } from "./WorkflowTimelineMarker";

export type WorkflowTimelineFilterValue = WorkflowTimelineEventStatus | "all";

interface WorkflowTimelineFiltersProps {
  value: WorkflowTimelineFilterValue;
  onChange: (value: WorkflowTimelineFilterValue) => void;
  options?: WorkflowTimelineFilterValue[];
  className?: string;
}

const LABELS: Record<WorkflowTimelineFilterValue, string> = {
  all: "All",
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  blocked: "Blocked",
  waiting: "Waiting",
  skipped: "Skipped",
};

/** Narrowing a timeline to one event status at a time — modeled directly on Queue & Job's own QueueFilters (a thin preset over Foundation Navigation's SegmentedControl), not a second filter-control implementation. */
export function WorkflowTimelineFilters({ value, onChange, options = ["all", "running", "completed", "failed", "blocked"], className }: WorkflowTimelineFiltersProps) {
  return (
    <SegmentedControl
      aria-label="Filter by status"
      value={value}
      onChange={onChange}
      className={className}
      options={options.map((option) => ({ value: option, label: LABELS[option] }))}
    />
  );
}
