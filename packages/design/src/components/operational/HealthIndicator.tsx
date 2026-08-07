"use client";

import { useEffect, useRef } from "react";
import { StatusIndicator, type SystemStatus, useAnnounce } from "@/components/feedback";

export type HealthStatusValue = "healthy" | "warning" | "critical" | "offline" | "syncing" | "paused" | "recovering" | "unknown";

const STATUS_MAP: Record<HealthStatusValue, { status: SystemStatus; label: string }> = {
  healthy: { status: "success", label: "Healthy" },
  warning: { status: "warning", label: "Warning" },
  critical: { status: "error", label: "Critical" },
  offline: { status: "idle", label: "Offline" },
  syncing: { status: "active", label: "Syncing" },
  paused: { status: "idle", label: "Paused" },
  recovering: { status: "active", label: "Recovering" },
  unknown: { status: "idle", label: "Unknown" },
};

interface HealthIndicatorProps {
  value: HealthStatusValue;
  className?: string;
}

/**
 * The operational health dot + label — a thin preset over Foundation
 * Feedback's own StatusIndicator, the same pattern Bulk Actions' own
 * BulkStatus already established. Distinct from
 * src/illustrations/primitives/HealthIndicator.tsx, which maps a
 * three-value NodeHealth to a diagram node's pulse — a different family
 * (illustration canvas nodes) and a different, narrower state set than
 * this operational eight-state health vocabulary. Also announces a status
 * transition (e.g. Healthy -> Critical) through the shared LiveRegionProvider
 * whenever value changes, critical assertively and everything else politely.
 */
export function HealthIndicator({ value, className }: HealthIndicatorProps) {
  const { status, label } = STATUS_MAP[value];
  const announce = useAnnounce();
  const previousValue = useRef(value);

  useEffect(() => {
    if (previousValue.current === value) return;
    previousValue.current = value;
    announce(`Status changed to ${label}.`, value === "critical" ? "assertive" : "polite");
  }, [value, label, announce]);

  return <StatusIndicator status={status} label={label} className={className} />;
}
