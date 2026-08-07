import type { ReactNode } from "react";
import { WorkflowTimelineGroup } from "./WorkflowTimelineGroup";
import { WorkflowTimelineEvent } from "./WorkflowTimelineEvent";
import { WorkflowTimelineConnector } from "./WorkflowTimelineConnector";
import type { WorkflowTimelineEventStatus } from "./WorkflowTimelineMarker";
import type { WorkflowStateValue } from "./WorkflowStatus";

export interface PipelineHistoryEntry {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  actor?: ReactNode;
  timestamp: ReactNode;
  status: WorkflowStateValue;
}

interface PipelineHistoryProps {
  title?: ReactNode;
  /** Caller supplies entries already in order (typically newest-first) — not re-sorted, the same contract Approval & Review's own ReviewHistory and Workflow Timeline's own events already follow. */
  entries: PipelineHistoryEntry[];
  className?: string;
}

/**
 * Maps WorkflowStateValue onto Workflow Timeline's own
 * WorkflowTimelineEventStatus purely for marker/connector rendering — the
 * same "compute a value for rendering, keep real meaning in the entry's own
 * text" pattern Approval & Review's own ReviewHistory already established
 * for ApprovalStateValue. This mapping is close to a straight pass-through
 * (6 of 8 values share the same name); only "not-started"/"ready" collapse
 * onto Timeline's own "pending", since a pipeline run's history has no
 * "ready but not yet started" distinction worth a separate marker.
 */
const MARKER_STATUS: Record<WorkflowStateValue, WorkflowTimelineEventStatus> = {
  "not-started": "pending",
  ready: "pending",
  running: "running",
  waiting: "waiting",
  blocked: "blocked",
  completed: "completed",
  failed: "failed",
  cancelled: "cancelled",
};

function connectorStatusFor(status: WorkflowStateValue): "pending" | "active" | "complete" {
  if (status === "not-started" || status === "ready") return "pending";
  if (status === "running") return "active";
  return "complete";
}

/**
 * A pipeline run's own chronological history — composes Workflow Timeline's
 * own WorkflowTimelineGroup/WorkflowTimelineEvent/WorkflowTimelineConnector
 * directly rather than Inspector Panel's InspectorHistory, since
 * InspectorHistory has no connector-line mechanism or per-entry status
 * marker (the same reasoning ReviewHistory already used for its own
 * domain, and WorkflowTimelineEvent itself used to justify not delegating
 * to InspectorHistory in the first place).
 */
export function PipelineHistory({ title = "History", entries, className }: PipelineHistoryProps) {
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
