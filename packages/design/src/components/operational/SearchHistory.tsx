import { X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

export interface SearchHistoryEntry {
  id: string;
  query: string;
}

interface SearchHistoryProps {
  entries: SearchHistoryEntry[];
  onSelect: (entry: SearchHistoryEntry) => void;
  onRemove?: (entry: SearchHistoryEntry) => void;
  onClear?: () => void;
  emptyMessage?: string;
  className?: string;
}

/** Recent queries shown under an empty SearchField — click one to re-run it. Shares SearchSuggestions' dropdown shell so the two never visually compete for the same anchor point. */
export function SearchHistory({ entries, onSelect, onRemove, onClear, emptyMessage = "No recent searches", className }: SearchHistoryProps) {
  return (
    <div className={cn("absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-border bg-surface py-1 shadow-floating", className)}>
      {entries.length === 0 ? (
        <div className="px-3 py-2 text-body-sm text-ink-tertiary">{emptyMessage}</div>
      ) : (
        <>
          {entries.map((entry) => (
            <div key={entry.id} className="group flex items-center gap-2 px-3 py-2 hover:bg-canvas-raised">
              <Clock className="size-3.5 shrink-0 text-ink-tertiary" aria-hidden />
              <button type="button" onClick={() => onSelect(entry)} className="min-w-0 flex-1 truncate text-left text-body-sm text-ink-secondary">
                {entry.query}
              </button>
              {onRemove ? (
                <button
                  type="button"
                  onClick={() => onRemove(entry)}
                  aria-label={`Remove "${entry.query}" from search history`}
                  className="focus-ring shrink-0 rounded-full p-0.5 text-ink-tertiary opacity-0 group-hover:opacity-100 hover:text-ink-primary"
                >
                  <X className="size-3.5" />
                </button>
              ) : null}
            </div>
          ))}
          {onClear ? (
            <div className="border-t border-border-subtle px-3 py-1.5">
              <Button size="sm" variant="ghost" onClick={onClear} className="w-full justify-center">
                Clear history
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
