import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";
import { WorkflowNodeMarker, type WorkflowNodeStatus } from "./WorkflowNode";

interface WorkflowLegendProps {
  /** Defaults to all 6 states — narrow this to only the states a given canvas actually uses. */
  statuses?: WorkflowNodeStatus[];
  className?: string;
}

const ALL_STATUSES: WorkflowNodeStatus[] = ["idle", "running", "paused", "blocked", "completed", "failed"];

const LABELS: Record<WorkflowNodeStatus, string> = {
  idle: "Idle",
  running: "Running",
  paused: "Paused",
  blocked: "Blocked",
  completed: "Completed",
  failed: "Failed",
};

/**
 * What each WorkflowNode marker means, spelled out so meaning never
 * depends on color alone — the same marker-plus-label-list pattern
 * DependencyLegend and StateLegend already established. Reuses
 * WorkflowNode's own exported WorkflowNodeMarker rather than a second
 * marker implementation.
 *
 * Distinct from the pre-existing src/workflows/components/WorkflowLegend.tsx
 * — a different, StatusBadge-based legend over the plural Workflow Diagram
 * Library's own NodeStatus, at a different import path — checked directly
 * rather than assumed from the name, following the same distinct-scope-
 * same-name treatment WorkflowMiniMap.tsx already documents.
 */
export function WorkflowLegend({ statuses = ALL_STATUSES, className }: WorkflowLegendProps) {
  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}>
      {statuses.map((status) => (
        <div key={status} className="flex items-center gap-2">
          <WorkflowNodeMarker status={status} />
          <Caption className="text-ink-tertiary">{LABELS[status]}</Caption>
        </div>
      ))}
    </div>
  );
}
