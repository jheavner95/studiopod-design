"use client";

import { useState } from "react";
import { Caption } from "@/components/ui";
import { PlatformArchitectureDiagram, PlatformLegend, PlatformDetailsPanel } from "@/platforms";
import { exampleArchitectures } from "@/platforms/examples";
import { PreviewSection } from "../_components/preview-primitives";

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
