import type { ReactNode } from "react";
import { Body } from "@/components/ui";
import { type StatGroupItem } from "@/components/metadata";
import { WorkflowSummary } from "./WorkflowSummary";
import { cn } from "@/lib/utils";

interface WorkflowOverviewProps {
  title?: ReactNode;
  description?: ReactNode;
  items: StatGroupItem[];
  columns?: 2 | 3 | 4;
  /** A WorkflowLegend, or any other supporting summary content. */
  children?: ReactNode;
  className?: string;
}

/**
 * A titled summary region for a workflow visualization — data-forward
 * (stat counts, a legend), composing Workflow Framework's own
 * WorkflowSummary directly rather than a second metric-grid
 * implementation. Deliberately the data-forward sibling of
 * WorkflowMiniMap, not a duplicate of it: WorkflowMiniMap is a visual
 * node-strip preview with zero interaction, while WorkflowOverview is
 * "how many nodes are in what state," the same titled-region-above-content
 * shape Dashboard Widgets' own DashboardSection already established one
 * tier below.
 */
export function WorkflowOverview({ title, description, items, columns = 3, children, className }: WorkflowOverviewProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {title || description ? (
        <div className="flex flex-col gap-1">
          {title ? <span className="text-body-md font-medium text-ink-primary">{title}</span> : null}
          {description ? (
            <Body size="sm" muted>
              {description}
            </Body>
          ) : null}
        </div>
      ) : null}
      <WorkflowSummary items={items} columns={columns} />
      {children}
    </div>
  );
}
