import { Database, Workflow, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui";
import type { NodeStatus } from "@/illustrations";
import { PreviewSection, NodeDemo } from "../_components/preview-primitives";

const STATUSES: NodeStatus[] = ["idle", "active", "processing", "complete", "warning", "error"];

export function NodeGallerySection() {
  return (
    <PreviewSection
      id="node-gallery"
      eyebrow="node gallery"
      title="IllustrationNode"
      description="One node primitive. Every status, plus health, badge, selection, and disabled overlays composed on top."
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
        {STATUSES.map((status) => (
          <NodeDemo
            key={status}
            label={status}
            node={{ id: status, label: "Node", status, icon: <Database className="size-4" /> }}
          />
        ))}
        <NodeDemo
          label="with health"
          node={{
            id: "health",
            label: "Node",
            subtitle: "Degraded",
            status: "complete",
            health: "degraded",
            icon: <Workflow className="size-4" />,
          }}
        />
        <NodeDemo
          label="with badge"
          node={{
            id: "badge",
            label: "Node",
            status: "idle",
            badge: (
              <Badge tone="accent" size="sm">
                New
              </Badge>
            ),
            icon: <ShieldCheck className="size-4" />,
          }}
        />
        <NodeDemo label="selected" node={{ id: "selected", label: "Node", status: "idle", selected: true, icon: <Database className="size-4" /> }} />
        <NodeDemo label="disabled" node={{ id: "disabled", label: "Node", status: "idle", disabled: true, icon: <Database className="size-4" /> }} />
      </div>
    </PreviewSection>
  );
}
