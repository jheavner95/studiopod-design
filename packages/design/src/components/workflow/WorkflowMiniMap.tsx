import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";
import { WorkflowNodeMarker, type WorkflowNodeStatus } from "./WorkflowNode";

export interface WorkflowMiniMapNode {
  id: string;
  label: string;
  status: WorkflowNodeStatus;
}

interface WorkflowMiniMapProps {
  nodes: WorkflowMiniMapNode[];
  className?: string;
}

/**
 * A compact, label-truncated overview strip of every node in the current
 * workflow, reusing WorkflowNode's own exported WorkflowNodeMarker rather
 * than a second marker implementation. Deliberately NOT a spatial
 * viewport-position thumbnail: this package's own Future Extensions defers
 * real pan/zoom, and without a coordinate system there is no viewport
 * rectangle to indicate — a minimap that drew one today would be
 * decorative fiction. This mirrors the pre-existing (and differently
 * scoped) src/workflows/components/WorkflowMiniMap.tsx, checked directly:
 * that component is also a "compact, label-less overview," built on
 * AnimatedNode/AnimatedConnector for the plural Workflow Diagram Library's
 * own canvas-positioned diagrams — a naming collision across two distinct
 * import paths, not a code duplication, following the same
 * distinct-scope-same-name treatment WorkflowProgress.tsx and
 * WorkflowTimeline.tsx already documented against their own src/workflows/
 * namesakes. WorkflowOverview, not this component, is the data-forward
 * (stat/summary) sibling.
 */
export function WorkflowMiniMap({ nodes, className }: WorkflowMiniMapProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2 rounded-md border border-border-subtle p-2", className)}>
      {nodes.map((node) => (
        <div key={node.id} className="flex items-center gap-1.5" title={node.label}>
          <WorkflowNodeMarker status={node.status} className="size-5" />
          <Caption className="max-w-16 truncate text-ink-tertiary">{node.label}</Caption>
        </div>
      ))}
    </div>
  );
}
