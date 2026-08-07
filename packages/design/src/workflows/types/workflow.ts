import type { ReactNode } from "react";
import type { NodeStatus, NodeHealth } from "@/illustrations";

/**
 * The Workflow Diagram Library's own schema, layered on top of the
 * illustration engine's generic Diagram. A `Workflow` describes a named,
 * titled business process — every future workflow is a value of this
 * shape handed to `<WorkflowDiagram workflow={...} />`, never bespoke
 * rendering code.
 */

export type WorkflowStepKind = "standard" | "decision" | "optional";

export interface WorkflowStep {
  id: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  status?: NodeStatus;
  health?: NodeHealth;
  badge?: ReactNode;
  description?: ReactNode;
  /** A short human-readable estimate, e.g. "~5 min", "1–2 days". */
  estimatedDuration?: string;
  active?: boolean;
  completed?: boolean;
  /** "decision" steps branch to multiple next steps; "optional" steps can be skipped. */
  kind?: WorkflowStepKind;
}

export interface WorkflowConnection {
  id: string;
  source: string;
  target: string;
  label?: ReactNode;
  /** Marks this connection as a loop-back rather than forward progress. */
  loop?: boolean;
}

export interface WorkflowBranch {
  id: string;
  /** The decision step this branch originates from. */
  from: string;
  /** Step ids reachable from that decision. */
  to: string[];
  label?: ReactNode;
}

export type WorkflowPattern = "linear" | "branching" | "parallel" | "looping";

export type WorkflowMetadata = Record<string, ReactNode>;

export interface Workflow {
  id: string;
  title: string;
  description?: string;
  steps: WorkflowStep[];
  connections: WorkflowConnection[];
  branches?: WorkflowBranch[];
  pattern?: WorkflowPattern;
  /** 0–1 overall completion. Falls back to (completed steps / total steps) when omitted. */
  completion?: number;
  metadata?: WorkflowMetadata;
}
