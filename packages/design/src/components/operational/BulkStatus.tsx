"use client";

import { useEffect, useRef } from "react";
import { StatusIndicator, type SystemStatus, useAnnounce } from "@/components/feedback";

export type BulkStatusValue = "idle" | "processing" | "completed" | "partial" | "failed" | "cancelled";

const STATUS_MAP: Record<BulkStatusValue, { status: SystemStatus; label: string }> = {
  idle: { status: "idle", label: "No operation" },
  processing: { status: "active", label: "Processing" },
  completed: { status: "success", label: "Completed" },
  partial: { status: "warning", label: "Partial success" },
  failed: { status: "error", label: "Failed" },
  cancelled: { status: "idle", label: "Cancelled" },
};

interface BulkStatusProps {
  value: BulkStatusValue;
  className?: string;
}

/**
 * The overall state of a bulk operation — a thin preset over Foundation Feedback's own StatusIndicator
 * (dot + label, pulsing only while active), not a second status-dot implementation. Also announces the
 * operation starting (value transitioning to "processing") and finishing (completed/partial/failed/
 * cancelled) via the shared LiveRegionProvider, since this is the one place in the Bulk Actions family
 * that already tracks the operation's real lifecycle rather than just a snapshot count.
 */
export function BulkStatus({ value, className }: BulkStatusProps) {
  const { status, label } = STATUS_MAP[value];
  const announce = useAnnounce();
  const previousValue = useRef(value);

  useEffect(() => {
    if (previousValue.current === value) return;
    previousValue.current = value;
    if (value === "processing") {
      announce("Bulk action started.");
    } else if (value === "failed") {
      announce("Bulk action failed.", "assertive");
    } else if (value === "completed" || value === "partial" || value === "cancelled") {
      announce(`Bulk action ${label.toLowerCase()}.`);
    }
  }, [value, label, announce]);

  return <StatusIndicator status={status} label={label} className={className} />;
}
