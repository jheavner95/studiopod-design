"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  computeLayout,
  getBreakpoint,
  getResponsiveAdjustment,
  DEFAULT_SPACING,
  DEFAULT_PADDING,
} from "../layout";
import { useElementSize, computeConnectorAnchor, offsetAlongPerpendicular, pointAlongLine } from "../utils";
import { useIllustrationDev } from "../dev";
import { IllustrationNode, type IllustrationNodeSize } from "./IllustrationNode";
import { IllustrationConnection } from "./IllustrationConnection";
import { IllustrationLabel } from "./IllustrationLabel";
import type { Diagram } from "../types";

export interface IllustrationCanvasProps {
  diagram: Diagram;
  className?: string;
  nodeSize?: IllustrationNodeSize;
  onSelectNode?: (id: string) => void;
}

const NODE_PIXEL_SIZE: Record<IllustrationNodeSize, number> = { sm: 40, md: 64, lg: 80 };
const GROUP_PADDING = 32;
/** Node labels overflow below their icon box via absolute positioning (see IllustrationNode) — reserve room for a two-line label so it never overlaps whatever follows the canvas in the page. */
const LABEL_CLEARANCE = 64;
/** How far a connector's label is nudged off the line itself, so it doesn't sit exactly on top of a node's label band or another edge's label. */
const EDGE_LABEL_OFFSET = 26;

/**
 * The one entry point every diagram is rendered through:
 * `<IllustrationCanvas diagram={data} />`. No page writes its own
 * rendering logic — it only ever supplies data. Measures its own
 * container width, classifies a breakpoint, computes node positions
 * through the layout engine, and draws nodes, connections, group
 * boundaries, and any active developer overlays.
 */
