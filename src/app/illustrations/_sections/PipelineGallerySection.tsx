"use client";

import { useState } from "react";
import { Package, GitBranch, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui";
import { IllustrationPipeline, type DiagramNode, type DiagramPipeline } from "@/illustrations";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

const NODES: DiagramNode[] = [
  { id: "n1", label: "Stage 1", icon: <Package className="size-4" /> },
  { id: "n2a", label: "Stage 2a", icon: <GitBranch className="size-4" /> },
  { id: "n2b", label: "Stage 2b", icon: <GitBranch className="size-4" /> },
  { id: "n3", label: "Stage 3", icon: <CheckCircle2 className="size-4" /> },
];

const PIPELINE: DiagramPipeline = {
  id: "demo",
  stages: [
    { id: "s1", label: "Stage 1", nodeIds: ["n1"] },
    { id: "s2", label: "Stage 2", nodeIds: ["n2a", "n2b"] },
    { id: "s3", label: "Stage 3", nodeIds: ["n3"] },
  ],
};

const BRANCH_NODES: DiagramNode[] = [
  { id: "b1", label: "Start", status: "complete", icon: <Package className="size-4" /> },
  { id: "b2", label: "Path A", status: "active", icon: <GitBranch className="size-4" /> },
  { id: "b3", label: "Path B", status: "idle", icon: <GitBranch className="size-4" /> },
];

const BRANCH_PIPELINE: DiagramPipeline = {
  id: "branching",
  stages: [
    { id: "bs1", label: "Start", nodeIds: ["b1"], next: ["bs2", "bs3"] },
    { id: "bs2", label: "Path A", nodeIds: ["b2"] },
    { id: "bs3", label: "Path B", nodeIds: ["b3"] },
  ],
};

const LOOP_NODES: DiagramNode[] = [
  { id: "l1", label: "A", status: "complete", icon: <Package className="size-4" /> },
  { id: "l2", label: "B", status: "active", icon: <Package className="size-4" /> },
  { id: "l3", label: "C", status: "idle", icon: <Package className="size-4" /> },
];

const LOOP_PIPELINE: DiagramPipeline = {
  id: "loop",
  stages: [
    { id: "ls1", label: "A", nodeIds: ["l1"] },
    { id: "ls2", label: "B", nodeIds: ["l2"] },
    { id: "ls3", label: "C", nodeIds: ["l3"] },
  ],
  loop: true,
};

const PROGRESS_STEPS = [0, 0.33, 0.66, 1];

/**
 * A deliberately abstract pipeline — "Stage 1/2a/2b/3", not StudioPOD's
 * real workflow. That comes later; this section only proves ordered,
 * parallel, branching, looping, and progress-driven stages all compile
 * to a Diagram correctly.
 */
export function PipelineGallerySection() {
  const [progress, setProgress] = useState(0.33);

  return (
    <PreviewSection
      id="pipeline-gallery"
      eyebrow="pipeline gallery"
      title="IllustrationPipeline"
      description="Ordered stages, a parallel stage, branching, and a loop, each compiled to a plain Diagram and rendered through IllustrationCanvas. No custom rendering logic anywhere."
    >
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <DemoLabel>Ordered + parallel, driven by progress</DemoLabel>
          <div className="flex flex-wrap items-center gap-2">
            {PROGRESS_STEPS.map((value) => (
              <Button
                key={value}
                size="sm"
                variant={progress === value ? "primary" : "secondary"}
                onClick={() => setProgress(value)}
              >
                {Math.round(value * 100)}%
              </Button>
            ))}
          </div>
          <IllustrationPipeline pipeline={{ ...PIPELINE, progress }} nodes={NODES} />
        </div>

        <div className="flex flex-col gap-4">
          <DemoLabel>Branching (one stage, two next stages)</DemoLabel>
          <IllustrationPipeline pipeline={BRANCH_PIPELINE} nodes={BRANCH_NODES} />
        </div>

        <div className="flex flex-col gap-4">
          <DemoLabel>Loop (final stage connects back to the first)</DemoLabel>
          <IllustrationPipeline pipeline={LOOP_PIPELINE} nodes={LOOP_NODES} />
        </div>
      </div>
    </PreviewSection>
  );
}
