import type { ReactNode } from "react";
import { WorkflowTimelineGroup } from "./WorkflowTimelineGroup";
import { WorkflowTimelineEvent } from "./WorkflowTimelineEvent";
import { WorkflowTimelineConnector } from "./WorkflowTimelineConnector";
import type { WorkflowTimelineEventStatus } from "./WorkflowTimelineMarker";
import type { ApprovalStateValue } from "./ApprovalStatus";

export interface ReviewHistoryEntry {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  actor?: ReactNode;
  timestamp: ReactNode;
  status: ApprovalStateValue;
}

interface ReviewHistoryProps {
  title?: ReactNode;
  /** Caller supplies entries already in order (typically newest-first) — not re-sorted, the same contract Inspector Panel's own InspectorHistory and Workflow Timeline's own events already follow. */
  entries: ReviewHistoryEntry[];
  className?: string;
}

/** Maps this package's own ApprovalStateValue onto Workflow Timeline's WorkflowTimelineEventStatus purely for marker/connector rendering — the real Approval-specific meaning (Approved vs. Completed, Rejected, Changes Requested) still lives in each entry's own title/description text, not in the marker alone. Expired has no closer analog than Cancelled (both read as "this no longer applies"), a deliberate, lossy-but-documented choice rather than a silent one. */
const MARKER_STATUS: Record<ApprovalStateValue, WorkflowTimelineEventStatus> = {
  pending: "pending",
  "in-review": "running",
  approved: "completed",
  rejected: "failed",
  "changes-requested": "waiting",
  cancelled: "cancelled",
  expired: "cancelled",
  completed: "completed",
};

function connectorStatusFor(status: ApprovalStateValue): "pending" | "active" | "complete" {
  if (status === "pending") return "pending";
  if (status === "in-review") return "active";
  return "complete";
}

/**
 * A review's own chronological decision history — composes Workflow
 * Timeline's own WorkflowTimelineGroup/WorkflowTimelineEvent/
 * WorkflowTimelineConnector directly rather than Inspector Panel's
 * InspectorHistory, since InspectorHistory has no connector-line mechanism
 * and no per-entry status marker (confirmed by its own doc comment) — this
 * package's own anatomy explicitly needs both, the same reasoning Workflow
 * Timeline's own WorkflowTimelineEvent already used to justify not
 * delegating to InspectorHistory either.
 */
export function ReviewHistory({ title = "History", entries, className }: ReviewHistoryProps) {
  return (
    <WorkflowTimelineGroup title={title} className={className}>
      {entries.map((entry, index) => (
        <div key={entry.id}>
          <WorkflowTimelineEvent
            title={entry.title}
            description={entry.description}
            actor={entry.actor}
            timestamp={entry.timestamp}
            status={MARKER_STATUS[entry.status]}
          />
          {index < entries.length - 1 ? <WorkflowTimelineConnector status={connectorStatusFor(entries[index + 1].status)} /> : null}
        </div>
      ))}
    </WorkflowTimelineGroup>
  );
}
