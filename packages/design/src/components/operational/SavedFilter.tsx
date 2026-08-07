import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { STATUS_TONE_PILL_CLASSES } from "@/lib/tone";

export interface SavedFilterEntry {
  id: string;
  name: string;
}

interface SavedFilterProps {
  entries: SavedFilterEntry[];
  activeId?: string | null;
  onApply: (entry: SavedFilterEntry) => void;
  onDelete?: (entry: SavedFilterEntry) => void;
  onSave?: () => void;
  saveLabel?: string;
  className?: string;
}

/**
 * DS-5B: `active`/`inactive` are this component's own, more meaningful
 * names for a toggle-like state — kept instead of adopting `StatusTone`'s
 * `accent`/`neutral` naming here, since "active filter" reads better than
 * "accent filter." The underlying classes are the shared pill treatment
 * (`STATUS_TONE_PILL_CLASSES`), not a second independent copy of it.
 */
const TONE = {
  active: STATUS_TONE_PILL_CLASSES.accent,
  inactive: STATUS_TONE_PILL_CLASSES.neutral,
} as const;

/** Named, reusable filter combinations — apply one with a click, or save the current search/filter/sort state as a new one. */
export function SavedFilter({ entries, activeId, onApply, onDelete, onSave, saveLabel = "Save current filters", className }: SavedFilterProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {entries.map((entry) => {
        const isActive = entry.id === activeId;
        return (
          <span
            key={entry.id}
            className={cn("inline-flex w-fit items-center gap-1 rounded-full py-0.5 pl-1 pr-1 font-medium text-caption", TONE[isActive ? "active" : "inactive"])}
          >
            <button type="button" onClick={() => onApply(entry)} className="focus-ring rounded-full px-1.5 py-0.5">
              {entry.name}
            </button>
            {onDelete ? (
              <button
                type="button"
                onClick={() => onDelete(entry)}
                aria-label={`Delete saved filter "${entry.name}"`}
                className="focus-ring flex shrink-0 items-center justify-center rounded-full p-0.5 hover:bg-black/10"
              >
                <X className="size-3" />
              </button>
            ) : null}
          </span>
        );
      })}
      {onSave ? (
        <Button size="sm" variant="ghost" leadingIcon={<Plus className="size-3.5" />} onClick={onSave}>
          {saveLabel}
        </Button>
      ) : null}
    </div>
  );
}
