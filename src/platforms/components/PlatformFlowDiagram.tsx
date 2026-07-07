"use client";

import { useMemo } from "react";
import { WorkflowDiagram } from "@/workflows";
import type { DiagramLayoutKind, IllustrationNodeSize } from "@/illustrations";
import { compileFlowToWorkflow } from "../utils";
import type { Platform, PlatformFlow } from "../types";

export interface PlatformFlowDiagramProps {
  flow: PlatformFlow;
  platforms?: Platform[];
  layout?: DiagramLayoutKind;
  nodeSize?: IllustrationNodeSize;
  selectedStepId?: string;
  onSelectStep?: (id: string) => void;
  className?: string;
}

/**
 * Renders an artifact flow (e.g. Creative Brief -> ... -> Commercial
 * Performance) by converting it to a Workflow value and handing it to the
 * existing WorkflowDiagram, so artifact flows reuse the Workflow Engine
 * rather than a bespoke flow renderer.
 */
export function PlatformFlowDiagram({
  flow,
  platforms = [],
  layout,
  nodeSize,
  selectedStepId,
  onSelectStep,
  className,
}: PlatformFlowDiagramProps) {
  const workflow = useMemo(() => compileFlowToWorkflow(flow, platforms), [flow, platforms]);

  return (
    <WorkflowDiagram
      workflow={workflow}
      layout={layout}
      nodeSize={nodeSize}
      selectedStepId={selectedStepId}
      onSelectStep={onSelectStep}
      className={className}
    />
  );
}
