import type { ReactNode } from "react";
import { WorkflowTransition, type WorkflowTransitionStatus } from "./WorkflowTransition";
import { cn } from "@/lib/utils";

interface StateTransitionProps {
  status?: WorkflowTransitionStatus;
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
  className?: string;
}

/**
 * The line between two StateNodes — composes Workflow Framework's own
 * WorkflowTransition directly, reusing its 3-state pending/active/complete
 * vocabulary verbatim (a transition itself is never "blocked" or
 * "terminal," only whether it's been crossed yet). Composed one hop from
 * WorkflowTransition rather than through PipelineConnector, since
 * PipelineConnector is itself nothing but a default-orientation rename
 * over WorkflowTransition — going through it would add an indirection
 * with no new behavior.
 */
export function StateTransition({ status = "pending", orientation = "horizontal", label, className }: StateTransitionProps) {
  return (
    <WorkflowTransition
      status={status}
      orientation={orientation}
      label={label}
      className={cn(orientation === "horizontal" ? "flex-1 justify-center px-0" : undefined, className)}
    />
  );
}
