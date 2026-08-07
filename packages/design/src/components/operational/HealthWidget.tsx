import type { ReactNode } from "react";
import { Panel } from "@/components/layout";
import { StatGroup, type StatGroupItem } from "@/components/metadata";
import { HealthScore } from "./HealthScore";
import { HealthIssueList, type HealthIssueEntry } from "./HealthIssueList";

interface HealthWidgetProps {
  title: ReactNode;
  score: number;
  metrics?: StatGroupItem[];
  issues?: HealthIssueEntry[];
  className?: string;
}

/**
 * The compact dashboard-tile form of a health view — HealthScore + StatGroup
 * + HealthIssueList side by side, the same building blocks HealthPanel
 * composes for its own fuller Inspector-shell presentation. Use HealthPanel
 * directly instead when the context is a workspace inspector rather than a
 * dashboard tile.
 */
export function HealthWidget({ title, score, metrics, issues, className }: HealthWidgetProps) {
  return (
    <Panel header={<span className="text-body-md font-medium text-ink-primary">{title}</span>} className={className}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <HealthScore score={score} />
          {metrics && metrics.length > 0 ? <StatGroup items={metrics} columns={2} /> : null}
        </div>
        {issues ? <HealthIssueList issues={issues} /> : null}
      </div>
    </Panel>
  );
}
