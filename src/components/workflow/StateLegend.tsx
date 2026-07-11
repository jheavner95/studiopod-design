import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";
import { StateNodeMarker, type StateValue } from "./StateNode";

interface StateLegendProps {
  /** Defaults to all 8 states — narrow this to only the states a given machine actually uses. */
  states?: StateValue[];
  className?: string;
}

const ALL_STATES: StateValue[] = ["initial", "active", "waiting", "blocked", "completed", "failed", "cancelled", "terminal"];

const LABELS: Record<StateValue, string> = {
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
 * What each StateNode marker means, spelled out so meaning never depends
 * on color alone — the same marker-plus-label-list pattern Workflow
 * Timeline's own WorkflowTimelineLegend already established for its own
 * status vocabulary. Reuses StateNode's own exported StateNodeMarker for
 * the marker rather than a second marker implementation.
 */
export function StateLegend({ states = ALL_STATES, className }: StateLegendProps) {
  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}>
      {states.map((state) => (
        <div key={state} className="flex items-center gap-2">
          <StateNodeMarker status={state} />
          <Caption className="text-ink-tertiary">{LABELS[state]}</Caption>
        </div>
      ))}
    </div>
  );
}
