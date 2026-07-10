import { StatusIndicator, type SystemStatus } from "@/components/feedback";

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

/** The overall state of a bulk operation — a thin preset over Foundation Feedback's own StatusIndicator (dot + label, pulsing only while active), not a second status-dot implementation. */
export function BulkStatus({ value, className }: BulkStatusProps) {
  const { status, label } = STATUS_MAP[value];
  return <StatusIndicator status={status} label={label} className={className} />;
}
