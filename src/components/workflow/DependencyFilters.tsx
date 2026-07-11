import { SegmentedControl } from "@/components/navigation";
import type { DependencyStatusValue } from "./DependencyNode";

export type DependencyFilterValue = DependencyStatusValue | "all";

interface DependencyFiltersProps {
  value: DependencyFilterValue;
  onChange: (value: DependencyFilterValue) => void;
  options?: DependencyFilterValue[];
  className?: string;
}

const LABELS: Record<DependencyFilterValue, string> = {
  all: "All",
  connected: "Connected",
  disconnected: "Disconnected",
  blocked: "Blocked",
  healthy: "Healthy",
  warning: "Warning",
  critical: "Critical",
  circular: "Circular",
  hidden: "Hidden",
};

/** Narrowing a graph to one node status at a time — modeled directly on Queue & Job's own QueueFilters and Workflow Timeline's own WorkflowTimelineFilters (a thin preset over Foundation Navigation's SegmentedControl), not a second filter-control implementation. */
export function DependencyFilters({ value, onChange, options = ["all", "connected", "blocked", "critical", "circular"], className }: DependencyFiltersProps) {
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
