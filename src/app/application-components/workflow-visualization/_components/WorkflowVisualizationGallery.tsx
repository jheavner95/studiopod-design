"use client";

import { useState } from "react";
import { Card, Body, Button } from "@/components/ui";
import {
  WorkflowCanvas,
  WorkflowViewport,
  WorkflowMiniMap,
  WorkflowNode,
  WorkflowEdge,
  WorkflowGroup,
  WorkflowSelection,
  useWorkflowSelection,
  WorkflowToolbar,
  WorkflowInspector,
  WorkflowLegend,
  WorkflowOverview,
  WorkflowControls,
  WorkflowHeader,
  WorkflowFooter,
  WorkflowActions,
  type WorkflowNodeStatus,
} from "@/components/workflow";

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

function ProductionWorkflowDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  const nodes: { id: string; label: string; status: WorkflowNodeStatus }[] = [
    { id: "brief", label: "Creative brief", status: "completed" },
    { id: "render", label: "Batch render", status: "running" },
    { id: "qa", label: "Quality gate", status: "idle" },
  ];
  const node = nodes.find((n) => n.id === selected);

  return (
    <GalleryCard title="Production Workflow" description="Click a node to inspect it — a real WorkflowToolbar sits above the viewport.">
      <WorkflowCanvas header={<WorkflowHeader name="Batch render #204" type="Production" />}>
        {node ? (
          <WorkflowInspector
            name={node.label}
            type="Production"
            status={node.status}
            properties={[{ id: "1", label: "Stage", value: "2 of 3" }]}
            footer={
              <WorkflowFooter>
                <WorkflowActions>
                  <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                    Back to canvas
                  </Button>
                </WorkflowActions>
              </WorkflowFooter>
            }
          />
        ) : (
          <div className="flex flex-col gap-2 p-2">
            <WorkflowToolbar>
              <Button variant="ghost" size="sm">
                Refresh
              </Button>
            </WorkflowToolbar>
            <WorkflowViewport maxHeight="280px">
              <div className="flex flex-col gap-1">
                {nodes.map((n, index) => (
                  <div key={n.id}>
                    <WorkflowNode label={n.label} status={n.status} onClick={() => setSelected(n.id)} />
                    {index < nodes.length - 1 ? <WorkflowEdge orientation="vertical" direction="forward" status="complete" /> : null}
                  </div>
                ))}
              </div>
            </WorkflowViewport>
          </div>
        )}
      </WorkflowCanvas>
    </GalleryCard>
  );
}

function PublishingWorkflowDemo() {
  return (
    <GalleryCard title="Publishing Workflow" description="A running/paused sequence, with WorkflowOverview summarizing node counts above the canvas.">
      <WorkflowCanvas header={<WorkflowHeader name="Spring lookbook launch" type="Publishing" />}>
        <div className="flex flex-col gap-4 p-2">
          <WorkflowOverview
            items={[
              { value: "1", label: "Running" },
              { value: "1", label: "Paused" },
              { value: "1", label: "Idle" },
            ]}
            columns={3}
          />
          <WorkflowViewport maxHeight="200px">
            <div className="flex items-start">
              <WorkflowNode label="Draft copy" status="completed" />
              <WorkflowEdge status="complete" direction="forward" />
              <WorkflowNode label="Review" status="paused" />
              <WorkflowEdge status="active" direction="forward" />
              <WorkflowNode label="Schedule" status="idle" />
            </div>
          </WorkflowViewport>
        </div>
      </WorkflowCanvas>
    </GalleryCard>
  );
}

function CommerceWorkflowDemo() {
  return (
    <GalleryCard title="Commerce Workflow" description="WorkflowGroup clusters nodes that share a stage boundary, plus WorkflowMiniMap's compact preview strip.">
      <WorkflowCanvas header={<WorkflowHeader name="Order fulfillment" type="Commerce" />}>
        <div className="flex flex-col gap-3 p-2">
          <WorkflowGroup title="Payment stage" columns={2}>
            <WorkflowNode label="Authorize" status="completed" />
            <WorkflowNode label="Capture" status="running" />
          </WorkflowGroup>
          <WorkflowGroup title="Fulfillment stage" columns={2}>
            <WorkflowNode label="Pick & pack" status="idle" />
            <WorkflowNode label="Ship" status="idle" />
          </WorkflowGroup>
          <WorkflowMiniMap
            nodes={[
              { id: "1", label: "Authorize", status: "completed" },
              { id: "2", label: "Capture", status: "running" },
              { id: "3", label: "Pick & pack", status: "idle" },
              { id: "4", label: "Ship", status: "idle" },
            ]}
          />
        </div>
      </WorkflowCanvas>
    </GalleryCard>
  );
}

