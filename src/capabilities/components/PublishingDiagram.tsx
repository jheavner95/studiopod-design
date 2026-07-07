"use client";

import { useMemo } from "react";
import { IllustrationCanvas, type IllustrationNodeSize } from "@/illustrations";
import { compileRegistryToDiagram, scopeRegistryToCategory } from "../utils";
import type { CapabilityRegistry } from "../types";

export interface PublishingDiagramProps {
  registry: CapabilityRegistry;
  nodeSize?: IllustrationNodeSize;
  selectedId?: string;
  onSelect?: (id: string) => void;
  focusId?: string;
  className?: string;
}

/**
 * The publishing slice of a registry: whatever capabilities are tagged
 * "publishing" and every provider or relationship that touches them.
 * Contains no provider-specific rendering, WordPress and Shopify only
 * ever appear as data.
 */
export function PublishingDiagram({ registry, nodeSize, selectedId, onSelect, focusId, className }: PublishingDiagramProps) {
  const diagram = useMemo(() => {
    const scoped = scopeRegistryToCategory(registry, "publishing");
    return { ...compileRegistryToDiagram(scoped, { selectedId, focusId }), layout: "vertical" as const };
  }, [registry, selectedId, focusId]);

  return <IllustrationCanvas diagram={diagram} nodeSize={nodeSize} onSelectNode={onSelect} className={className} />;
}
