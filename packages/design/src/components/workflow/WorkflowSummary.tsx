import type { ReactNode } from "react";
import { StatGroup, type StatGroupItem } from "@/components/metadata";
import { cn } from "@/lib/utils";

interface WorkflowSummaryProps {
  title?: ReactNode;
  items: StatGroupItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/** An at-a-glance metric row for a workflow — steps completed, time elapsed, blockers — composing Foundation Metadata's own StatGroup directly rather than a second metric-grid implementation. */
export function WorkflowSummary({ title, items, columns = 3, className }: WorkflowSummaryProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {title ? <span className="text-body-sm font-medium text-ink-primary">{title}</span> : null}
      <StatGroup items={items} columns={columns} />
    </div>
  );
}
