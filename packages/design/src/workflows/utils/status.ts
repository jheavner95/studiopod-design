import type { NodeStatus } from "@/illustrations";
import type { SystemStatus } from "@/components/illustration";
import type { WorkflowStep } from "../types";

/**
 * The MS-1 illustration primitives (AnimatedNode, FlowCard, ProgressRail)
 * predate the illustration engine's `NodeStatus` vocabulary and use their
 * own five-value `SystemStatus`. This bridges the two so workflow
 * components can reuse those primitives instead of re-implementing them.
 */
export function toSystemStatus(status: NodeStatus): SystemStatus {
  if (status === "complete") return "success";
  if (status === "processing") return "active";
  return status;
}

/** The single source of truth for "what state is this step in right now" — completed/active flags win over the raw status field. */
export function resolveStepStatus(step: WorkflowStep): NodeStatus {
  if (step.completed) return "complete";
  if (step.active) return "active";
  return step.status ?? "idle";
}
