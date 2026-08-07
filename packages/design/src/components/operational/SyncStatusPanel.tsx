import { ProgressBar } from "@/components/feedback";
import { Caption } from "@/components/ui";
import { cn } from "@/lib/utils";
import { HealthIndicator, type HealthStatusValue } from "./HealthIndicator";

export interface SyncSource {
  id: string;
  name: string;
  status: HealthStatusValue;
  /** e.g. "2 minutes ago" — omit while a first sync is still in progress. */
  lastSynced?: string;
  /** 0–1. Shown only while status is "syncing". */
  progress?: number;
}

interface SyncStatusPanelProps {
  sources: SyncSource[];
  className?: string;
}

/**
 * "Last synced at X" per integration or data source — fills the DS-0.2
 * inventory's own "Sync Status" gap (previously Partial, covering live/
 * healthy/warning states via the illustration engine's own HealthIndicator
 * but "not a literal last-synced timestamp indicator"). Composes this
 * family's own HealthIndicator and Foundation Feedback's ProgressBar
 * directly rather than a third status-row implementation.
 */
export function SyncStatusPanel({ sources, className }: SyncStatusPanelProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {sources.map((source) => (
        <div key={source.id} className="flex flex-col gap-1.5 rounded-lg border border-border-subtle p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-body-sm font-medium text-ink-primary">{source.name}</span>
            <HealthIndicator value={source.status} />
          </div>
          {source.status === "syncing" && source.progress !== undefined ? (
            <ProgressBar value={source.progress} showPercentage />
          ) : source.lastSynced ? (
            <Caption className="text-ink-tertiary">Last synced {source.lastSynced}</Caption>
          ) : null}
        </div>
      ))}
    </div>
  );
}
