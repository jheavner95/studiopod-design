"use client";

import { cn } from "@/lib/utils";
import { Activate } from "@/motion";
import { SelectionRing } from "./SelectionRing";
import { HealthIndicator } from "./HealthIndicator";
import type { DiagramNode, NodeStatus } from "../types";
import { useIllustrationDev } from "../dev";

export type IllustrationNodeSize = "sm" | "md" | "lg";

export interface IllustrationNodeProps {
  node: DiagramNode;
  size?: IllustrationNodeSize;
  onSelect?: (id: string) => void;
  className?: string;
}

const sizeMap: Record<IllustrationNodeSize, string> = { sm: "size-10", md: "size-16", lg: "size-20" };

/**
 * Label max-width per node size, matched to DEFAULT_SPACING so a
 * full-width label still clears its neighbor's label with a real gutter
 * (not just the node icons) rather than one fixed width for every size.
 */
const labelWidthMap: Record<IllustrationNodeSize, string> = {
  sm: "max-w-[6rem]",
  md: "max-w-[8rem]",
  lg: "max-w-[9rem]",
};

const toneStyles: Record<NodeStatus, string> = {
  idle: "border-border bg-surface text-ink-tertiary",
  active: "border-accent-500 bg-accent-soft text-accent-400",
  processing: "border-accent-500 bg-accent-soft text-accent-400",
  complete: "border-success/40 bg-success-soft text-success",
  warning: "border-warning/40 bg-warning-soft text-warning",
  error: "border-error/40 bg-error-soft text-error",
};

function resolveStatus(node: DiagramNode): NodeStatus {
  if (node.status) return node.status;
  if (node.active) return "active";
  return "idle";
}

function resolveActivateState(status: NodeStatus): "inactive" | "active" | "complete" {
  if (status === "active" || status === "processing") return "active";
  if (status === "complete") return "complete";
  return "inactive";
}

/**
 * The atomic visual for one diagram node. The root element's box is
 * *exactly* the icon's size (matching the layout engine's `nodeSize`
 * assumption) — the label overflows below via absolute positioning so it
 * never shifts where the Canvas thinks this node's center is, which is
 * what connector anchors are computed from.
 */
export function IllustrationNode({ node, size = "md", onSelect, className }: IllustrationNodeProps) {
  const status = resolveStatus(node);
  const dev = useIllustrationDev();

  const body = (
    <div
      className={cn(
        "flex size-full items-center justify-center rounded-full border",
        toneStyles[status],
        node.disabled && "pointer-events-none opacity-40",
        dev.nodeBounds && "outline outline-1 outline-dashed outline-accent-400/60",
      )}
    >
      {node.icon}
    </div>
  );

  return (
    <div className={cn("relative", sizeMap[size], className)}>
      <SelectionRing selected={node.selected} className="size-full rounded-full">
        <Activate state={resolveActivateState(status)} duration="fast" className="size-full rounded-full">
          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(node.id)}
              disabled={node.disabled}
              aria-pressed={node.selected}
              aria-label={node.label}
              className="focus-ring size-full rounded-full"
            >
              {body}
            </button>
          ) : (
            body
          )}
        </Activate>
      </SelectionRing>

      {node.health ? (
        <span className="absolute -right-0.5 -top-0.5">
          <HealthIndicator health={node.health} />
        </span>
      ) : null}
      {node.badge ? <span className="absolute -right-2 -top-2">{node.badge}</span> : null}
      {dev.anchorPoints ? (
        <span className="pointer-events-none absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400" />
      ) : null}

      <div
        className={cn(
          "absolute left-1/2 top-full mt-2 flex w-max -translate-x-1/2 flex-col items-center gap-0.5 text-center",
          labelWidthMap[size],
          dev.labelRegions && "outline outline-1 outline-dashed outline-accent-400/40",
        )}
      >
        <span className="text-body-sm font-medium text-ink-primary">{node.label}</span>
        {node.subtitle ? <span className="text-caption text-ink-tertiary">{node.subtitle}</span> : null}
      </div>
    </div>
  );
}
