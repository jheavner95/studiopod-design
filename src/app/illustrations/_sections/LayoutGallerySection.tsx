import { Database, Workflow, GitBranch, ShieldCheck, Zap } from "lucide-react";
import { IllustrationCanvas, type DiagramNode, type DiagramConnection, type DiagramLayoutKind } from "@/illustrations";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

const NODES: DiagramNode[] = [
  { id: "1", label: "A", status: "complete", icon: <Database className="size-4" /> },
  { id: "2", label: "B", status: "active", icon: <Workflow className="size-4" /> },
  { id: "3", label: "C", status: "idle", icon: <GitBranch className="size-4" /> },
  { id: "4", label: "D", status: "idle", icon: <ShieldCheck className="size-4" /> },
  { id: "5", label: "E", status: "idle", icon: <Zap className="size-4" /> },
];

const CONNECTIONS: DiagramConnection[] = [
  { id: "c1", source: "1", target: "2", status: "flowing" },
  { id: "c2", source: "2", target: "3", status: "active" },
  { id: "c3", source: "3", target: "4", status: "inactive" },
  { id: "c4", source: "4", target: "5", status: "inactive" },
];

const LAYOUTS: DiagramLayoutKind[] = ["horizontal", "vertical", "grid", "radial", "hub-and-spoke"];

export function LayoutGallerySection() {
  return (
    <PreviewSection
      id="examples"
      eyebrow="Examples"
      title="Layout engine"
      description="The same five nodes and four connections, laid out five different ways. No node has a hardcoded position: every coordinate below comes from the layout engine."
    >
      <div className="flex flex-col gap-14">
        {LAYOUTS.map((layout) => (
          <div key={layout} className="flex flex-col gap-4">
            <DemoLabel>{layout}</DemoLabel>
            <IllustrationCanvas diagram={{ nodes: NODES, connections: CONNECTIONS, layout }} nodeSize="sm" />
          </div>
        ))}
      </div>
    </PreviewSection>
  );
}
