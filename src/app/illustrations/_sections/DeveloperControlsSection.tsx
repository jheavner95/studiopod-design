import { Database, Workflow } from "lucide-react";
import { IllustrationCanvas, type DiagramNode, type DiagramConnection } from "@/illustrations";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

const NODES: DiagramNode[] = [
  { id: "1", label: "Node A", status: "complete", icon: <Database className="size-4" /> },
  { id: "2", label: "Node B", status: "active", icon: <Workflow className="size-4" /> },
];

const CONNECTIONS: DiagramConnection[] = [{ id: "c1", source: "1", target: "2", status: "flowing" }];

export function DeveloperControlsSection() {
  return (
    <PreviewSection
      id="developer-controls"
      title="Developer controls"
      description="Six toggleable overlays, live in the dock above. They're invisible chrome: turning them on never changes a diagram's actual layout, only what's drawn on top of it."
    >
      <DemoLabel>Try the overlays on this one</DemoLabel>
      <IllustrationCanvas diagram={{ nodes: NODES, connections: CONNECTIONS, layout: "horizontal" }} />
    </PreviewSection>
  );
}
