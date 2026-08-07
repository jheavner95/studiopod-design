"use client";

import { useMemo } from "react";
import { IllustrationCanvas, type IllustrationNodeSize } from "@/illustrations";
import { compileAdaptersToDiagram } from "../utils";
import type { CapabilityRegistry } from "../types";

export interface AdapterDiagramProps {
  registry: CapabilityRegistry;
  /** Restricts to adapters for one capability. Omit to show every adapter in the registry. */
  capabilityId?: string;
  nodeSize?: IllustrationNodeSize;
  selectedId?: string;
  onSelect?: (id: string) => void;
  focusId?: string;
  className?: string;
}

/**
 * A diagram focused purely on the adapter layer: which capability each
 * adapter implements, which provider it routes to, and that adapter's own
 * health, status, latency, and version, independent of any broader
 * capability-to-capability relationships.
 */
export function AdapterDiagram({
  registry,
  capabilityId,
  nodeSize,
  selectedId,
  onSelect,
  focusId,
  className,
}: AdapterDiagramProps) {
  const diagram = useMemo(() => {
    const adapters = capabilityId
      ? registry.adapters.filter((adapter) => adapter.capability === capabilityId)
      : registry.adapters;
    return compileAdaptersToDiagram(adapters, registry, { selectedId, focusId });
  }, [registry, capabilityId, selectedId, focusId]);

  return <IllustrationCanvas diagram={diagram} nodeSize={nodeSize} onSelectNode={onSelect} className={className} />;
}
