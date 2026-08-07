import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";
import { WorkflowTimelineMarker, type WorkflowTimelineEventStatus } from "./WorkflowTimelineMarker";

interface WorkflowTimelineEventProps {
  title: ReactNode;
  description?: ReactNode;
  actor?: ReactNode;
  timestamp: ReactNode;
  status: WorkflowTimelineEventStatus;
  /** Originating domain — Production, Publishing, Commerce, etc. — since one timeline can mix events from several sources. */
  source?: ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * One row in a WorkflowTimeline — a WorkflowTimelineMarker plus a text
 * block, in Inspector Panel's own InspectorHistory typography convention
 * (description line, then a caption line of secondary detail) for visual
 * consistency with that system's own history rendering. Built fresh rather
 * than delegating to InspectorHistory directly, because InspectorHistory
 * has no connector-line mechanism and no per-entry status marker (its icon
 * slot is a plain wrapped node, not a status-driven marker) — this
 * package's own anatomy explicitly requires both. The connector between
 * two events is a separate WorkflowTimelineConnector the caller places
 * between rows, the same separation WorkflowStepperStep/
 * WorkflowStepperConnector already establish for steps.
 */
export function WorkflowTimelineEvent({ title, description, actor, timestamp, status, source, onClick, className }: WorkflowTimelineEventProps) {
  const content = (
    <>
      <WorkflowTimelineMarker status={status} className="mt-0.5" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-body-sm font-medium text-ink-primary">{title}</span>
          {source ? (
            <Badge tone="neutral" size="sm">
              {source}
            </Badge>
          ) : null}
        </div>
        {description ? <span className="text-body-sm text-ink-tertiary">{description}</span> : null}
        <span className="text-caption text-ink-tertiary">
          {actor ? <>{actor} · </> : null}
          {timestamp}
        </span>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "focus-ring flex w-full items-start gap-3 rounded-md p-1 text-left transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-surface-hover",
          className,
        )}
      >
        {content}
      </button>
    );
  }

  return <div className={cn("flex items-start gap-3", className)}>{content}</div>;
}
