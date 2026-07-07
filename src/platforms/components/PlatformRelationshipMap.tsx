"use client";

import { useMemo } from "react";
import { IllustrationCanvas, type DiagramLayoutKind, type IllustrationNodeSize } from "@/illustrations";
import { compileArchitectureToDiagram } from "../utils";
import type { PlatformArchitecture } from "../types";

export interface PlatformRelationshipMapProps {
  architecture: PlatformArchitecture;
  layout?: DiagramLayoutKind;
  nodeSize?: IllustrationNodeSize;
  selectedPlatformId?: string;
  onSelectPlatform?: (id: string) => void;
  className?: string;
}

/**
 * A dependency-only view: every platform's authored status is ignored, so
 * the diagram emphasizes purely how platforms relate to each other, not
 * workflow progress. Defaults to a radial layout since dependency graphs
 * have no single directional flow.
 */
export function PlatformRelationshipMap({
  architecture,
  layout = "radial",
  nodeSize,
  selectedPlatformId,
  onSelectPlatform,
  className,
}: PlatformRelationshipMapProps) {
  const diagram = useMemo(
    () => ({
      ...compileArchitectureToDiagram(architecture, { selectedPlatformId, neutralStatus: true }),
      layout,
    }),
    [architecture, selectedPlatformId, layout],
  );

  return (
    <IllustrationCanvas
      diagram={diagram}
      nodeSize={nodeSize}
      onSelectNode={onSelectPlatform}
      className={className}
    />
  );
}
