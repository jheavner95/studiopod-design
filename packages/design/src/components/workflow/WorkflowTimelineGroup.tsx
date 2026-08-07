import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WorkflowTimelineGroupProps {
  /** A date or category heading — "Today," "March 2026," "Approvals." */
  title: ReactNode;
  /** WorkflowTimelineEvent and WorkflowTimelineConnector elements. */
  children: ReactNode;
  className?: string;
}

/**
 * Groups timeline events under one chronological or categorical heading —
 * a genuinely new component, since neither WorkflowStageGroup (which lays
 * stages out side by side, not stacked under a shared heading) nor
 * InspectorHistory (a single flat list with no grouping at all) covers
 * date/category grouping within a chronological event list.
 */
export function WorkflowTimelineGroup({ title, children, className }: WorkflowTimelineGroupProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span className="text-caption font-medium uppercase tracking-wide text-ink-tertiary">{title}</span>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
