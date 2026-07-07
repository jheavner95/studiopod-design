import type { NodeStatus } from "@/illustrations";
import type { SystemStatus } from "@/components/illustration";
import type { ProductionStatus, ValidationStage } from "../types";

const TO_NODE_STATUS: Record<ProductionStatus, NodeStatus> = {
  pending: "idle",
  running: "processing",
  passed: "complete",
  warning: "warning",
  failed: "error",
  blocked: "error",
  completed: "complete",
  archived: "idle",
};

const TO_SYSTEM_STATUS: Record<ProductionStatus, SystemStatus> = {
  pending: "idle",
  running: "active",
  passed: "success",
  warning: "warning",
  failed: "error",
  blocked: "error",
  completed: "success",
  archived: "idle",
};

/** Bridges this library's 8-value ProductionStatus down to the illustration engine's 6-value NodeStatus. */
export function toNodeStatus(status: ProductionStatus): NodeStatus {
  return TO_NODE_STATUS[status];
}

/** Bridges this library's 8-value ProductionStatus down to the MS-1 5-value SystemStatus. */
export function toSystemStatus(status: ProductionStatus): SystemStatus {
  return TO_SYSTEM_STATUS[status];
}

export function resolveStageStatus(stage: ValidationStage): ProductionStatus {
  return stage.status ?? "pending";
}
