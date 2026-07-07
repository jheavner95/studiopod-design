"use client";

import { useMemo } from "react";
import { IllustrationCanvas, type IllustrationNodeSize } from "@/illustrations";
import { compileRegistryToDiagram, scopeRegistryToCategory } from "../utils";
import type { CapabilityRegistry } from "../types";

export interface CommerceDiagramProps {
  registry: CapabilityRegistry;
  nodeSize?: IllustrationNodeSize;
  selectedId?: string;
  onSelect?: (id: string) => void;
  focusId?: string;
  className?: string;
}

/**
 * The commerce slice of a registry: whatever capabilities are tagged
 * "commerce" and every provider or relationship that touches them.
 * Contains no provider-specific rendering, Printify, Gelato, and Printful
 * only ever appear as data.
 */
export function CommerceDiagram({ registry, nodeSize, selectedId, onSelect, focusId, className }: CommerceDiagramProps) {
  const diagram = useMemo(() => {
    const scoped = scopeRegistryToCategory(registry, "commerce");
    return { ...compileRegistryToDiagram(scoped, { selectedId, focusId }), layout: "vertical" as const };
  }, [registry, selectedId, focusId]);

  return <IllustrationCanvas diagram={diagram} nodeSize={nodeSize} onSelectNode={onSelect} className={className} />;
}
