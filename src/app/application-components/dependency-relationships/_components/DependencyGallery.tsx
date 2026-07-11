"use client";

import { useState } from "react";
import { Card, Body, Button } from "@/components/ui";
import {
  DependencyGraph,
  DependencyNode,
  DependencyEdge,
  DependencyGroup,
  RelationshipView,
  RelationshipNode,
  RelationshipEdge,
  DependencyLegend,
  DependencySummary,
  DependencyFilters,
  DependencyInspector,
  DependencyActions,
  WorkflowHeader,
  WorkflowFooter,
  type DependencyStatusValue,
  type DependencyFilterValue,
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

function ArtworkDependenciesDemo() {
  const [selected, setSelected] = useState<string | null>(null);

  const nodes: { id: string; label: string; status: DependencyStatusValue }[] = [
    { id: "artwork", label: "Front print artwork", status: "healthy" },
    { id: "font", label: "Brand font", status: "connected" },
    { id: "logo", label: "Logo asset", status: "critical" },
  ];

  const node = nodes.find((n) => n.id === selected);

  return (
    <GalleryCard title="Artwork Dependencies" description="Click a node to inspect it — the Logo asset is missing.">
      <DependencyGraph header={<WorkflowHeader name="Tee shirt design #4821" type="Production" />}>
        {node ? (
          <DependencyInspector
            name={node.label}
            type="Production"
            status={node.status}
            properties={[{ id: "1", label: "Referenced by", value: "Front print artwork" }]}
            footer={
              <WorkflowFooter>
                <DependencyActions>
                  <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                    Back to graph
                  </Button>
                </DependencyActions>
              </WorkflowFooter>
            }
          />
        ) : (
          <div className="flex flex-col gap-1 p-2">
            {nodes.map((n, index) => (
              <div key={n.id}>
                <DependencyNode label={n.label} status={n.status} onClick={() => setSelected(n.id)} />
                {index < nodes.length - 1 ? <DependencyEdge orientation="vertical" direction="forward" status="complete" /> : null}
              </div>
            ))}
          </div>
        )}
      </DependencyGraph>
    </GalleryCard>
  );
}

function ProductionPipelineDemo() {
  return (
    <GalleryCard title="Production Pipeline" description="DependencyGroup clusters nodes that share a stage boundary.">
      <DependencyGraph header={<WorkflowHeader name="Batch render dependencies" type="Production" />}>
        <div className="flex flex-col gap-3 p-2">
          <DependencyGroup title="Validation stage" columns={2}>
            <DependencyNode label="Geometry check" status="healthy" />
            <DependencyNode label="Color profile" status="warning" />
          </DependencyGroup>
          <DependencyGroup title="Render stage" columns={2}>
            <DependencyNode label="GPU queue" status="connected" />
            <DependencyNode label="Output storage" status="blocked" />
          </DependencyGroup>
        </div>
      </DependencyGraph>
    </GalleryCard>
  );
}

function PublishingRelationshipsDemo() {
  return (
    <GalleryCard title="Publishing Relationships" description="RelationshipEdge defaults to bidirectional, unlike DependencyEdge's forward default.">
      <RelationshipView header={<WorkflowHeader name="Spring lookbook launch" type="Publishing" />}>
        <div className="flex items-start p-2">
          <RelationshipNode label="Publishing platform" status="connected" />
          <RelationshipEdge status="complete" label="syncs with" />
          <RelationshipNode label="Content CMS" status="healthy" />
        </div>
      </RelationshipView>
    </GalleryCard>
  );
}

function CommerceRelationshipsDemo() {
  return (
    <GalleryCard title="Commerce Relationships" description="DependencySummary aggregates node/edge counts alongside the graph.">
      <DependencyGraph header={<WorkflowHeader name="Store integration map" type="Commerce" />}>
        <div className="flex flex-col gap-4 p-2">
          <DependencySummary items={[{ value: "4", label: "Nodes" }, { value: "3", label: "Edges" }]} columns={2} />
          <div className="flex items-start">
            <RelationshipNode label="Storefront" status="connected" />
            <RelationshipEdge status="complete" />
            <RelationshipNode label="Payment provider" status="healthy" />
          </div>
        </div>
      </DependencyGraph>
    </GalleryCard>
  );
}

function PlatformDependenciesDemo() {
  const [filter, setFilter] = useState<DependencyFilterValue>("all");
  const nodes: { id: string; label: string; status: DependencyStatusValue }[] = [
    { id: "1", label: "Production", status: "healthy" },
    { id: "2", label: "Publishing", status: "connected" },
    { id: "3", label: "Commerce", status: "critical" },
    { id: "4", label: "Foundation", status: "circular" },
  ];
  const visible = filter === "all" ? nodes : nodes.filter((n) => n.status === filter);

  return (
    <GalleryCard title="Platform Dependencies" description="Filters are wired to real state — try narrowing to Critical or Circular.">
      <DependencyGraph
        header={
          <WorkflowHeader name="Platform architecture" type="Automation">
            <DependencyFilters value={filter} onChange={setFilter} options={["all", "healthy", "critical", "circular"]} />
          </WorkflowHeader>
        }
      >
        <div className="flex flex-col gap-1 p-2">
          <span className="text-caption text-ink-tertiary">Showing {visible.length} of {nodes.length}</span>
          {visible.map((n) => (
            <DependencyNode key={n.id} label={n.label} status={n.status} />
          ))}
        </div>
      </DependencyGraph>
    </GalleryCard>
  );
}

function CrossPlatformImpactDemo() {
  return (
    <GalleryCard title="Cross-platform Impact" description="DependencyInspector shows a node's own upstream/downstream properties.">
      <DependencyInspector
        name="Notifications capability"
        type="Automation"
        status="warning"
        properties={[
          { id: "1", label: "Depends on", value: "Foundation, Storage" },
          { id: "2", label: "Depended on by", value: "Publishing, Commerce" },
          { id: "3", label: "Impact if removed", value: "2 platforms affected" },
        ]}
      />
    </GalleryCard>
  );
}

function CircularDependencyDemo() {
  return (
    <GalleryCard title="Circular Dependency" description="Three nodes forming a cycle, plus DependencyLegend explaining every marker.">
      <DependencyGraph header={<WorkflowHeader name="Config resolution cycle" type="Automation" />}>
        <div className="flex flex-col gap-4 p-2">
          <div className="flex items-start">
            <DependencyNode label="Config A" status="circular" />
            <DependencyEdge status="complete" direction="forward" />
            <DependencyNode label="Config B" status="circular" />
            <DependencyEdge status="complete" direction="forward" />
            <DependencyNode label="Config C" status="circular" />
          </div>
          <DependencyLegend statuses={["circular", "connected", "critical"]} />
        </div>
      </DependencyGraph>
    </GalleryCard>
  );
}

function FilteredGraphDemo() {
  return (
    <GalleryCard title="Filtered Graph" description="Hidden nodes stay in the graph, struck through, rather than being removed.">
      <DependencyGraph header={<WorkflowHeader name="Asset library" type="Production" />}>
        <div className="flex flex-col gap-1 p-2">
          <DependencyNode label="Primary artwork" status="healthy" />
          <DependencyNode label="Archived draft v1" status="hidden" />
          <DependencyNode label="Archived draft v2" status="hidden" />
        </div>
      </DependencyGraph>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function DependencyGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ArtworkDependenciesDemo />
      <ProductionPipelineDemo />
      <PublishingRelationshipsDemo />
      <CommerceRelationshipsDemo />
      <PlatformDependenciesDemo />
      <CrossPlatformImpactDemo />
      <CircularDependencyDemo />
      <FilteredGraphDemo />
    </div>
  );
}
