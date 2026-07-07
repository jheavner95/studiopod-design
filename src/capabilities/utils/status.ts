import type { NodeStatus, NodeHealth } from "@/illustrations";
import type { SystemStatus } from "@/components/illustration";
import type { CapabilityStatus, CapabilityHealth } from "../types";

const TO_NODE_STATUS: Record<CapabilityStatus, NodeStatus> = {
  available: "complete",
  unavailable: "error",
  healthy: "complete",
  warning: "warning",
  offline: "error",
  preferred: "active",
  fallback: "idle",
  deprecated: "warning",
};

const TO_SYSTEM_STATUS: Record<CapabilityStatus, SystemStatus> = {
  available: "success",
  unavailable: "error",
  healthy: "success",
  warning: "warning",
  offline: "error",
  preferred: "active",
  fallback: "idle",
  deprecated: "warning",
};

const HEALTH_TO_NODE_HEALTH: Record<CapabilityHealth, NodeHealth> = {
  healthy: "healthy",
  warning: "degraded",
  offline: "critical",
};

/** Bridges this library's 8-value CapabilityStatus down to the illustration engine's 6-value NodeStatus. */
export function toNodeStatus(status: CapabilityStatus): NodeStatus {
  return TO_NODE_STATUS[status];
}

/** Bridges this library's 8-value CapabilityStatus down to the MS-1 5-value SystemStatus. */
export function toSystemStatus(status: CapabilityStatus): SystemStatus {
  return TO_SYSTEM_STATUS[status];
}

/** Bridges this library's 3-value CapabilityHealth to the illustration engine's NodeHealth. */
export function toNodeHealth(health: CapabilityHealth): NodeHealth {
  return HEALTH_TO_NODE_HEALTH[health];
}
