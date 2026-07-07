import type { ReactNode } from "react";

/**
 * The core object model for the illustration engine. A `Diagram` is plain
 * data — nodes, connections, groups, an optional pipeline — and every
 * future illustration is just a value of this shape handed to
 * `<IllustrationCanvas diagram={...} />`. No page ever writes its own
 * rendering logic.
 */

// ---------------------------------------------------------------- Node

/** The workflow/system state that drives a node's color and motion. */
export type NodeStatus = "idle" | "active" | "processing" | "complete" | "warning" | "error";

/** A secondary, independent signal — operational health, not workflow progress. */
export type NodeHealth = "healthy" | "degraded" | "critical";

export interface NodePosition {
  x: number;
  y: number;
}

export interface DiagramNode {
  id: string;
  label: string;
  subtitle?: string;
  icon?: ReactNode;
  /** Defaults to "idle". */
  status?: NodeStatus;
  health?: NodeHealth;
  /** Rendered as a small badge on the node, e.g. <Badge tone="accent">New</Badge>. */
  badge?: ReactNode;
  /** Convenience: when true and `status` is unset, the node renders as "active". */
  active?: boolean;
  /** Reduces opacity and removes interactivity. Independent of `status`. */
  disabled?: boolean;
  /** Shows a SelectionRing — a UI selection state, independent of workflow status. */
  selected?: boolean;
  metadata?: Record<string, ReactNode>;
  /** Manual position override. Omit to let the layout engine compute it. */
  position?: NodePosition;
}

// ---------------------------------------------------------------- Connection

export type ConnectionDirection = "forward" | "backward" | "bidirectional";
export type ConnectionStyle = "solid" | "dashed" | "dotted";
export type ConnectionStatus = "inactive" | "active" | "flowing" | "highlighted" | "disabled";

export interface DiagramConnection {
  id: string;
  /** Source node id. */
  source: string;
  /** Target node id. */
  target: string;
  direction?: ConnectionDirection;
  style?: ConnectionStyle;
  /** Whether the flow draw-in animation plays. Defaults to true unless status is "inactive"/"disabled". */
  animated?: boolean;
  /** Visual thickness/importance, roughly 1–3. Defaults to 1. */
  weight?: number;
  label?: ReactNode;
  /** Defaults to "inactive". */
  status?: ConnectionStatus;
  /** An independent emphasis overlay — e.g. "this connection is part of the selected path". */
  highlighted?: boolean;
}

// ---------------------------------------------------------------- Group

export interface GroupMetric {
  label: string;
  value: ReactNode;
}

export interface DiagramGroup {
  id: string;
  title: string;
  description?: string;
  /** Node ids that belong to this group. */
  nodes: string[];
  collapsed?: boolean;
  badge?: ReactNode;
  metrics?: GroupMetric[];
  /** An independent emphasis state — e.g. "the group the user is currently exploring". */
  focused?: boolean;
}

// ---------------------------------------------------------------- Pipeline

export interface PipelineStage {
  id: string;
  label: string;
  /** Node ids that make up this stage. More than one id means parallel nodes within the stage. */
  nodeIds: string[];
  /** Stage ids to proceed to. Omit to advance to the next stage in array order. Multiple ids model branching. */
  next?: string[];
}

export interface DiagramPipeline {
  id: string;
  stages: PipelineStage[];
  /** 0–1 overall completion, drives the progress fill. */
  progress?: number;
  /** Whether the final stage loops back to the first. */
  loop?: boolean;
}

// ---------------------------------------------------------------- Diagram

export type DiagramLayoutKind = "horizontal" | "vertical" | "grid" | "radial" | "hub-and-spoke";
export type DiagramTheme = "dark" | "light";
export type DiagramResponsiveMode = "auto" | "stack" | "scroll";

export interface DiagramViewport {
  width?: number;
  height?: number;
}

export interface Diagram {
  nodes: DiagramNode[];
  connections: DiagramConnection[];
  groups?: DiagramGroup[];
  pipeline?: DiagramPipeline;
  layout?: DiagramLayoutKind;
  viewport?: DiagramViewport;
  theme?: DiagramTheme;
  padding?: number;
  zoom?: number;
  responsiveMode?: DiagramResponsiveMode;
}
