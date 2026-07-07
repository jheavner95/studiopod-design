"use client";

import { useState } from "react";
import { PlatformRelationshipMap, PlatformLegend, PlatformDetailsPanel } from "@/platforms";
import { platformDependencyView } from "@/platforms/examples";
import { PreviewSection } from "../_components/preview-primitives";

/** A dependency-only view: platform status is ignored, so the diagram emphasizes purely how platforms relate to each other. */
export function DependencyViewSection() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const selectedPlatform = platformDependencyView.platforms.find((platform) => platform.id === selectedId);

  return (
    <PreviewSection
      id="dependency-view"
      eyebrow="dependency view"
      title="Platform dependency graph"
      description="No workflow emphasis, just the fan-in and fan-out between platforms: Foundation underpins everything, Intelligence learns from everything."
    >
      <div className="flex flex-col gap-6">
        <div className="scrollbar-none overflow-x-auto">
          <PlatformRelationshipMap
            architecture={platformDependencyView}
            selectedPlatformId={selectedId}
            onSelectPlatform={(id) => setSelectedId((current) => (current === id ? undefined : id))}
          />
        </div>
        <PlatformLegend architecture={platformDependencyView} onlyPresent />
        {selectedPlatform && (
          <PlatformDetailsPanel platform={selectedPlatform} architecture={platformDependencyView} open />
        )}
      </div>
    </PreviewSection>
  );
}
