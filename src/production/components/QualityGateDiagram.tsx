"use client";

import { useMemo } from "react";
import { IllustrationCanvas, type DiagramLayoutKind, type IllustrationNodeSize } from "@/illustrations";
import { compileGatesToDiagram, resolveGateStatus } from "../utils";
import type { QualityGate } from "../types";

export interface QualityGateDiagramProps {
  gates: QualityGate[];
  layout?: DiagramLayoutKind;
  nodeSize?: IllustrationNodeSize;
  selectedGateId?: string;
  onSelectGate?: (id: string) => void;
  /** Dims every gate not matching, for the "filter failures" / "highlight warnings" interactions. */
  filterStatus?: "failed" | "warning";
  className?: string;
}

/** Renders a flat list of quality gates as a chained diagram, e.g. Geometry -> Safe Zones -> ... -> Approval. */
export function QualityGateDiagram({
  gates,
  layout = "horizontal",
  nodeSize,
  selectedGateId,
  onSelectGate,
  filterStatus,
  className,
}: QualityGateDiagramProps) {
  const diagram = useMemo(() => {
    const compiled = compileGatesToDiagram(gates, { selectedGateId });
    if (!filterStatus) return { ...compiled, layout };
    const nodes = compiled.nodes.map((node, index) => ({
      ...node,
      disabled: resolveGateStatus(gates[index]) !== filterStatus,
    }));
    return { ...compiled, nodes, layout };
  }, [gates, selectedGateId, filterStatus, layout]);

  return (
    <IllustrationCanvas diagram={diagram} nodeSize={nodeSize} onSelectNode={onSelectGate} className={className} />
  );
}
