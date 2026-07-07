"use client";

import { useState } from "react";
import { Database, Workflow } from "lucide-react";
import { Badge } from "@/components/ui";
import { IllustrationGroup, IllustrationNode, type DiagramGroup } from "@/illustrations";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

export function GroupGallerySection() {
  const [collapsed, setCollapsed] = useState(false);

  const group: DiagramGroup = {
    id: "demo",
    title: "Group title",
    description: "A cluster of related nodes.",
    nodes: ["a", "b"],
    collapsed,
    badge: (
      <Badge tone="accent" size="sm">
        2 nodes
      </Badge>
    ),
    metrics: [
      { label: "Throughput", value: "128/hr" },
      { label: "Errors", value: "0" },
    ],
  };

  return (
    <PreviewSection
      id="group-gallery"
      eyebrow="group gallery"
      title="IllustrationGroup"
      description="A bounding region for a cluster of nodes: title, description, badge, metrics, and collapse/expand built directly on the Expand primitive."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <DemoLabel>Interactive (click the chevron)</DemoLabel>
          <div className="mt-3">
            <IllustrationGroup group={group} onToggleCollapsed={(_id, next) => setCollapsed(next)}>
              <div className="flex flex-wrap gap-6 pb-10 pt-2">
                <IllustrationNode
                  node={{ id: "a", label: "Node A", status: "complete", icon: <Database className="size-4" /> }}
                  size="sm"
                />
                <IllustrationNode
                  node={{ id: "b", label: "Node B", status: "active", icon: <Workflow className="size-4" /> }}
                  size="sm"
                />
              </div>
            </IllustrationGroup>
          </div>
        </div>
        <div>
          <DemoLabel>Focused</DemoLabel>
          <div className="mt-3">
            <IllustrationGroup group={{ ...group, id: "focused", focused: true, collapsed: false }}>
              <div className="flex flex-wrap gap-6 pb-10 pt-2">
                <IllustrationNode
                  node={{ id: "c", label: "Node C", status: "warning", icon: <Database className="size-4" /> }}
                  size="sm"
                />
              </div>
            </IllustrationGroup>
          </div>
        </div>
      </div>
    </PreviewSection>
  );
}
