"use client";

import { useMemo } from "react";
import { IllustrationCanvas, type DiagramLayoutKind, type IllustrationNodeSize } from "@/illustrations";
import { compileWorkflowToDiagram } from "../utils";
import type { Workflow } from "../types";

export interface WorkflowDiagramProps {
  workflow: Workflow;
  layout?: DiagramLayoutKind;
  nodeSize?: IllustrationNodeSize;
  selectedStepId?: string;
  onSelectStep?: (id: string) => void;
  className?: string;
}

/**
 * The primary entry point: `<WorkflowDiagram workflow={data} />`. Compiles
 * the workflow to a plain Diagram and renders it through
 * IllustrationCanvas — no workflow-specific rendering code exists
 * anywhere in this component.
 */
export function WorkflowDiagram({
  workflow,
  layout = "horizontal",
  nodeSize,
  selectedStepId,
  onSelectStep,
  className,
}: WorkflowDiagramProps) {
  const diagram = useMemo(
    () => ({ ...compileWorkflowToDiagram(workflow, selectedStepId), layout }),
    [workflow, selectedStepId, layout],
  );

  return (
    <IllustrationCanvas
      diagram={diagram}
      nodeSize={nodeSize}
      onSelectNode={onSelectStep}
      className={className}
    />
  );
}
