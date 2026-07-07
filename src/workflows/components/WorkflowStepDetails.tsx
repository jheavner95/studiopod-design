import { Expand } from "@/motion";
import { StatusBadge, HealthIndicator } from "@/illustrations";
import { Body, Caption } from "@/components/ui";
import { cn } from "@/lib/utils";
import { resolveStepStatus } from "../utils";
import type { WorkflowStep } from "../types";

export interface WorkflowStepDetailsProps {
  step: WorkflowStep;
  open?: boolean;
  className?: string;
}

/** An expandable panel of a step's detail, built on the MS-2.1 Expand primitive plus MS-2.2 status primitives. */
export function WorkflowStepDetails({ step, open = false, className }: WorkflowStepDetailsProps) {
  return (
    <Expand open={open} className={className}>
      <div className={cn("flex flex-col gap-3 rounded-lg border border-border bg-surface p-4")}>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={resolveStepStatus(step)} />
          {step.health && <HealthIndicator health={step.health} />}
          {step.estimatedDuration && <Caption>{step.estimatedDuration}</Caption>}
        </div>
        {step.description && <Body size="sm" muted>{step.description}</Body>}
      </div>
    </Expand>
  );
}
