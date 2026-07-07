"use client";

import { useMemo } from "react";
import { IllustrationCanvas, type IllustrationNodeSize } from "@/illustrations";
import { compileProviderFanToDiagram, getProvidersForCapability } from "../utils";
import type { CapabilityRegistry } from "../types";

export interface ProviderDiagramProps {
  registry: CapabilityRegistry;
  capabilityId: string;
  nodeSize?: IllustrationNodeSize;
  selectedId?: string;
  onSelect?: (id: string) => void;
  focusId?: string;
  className?: string;
}

/**
 * A hub-and-spoke view of one capability and every provider that
 * implements it, e.g. Publishing at the center with WordPress, Shopify,
 * and future providers as interchangeable spokes.
 */
export function ProviderDiagram({
  registry,
  capabilityId,
  nodeSize,
  selectedId,
  onSelect,
  focusId,
  className,
}: ProviderDiagramProps) {
  const diagram = useMemo(() => {
    const capability = registry.capabilities.find((item) => item.id === capabilityId);
    if (!capability) return { nodes: [], connections: [] };
    const providers = getProvidersForCapability(capabilityId, registry.providers);
    return compileProviderFanToDiagram(capability, providers, { selectedId, focusId });
  }, [registry, capabilityId, selectedId, focusId]);

  return <IllustrationCanvas diagram={diagram} nodeSize={nodeSize} onSelectNode={onSelect} className={className} />;
}
