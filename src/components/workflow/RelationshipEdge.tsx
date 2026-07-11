import type { ReactNode } from "react";
import { DependencyEdge, type DependencyDirection } from "./DependencyEdge";
import type { WorkflowTransitionStatus } from "./WorkflowTransition";

interface RelationshipEdgeProps {
  status?: WorkflowTransitionStatus;
  direction?: DependencyDirection;
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
  className?: string;
}

/**
 * A thin wrapper over DependencyEdge, defaulting to bidirectional rather
 * than DependencyEdge's own forward default — a dependency is inherently
 * one-way ("A needs B"), while a relationship this family renders is more
 * often a two-way peer connection ("A and B reference each other") unless
 * the caller says otherwise.
 */
export function RelationshipEdge({ status, direction = "bidirectional", orientation, label, className }: RelationshipEdgeProps) {
  return <DependencyEdge status={status} direction={direction} orientation={orientation} label={label} className={className} />;
}
