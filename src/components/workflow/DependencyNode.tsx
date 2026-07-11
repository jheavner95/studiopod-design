import type { ReactNode } from "react";
import { Link2, Unlink2, Ban, Check, AlertTriangle, X, RefreshCw, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";

export type DependencyStatusValue = "connected" | "disconnected" | "blocked" | "healthy" | "warning" | "critical" | "circular" | "hidden";

interface DependencyNodeProps {
  label: ReactNode;
  description?: ReactNode;
  status: DependencyStatusValue;
  onClick?: () => void;
  className?: string;
}

const MARKER_ICON: Record<DependencyStatusValue, typeof Check> = {
  connected: Link2,
  disconnected: Unlink2,
  blocked: Ban,
  healthy: Check,
  warning: AlertTriangle,
  critical: X,
  circular: RefreshCw,
  hidden: EyeOff,
};

const MARKER_TONE: Record<DependencyStatusValue, string> = {
  connected: "bg-success text-white",
  disconnected: "border border-border-strong text-ink-tertiary",
  blocked: "bg-warning text-white",
  healthy: "bg-success text-white",
  warning: "bg-warning text-white",
  critical: "bg-error text-white",
  circular: "border border-dashed border-warning text-warning",
  hidden: "border border-border-subtle text-ink-tertiary",
};

const LABEL_TONE: Record<DependencyStatusValue, string> = {
  connected: "text-ink-primary",
  disconnected: "text-ink-tertiary",
  blocked: "text-ink-primary",
  healthy: "text-ink-primary",
  warning: "text-ink-primary",
  critical: "text-ink-primary",
  circular: "text-ink-primary",
  hidden: "text-ink-tertiary line-through",
};

/** The marker alone, standalone so DependencyLegend can reuse the exact same rendering rather than a second marker implementation — the same split StateNode/StateNodeMarker already established. */
export function DependencyNodeMarker({ status, className }: { status: DependencyStatusValue; className?: string }) {
  const Icon = MARKER_ICON[status];
  return (
    <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full text-caption font-medium", MARKER_TONE[status], className)} aria-hidden>
      <Icon className="size-3.5" />
    </span>
  );
}

/**
 * One entity in a dependency graph — a status marker keyed to this
 * package's own 8-value DependencyStatusValue vocabulary, in StateNode's
 * own visual idiom. A genuinely new type rather than reusing
 * WorkflowStateValue, StateValue, or Operational's HealthStatusValue:
 * checked directly against all three, and none covers Connected/
 * Disconnected/Circular/Hidden — structural-graph concepts (edge
 * connectivity, cycle detection, visibility), not lifecycle or health
 * concepts, the same kind of genuine gap that already justified StateValue
 * as its own type rather than reusing WorkflowStateValue. DependencyEdge,
 * not this component, renders the connection between nodes.
 */
export function DependencyNode({ label, description, status, onClick, className }: DependencyNodeProps) {
  const content = (
    <>
      <DependencyNodeMarker status={status} className="mt-0.5" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className={cn("text-body-sm font-medium", LABEL_TONE[status])}>{label}</span>
        {description ? <Caption className="text-ink-tertiary">{description}</Caption> : null}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn("focus-ring flex items-start gap-3 rounded-md py-1.5 text-left transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-surface-hover", className)}
      >
        {content}
      </button>
    );
  }

  return <div className={cn("flex items-start gap-3 rounded-md py-1.5", className)}>{content}</div>;
}
