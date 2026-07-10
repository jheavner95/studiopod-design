import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { WorkflowStatus, type WorkflowStateValue } from "./WorkflowStatus";

interface WorkflowStageProps {
  title: ReactNode;
  status?: WorkflowStateValue;
  /** WorkflowStep elements, optionally separated by WorkflowTransition. */
  children: ReactNode;
  className?: string;
}

/**
 * A titled group of steps within a workflow — the unit a Linear, Branching,
 * or Approval workflow is built from. Composes WorkflowStatus for its own
 * at-a-glance state; step and transition layout inside is entirely up to
 * the caller's children, since this component holds no business logic
 * about ordering or gating.
 */
export function WorkflowStage({ title, status, children, className }: WorkflowStageProps) {
  return (
    <section className={cn("flex flex-col gap-3 rounded-lg border border-border-subtle p-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-body-md font-medium text-ink-primary">{title}</span>
        {status ? <WorkflowStatus value={status} /> : null}
      </div>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}
