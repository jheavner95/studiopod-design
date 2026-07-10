import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Expandable } from "@/components/ui";

export interface InspectorHistoryEntry {
  id: string;
  actor: ReactNode;
  description: ReactNode;
  timestamp: ReactNode;
  icon?: ReactNode;
}

interface InspectorHistoryProps {
  entries: InspectorHistoryEntry[];
  /** Entries shown before "Show N more" appears — matches the Inspector Workspace's own Activity region guidance ("collapsed to recent entries by default"). */
  collapsedCount?: number;
  className?: string;
}

function HistoryRow({ entry }: { entry: InspectorHistoryEntry }) {
  return (
    <li className="flex items-start gap-3">
      {entry.icon ? (
        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-hover text-ink-tertiary" aria-hidden>
          {entry.icon}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-body-sm text-ink-primary">{entry.description}</span>
        <span className="text-caption text-ink-tertiary">
          {entry.actor} · {entry.timestamp}
        </span>
      </div>
    </li>
  );
}

/**
 * What's happened to this object over time — always newest-first (the
 * caller supplies entries in that order; this component doesn't re-sort).
 * A genuinely new component: TimelineComposition (the closest existing
 * precedent) lives in src/compositions/, a marketing-page layer this
 * package doesn't compose from, so this is built fresh from Foundation
 * Layout/Metadata typography conventions instead.
 */
export function InspectorHistory({ entries, collapsedCount = 3, className }: InspectorHistoryProps) {
  const visible = entries.slice(0, collapsedCount);
  const rest = entries.slice(collapsedCount);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <ul className="flex flex-col gap-3">
        {visible.map((entry) => (
          <HistoryRow key={entry.id} entry={entry} />
        ))}
      </ul>
      {rest.length > 0 ? (
        <Expandable trigger={<span className="text-caption font-medium text-accent-400">Show {rest.length} more</span>}>
          <ul className="flex flex-col gap-3 pt-3">
            {rest.map((entry) => (
              <HistoryRow key={entry.id} entry={entry} />
            ))}
          </ul>
        </Expandable>
      ) : null}
    </div>
  );
}
