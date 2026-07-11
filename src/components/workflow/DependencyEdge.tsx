import type { ReactNode } from "react";
import { ArrowRight, ArrowLeft, ArrowLeftRight } from "lucide-react";
import { Caption } from "@/components/ui";
import { WorkflowTransition, type WorkflowTransitionStatus } from "./WorkflowTransition";
import { cn } from "@/lib/utils";

export type DependencyDirection = "forward" | "backward" | "bidirectional";

interface DependencyEdgeProps {
  status?: WorkflowTransitionStatus;
  direction?: DependencyDirection;
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
  className?: string;
}

const DIRECTION_ICON: Record<DependencyDirection, typeof ArrowRight> = {
  forward: ArrowRight,
  backward: ArrowLeft,
  bidirectional: ArrowLeftRight,
};

/**
 * The connection between two DependencyNodes — composes Workflow
 * Framework's own WorkflowTransition for the pending/active/complete line
 * status (reused, not rebuilt) plus a direction arrowhead
 * WorkflowTransition itself has no concept of at all — checked directly,
 * its full prop surface is only label/orientation/status, no direction
 * field. A real gap in this tier's DOM-composed layer, unlike the
 * illustration-canvas layer's own IllustrationConnection, which already
 * renders real SVG arrowheads via coordinate-positioned ConnectionArrow
 * markers — a fundamentally different, canvas-positioned rendering model
 * this component deliberately doesn't pull in. A small inline icon fills
 * the gap instead, the same lightweight approach StateEvents already uses
 * for its own from→to summary.
 */
export function DependencyEdge({ status = "pending", direction = "forward", orientation = "horizontal", label, className }: DependencyEdgeProps) {
  const Icon = DIRECTION_ICON[direction];
  return (
    <div className={cn("flex items-center gap-1", orientation === "horizontal" ? "flex-1 justify-center px-1" : "flex-col py-1", className)}>
      <WorkflowTransition status={status} orientation={orientation} />
      <Icon className="size-3 shrink-0 text-ink-tertiary" aria-hidden />
      {label ? <Caption className="text-ink-tertiary">{label}</Caption> : null}
    </div>
  );
}
