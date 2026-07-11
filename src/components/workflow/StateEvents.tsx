import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";
import type { StateValue } from "./StateNode";

export interface StateEventEntry {
  id: string;
  name: ReactNode;
  description?: ReactNode;
  from: StateValue;
  to: StateValue;
}

interface StateEventsProps {
  events: StateEventEntry[];
  className?: string;
}

const STATE_LABEL: Record<StateValue, string> = {
  initial: "Initial",
  active: "Active",
  waiting: "Waiting",
  blocked: "Blocked",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  terminal: "Terminal",
};

/**
 * The catalog of named events a state machine responds to — each one
 * naming the states it moves between, distinct from StateHistory (the
 * chronological record of events that actually fired on a real run).
 * This is reference documentation of what's possible, the same
 * distinction PipelineHistory's own entries (what happened) already draw
 * against a would-be "what can happen" list this package now adds.
 */
export function StateEvents({ events, className }: StateEventsProps) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {events.map((event) => (
        <li key={event.id} className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-body-sm font-medium text-ink-primary">{event.name}</span>
            <span className="flex items-center gap-1 text-caption text-ink-tertiary">
              {STATE_LABEL[event.from]}
              <ArrowRight className="size-3" aria-hidden />
              {STATE_LABEL[event.to]}
            </span>
          </div>
          {event.description ? <Caption className="text-ink-tertiary">{event.description}</Caption> : null}
        </li>
      ))}
    </ul>
  );
}
