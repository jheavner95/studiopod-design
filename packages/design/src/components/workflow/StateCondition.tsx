import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { StatusIndicator } from "@/components/feedback";
import { Caption } from "@/components/ui";

interface StateConditionProps {
  label: ReactNode;
  description?: ReactNode;
  /** Whether this guard condition currently holds — gates whether the transition it's attached to may fire. */
  met: boolean;
  className?: string;
}

/**
 * A guard condition attached to a StateTransition — the thing that must be
 * true for a transition to fire. A read-only display, not an interactive
 * checklist: unlike Approval & Review's own ReviewChecklist (which arranges
 * caller-toggleable Foundation Forms CheckboxFields), a guard condition's
 * met/unmet state is computed by the caller's own domain logic, not
 * user input — so this composes Foundation Feedback's StatusIndicator
 * directly rather than a Checkbox.
 */
export function StateCondition({ label, description, met, className }: StateConditionProps) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <StatusIndicator status={met ? "success" : "idle"} className="mt-0.5" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-body-sm text-ink-primary">{label}</span>
        {description ? <Caption className="text-ink-tertiary">{description}</Caption> : null}
      </div>
    </div>
  );
}
