import type { ProductionStatus, QualityGate } from "../types";

/** Derives a gate's status from its passed/failed/warning counts when no explicit status is authored. */
export function resolveGateStatus(gate: QualityGate): ProductionStatus {
  if (gate.status) return gate.status;
  if ((gate.failed ?? 0) > 0) return "failed";
  if ((gate.warning ?? 0) > 0) return "warning";
  if ((gate.passed ?? 0) > 0) return "passed";
  return "pending";
}

export interface GateSummary {
  total: number;
  passed: number;
  failed: number;
  warning: number;
}

/** Aggregates a set of gates into pass/fail/warning counts, for QualitySummary's overview. */
export function getGateSummary(gates: QualityGate[]): GateSummary {
  return gates.reduce<GateSummary>(
    (summary, gate) => {
      const status = resolveGateStatus(gate);
      return {
        total: summary.total + 1,
        passed: summary.passed + (status === "passed" ? 1 : 0),
        failed: summary.failed + (status === "failed" ? 1 : 0),
        warning: summary.warning + (status === "warning" ? 1 : 0),
      };
    },
    { total: 0, passed: 0, failed: 0, warning: 0 },
  );
}
