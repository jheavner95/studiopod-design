"use client";

import { useMemo } from "react";
import { WorkflowDiagram } from "@/workflows";
import type { DiagramLayoutKind, IllustrationNodeSize } from "@/illustrations";
import { compileFlowToWorkflow } from "../utils";
import type { CapabilityFlow } from "../types";

export interface CapabilityFlowDiagramProps {
  flow: CapabilityFlow;
  layout?: DiagramLayoutKind;
  nodeSize?: IllustrationNodeSize;
  selectedStageId?: string;
  onSelectStage?: (id: string) => void;
  className?: string;
}

/**
 * Renders a capability flow (e.g. AI Providers -> Generation Capability ->
 * StudioPOD -> Artwork Production, or Provider Unavailable -> Capability
 * Layer -> Automatic Routing -> Alternative Provider) by converting it to
 * a Workflow value and handing it to the existing WorkflowDiagram.
 */
export function CapabilityFlowDiagram({
  flow,
  layout,
  nodeSize,
  selectedStageId,
  onSelectStage,
  className,
}: CapabilityFlowDiagramProps) {
  const workflow = useMemo(() => compileFlowToWorkflow(flow), [flow]);

  return (
    <WorkflowDiagram
      workflow={workflow}
      layout={layout}
      nodeSize={nodeSize}
      selectedStepId={selectedStageId}
      onSelectStep={onSelectStage}
      className={className}
    />
  );
}
