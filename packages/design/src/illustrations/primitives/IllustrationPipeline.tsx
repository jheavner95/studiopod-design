"use client";

import { useMemo } from "react";
import { IllustrationCanvas } from "./IllustrationCanvas";
import type { IllustrationNodeSize } from "./IllustrationNode";
import type { Diagram, DiagramNode, DiagramConnection, DiagramPipeline, DiagramLayoutKind, NodeStatus } from "../types";

export interface IllustrationPipelineProps {
  pipeline: DiagramPipeline;
  /** The full node catalogue — the pipeline's stages reference these by id. */
  nodes: DiagramNode[];
  layout?: DiagramLayoutKind;
  nodeSize?: IllustrationNodeSize;
  onSelectNode?: (id: string) => void;
  className?: string;
}

function deriveStageStatus(stageIndex: number, totalStages: number, progress: number): NodeStatus {
  const completedCount = Math.round(progress * totalStages);
  if (stageIndex < completedCount) return "complete";
  if (stageIndex === completedCount) return "active";
  return "idle";
}

/**
 * Compiles ordered/parallel/branching/looping pipeline stages plus a node
 * catalogue into a plain Diagram, then renders it through
 * IllustrationCanvas — no separate rendering path, just a data transform.
 * When `pipeline.progress` is set, any node without an explicit `status`
 * gets one derived from how far its stage is from that progress point,
 * and connections between a completed stage and its active/completed
 * successor render as "flowing".
 */
export function IllustrationPipeline({
  pipeline,
  nodes,
  layout = "horizontal",
  nodeSize,
  onSelectNode,
  className,
}: IllustrationPipelineProps) {
  const diagram = useMemo<Diagram>(() => {
    const nodeMap = new Map(nodes.map((node) => [node.id, node]));
    const totalStages = pipeline.stages.length;
    const stageIndexByNodeId = new Map<string, number>();
    pipeline.stages.forEach((stage, stageIndex) => {
      stage.nodeIds.forEach((nodeId) => stageIndexByNodeId.set(nodeId, stageIndex));
    });

    function statusFor(nodeId: string): NodeStatus {
      const base = nodeMap.get(nodeId);
      if (base?.status) return base.status;
      if (pipeline.progress === undefined) return "idle";
      const stageIndex = stageIndexByNodeId.get(nodeId) ?? 0;
      return deriveStageStatus(stageIndex, totalStages, pipeline.progress);
    }

    const resolvedNodes: DiagramNode[] = [];
    pipeline.stages.forEach((stage) => {
      stage.nodeIds.forEach((nodeId) => {
        const base = nodeMap.get(nodeId);
        if (!base) return;
        resolvedNodes.push({ ...base, status: statusFor(nodeId) });
      });
    });

    const connections: DiagramConnection[] = [];
    pipeline.stages.forEach((stage, stageIndex) => {
      const defaultNext =
        stageIndex < totalStages - 1
          ? [pipeline.stages[stageIndex + 1].id]
          : pipeline.loop
            ? [pipeline.stages[0].id]
            : [];
      const nextStageIds = stage.next ?? defaultNext;

      nextStageIds.forEach((nextId) => {
        const nextStage = pipeline.stages.find((candidate) => candidate.id === nextId);
        if (!nextStage) return;

        stage.nodeIds.forEach((sourceId) => {
          nextStage.nodeIds.forEach((targetId) => {
            const sourceDone = statusFor(sourceId) === "complete";
            const targetStatus = statusFor(targetId);
            const targetReached = targetStatus === "active" || targetStatus === "complete";
            connections.push({
              id: `${sourceId}->${targetId}`,
              source: sourceId,
              target: targetId,
              direction: "forward",
              status: sourceDone && targetReached ? "flowing" : "inactive",
            });
          });
        });
      });
    });

    return { nodes: resolvedNodes, connections, layout };
  }, [pipeline, nodes, layout]);

  return <IllustrationCanvas diagram={diagram} nodeSize={nodeSize} onSelectNode={onSelectNode} className={className} />;
}
