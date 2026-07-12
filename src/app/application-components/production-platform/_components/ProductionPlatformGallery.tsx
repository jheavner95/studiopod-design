"use client";

import { useState } from "react";
import { Card, Body, Button } from "@/components/ui";
import {
  ProductionWorkspace,
  ProductionHeader,
  ProductionCanvas,
  ProductionStagePanel,
  ProductionInspector,
  ProductionPipeline,
  ProductionQueue,
  ProductionValidationPanel,
  ProductionMetrics,
  ProductionSummary,
  ProductionActions,
} from "@/components/platform/production";
import {
  WorkflowFooter,
  WorkflowNode,
  WorkflowStep,
  DependencyNode,
  DependencyEdge,
  type WorkflowNodeStatus,
  type DependencyStatusValue,
} from "@/components/workflow";
import type { QueueRowJob } from "@/components/operational";

function GalleryCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">{title}</span>
      <Body size="sm" muted>
        {description}
      </Body>
      <div className="h-[440px] overflow-hidden rounded-lg border border-border-subtle">{children}</div>
    </Card>
  );
}

function ArtworkProductionDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  const nodes: { id: string; label: string; status: DependencyStatusValue }[] = [
    { id: "artwork", label: "Front print artwork", status: "healthy" },
    { id: "font", label: "Brand font", status: "connected" },
    { id: "logo", label: "Logo asset", status: "critical" },
  ];
  const node = nodes.find((n) => n.id === selected);

  return (
    <GalleryCard title="Artwork Production" description="Click a node to inspect it — the same click-to-inspect pattern every Inspector in this tier already uses.">
      <ProductionWorkspace header={<ProductionHeader name="Tee shirt design #4821" type="Production" />}>
        {node ? (
          <ProductionInspector
            name={node.label}
            type="Production"
            status="active"
            properties={[{ id: "1", label: "Referenced by", value: "Front print artwork" }]}
            footer={
              <WorkflowFooter>
                <ProductionActions>
                  <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                    Back to canvas
                  </Button>
                </ProductionActions>
              </WorkflowFooter>
            }
          />
        ) : (
          <ProductionCanvas maxHeight="380px">
            <div className="flex flex-col gap-1 p-2">
              {nodes.map((n, index) => (
                <div key={n.id}>
                  <DependencyNode label={n.label} status={n.status} onClick={() => setSelected(n.id)} />
                  {index < nodes.length - 1 ? <DependencyEdge orientation="vertical" direction="forward" status="complete" /> : null}
                </div>
              ))}
            </div>
          </ProductionCanvas>
        )}
      </ProductionWorkspace>
    </GalleryCard>
  );
}

function AIGenerationDemo() {
  const nodes: { id: string; label: string; status: WorkflowNodeStatus }[] = [
    { id: "prompt", label: "Prompt submitted", status: "completed" },
    { id: "generate", label: "Generating variants", status: "running" },
    { id: "review", label: "Awaiting review", status: "idle" },
  ];
  return (
    <GalleryCard title="AI Generation" description="A themed demo only — no real generation integration exists anywhere in the repo yet.">
      <ProductionWorkspace header={<ProductionHeader name="Summer collection artwork" type="Production" />}>
        <ProductionCanvas maxHeight="380px">
          <div className="flex flex-col gap-1 p-2">
            {nodes.map((n) => (
              <WorkflowNode key={n.id} label={n.label} status={n.status} />
            ))}
          </div>
        </ProductionCanvas>
      </ProductionWorkspace>
    </GalleryCard>
  );
}

function ValidationWorkflowDemo() {
  return (
    <GalleryCard title="Validation Workflow" description={'ProductionValidationPanel renders whatever ApprovalStateValue the caller supplies — "Validated" is the approved outcome.'}>
      <ProductionWorkspace header={<ProductionHeader name="Poster proof #118" type="Production" />}>
        <div className="flex flex-col gap-4 p-2">
          <ProductionValidationPanel title="Color profile gate" status="approved" reason="CMYK profile matches print spec." actor="QA bot" timestamp="2 min ago" />
          <ProductionValidationPanel title="Bleed & safe zone gate" status="rejected" reason="Text crosses the safe-zone boundary." actor="QA bot" timestamp="1 min ago" />
        </div>
      </ProductionWorkspace>
    </GalleryCard>
  );
}

