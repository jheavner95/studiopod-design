"use client";

import { useState } from "react";
import { AdapterDiagram, ProviderLegend, ProviderCard } from "@/capabilities";
import { capabilityRegistry } from "@/capabilities/examples";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

/** The adapter layer, isolated: every provider's current health and availability, independent of the higher-level capability relationships. */
export function RegistryHealthSection() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <PreviewSection
      id="registry-health"
      eyebrow="capability registry"
      title="Interchangeable adapters, health, and availability"
      description="Gelato is offline right now: AdapterDiagram shows it dimmed while the rest of the registry stays healthy."
    >
      <div className="flex flex-col gap-6">
        <div className="scrollbar-none overflow-x-auto">
          <AdapterDiagram
            registry={capabilityRegistry}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId((current) => (current === id ? undefined : id))}
          />
        </div>

        <ProviderLegend />

        <div className="flex flex-col gap-3">
          <DemoLabel>Provider cards</DemoLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilityRegistry.providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </div>
    </PreviewSection>
  );
}
