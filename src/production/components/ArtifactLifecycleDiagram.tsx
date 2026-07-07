"use client";

import { useMemo } from "react";
import { WorkflowDiagram } from "@/workflows";
import type { DiagramLayoutKind, IllustrationNodeSize } from "@/illustrations";
import { compileArtifactsToWorkflow } from "../utils";
import type { ProductionArtifact } from "../types";

export interface ArtifactLifecycleDiagramProps {
  artifacts: ProductionArtifact[];
  title?: string;
  layout?: DiagramLayoutKind;
  nodeSize?: IllustrationNodeSize;
  selectedArtifactId?: string;
  onSelectArtifact?: (id: string) => void;
  className?: string;
}

/**
 * Renders an artifact's lifecycle (e.g. Creative Brief -> ... -> Commercial
 * Performance) by converting it to a Workflow value and handing it to the
 * existing WorkflowDiagram, so artifact lifecycles reuse the Workflow
 * Engine rather than a bespoke renderer.
 */
export function ArtifactLifecycleDiagram({
  artifacts,
  title,
  layout,
  nodeSize,
  selectedArtifactId,
  onSelectArtifact,
  className,
}: ArtifactLifecycleDiagramProps) {
  const workflow = useMemo(() => compileArtifactsToWorkflow(artifacts, title), [artifacts, title]);

  return (
    <WorkflowDiagram
      workflow={workflow}
      layout={layout}
      nodeSize={nodeSize}
      selectedStepId={selectedArtifactId}
      onSelectStep={onSelectArtifact}
      className={className}
    />
  );
}
