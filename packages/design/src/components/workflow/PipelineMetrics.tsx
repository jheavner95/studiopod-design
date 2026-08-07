import { StatGroup, type StatGroupItem } from "@/components/metadata";

interface PipelineMetricsProps {
  items: StatGroupItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * Throughput/duration-style measurements for a pipeline — a thin preset
 * over Foundation Metadata's own StatGroup, composed directly rather than
 * through PipelineSummary. The two are siblings, not one wrapping the
 * other: PipelineSummary is the pipeline's own overview stats (the same
 * WorkflowSummary composition every Workflow Component Library package
 * already uses), while PipelineMetrics is specifically for measured
 * numbers a pipeline run produces — nothing in Operational Queue & Job
 * renders metric displays of its own (JobCard's own progress slot is
 * caller-supplied), so StatGroup is the correct, already-established fit.
 */
export function PipelineMetrics({ items, columns = 3, className }: PipelineMetricsProps) {
  return <StatGroup items={items} columns={columns} className={className} />;
}
