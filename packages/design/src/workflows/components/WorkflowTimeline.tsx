import { TimelineComposition, type TimelineItem, type TimelineOrientation } from "@/compositions";
import { cn } from "@/lib/utils";
import { resolveStepStatus, toSystemStatus } from "../utils";
import type { Workflow } from "../types";

export interface WorkflowTimelineProps {
  workflow: Workflow;
  orientation?: TimelineOrientation;
  showHeader?: boolean;
  className?: string;
}

/** Renders a workflow's steps through the existing TimelineComposition — a workflow is just timeline data with icons and a duration estimate instead of a date. */
export function WorkflowTimeline({ workflow, orientation = "vertical", showHeader = true, className }: WorkflowTimelineProps) {
  const items: TimelineItem[] = workflow.steps.map((step) => ({
    id: step.id,
    date: step.estimatedDuration ?? "",
    title: step.title,
    description: step.description,
    status: toSystemStatus(resolveStepStatus(step)),
    icon: step.icon,
  }));

  return (
    <TimelineComposition
      title={showHeader ? workflow.title : undefined}
      description={showHeader ? workflow.description : undefined}
      items={items}
      orientation={orientation}
      className={cn("py-0", className)}
    />
  );
}
