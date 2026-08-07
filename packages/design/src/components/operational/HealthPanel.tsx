import type { ReactNode } from "react";
import { StatGroup, type StatGroupItem } from "@/components/metadata";
import { StatusPanel } from "./StatusPanel";
import { InspectorHeader } from "./InspectorHeader";
import { InspectorSection } from "./InspectorSection";
import { HealthScore } from "./HealthScore";
import { HealthIssueList, type HealthIssueEntry } from "./HealthIssueList";
import type { HealthStatusValue } from "./HealthIndicator";

const HEADER_TONE: Record<HealthStatusValue, "neutral" | "accent" | "success" | "warning" | "error"> = {
  healthy: "success",
  warning: "warning",
  critical: "error",
  offline: "neutral",
  syncing: "accent",
  paused: "neutral",
  recovering: "accent",
  unknown: "neutral",
};

const HEADER_LABEL: Record<HealthStatusValue, string> = {
  healthy: "Healthy",
  warning: "Warning",
  critical: "Critical",
  offline: "Offline",
  syncing: "Syncing",
  paused: "Paused",
  recovering: "Recovering",
  unknown: "Unknown",
};

interface HealthPanelProps {
  icon?: ReactNode;
  name: ReactNode;
  type?: ReactNode;
  status: HealthStatusValue;
  score?: number;
  metrics?: StatGroupItem[];
  issues?: HealthIssueEntry[];
  recommendations?: ReactNode;
  className?: string;
}

/**
 * The ready-made health panel — a full composition of StatusPanel's shell
 * (Inspector Panel underneath) with a HealthScore, Foundation Metadata's own
 * StatGroup for metrics, HealthIssueList, and a recommendations slot. The
 * building blocks (StatusPanel, HealthScore, HealthIssueList,
 * HealthRecommendation) remain independently usable — SyncStatusPanel and
 * ProviderHealthPanel compose them differently rather than wrapping this.
 */
export function HealthPanel({ icon, name, type, status, score, metrics, issues, recommendations, className }: HealthPanelProps) {
  return (
    <StatusPanel
      header={<InspectorHeader icon={icon} name={name} type={type} status={{ label: HEADER_LABEL[status], tone: HEADER_TONE[status] }} />}
      className={className}
    >
      {score !== undefined ? (
        <InspectorSection title="Health Score" collapsible={false}>
          <HealthScore score={score} />
        </InspectorSection>
      ) : null}
      {metrics && metrics.length > 0 ? (
        <InspectorSection title="Metrics" collapsible={false}>
          <StatGroup items={metrics} columns={2} />
        </InspectorSection>
      ) : null}
      {issues ? (
        <InspectorSection title="Issues" defaultOpen={issues.length > 0}>
          <HealthIssueList issues={issues} />
        </InspectorSection>
      ) : null}
      {recommendations ? (
        <InspectorSection title="Recommendations" defaultOpen={false}>
          <div className="flex flex-col gap-3">{recommendations}</div>
        </InspectorSection>
      ) : null}
    </StatusPanel>
  );
}
