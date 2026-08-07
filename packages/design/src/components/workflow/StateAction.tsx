import type { ReactNode } from "react";
import { LogIn, LogOut, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";

export type StateActionTrigger = "on-enter" | "on-exit" | "on-transition";

interface StateActionProps {
  label: ReactNode;
  description?: ReactNode;
  trigger: StateActionTrigger;
  className?: string;
}

const TRIGGER_ICON: Record<StateActionTrigger, typeof LogIn> = {
  "on-enter": LogIn,
  "on-exit": LogOut,
  "on-transition": ArrowRightLeft,
};

const TRIGGER_LABEL: Record<StateActionTrigger, string> = {
  "on-enter": "On enter",
  "on-exit": "On exit",
  "on-transition": "On transition",
};

/**
 * One side-effect definition attached to a state — what fires when a state
 * is entered, exited, or crossed via a transition. A display-only record
 * of a lifecycle hook, not a button: distinct from the plural StateActions
 * (Workflow Framework's own WorkflowActions, re-exported), which renders
 * the buttons a person can click right now. This singular component is
 * documentation of what already happens automatically.
 */
export function StateAction({ label, description, trigger, className }: StateActionProps) {
  const Icon = TRIGGER_ICON[trigger];
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-hover text-ink-tertiary" aria-hidden>
        <Icon className="size-3.5" />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-body-sm font-medium text-ink-primary">{label}</span>
        <Caption className="text-ink-tertiary">
          {TRIGGER_LABEL[trigger]}
          {description ? <> · {description}</> : null}
        </Caption>
      </div>
    </div>
  );
}
