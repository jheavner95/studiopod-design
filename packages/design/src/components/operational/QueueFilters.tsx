import { SegmentedControl } from "@/components/navigation";
import type { QueueStatusValue } from "./QueueStatus";

export type QueueFilterValue = QueueStatusValue | "all";

interface QueueFiltersProps {
  value: QueueFilterValue;
  onChange: (value: QueueFilterValue) => void;
  options?: QueueFilterValue[];
  className?: string;
}

const LABELS: Record<QueueFilterValue, string> = {
  all: "All",
  queued: "Queued",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  retrying: "Retrying",
  paused: "Paused",
  cancelled: "Cancelled",
  blocked: "Blocked",
};

/** Narrowing a queue to one execution state at a time — a thin preset over Foundation Navigation's own SegmentedControl, the same choice-input pattern this whole session's other state filters already use, not a second filter-control implementation. */
export function QueueFilters({ value, onChange, options = ["all", "queued", "running", "completed", "failed"], className }: QueueFiltersProps) {
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
