import { Progress } from "@/motion";
import { Caption } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Workflow } from "../types";

export interface WorkflowProgressProps {
  workflow: Workflow;
  showLabel?: boolean;
  className?: string;
}

/** A workflow-level completion bar, built directly on the MS-2.1 Progress primitive. */
export function WorkflowProgress({ workflow, showLabel = true, className }: WorkflowProgressProps) {
  const completedCount = workflow.steps.filter((step) => step.completed).length;
  const value = workflow.completion ?? (workflow.steps.length ? completedCount / workflow.steps.length : 0);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <Caption>{workflow.title}</Caption>
          <Caption>{Math.round(value * 100)}%</Caption>
        </div>
      )}
      <Progress value={value} />
    </div>
  );
}
