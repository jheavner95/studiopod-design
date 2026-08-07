import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";
import { DependencyNodeMarker, type DependencyStatusValue } from "./DependencyNode";

interface DependencyLegendProps {
  /** Defaults to all 8 states — narrow this to only the states a given graph actually uses. */
  statuses?: DependencyStatusValue[];
  className?: string;
}

const ALL_STATUSES: DependencyStatusValue[] = ["connected", "disconnected", "blocked", "healthy", "warning", "critical", "circular", "hidden"];

const LABELS: Record<DependencyStatusValue, string> = {
  connected: "Connected",
  disconnected: "Disconnected",
  blocked: "Blocked",
  healthy: "Healthy",
  warning: "Warning",
  critical: "Critical",
  circular: "Circular",
  hidden: "Hidden",
};

/**
 * What each DependencyNode marker means, spelled out so meaning never
 * depends on color alone — the same marker-plus-label-list pattern
 * Workflow Timeline's own WorkflowTimelineLegend and State Machine's own
 * StateLegend already established. Reuses DependencyNode's own exported
 * DependencyNodeMarker rather than a second marker implementation.
 */
export function DependencyLegend({ statuses = ALL_STATUSES, className }: DependencyLegendProps) {
  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}>
      {statuses.map((status) => (
        <div key={status} className="flex items-center gap-2">
          <DependencyNodeMarker status={status} />
          <Caption className="text-ink-tertiary">{LABELS[status]}</Caption>
        </div>
      ))}
    </div>
  );
}
