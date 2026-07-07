"use client";

import { useState } from "react";
import { Caption } from "@/components/ui";
import { ValidationDiagram, ValidationLegend } from "@/production";
import { artworkValidation, productionPipeline, exportValidation } from "@/production/examples";
import { PreviewSection } from "../_components/preview-primitives";

const PIPELINES = [artworkValidation, productionPipeline, exportValidation];

function PipelineGalleryCard({ pipeline }: { pipeline: (typeof PIPELINES)[number] }) {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
      <div className="flex flex-col gap-1">
        <span className="text-body-md font-medium text-ink-primary">{pipeline.title}</span>
        {pipeline.description && <Caption className="text-ink-tertiary">{pipeline.description}</Caption>}
      </div>

      <div className="scrollbar-none overflow-x-auto">
        <ValidationDiagram
          pipeline={pipeline}
          selectedStageId={selectedId}
          onSelectStage={(id) => setSelectedId((current) => (current === id ? undefined : id))}
        />
      </div>

      <ValidationLegend statuses={pipeline.stages.map((stage) => stage.status ?? "pending")} />
    </div>
  );
}

/** Every stage-chain example, rendered through the same reusable ValidationDiagram. Click a stage to expand its rules. */
export function PipelineGallerySection() {
  return (
    <PreviewSection
      id="pipeline-gallery"
      eyebrow="pipeline gallery"
      title="Validation and production pipelines"
      description="Artwork validation, general production, and export validation, all rendered from data through the same ValidationDiagram. Click a stage to expand its rules."
    >
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        {PIPELINES.map((pipeline) => (
          <PipelineGalleryCard key={pipeline.id} pipeline={pipeline} />
        ))}
      </div>
    </PreviewSection>
  );
}
