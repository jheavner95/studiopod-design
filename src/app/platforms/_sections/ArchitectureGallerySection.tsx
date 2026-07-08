"use client";

import { useState } from "react";
import { Caption } from "@/components/ui";
import { PlatformArchitectureDiagram, PlatformLegend, PlatformDetailsPanel } from "@/platforms";
import { exampleArchitectures } from "@/platforms/examples";
import type { DiagramLayoutKind } from "@/illustrations";
import { PreviewSection } from "../_components/preview-primitives";

/**
 * The default "grid" layout packs a small architecture into a square,
 * which works well for a flat set of peers but folds a hub-style or
 * looping relationship into an awkward 2x2 that crowds edge labels near
 * adjacent nodes. These read better as a single row: it also keeps each
 * PlatformLayer's members contiguous, which the grid layout doesn't
 * guarantee (a layer's bounding box is only as good as whether its nodes
 * happen to land in a contiguous block of the grid, and complete
 * architecture's 1/5/1 split does not).
 */
const LAYOUT_HINTS: Partial<Record<string, DiagramLayoutKind>> = {
  "platform-layers": "horizontal",
  "intelligence-platform": "horizontal",
  "complete-architecture": "horizontal",
  // A dense, fully-connected dependency graph: grid wraps it into rows at
  // narrower widths, and a straight edge between two nodes in different
  // rows can cut right through an unrelated node in between (its label
  // sits mid-diagonal, not off to a clear side). PlatformRelationshipMap
  // already renders this same architecture radially elsewhere on this
  // page for exactly this "no single directional flow" shape.
  "platform-dependency-view": "radial",
};

function ArchitectureGalleryCard({ architecture }: { architecture: (typeof exampleArchitectures)[number] }) {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const selectedPlatform = architecture.platforms.find((platform) => platform.id === selectedId);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
      <div className="flex flex-col gap-1">
        <span className="text-body-md font-medium text-ink-primary">{architecture.title}</span>
        {architecture.description && <Caption className="text-ink-tertiary">{architecture.description}</Caption>}
      </div>

      <div className="scrollbar-none overflow-x-auto">
        <PlatformArchitectureDiagram
          architecture={architecture}
          layout={LAYOUT_HINTS[architecture.id]}
          selectedPlatformId={selectedId}
          onSelectPlatform={(id) => setSelectedId((current) => (current === id ? undefined : id))}
        />
      </div>

      <PlatformLegend architecture={architecture} onlyPresent />

      {selectedPlatform && (
        <PlatformDetailsPanel platform={selectedPlatform} architecture={architecture} open />
      )}
    </div>
  );
}

/** Every example architecture, rendered through the same reusable PlatformArchitectureDiagram, with click-to-select platform details. */
export function ArchitectureGallerySection() {
  return (
    <PreviewSection
      id="architecture-gallery"
      eyebrow="architecture gallery"
      title="All six architectures"
      description="Layered, flat, looping, and dependency-graph structures, all rendered from data through the same PlatformArchitectureDiagram. Click a platform to expand its details."
    >
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        {exampleArchitectures.map((architecture) => (
          <ArchitectureGalleryCard key={architecture.id} architecture={architecture} />
        ))}
      </div>
    </PreviewSection>
  );
}