export function IllustrationCanvas({ diagram, className, nodeSize = "md", onSelectNode }: IllustrationCanvasProps) {
  const [containerRef, containerSize] = useElementSize<HTMLDivElement>();
  const dev = useIllustrationDev();

  const breakpoint = getBreakpoint(containerSize.width || 1200);
  const layoutKind = diagram.layout ?? "horizontal";
  const { layout: adjustedLayout, spacingScale } = getResponsiveAdjustment(layoutKind, breakpoint);
  const nodePx = NODE_PIXEL_SIZE[nodeSize];
  const padding = diagram.padding ?? DEFAULT_PADDING;

  const layoutResult = useMemo(
    () =>
      computeLayout(diagram.nodes, adjustedLayout, {
        nodeSize: { width: nodePx, height: nodePx },
        spacing: DEFAULT_SPACING * spacingScale,
        padding,
        width: containerSize.width || undefined,
      }),
    [diagram.nodes, adjustedLayout, nodePx, spacingScale, padding, containerSize.width],
  );

  const nodeRadius = nodePx / 2;
  const routing = adjustedLayout === "grid" ? "orthogonal" : "straight";

  // When several labeled edges share a source (a hub fanning out, a decision
  // branch, multiple collinear back-edges in a chain), stacking every label
  // on its own exact midpoint crowds them together or on top of each other.
  // Spread each sibling along its own line (helps when edges fan out at
  // different angles) *and* increase how far each is nudged off the line
  // (helps when siblings are collinear, so same-angle offsets alone would
  // still land at the same spot).
  const edgeLabelPlacements = useMemo(() => {
    const labeled = diagram.connections.filter((connection) => connection.label);
    const countBySource = new Map<string, number>();
    labeled.forEach((connection) => {
      countBySource.set(connection.source, (countBySource.get(connection.source) ?? 0) + 1);
    });
    const seenBySource = new Map<string, number>();
    const placements = new Map<string, { x: number; y: number }>();
    labeled.forEach((connection) => {
      const sourcePos = layoutResult.positions[connection.source];
      const targetPos = layoutResult.positions[connection.target];
      if (!sourcePos || !targetPos) return;
      const total = countBySource.get(connection.source) ?? 1;
      const index = seenBySource.get(connection.source) ?? 0;
      seenBySource.set(connection.source, index + 1);
      const t = total > 1 ? 0.45 + (index / (total - 1)) * 0.25 : 0.55;
      const base = pointAlongLine(sourcePos, targetPos, t);
      const offset = EDGE_LABEL_OFFSET + index * 36;
      placements.set(connection.id, offsetAlongPerpendicular(sourcePos, targetPos, offset, base));
    });
    return placements;
  }, [diagram.connections, layoutResult]);

  const groupBounds = useMemo(() => {
    if (!diagram.groups) return [];
    const bounds = diagram.groups.map((group) => {
      const points = group.nodes.map((id) => layoutResult.positions[id]).filter((p): p is { x: number; y: number } => Boolean(p));
      if (points.length === 0) return null;
      const minX = Math.min(...points.map((p) => p.x)) - nodeRadius - GROUP_PADDING;
      const maxX = Math.max(...points.map((p) => p.x)) + nodeRadius + GROUP_PADDING;
      const minY = Math.min(...points.map((p) => p.y)) - nodeRadius - GROUP_PADDING;
      const maxY = Math.max(...points.map((p) => p.y)) + nodeRadius + GROUP_PADDING * 1.8;
      return { group, x: minX, y: minY, width: maxX - minX, height: maxY - minY };
    });

    // In a vertical layout, a group's bottom padding (generous, to leave
    // room for its own title band) plus the next group's top padding can
    // together exceed the plain node-to-node spacing when both groups are
    // small — the two boxes overlap even though no single node moved.
    // Sorting by vertical position and clamping each adjacent pair to meet
    // at their overlap's midpoint keeps every group's box collision-free
    // without touching the node layout itself.
    const sorted = bounds.filter((b): b is NonNullable<typeof b> => Boolean(b)).sort((a, b) => a.y - b.y);
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];
      // Only groups actually stacked in the same column collide vertically
      // — groups sitting side by side in a horizontal/grid layout can share
      // a similar y-range without being adjacent at all, and squeezing
      // those apart would shrink boxes that were never overlapping.
      const xOverlaps = current.x < next.x + next.width && next.x < current.x + current.width;
      const currentBottom = current.y + current.height;
      const overlap = currentBottom - next.y;
      if (xOverlaps && overlap > 0) {
        const shift = overlap / 2;
        current.height -= shift;
        next.y += shift;
        next.height -= shift;
      }
    }

    return bounds;
  }, [diagram.groups, layoutResult, nodeRadius]);

  // A group's own padding (see above, especially its extra bottom margin
  // for the title band) can reach past whatever the layout algorithm
  // computed as the diagram's bounds — most visibly when the last node in
  // a vertical/stacked layout is also a group's last member, so the
  // group's box extends below where the canvas reserved space. Without
  // this, that overflow spills into whatever follows the canvas in the
  // page instead of staying inside it.
  const contentWidth = groupBounds.reduce(
    (max, bounds) => (bounds ? Math.max(max, bounds.x + bounds.width) : max),
    layoutResult.width,
  );
  const contentHeight = groupBounds.reduce(
    (max, bounds) => (bounds ? Math.max(max, bounds.y + bounds.height) : max),
    layoutResult.height,
  );

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="scrollbar-none overflow-x-auto">
        <div
          className="relative mx-auto"
          style={{
            width: contentWidth,
            height: contentHeight + LABEL_CLEARANCE,
            minWidth: contentWidth,
          }}
          role="group"
          aria-label="Diagram"
        >
          {dev.grid ? <div className="pointer-events-none absolute inset-0 bg-grid-lines opacity-40" /> : null}

          {groupBounds.map((bounds) => {
            if (!bounds) return null;
            return (
              <div
                key={bounds.group.id}
                className={cn(
                  "absolute rounded-xl border",
                  bounds.group.focused ? "border-accent-500 bg-accent-soft/10" : "border-border-subtle bg-surface/30",
                )}
                style={{ left: bounds.x, top: bounds.y, width: bounds.width, height: bounds.height }}
              >
                <div className="absolute left-3 top-2 flex items-center gap-2">
                  <span className="text-caption font-medium text-ink-secondary">{bounds.group.title}</span>
                  {bounds.group.badge}
                </div>
              </div>
            );
          })}

          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            {diagram.connections.map((connection) => {
              const sourcePos = layoutResult.positions[connection.source];
              const targetPos = layoutResult.positions[connection.target];
              if (!sourcePos || !targetPos) return null;
              const anchor = computeConnectorAnchor(sourcePos, targetPos, nodeRadius, nodeRadius);
              return (
                <IllustrationConnection
                  key={connection.id}
                  connection={connection}
                  start={anchor.start}
                  end={anchor.end}
                  routing={routing}
                />
              );
            })}
          </svg>

          {diagram.connections.map((connection) => {
            if (!connection.label) return null;
            const pos = edgeLabelPlacements.get(connection.id);
            if (!pos) return null;
            return (
              <div
                key={`${connection.id}-label`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: pos.x, top: pos.y }}
              >
                <IllustrationLabel>{connection.label}</IllustrationLabel>
              </div>
            );
          })}

          {diagram.nodes.map((node) => {
            const pos = layoutResult.positions[node.id];
            if (!pos) return null;
            return (
              <div key={node.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pos.x, top: pos.y }}>
                <IllustrationNode node={node} size={nodeSize} onSelect={onSelectNode} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
