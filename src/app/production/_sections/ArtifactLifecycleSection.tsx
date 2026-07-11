"use client";

import { useState } from "react";
import { CardGrid } from "@/components/layout";
import { ArtifactLifecycleDiagram, ArtifactCard } from "@/production";
import { artifactLifecycle } from "@/production/examples";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

/** An artifact's lifecycle, built on the Workflow Engine via compileArtifactsToWorkflow, plus a card per stage. */
export function ArtifactLifecycleSection() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <PreviewSection
      id="artifact-lifecycle"
      eyebrow="artifact lifecycle"
      title="An artifact in motion"
      description="A creative brief becomes a listing, then a performance record, tracked by version and health at every stage."
    >
      <div className="flex flex-col gap-8">
        <div className="scrollbar-none overflow-x-auto">
          <ArtifactLifecycleDiagram
            artifacts={artifactLifecycle}
            selectedArtifactId={selectedId}
            onSelectArtifact={(id) => setSelectedId((current) => (current === id ? undefined : id))}
          />
        </div>

        <div className="flex flex-col gap-3">
          <DemoLabel>Artifact cards</DemoLabel>
          <CardGrid columns={3} gap="sm">
            {artifactLifecycle.map((artifact) => (
              <ArtifactCard key={artifact.id} artifact={artifact} />
            ))}
          </CardGrid>
        </div>
      </div>
    </PreviewSection>
  );
}
