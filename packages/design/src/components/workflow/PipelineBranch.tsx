import type { ReactNode } from "react";
import { Grid, type GridStrategy } from "@/components/layout";
import { cn } from "@/lib/utils";

interface PipelineBranchProps {
  title?: ReactNode;
  /** PipelineStage or PipelineStep elements — one per parallel/alternative path. */
  children: ReactNode;
  columns?: GridStrategy;
  className?: string;
}

/**
 * A point where a pipeline splits into two or more parallel or conditional
 * paths — built directly on Foundation Layout's own Grid, the same
 * primitive Workflow Framework's own WorkflowStageGroup already uses for
 * laying stages out side by side. Kept as its own component rather than a
 * re-export of WorkflowStageGroup, since the two solve conceptually
 * different problems that happen to share a layout: WorkflowStageGroup
 * groups stages that all run in the same pass, while PipelineBranch marks
 * a genuine fork — alternative paths a pipeline chooses between or forks
 * across, not stages that always run together.
 */
export function PipelineBranch({ title, children, columns = 2, className }: PipelineBranchProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {title ? <span className="text-caption font-medium uppercase tracking-wide text-ink-tertiary">{title}</span> : null}
      <Grid columns={columns} gap="md">
        {children}
      </Grid>
    </div>
  );
}
