import { WorkflowTransition, type WorkflowTransitionStatus } from "./WorkflowTransition";
import { cn } from "@/lib/utils";

interface PipelineConnectorProps {
  status?: WorkflowTransitionStatus;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/**
 * The line between two PipelineSteps or PipelineStages — a thin wrapper
 * over Workflow Framework's own WorkflowTransition, the same 3-state
 * pending/active/complete vocabulary a connector needs. Defaults to
 * horizontal, unlike Workflow Framework's own vertical-first default —
 * a "pipeline" conventionally reads left to right (the same reading
 * direction the pre-existing illustration PipelineStep primitive already
 * assumes for its own repeatable node-plus-connector idiom), unlike a
 * vertical-first workflow stage stack.
 */
export function PipelineConnector({ status = "pending", orientation = "horizontal", className }: PipelineConnectorProps) {
  return (
    <WorkflowTransition
      status={status}
      orientation={orientation}
      className={cn(orientation === "horizontal" ? "flex-1 justify-center px-0" : undefined, className)}
    />
  );
}
