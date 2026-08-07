"use client";

import { useMemo } from "react";
import { IllustrationCanvas, type DiagramLayoutKind, type IllustrationNodeSize } from "@/illustrations";
import { compileArchitectureToDiagram } from "../utils";
import type { PlatformArchitecture } from "../types";

export interface PlatformArchitectureDiagramProps {
  architecture: PlatformArchitecture;
  layout?: DiagramLayoutKind;
  nodeSize?: IllustrationNodeSize;
  selectedPlatformId?: string;
  onSelectPlatform?: (id: string) => void;
  /** Dims every relationship not touching this platform. Pass the selected platform id to drive "focus mode". */
  focusPlatformId?: string;
  className?: string;
}

/**
 * The primary entry point: `<PlatformArchitectureDiagram architecture={data} />`.
 * Compiles the architecture (platforms, relationships, layers) to a plain
 * Diagram and renders it through IllustrationCanvas, the same engine every
 * workflow diagram uses, no architecture-specific rendering code exists
 * anywhere in this component.
 */
export function PlatformArchitectureDiagram({
  architecture,
  layout = "grid",
  nodeSize,
  selectedPlatformId,
  onSelectPlatform,
  focusPlatformId,
  className,
}: PlatformArchitectureDiagramProps) {
  const diagram = useMemo(
    () => ({ ...compileArchitectureToDiagram(architecture, { selectedPlatformId, focusPlatformId }), layout }),
    [architecture, selectedPlatformId, focusPlatformId, layout],
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
