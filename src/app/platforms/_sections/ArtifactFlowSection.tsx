"use client";

import { useState } from "react";
import { PlatformFlowDiagram } from "@/platforms";
import { artifactFlowArchitecture } from "@/platforms/examples";
import { PreviewSection } from "../_components/preview-primitives";

/** Shows one artifact flowing between platforms, built on the Workflow Engine via compileFlowToWorkflow. */
export function ArtifactFlowSection() {
  const flow = artifactFlowArchitecture.flows?.[0];
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  if (!flow) return null;

  return (
    <PreviewSection
      id="artifact-flow"
      eyebrow="artifact flow"
      title="An artifact in motion"
      description="A creative brief becomes a listing, then a performance record. Each stage is tagged with the platform that owns it."
    >
      <div className="scrollbar-none overflow-x-auto">
        <PlatformFlowDiagram
          flow={flow}
          platforms={artifactFlowArchitecture.platforms}
          selectedStepId={selectedId}
          onSelectStep={(id) => setSelectedId((current) => (current === id ? undefined : id))}
        />
      </div>
    </PreviewSection>
  );
}
