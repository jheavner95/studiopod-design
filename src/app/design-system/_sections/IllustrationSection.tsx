import { Database, GitBranch, Package, Workflow } from "lucide-react";
import { Caption, SurfacePanel } from "@/components/ui";
import {
  AnimatedNode,
  AnimatedConnector,
  PipelineStep,
  StatusIndicator,
  FlowCard,
  SystemGrid,
  ProgressRail,
} from "@/components/illustration";
import { PreviewSection } from "../_components/preview-primitives";

export function IllustrationSection() {
  return (
    <PreviewSection
      id="illustration"
      eyebrow="illustration"
      title="Illustration primitives"
      description="The vocabulary for showing StudioPOD as a running system: nodes, connectors, steps, and rails. Shown individually, then composed."
    >
      <div className="flex flex-col gap-12">
        <div>
          <Caption className="mb-4">AnimatedNode, by status</Caption>
          <div className="flex flex-wrap items-center gap-8">
            {(["idle", "active", "success", "warning", "error"] as const).map((status) => (
              <div key={status} className="flex flex-col items-center gap-2">
                <AnimatedNode status={status} icon={<Package className="size-4" />} />
                <Caption>{status}</Caption>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Caption className="mb-4">AnimatedConnector</Caption>
          <div className="flex items-center gap-1">
            <AnimatedNode status="success" size="sm" />
            <AnimatedConnector active length={80} />
            <AnimatedNode status="active" size="sm" />
            <AnimatedConnector length={80} />
            <AnimatedNode status="idle" size="sm" />
          </div>
        </div>

        <div>
          <Caption className="mb-4">PipelineStep row</Caption>
          <div className="scrollbar-none overflow-x-auto">
            <div className="flex w-max items-start justify-center gap-2 px-1 sm:w-full">
              <PipelineStep index={1} label="Order received" status="success" />
              <div className="pt-4">
                <AnimatedConnector active length={56} />
              </div>
              <PipelineStep index={2} label="In production" status="active" />
              <div className="pt-4">
                <AnimatedConnector length={56} />
              </div>
              <PipelineStep index={3} label="Quality check" status="idle" />
              <div className="pt-4">
                <AnimatedConnector length={56} />
              </div>
              <PipelineStep index={4} label="Shipped" status="idle" />
            </div>
          </div>
        </div>

        <div>
          <Caption className="mb-4">StatusIndicator</Caption>
          <div className="flex flex-wrap gap-6">
            <StatusIndicator status="idle" />
            <StatusIndicator status="active" />
            <StatusIndicator status="success" />
            <StatusIndicator status="warning" />
            <StatusIndicator status="error" />
          </div>
        </div>

        <div>
          <Caption className="mb-4">FlowCard</Caption>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FlowCard icon={<Database className="size-4" />} title="Raw materials" description="Synced from vendor feed" status="success" />
            <FlowCard icon={<Workflow className="size-4" />} title="Assembly line 2" description="4 orders in progress" status="active" />
            <FlowCard icon={<GitBranch className="size-4" />} title="Quality routing" description="Waiting on line 2" status="idle" />
          </div>
        </div>

        <div>
          <Caption className="mb-4">ProgressRail</Caption>
          <ProgressRail
            className="max-w-2xl"
            steps={[
              { label: "Received", status: "success" },
              { label: "Production", status: "success" },
              { label: "QA", status: "active" },
              { label: "Packed", status: "idle" },
              { label: "Shipped", status: "idle" },
            ]}
          />
        </div>

        <div>
          <Caption className="mb-4">SystemGrid</Caption>
          <div className="relative h-40 overflow-hidden rounded-lg border border-border-subtle bg-canvas">
            <SystemGrid />
          </div>
        </div>

        <div>
          <Caption className="mb-4">Combined: a small system, composed entirely from the primitives above</Caption>
          <SurfacePanel elevated className="relative overflow-hidden">
            <SystemGrid glow={false} />
            <div className="relative flex flex-col gap-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FlowCard icon={<Database className="size-4" />} title="Inventory sync" description="Every 5 minutes" status="success" />
                <FlowCard icon={<Workflow className="size-4" />} title="Production queue" description="12 active orders" status="active" />
                <FlowCard icon={<GitBranch className="size-4" />} title="Fulfillment" description="Awaiting queue" status="idle" />
              </div>
              <ProgressRail
                steps={[
                  { label: "Ordered", status: "success" },
                  { label: "Queued", status: "success" },
                  { label: "Producing", status: "active" },
                  { label: "Packed", status: "idle" },
                  { label: "Shipped", status: "idle" },
                ]}
              />
            </div>
          </SurfacePanel>
        </div>
      </div>
    </PreviewSection>
  );
}
