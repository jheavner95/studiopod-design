import { StatusBadge, type NodeStatus } from "@/illustrations";
import { cn } from "@/lib/utils";
import { resolveStepStatus } from "../utils";
import type { Workflow } from "../types";

const ALL_STATUSES: NodeStatus[] = ["idle", "active", "processing", "complete", "warning", "error"];

export interface WorkflowLegendProps {
  workflow: Workflow;
  /** Show only statuses present in the workflow's steps. Defaults to the full canonical status set. */
  onlyPresent?: boolean;
  className?: string;
}

/** A legend of the statuses used in a workflow, built directly on the MS-2.2 StatusBadge primitive. */
export function WorkflowLegend({ workflow, onlyPresent = false, className }: WorkflowLegendProps) {
  const statuses = onlyPresent
    ? ALL_STATUSES.filter((status) => workflow.steps.some((step) => resolveStepStatus(step) === status))
    : ALL_STATUSES;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {statuses.map((status) => (
        <StatusBadge key={status} status={status} />
      ))}
    </div>
  );
}