function DependencyGraphDemo() {
  return (
    <GalleryCard title="Dependency Graph" description="WorkflowEdge and WorkflowGroup are re-exports of Dependency & Relationship Views' own components.">
      <WorkflowCanvas header={<WorkflowHeader name="Asset dependency check" type="Production" />}>
        <WorkflowGroup title="Referenced assets" columns={1} className="m-2">
          <div className="flex items-start">
            <WorkflowNode label="Front artwork" status="completed" />
            <WorkflowEdge status="complete" direction="backward" label="depends on" />
            <WorkflowNode label="Brand font" status="blocked" />
          </div>
        </WorkflowGroup>
      </WorkflowCanvas>
    </GalleryCard>
  );
}

function PipelineViewDemo() {
  return (
    <GalleryCard title="Pipeline View" description="A linear run of nodes with WorkflowControls' inert zoom/fit buttons shown above.">
      <WorkflowCanvas header={<WorkflowHeader name="Validation pipeline" type="Production" />}>
        <div className="flex flex-col gap-3 p-2">
          <WorkflowControls />
          <div className="flex items-start">
            <WorkflowNode label="Ingest" status="completed" />
            <WorkflowEdge status="complete" direction="forward" />
            <WorkflowNode label="Validate" status="running" />
            <WorkflowEdge status="pending" direction="forward" />
            <WorkflowNode label="Publish" status="idle" />
          </div>
        </div>
      </WorkflowCanvas>
    </GalleryCard>
  );
}

function StateMachineViewDemo() {
  return (
    <GalleryCard title="State Machine View" description="Blocked and failed nodes, plus WorkflowLegend explaining every marker.">
      <WorkflowCanvas header={<WorkflowHeader name="Order state machine" type="Commerce" />}>
        <div className="flex flex-col gap-4 p-2">
          <div className="flex items-start">
            <WorkflowNode label="Placed" status="completed" />
            <WorkflowEdge status="complete" direction="forward" />
            <WorkflowNode label="Payment failed" status="failed" />
            <WorkflowEdge status="pending" direction="forward" />
            <WorkflowNode label="Retry" status="blocked" />
          </div>
          <WorkflowLegend statuses={["completed", "failed", "blocked"]} />
        </div>
      </WorkflowCanvas>
    </GalleryCard>
  );
}

function CrossPlatformWorkflowDemo() {
  return (
    <GalleryCard title="Cross-platform Workflow" description="WorkflowOverview aggregating node counts across platforms, with a legend beneath it.">
      <WorkflowCanvas header={<WorkflowHeader name="Cross-platform sync" type="Automation" />}>
        <div className="p-2">
          <WorkflowOverview
            title="Sync status"
            description="Nodes across Production, Publishing, and Commerce."
            items={[
              { value: "3", label: "Completed" },
              { value: "2", label: "Running" },
              { value: "1", label: "Blocked" },
            ]}
          >
            <WorkflowLegend statuses={["completed", "running", "blocked"]} />
          </WorkflowOverview>
        </div>
      </WorkflowCanvas>
    </GalleryCard>
  );
}

function LargeWorkflowDemo() {
  const { selectedIds, setSelectedIds, clear } = useWorkflowSelection();
  const nodes: { id: string; label: string; status: WorkflowNodeStatus }[] = Array.from({ length: 8 }, (_, i) => ({
    id: `n${i}`,
    label: `Node ${i + 1}`,
    status: i % 3 === 0 ? "completed" : i % 3 === 1 ? "running" : "idle",
  }));

  function toggle(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  return (
    <GalleryCard title="Large Workflow" description="Eight nodes with real multi-select — click several, then use the bulk bar's Clear.">
      <WorkflowCanvas header={<WorkflowHeader name="Large batch" type="Production" />}>
        <div className="flex flex-col gap-2 p-2">
          <WorkflowSelection count={selectedIds.size} onClear={clear}>
            <Button variant="secondary" size="sm">
              Archive
            </Button>
          </WorkflowSelection>
          <WorkflowViewport maxHeight="280px">
            <div className="grid grid-cols-2 gap-1">
              {nodes.map((n) => (
                <WorkflowNode key={n.id} label={n.label} status={n.status} selected={selectedIds.has(n.id)} onClick={() => toggle(n.id)} />
              ))}
            </div>
          </WorkflowViewport>
        </div>
      </WorkflowCanvas>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function WorkflowVisualizationGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ProductionWorkflowDemo />
      <PublishingWorkflowDemo />
      <CommerceWorkflowDemo />
      <DependencyGraphDemo />
      <PipelineViewDemo />
      <StateMachineViewDemo />
      <CrossPlatformWorkflowDemo />
      <LargeWorkflowDemo />
    </div>
  );
}
