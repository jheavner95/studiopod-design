import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";

export interface BulkConflictEntry {
  id: string;
  name: string;
  reason: string;
}

interface BulkConflictListProps {
  entries: BulkConflictEntry[];
  className?: string;
}

/** The itemized detail behind a BulkResults partial-failure summary — one row per item that failed or conflicted, each with its own reason. Shares the same bordered-row shell as SearchHistory/ActiveFilterList for visual consistency across this system. */
export function BulkConflictList({ entries, className }: BulkConflictListProps) {
  if (entries.length === 0) return null;

  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {entries.map((entry) => (
        <li key={entry.id} className="flex items-start gap-2.5 rounded-md border border-border-subtle px-3 py-2">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-error" aria-hidden />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate text-body-sm font-medium text-ink-primary">{entry.name}</span>
            <Caption className="text-ink-tertiary">{entry.reason}</Caption>
          </div>
        </li>
      ))}
    </ul>
  );
}
