import type { ReactNode } from "react";
import { WorkflowTimelineGroup } from "./WorkflowTimelineGroup";
import { WorkflowTimelineEvent } from "./WorkflowTimelineEvent";
import { WorkflowTimelineConnector } from "./WorkflowTimelineConnector";
import type { WorkflowTimelineEventStatus } from "./WorkflowTimelineMarker";
import type { StateValue } from "./StateNode";

export interface StateHistoryEntry {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  actor?: ReactNode;
  timestamp: ReactNode;
  status: StateValue;
}

interface StateHistoryProps {
  title?: ReactNode;
  /** Caller supplies entries already in order (typically newest-first) — not re-sorted, the same contract Pipeline & Approval and Review's own history components already follow. */
  entries: StateHistoryEntry[];
  className?: string;
}

/** Maps this package's own StateValue onto Workflow Timeline's WorkflowTimelineEventStatus purely for marker/connector rendering — the real state-machine-specific meaning still lives in each entry's own title/description text. Terminal has no closer analog than Completed (both read as "the machine reached an end"), a deliberate, documented choice rather than a silent one, the same kind PipelineHistory's own not-started/ready collapse and ReviewHistory's own expired-to-cancelled mapping already made. */
const MARKER_STATUS: Record<StateValue, WorkflowTimelineEventStatus> = {
  initial: "pending",
  active: "running",
  waiting: "waiting",
  blocked: "blocked",
  completed: "completed",
  failed: "failed",
  cancelled: "cancelled",
  terminal: "completed",
};

function connectorStatusFor(status: StateValue): "pending" | "active" | "complete" {
  if (status === "initial") return "pending";
  if (status === "active") return "active";
  return "complete";
}

/**
 * A state machine's own chronological record of what actually happened —
 * composes Workflow Timeline's own WorkflowTimelineGroup/
 * WorkflowTimelineEvent/WorkflowTimelineConnector directly, the identical
 * pattern PipelineHistory and ReviewHistory already established for their
 * own domains, rather than Inspector Panel's InspectorHistory (which has
 * no connector-line mechanism or per-entry status marker). Distinct from
 * StateEvents, which catalogs what CAN happen (named events and the
 * states they move between) rather than what already did.
 */
export function StateHistory({ title = "History", entries, className }: StateHistoryProps) {
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
