import { Database, Workflow, GitBranch } from "lucide-react";
import { IllustrationCanvas, type DiagramNode, type DiagramConnection } from "@/illustrations";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

const NODES: DiagramNode[] = [
  { id: "1", label: "A", status: "complete", icon: <Database className="size-4" /> },
  { id: "2", label: "B", status: "active", icon: <Workflow className="size-4" /> },
  { id: "3", label: "C", status: "idle", icon: <GitBranch className="size-4" /> },
];

const CONNECTIONS: DiagramConnection[] = [
  { id: "c1", source: "1", target: "2", status: "flowing" },
  { id: "c2", source: "2", target: "3", status: "active" },
];

const FRAMES = [
  { label: "Desktop (1100px container)", width: 1100 },
  { label: "Tablet (700px container)", width: 700 },
  { label: "Mobile (340px container)", width: 340 },
];

/**
 * Each frame constrains the canvas's *container*, not the viewport — the
 * canvas measures its own rendered width via ResizeObserver, so this is a
 * genuine test of the responsive logic, not a simulation.
 */
export function ResponsiveGallerySection() {
  return (
    <PreviewSection
      id="responsive-gallery"
      eyebrow="responsive gallery"
      title="Responsive behavior"
      description="The canvas measures its own container width, not the browser viewport, so it adapts correctly even embedded somewhere narrower than the page. Desktop keeps the authored layout, tablet compresses spacing, mobile stacks automatically."
    >
      <div className="flex flex-col gap-10">
        {FRAMES.map((frame) => (
          <div key={frame.label} className="flex flex-col gap-3">
            <DemoLabel>{frame.label}</DemoLabel>
            <div
              className="scrollbar-none overflow-x-auto rounded-lg border border-dashed border-border-strong p-4"
              style={{ maxWidth: frame.width }}
            >
              <IllustrationCanvas
                diagram={{ nodes: NODES, connections: CONNECTIONS, layout: "horizontal" }}
                nodeSize="sm"
              />
            </div>
          </div>
        ))}
      </div>
    </PreviewSection>
  );
}
