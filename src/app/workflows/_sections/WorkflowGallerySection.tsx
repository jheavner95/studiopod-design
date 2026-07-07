"use client";

import { useState } from "react";
import { Caption } from "@/components/ui";
import { WorkflowDiagram, WorkflowLegend, WorkflowStepDetails } from "@/workflows";
import { exampleWorkflows } from "@/workflows/examples";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

function WorkflowGalleryCard({ workflow }: { workflow: (typeof exampleWorkflows)[number] }) {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const selectedStep = workflow.steps.find((step) => step.id === selectedId);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-body-md font-medium text-ink-primary">{workflow.title}</span>
          {workflow.description && <Caption className="text-ink-tertiary">{workflow.description}</Caption>}
        </div>
        <DemoLabel>{workflow.pattern}</DemoLabel>
      </div>

      <div className="scrollbar-none overflow-x-auto">
        <WorkflowDiagram
          workflow={workflow}
          selectedStepId={selectedId}
          onSelectStep={(id) => setSelectedId((current) => (current === id ? undefined : id))}
        />
      </div>

      <WorkflowLegend workflow={workflow} onlyPresent />

      {selectedStep && <WorkflowStepDetails step={selectedStep} open />}
    </div>
  );
}

/** Every example workflow, rendered through the same reusable WorkflowDiagram, with click-to-select step details. */
export function WorkflowGallerySection() {
  return (
    <PreviewSection
      id="workflow-gallery"
      eyebrow="workflow gallery"
      title="All six workflows"
      description="Linear, looping, branching, and parallel patterns, all rendered from data through the same WorkflowDiagram component. Click a step to expand its details."
    >
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        {exampleWorkflows.map((workflow) => (
          <WorkflowGalleryCard key={workflow.id} workflow={workflow} />
        ))}
      </div>
    </PreviewSection>
  );
}
