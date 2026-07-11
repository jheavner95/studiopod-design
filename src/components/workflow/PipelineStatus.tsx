import { StatusIndicator, type SystemStatus } from "@/components/feedback";
import type { WorkflowStateValue } from "./WorkflowStatus";

const STATUS_MAP: Record<WorkflowStateValue, { status: SystemStatus; label: string }> = {
  "not-started": { status: "idle", label: "Pending" },
  ready: { status: "idle", label: "Ready" },
  running: { status: "active", label: "Running" },
  waiting: { status: "idle", label: "Waiting" },
  blocked: { status: "warning", label: "Blocked" },
  completed: { status: "success", label: "Completed" },
  failed: { status: "error", label: "Failed" },
  cancelled: { status: "idle", label: "Cancelled" },
};

interface PipelineStatusProps {
  value: WorkflowStateValue;
  className?: string;
}

/**
 * The pipeline-lifecycle status dot + label — reuses Workflow Framework's
 * own WorkflowStateValue verbatim rather than declaring a fourth
 * business-process status type. Checked directly: the target vocabulary
 * this package documents (Pending/Ready/Running/Waiting/Blocked/Completed/
 * Failed/Cancelled) differs from WorkflowStateValue only in relabeling
 * "not-started" as "Pending" — a wording choice, not a structural gap the
 * way ApprovalStateValue's Rejected/Changes Requested/Expired or
 * WorkflowTimelineEventStatus's Skipped genuinely were. Only the label map
 * differs from WorkflowStatus itself; the underlying STATUS_MAP-over-
 * StatusIndicator pattern is identical.
 */
export function PipelineStatus({ value, className }: PipelineStatusProps) {
  const { status, label } = STATUS_MAP[value];
  return <StatusIndicator status={status} label={label} className={className} />;
}
