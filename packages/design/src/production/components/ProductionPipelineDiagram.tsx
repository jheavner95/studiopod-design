"use client";

import { useMemo } from "react";
import { IllustrationCanvas, type DiagramLayoutKind, type IllustrationNodeSize } from "@/illustrations";
import { compilePipelineToDiagram } from "../utils";
import type { ProductionPipeline } from "../types";

export interface ProductionPipelineDiagramProps {
  pipeline: ProductionPipeline;
  layout?: DiagramLayoutKind;
  nodeSize?: IllustrationNodeSize;
  selectedStageId?: string;
  onSelectStage?: (id: string) => void;
  className?: string;
}

/**
 * The primary entry point: `<ProductionPipelineDiagram pipeline={data} />`.
 * Compiles a pipeline's stages and connections to a plain Diagram and
 * renders it through IllustrationCanvas, the same engine every workflow
 * and platform architecture diagram uses, no pipeline-specific rendering
 * code exists anywhere in this component.
 */
export function ProductionPipelineDiagram({
  pipeline,
  layout = "horizontal",
  nodeSize,
  selectedStageId,
  onSelectStage,
  className,
}: ProductionPipelineDiagramProps) {
  const diagram = useMemo(
    () => ({ ...compilePipelineToDiagram(pipeline, { selectedStageId }), layout }),
    [pipeline, selectedStageId, layout],
  );

  return (
    <IllustrationCanvas diagram={diagram} nodeSize={nodeSize} onSelectNode={onSelectStage} className={className} />
  );
}