function BatchProductionDemo() {
  return (
    <GalleryCard title="Batch Production" description="ProductionPipeline composing ProductionStagePanel — the caller arranges stage content, the shell doesn't.">
      <ProductionPipeline header={<ProductionHeader name="Batch run #204" type="Production" />}>
        <div className="flex flex-col gap-3 p-2">
          <ProductionStagePanel title="Proofing" status="completed">
            <WorkflowStep label="Design proof approved" status="completed" />
          </ProductionStagePanel>
          <ProductionStagePanel title="Printing" status="running">
            <WorkflowStep label="Batch #204 on press" status="running" />
          </ProductionStagePanel>
          <ProductionStagePanel title="Quality check" status="waiting">
            <WorkflowStep label="Awaiting QA bot" status="waiting" />
          </ProductionStagePanel>
          <ProductionStagePanel title="Shipped" status="not-started">
            <WorkflowStep label="Not yet dispatched" status="not-started" />
          </ProductionStagePanel>
        </div>
      </ProductionPipeline>
    </GalleryCard>
  );
}

function QueueMonitoringDemo() {
  const jobs: QueueRowJob[] = [
    { id: "1", name: "Print job — Poster A", status: "running", priority: "high", progress: { processed: 6, total: 10 } },
    { id: "2", name: "Print job — Poster B", status: "queued", priority: "normal" },
    { id: "3", name: "Print job — Banner C", status: "blocked", priority: "low" },
  ];
  return (
    <GalleryCard title="Queue Monitoring" description="ProductionQueue is Operational's own Queue, re-exported — real job rows, not a mock table.">
      <div className="h-full overflow-y-auto p-2">
        <ProductionQueue title="Render queue" caption="3 jobs" jobs={jobs} />
      </div>
    </GalleryCard>
  );
}

function ProductionDashboardDemo() {
  return (
    <GalleryCard title="Production Dashboard" description="ProductionSummary (overview row) and ProductionMetrics (measured numbers) composed together.">
      <ProductionWorkspace header={<ProductionHeader name="This week's production" type="Production" />}>
        <div className="flex flex-col gap-4 p-2">
          <ProductionSummary items={[{ value: "42", label: "Jobs completed" }, { value: "3", label: "Blocked" }]} columns={2} />
          <ProductionMetrics items={[{ value: "94%", label: "First-pass yield" }, { value: "6.2h", label: "Avg. cycle time" }]} columns={2} />
        </div>
      </ProductionWorkspace>
    </GalleryCard>
  );
}

function ProductionReviewDemo() {
  return (
    <GalleryCard title="Production Review" description="ProductionInspector showing a completed artifact's own lifecycle detail.">
      <ProductionInspector
        name="Poster proof #118"
        type="Production"
        status="completed"
        properties={[
          { id: "1", label: "Stage", value: "3 of 3" },
          { id: "2", label: "Validated by", value: "QA bot" },
        ]}
      />
    </GalleryCard>
  );
}

function CompletedProductionDemo() {
  return (
    <GalleryCard title="Completed Production" description="Every stage complete, ProductionActions available in the footer.">
      <ProductionWorkspace
        header={<ProductionHeader name="Batch run #198" type="Production" />}
        footer={
          <WorkflowFooter>
            <ProductionActions>
              <Button variant="secondary" size="sm">
                Archive
              </Button>
            </ProductionActions>
          </WorkflowFooter>
        }
      >
        <div className="flex flex-col gap-3 p-2">
          <ProductionStagePanel title="Proofing" status="completed">
            <WorkflowStep label="Design proof approved" status="completed" />
          </ProductionStagePanel>
          <ProductionStagePanel title="Printing" status="completed">
            <WorkflowStep label="Batch #198 printed" status="completed" />
          </ProductionStagePanel>
          <ProductionStagePanel title="Shipped" status="completed">
            <WorkflowStep label="Dispatched to carrier" status="completed" />
          </ProductionStagePanel>
        </div>
      </ProductionWorkspace>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function ProductionPlatformGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ArtworkProductionDemo />
      <AIGenerationDemo />
      <ValidationWorkflowDemo />
      <BatchProductionDemo />
      <QueueMonitoringDemo />
      <ProductionDashboardDemo />
      <ProductionReviewDemo />
      <CompletedProductionDemo />
    </div>
  );
}
