import type { ReactNode } from "react";
import { Grid, type GridStrategy } from "@/components/layout";
import { cn } from "@/lib/utils";

interface WorkflowStageGroupProps {
  title?: ReactNode;
  /** WorkflowStage elements. */
  children: ReactNode;
  columns?: GridStrategy;
  className?: string;
}

/** Groups multiple WorkflowStage elements side by side — parallel or branching stages sharing one row, rather than a single vertical stack. Built directly on Foundation Layout's own Grid. */
export function WorkflowStageGroup({ title, children, columns = 1, className }: WorkflowStageGroupProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {title ? <span className="text-caption font-medium uppercase tracking-wide text-ink-tertiary">{title}</span> : null}
      <Grid columns={columns} gap="md">
        {children}
      </Grid>
    </div>
  );
}
