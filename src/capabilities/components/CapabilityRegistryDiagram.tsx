"use client";

import { useMemo } from "react";
import { IllustrationCanvas, type DiagramLayoutKind, type IllustrationNodeSize } from "@/illustrations";
import { compileRegistryToDiagram } from "../utils";
import type { CapabilityRegistry } from "../types";

export interface CapabilityRegistryDiagramProps {
  registry: CapabilityRegistry;
  layout?: DiagramLayoutKind;
  nodeSize?: IllustrationNodeSize;
  selectedId?: string;
  onSelect?: (id: string) => void;
  /** Dims every relationship and adapter not touching this id, for focus mode. */
  focusId?: string;
  className?: string;
}

/**
 * The primary entry point: `<CapabilityRegistryDiagram registry={data} />`.
 * Compiles the full registry (capabilities, providers, relationships, and
 * adapters) to a plain Diagram and renders it through IllustrationCanvas.
 * No capability or provider is special-cased anywhere in this component.
 */
export function CapabilityRegistryDiagram({
  registry,
  layout = "grid",
  nodeSize,
  selectedId,
  onSelect,
  focusId,
  className,
}: CapabilityRegistryDiagramProps) {
  const diagram = useMemo(
    () => ({ ...compileRegistryToDiagram(registry, { selectedId, focusId }), layout }),
    [registry, selectedId, focusId, layout],
  );

  return <IllustrationCanvas diagram={diagram} nodeSize={nodeSize} onSelectNode={onSelect} className={className} />;
}
