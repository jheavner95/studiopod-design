import type { ReactNode } from "react";
import { type ScrollDirection } from "@/components/layout";
import { WorkflowViewport } from "@/components/workflow";
import { cn } from "@/lib/utils";

interface ProductionCanvasProps {
  /** ProductionStagePanel/WorkflowNode/DependencyNode/DependencyEdge content — the pipeline run or dependency graph itself. */
  children: ReactNode;
  direction?: ScrollDirection;
  maxHeight?: string;
  className?: string;
}

/**
 * The scrollable surface inside a ProductionWorkspace that actually holds
 * pipeline/dependency content — a thin wrapper over Workflow Visualization's
 * own WorkflowViewport, not WorkflowCanvas. Checked directly: WorkflowCanvas
 * is itself a re-export of Workflow (the same outer header/sidebar/body
 * shell ProductionWorkspace already re-exports), so composing it here would
 * nest a second full workspace shell inside the first — a real, avoidable
 * double-shell. WorkflowViewport is the actual inner scrollable region
 * WorkflowCanvas's own children slot is meant to hold, which is exactly
 * what ProductionCanvas needs to be.
 */
export function ProductionCanvas({ children, direction = "both", maxHeight, className }: ProductionCanvasProps) {
  return (
    <WorkflowViewport direction={direction} maxHeight={maxHeight} className={cn(className)}>
      {children}
    </WorkflowViewport>
  );
}
