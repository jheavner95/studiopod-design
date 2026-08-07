import { WorkflowTransition, type WorkflowTransitionStatus } from "./WorkflowTransition";
import { cn } from "@/lib/utils";

interface WorkflowStepperConnectorProps {
  status?: WorkflowTransitionStatus;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/**
 * The line between two WorkflowStepperStep markers — a thin wrapper over
 * Workflow Framework's own WorkflowTransition, which already has exactly
 * the 3-state vocabulary a connector needs (pending/active/complete — a
 * connector is never "blocked" or "skipped," only crossed or not).
 * Defaults to horizontal (a wizard's stepper bar reads left to right by
 * default, unlike Workflow Framework's own vertical-first stage stack) and
 * stretches to fill the gap between markers in a horizontal stepper row.
 */
export function WorkflowStepperConnector({ status = "pending", orientation = "horizontal", className }: WorkflowStepperConnectorProps) {
  return (
    <WorkflowTransition
      status={status}
      orientation={orientation}
      className={cn(orientation === "horizontal" ? "flex-1 justify-center px-0" : undefined, className)}
    />
  );
}
