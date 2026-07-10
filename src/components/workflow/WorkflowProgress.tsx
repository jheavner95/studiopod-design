import { ProgressBar } from "@/components/feedback";

interface WorkflowProgressProps {
  /** 0–1. */
  value: number;
  label?: string;
  className?: string;
}

/**
 * A workflow's own overall completion — a thin preset over Foundation
 * Feedback's own ProgressBar, no new fill/animation logic.
 *
 * Distinct from src/workflows/components/WorkflowProgress.tsx: that one is
 * the pre-existing Workflow Diagram Library's own aggregate completion bar
 * for a single diagram data value (workflow.steps.filter(completed)),
 * scoped entirely to that library's own Workflow type. This component lives
 * in a separate family (src/components/workflow/, the Workflow Component
 * Library built on the certified Operational layer) and is a plain
 * value/label preset with no dependency on that diagram library's data
 * shape — a genuinely different component under a name this session's own
 * audit flagged as already in use elsewhere, kept because the task
 * explicitly names it and the two are import-path-distinct, not because the
 * overlap wasn't checked.
 */
export function WorkflowProgress({ value, label, className }: WorkflowProgressProps) {
  return <ProgressBar value={value} label={label} showPercentage className={className} />;
}
