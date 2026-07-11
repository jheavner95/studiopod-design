"use client";

import { useEffect, useRef } from "react";
import { StatusIndicator, type SystemStatus, useAnnounce } from "@/components/feedback";

export type QueueStatusValue = "queued" | "running" | "completed" | "failed" | "retrying" | "paused" | "cancelled" | "blocked";

const STATUS_MAP: Record<QueueStatusValue, { status: SystemStatus; label: string }> = {
  queued: { status: "idle", label: "Queued" },
  running: { status: "active", label: "Running" },
  completed: { status: "success", label: "Completed" },
  failed: { status: "error", label: "Failed" },
  retrying: { status: "active", label: "Retrying" },
  paused: { status: "idle", label: "Paused" },
  cancelled: { status: "idle", label: "Cancelled" },
  blocked: { status: "warning", label: "Blocked" },
};

interface QueueStatusProps {
  value: QueueStatusValue;
  className?: string;
}

/**
 * A job's execution state — a thin preset over Foundation Feedback's own StatusIndicator, the same
 * pattern Status & Health's own HealthIndicator and Bulk Actions' own BulkStatus already established
 * for their own state vocabularies. Also announces a job's status changing (e.g. "Job status: Failed.")
 * through the shared LiveRegionProvider whenever value transitions, failed assertively and everything
 * else politely.
 */
export function QueueStatus({ value, className }: QueueStatusProps) {
  const { status, label } = STATUS_MAP[value];
  const announce = useAnnounce();
  const previousValue = useRef(value);

  useEffect(() => {
    if (previousValue.current === value) return;
    previousValue.current = value;
    announce(`Job status: ${label}.`, value === "failed" ? "assertive" : "polite");
  }, [value, label, announce]);

  return <StatusIndicator status={status} label={label} className={className} />;
}
