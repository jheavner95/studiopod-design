import { PulseStatus } from "@/components/motion";
import type { NodeHealth } from "../types";

const HEALTH_TONE: Record<NodeHealth, "success" | "warning" | "error"> = {
  healthy: "success",
  degraded: "warning",
  critical: "error",
};

interface HealthIndicatorProps {
  health: NodeHealth;
  className?: string;
}

/** Maps a health signal to the existing PulseStatus primitive — pulses for anything short of healthy. */
export function HealthIndicator({ health, className }: HealthIndicatorProps) {
  return <PulseStatus tone={HEALTH_TONE[health]} size="sm" active={health !== "healthy"} className={className} />;
}
