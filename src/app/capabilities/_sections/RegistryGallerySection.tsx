"use client";

import { useState } from "react";
import { Caption } from "@/components/ui";
import { CapabilityRegistryDiagram, CapabilityDetails, ProviderLegend } from "@/capabilities";
import { exampleRegistries } from "@/capabilities/examples";
import type { DiagramLayoutKind } from "@/illustrations";
import { PreviewSection } from "../_components/preview-primitives";

/**
 * These three registries are all literally one capability implemented by
 * a handful of providers, the exact shape hub-and-spoke layout exists
 * for. The default "grid" folds them into an awkward square instead.
 *
 * "capability-registry" groups its nine nodes into three same-size
 * clusters (see its `groups`). Grid's column count is derived from
 * container width, not group size, so at some widths a group's members
 * wrap across a row boundary and its bounding box collides with its
 * neighbor's. A single row keeps every group contiguous at any width.
 */
const LAYOUT_HINTS: Partial<Record<string, DiagramLayoutKind>> = {
  "ai-capability-layer": "hub-and-spoke",
  "publishing-capability": "hub-and-spoke",
  "commerce-capability": "hub-and-spoke",
  "capability-registry": "horizontal",
};

function RegistryGalleryCard({ registry }: { registry: (typeof exampleRegistries)[number] }) {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const selectedCapability = registry.capabilities.find((capability) => capability.id === selectedId);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
      <div className="flex flex-col gap-1">
        <span className="text-body-md font-medium text-ink-primary">{registry.title}</span>
        {registry.description && <Caption className="text-ink-tertiary">{registry.description}</Caption>}
      </div>

      <div className="scrollbar-none overflow-x-auto">
        <CapabilityRegistryDiagram
          registry={registry}
          layout={LAYOUT_HINTS[registry.id]}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId((current) => (current === id ? undefined : id))}
        />
      </div>

      <ProviderLegend />

      {selectedCapability && <CapabilityDetails capability={selectedCapability} registry={registry} open />}
    </div>
  );
}

/** Every example registry, rendered through the same reusable CapabilityRegistryDiagram. Click a capability to expand its providers and adapters. */
export function RegistryGallerySection() {
  return (
    <PreviewSection
      id="registry-gallery"
      eyebrow="registry gallery"
      title="Every capability example"
      description="AI, publishing, commerce, and the complete architecture, all rendered from data through the same CapabilityRegistryDiagram. Click a capability to expand its providers."
    >
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        {exampleRegistries.map((registry) => (
          <RegistryGalleryCard key={registry.id} registry={registry} />
        ))}
      </div>
    </PreviewSection>
  );
}
