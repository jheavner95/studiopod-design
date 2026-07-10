import { StatusIndicator, type SystemStatus } from "@/components/feedback";

export type WorkflowStateValue = "not-started" | "ready" | "running" | "waiting" | "blocked" | "completed" | "failed" | "cancelled";

const STATUS_MAP: Record<WorkflowStateValue, { status: SystemStatus; label: string }> = {
  "not-started": { status: "idle", label: "Not Started" },
  ready: { status: "idle", label: "Ready" },
  running: { status: "active", label: "Running" },
  waiting: { status: "idle", label: "Waiting" },
  blocked: { status: "warning", label: "Blocked" },
  completed: { status: "success", label: "Completed" },
  failed: { status: "error", label: "Failed" },
  cancelled: { status: "idle", label: "Cancelled" },
};

interface WorkflowStatusProps {
  value: WorkflowStateValue;
  className?: string;
}

/**
 * The workflow-lifecycle status dot + label — a thin preset over Foundation
 * Feedback's own StatusIndicator, the same STATUS_MAP-over-StatusIndicator
 * pattern Status & Health's HealthIndicator and Queue & Job's QueueStatus
 * already established. A genuinely distinct vocabulary from both of those:
 * WorkflowStateValue is a business-process lifecycle (has this workflow
 * started, is it waiting on something, is it blocked) rather than a system
 * health axis (HealthStatusValue) or a job-queue axis (QueueStatusValue) —
 * neither existing type maps onto "Not Started"/"Ready"/"Waiting" cleanly,
 * confirmed by direct comparison before adding this one.
 */
export function WorkflowStatus({ value, className }: WorkflowStatusProps) {
  const { status, label } = STATUS_MAP[value];
  return <StatusIndicator status={status} label={label} className={className} />;
}
