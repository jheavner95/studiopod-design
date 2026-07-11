import type { ReactNode } from "react";
import { Check, X, AlertTriangle, Ban, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";

export type StateValue = "initial" | "active" | "waiting" | "blocked" | "completed" | "failed" | "cancelled" | "terminal";

interface StateNodeProps {
  label: ReactNode;
  description?: ReactNode;
  status: StateValue;
  onClick?: () => void;
  className?: string;
}

const MARKER_ICON: Partial<Record<StateValue, typeof Check>> = {
  completed: Check,
  failed: X,
  blocked: AlertTriangle,
  cancelled: Ban,
  terminal: Square,
};

const MARKER_TONE: Record<StateValue, string> = {
  initial: "border border-border-strong text-ink-tertiary",
  active: "bg-accent-500 text-white",
  waiting: "border border-dashed border-border-strong text-ink-tertiary",
  blocked: "bg-warning text-white",
  completed: "bg-success text-white",
  failed: "bg-error text-white",
  cancelled: "border border-border-subtle text-ink-tertiary",
  terminal: "bg-ink-primary text-white",
};

const LABEL_TONE: Record<StateValue, string> = {
  initial: "text-ink-tertiary",
  active: "text-ink-primary",
  waiting: "text-ink-tertiary",
  blocked: "text-ink-primary",
  completed: "text-ink-primary",
  failed: "text-ink-primary",
  cancelled: "text-ink-tertiary line-through",
  terminal: "text-ink-primary",
};

/**
 * Screen-reader-only status text — the marker's status is otherwise
 * conveyed solely by icon + color, both unavailable to assistive tech (the
 * icon is aria-hidden). "active" and "initial" are omitted: active is
 * covered by aria-current below, and initial is the unannounced default.
 */
const STATUS_LABEL: Partial<Record<StateValue, string>> = {
  waiting: "Waiting",
  blocked: "Blocked",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  terminal: "Terminal",
};

/** The marker alone, standalone so StateLegend can reuse the exact same rendering rather than a second marker implementation. */
export function StateNodeMarker({ status, className }: { status: StateValue; className?: string }) {
  const Icon = MARKER_ICON[status];
  return (
    <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full text-caption font-medium", MARKER_TONE[status], className)} aria-hidden>
      {Icon ? <Icon className="size-3.5" /> : null}
    </span>
  );
}

/**
 * One state in a StateMachine — a status marker keyed to this package's own
 * 8-value StateValue vocabulary, in WorkflowStep's own visual idiom
 * (independent per-item status, not a shared cursor model). A genuinely
 * new type rather than reusing WorkflowStateValue verbatim: unlike
 * PipelineStatus (whose target vocabulary differed from WorkflowStateValue
 * only by a label — "Pending" vs. "Not Started" — with identical
 * structure), this package's own Terminal has no counterpart in
 * WorkflowStateValue at all, and Initial genuinely collapses
 * WorkflowStateValue's separate "not-started"/"ready" distinction into
 * one — a structural gap, checked directly, the same kind that already
 * justified WorkflowTimelineEventStatus's Skipped and ApprovalStateValue's
 * Rejected/Changes Requested/Expired as their own independent types.
 * StateTransition, not this component, renders the connector between
 * states.
 */
export function StateNode({ label, description, status, onClick, className }: StateNodeProps) {
  const content = (
    <>
      <StateNodeMarker status={status} className="mt-0.5" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className={cn("text-body-sm font-medium", LABEL_TONE[status])}>
          {label}
          {STATUS_LABEL[status] ? <span className="sr-only"> ({STATUS_LABEL[status]})</span> : null}
        </span>
        {description ? <Caption className="text-ink-tertiary">{description}</Caption> : null}
      </div>
    </>
  );

  // A state machine's states aren't a linear sequence the way a wizard's steps are,
  // so this marks the active state with the generic aria-current="true" rather than
  // the step-specific "step" token WorkflowStepperStep/ApprovalStep use.
  const ariaCurrent = status === "active" ? "true" : undefined;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-current={ariaCurrent}
        className={cn("focus-ring flex items-start gap-3 rounded-md py-1.5 text-left transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-surface-hover", className)}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={cn("flex items-start gap-3 rounded-md py-1.5", className)} aria-current={ariaCurrent}>
      {content}
    </div>
  );
}
