import type { ReactNode } from "react";
import { Circle, Play, Pause, Ban, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";

export type WorkflowNodeStatus = "idle" | "running" | "paused" | "blocked" | "completed" | "failed";

interface WorkflowNodeProps {
  label: ReactNode;
  description?: ReactNode;
  status: WorkflowNodeStatus;
  /** Visually rings the node to show it's part of the current selection — WorkflowSelection owns the actual selected-id set, this prop only renders the result. */
  selected?: boolean;
  /** Dims and strikes the label without removing the node — the same "still present, de-emphasized" treatment DependencyNode's own hidden status established, but expressed as a prop here since Filtered is an interaction state layered on top of any status rather than a status value itself. */
  filtered?: boolean;
  onClick?: () => void;
  className?: string;
}

const MARKER_ICON: Record<WorkflowNodeStatus, typeof Check> = {
  idle: Circle,
  running: Play,
  paused: Pause,
  blocked: Ban,
  completed: Check,
  failed: X,
};

const MARKER_TONE: Record<WorkflowNodeStatus, string> = {
  idle: "border border-border-strong text-ink-tertiary",
  running: "bg-accent-500 text-white",
  paused: "bg-warning text-white",
  blocked: "border border-dashed border-warning text-warning",
  completed: "bg-success text-white",
  failed: "bg-error text-white",
};

const LABEL_TONE: Record<WorkflowNodeStatus, string> = {
  idle: "text-ink-tertiary",
  running: "text-ink-primary",
  paused: "text-ink-primary",
  blocked: "text-ink-primary",
  completed: "text-ink-primary",
  failed: "text-ink-primary",
};

/** The marker alone, standalone so WorkflowLegend and WorkflowMiniMap can both reuse the exact same rendering rather than a second marker implementation — the same split StateNode/StateNodeMarker and DependencyNode/DependencyNodeMarker already established. */
export function WorkflowNodeMarker({ status, className }: { status: WorkflowNodeStatus; className?: string }) {
  const Icon = MARKER_ICON[status];
  return (
    <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full text-caption font-medium", MARKER_TONE[status], className)} aria-hidden>
      <Icon className="size-3.5" />
    </span>
  );
}

/**
 * One node in a workflow visualization — a status marker keyed to this
 * package's own 6-value WorkflowNodeStatus vocabulary, in DependencyNode's
 * own visual idiom. A genuinely new type rather than reusing
 * WorkflowStateValue verbatim: checked directly, WorkflowStateValue's own
 * eight values (not-started/ready/running/waiting/blocked/completed/failed/
 * cancelled) have no counterpart for Paused (a user-initiated halt of a
 * live process, distinct from Waiting on an external dependency) — a real
 * structural gap, the same kind that already justified StateValue's own
 * Terminal and DependencyStatusValue's own Circular/Hidden as independent
 * types rather than reusing WorkflowStateValue. Idle collapses
 * WorkflowStateValue's separate not-started/ready/waiting/cancelled
 * distinctions into one, the same collapsing StateNode's own Initial
 * already did.
 *
 * Selected and Filtered are deliberately NOT part of this status
 * vocabulary — they're interaction/visibility states layered on top of any
 * status (a Running node can also be Selected), rendered via their own
 * boolean props rather than folded into the status enum, so the two axes
 * never collide. Hovered and Focused need no props at all: this component
 * renders a real <button> when onClick is supplied, so :hover/:focus-visible
 * are native browser states, not something this component tracks itself.
 * WorkflowEdge, not this component, renders the connection between nodes.
 */
export function WorkflowNode({ label, description, status, selected, filtered, onClick, className }: WorkflowNodeProps) {
  const content = (
    <>
      <WorkflowNodeMarker status={status} className="mt-0.5" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className={cn("text-body-sm font-medium", filtered ? "text-ink-tertiary line-through" : LABEL_TONE[status])}>{label}</span>
        {description ? <Caption className="text-ink-tertiary">{description}</Caption> : null}
      </div>
    </>
  );

  const sharedClassName = cn(
    "flex items-start gap-3 rounded-md py-1.5",
    selected && "ring-2 ring-accent-500",
    filtered && "opacity-50",
    className,
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(sharedClassName, "focus-ring text-left transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-surface-hover")}
      >
        {content}
      </button>
    );
  }

  return <div className={sharedClassName}>{content}</div>;
}
