import type { ReactNode } from "react";
import { Grid, type GridStrategy } from "@/components/layout";
import { cn } from "@/lib/utils";

interface DependencyGroupProps {
  title?: ReactNode;
  /** DependencyNode or RelationshipNode elements sharing this cluster boundary. */
  children: ReactNode;
  columns?: GridStrategy;
  className?: string;
}

/**
 * A cluster of nodes that share a common boundary in a dependency graph —
 * e.g. every node belonging to the same platform or domain — built
 * directly on Foundation Layout's own Grid, the same primitive Workflow
 * Framework's own WorkflowStageGroup and Pipeline Components' own
 * PipelineBranch both already use. Kept as its own component rather than a
 * re-export of either: WorkflowStageGroup groups stages that all run in
 * the same pass, PipelineBranch marks a genuine fork between alternative
 * paths, and DependencyGroup marks neither — it's a structural boundary
 * around nodes that happen to belong together, the same real-world concept
 * the illustration-canvas layer's own IllustrationGroup already bounds for
 * canvas-positioned diagrams, but rendered here in plain DOM flow instead
 * of a coordinate-positioned overlay.
 */
export function DependencyGroup({ title, children, columns = 2, className }: DependencyGroupProps) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-lg border border-border-subtle p-3", className)}>
      {title ? <span className="text-caption font-medium uppercase tracking-wide text-ink-tertiary">{title}</span> : null}
      <Grid columns={columns} gap="sm">
        {children}
      </Grid>
    </div>
  );
}
