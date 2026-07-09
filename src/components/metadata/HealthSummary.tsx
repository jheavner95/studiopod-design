import { cn } from "@/lib/utils";
import { Grid } from "@/components/layout";

export type HealthState = "healthy" | "degraded" | "down" | "unknown";

export interface HealthMetric {
  label: string;
  state: HealthState;
  detail?: string;
}

interface HealthSummaryProps {
  metrics: HealthMetric[];
  className?: string;
}

const STATE_COLOR: Record<HealthState, string> = {
  healthy: "bg-success",
  degraded: "bg-warning",
  down: "bg-error",
  unknown: "bg-ink-tertiary",
};

const STATE_LABEL: Record<HealthState, string> = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
  unknown: "Unknown",
};

/**
 * Passive, read-only health indicators — no action affordance, matching
 * Operational Health's own "read-only indicators" rule. A simpler,
 * general-purpose counterpart to Production's own HealthDashboardDiagram,
 * not a replacement for it.
 */
export function HealthSummary({ metrics, className }: HealthSummaryProps) {
  return (
    <Grid columns={3} gap="sm" className={className}>
      {metrics.map((metric) => (
        <div key={metric.label} className="flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-3 py-2.5">
          <span className={cn("size-2 shrink-0 rounded-full", STATE_COLOR[metric.state])} aria-hidden />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-body-sm text-ink-primary">{metric.label}</span>
            <span className="text-caption text-ink-tertiary">{metric.detail ?? STATE_LABEL[metric.state]}</span>
          </div>
        </div>
      ))}
    </Grid>
  );
}
