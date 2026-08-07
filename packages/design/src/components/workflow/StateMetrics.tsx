import { StatGroup, type StatGroupItem } from "@/components/metadata";

interface StateMetricsProps {
  items: StatGroupItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * Measured numbers a state machine produces — transitions per minute,
 * average time-in-state, error rate. A thin preset over Foundation
 * Metadata's own StatGroup, composed directly rather than through
 * StateSummary, the same sibling-not-wrapper relationship Pipeline
 * Components' own PipelineMetrics/PipelineSummary already established.
 */
export function StateMetrics({ items, columns = 3, className }: StateMetricsProps) {
  return <StatGroup items={items} columns={columns} className={className} />;
}
