"use client";

import { useState } from "react";
import { CapabilityFlowDiagram, ProviderDiagram } from "@/capabilities";
import { aiCapabilityLayer, aiCapabilityFlow } from "@/capabilities/examples";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

/** AI providers shown only as interchangeable implementations behind the Generation capability. */
export function AICapabilitySection() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <PreviewSection
      id="ai-capability"
      eyebrow="ai capability layer"
      title="Generation, provider-agnostic"
      description="StudioPOD depends on a Generation capability, never on a specific AI provider. OpenAI, Stability AI, and Midjourney are interchangeable spokes behind it."
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <DemoLabel>Flow</DemoLabel>
          <div className="scrollbar-none overflow-x-auto">
            <CapabilityFlowDiagram flow={aiCapabilityFlow} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <DemoLabel>Providers behind Generation</DemoLabel>
          <div className="scrollbar-none overflow-x-auto">
            <ProviderDiagram
              registry={aiCapabilityLayer}
              capabilityId="generation"
              selectedId={selectedId}
              onSelect={(id) => setSelectedId((current) => (current === id ? undefined : id))}
            />
          </div>
        </div>
      </div>
    </PreviewSection>
  );
}
