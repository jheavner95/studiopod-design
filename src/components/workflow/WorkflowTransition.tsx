import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";

export type WorkflowTransitionStatus = "pending" | "active" | "complete";

interface WorkflowTransitionProps {
  label?: ReactNode;
  orientation?: "horizontal" | "vertical";
  status?: WorkflowTransitionStatus;
  className?: string;
}

const LINE_TONE: Record<WorkflowTransitionStatus, string> = {
  pending: "bg-border-subtle",
  active: "bg-accent-500",
  complete: "bg-success",
};

/**
 * The connector between two WorkflowStep or WorkflowStage elements — a
 * plain line by default, with an optional label for a named gate or
 * condition ("if approved", "on failure"). A 3-state line status (pending/
 * active/complete), deliberately narrower than WorkflowStateValue's 8
 * states, since a transition itself is never "blocked" or "cancelled" — it
 * only ever represents whether this path has been crossed yet. Kept as its
 * own component rather than folded into WorkflowStep, so a caller can vary
 * the transition treatment independently of the steps it connects.
 */
export function WorkflowTransition({ label, orientation = "vertical", status = "pending", className }: WorkflowTransitionProps) {
  const isVertical = orientation === "vertical";
  return (
    <div className={cn("flex items-center", isVertical ? "flex-col gap-1 py-1 pl-3" : "flex-row gap-1 px-1", className)}>
      <div className={cn(isVertical ? "h-4 w-px" : "h-px w-4", LINE_TONE[status])} aria-hidden />
      {label ? <Caption className="text-ink-tertiary">{label}</Caption> : null}
    </div>
  );
}
