"use client";

import { useMemo } from "react";
import { IllustrationCanvas, type DiagramLayoutKind, type IllustrationNodeSize } from "@/illustrations";
import { compileCapabilityToNode, compileRelationshipToConnection } from "../utils";
import type { CapabilityRegistry } from "../types";

export interface CapabilityDiagramProps {
  registry: CapabilityRegistry;
  layout?: DiagramLayoutKind;
  nodeSize?: IllustrationNodeSize;
  selectedCapabilityId?: string;
  onSelectCapability?: (id: string) => void;
  className?: string;
}

/**
 * A capabilities-only map: no providers, no adapters, just how
 * capabilities relate to each other. Compiles to a plain Diagram and
 * renders it through IllustrationCanvas, the same engine every other
 * diagram in this codebase uses.
 */
export function CapabilityDiagram({
  registry,
  layout = "grid",
  nodeSize,
  selectedCapabilityId,
  onSelectCapability,
  className,
}: CapabilityDiagramProps) {
  const diagram = useMemo(() => {
    const capabilityIds = new Set(registry.capabilities.map((capability) => capability.id));
    const nodes = registry.capabilities.map((capability) => compileCapabilityToNode(capability, selectedCapabilityId));
    const connections = (registry.relationships ?? [])
      .filter((relationship) => capabilityIds.has(relationship.source) && capabilityIds.has(relationship.target))
      .map((relationship) => compileRelationshipToConnection(relationship));
    return { nodes, connections, layout };
  }, [registry, selectedCapabilityId, layout]);

  return (
    <IllustrationCanvas
      diagram={diagram}
      nodeSize={nodeSize}
      onSelectNode={onSelectCapability}
      className={className}
    />
  );
}
