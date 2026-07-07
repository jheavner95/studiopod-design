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
import { useElementSize, computeConnectorAnchor, midpoint } from "../utils";
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
const GROUP_PADDING = 28;
/** Node labels overflow below their icon box via absolute positioning (see IllustrationNode) — reserve room for a two-line label so it never overlaps whatever follows the canvas in the page. */
const LABEL_CLEARANCE = 56;

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

  const groupBounds = useMemo(() => {
    if (!diagram.groups) return [];
    return diagram.groups.map((group) => {
      const points = group.nodes.map((id) => layoutResult.positions[id]).filter((p): p is { x: number; y: number } => Boolean(p));
      if (points.length === 0) return null;
      const minX = Math.min(...points.map((p) => p.x)) - nodeRadius - GROUP_PADDING;
      const maxX = Math.max(...points.map((p) => p.x)) + nodeRadius + GROUP_PADDING;
      const minY = Math.min(...points.map((p) => p.y)) - nodeRadius - GROUP_PADDING;
      const maxY = Math.max(...points.map((p) => p.y)) + nodeRadius + GROUP_PADDING * 1.8;
      return { group, x: minX, y: minY, width: maxX - minX, height: maxY - minY };
    });
  }, [diagram.groups, layoutResult, nodeRadius]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="scrollbar-none overflow-x-auto">
        <div
          className="relative mx-auto"
          style={{
            width: layoutResult.width,
            height: layoutResult.height + LABEL_CLEARANCE,
            minWidth: layoutResult.width,
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
            const sourcePos = layoutResult.positions[connection.source];
            const targetPos = layoutResult.positions[connection.target];
            if (!sourcePos || !targetPos) return null;
            const mid = midpoint(sourcePos, targetPos);
            return (
              <div
                key={`${connection.id}-label`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: mid.x, top: mid.y }}
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
