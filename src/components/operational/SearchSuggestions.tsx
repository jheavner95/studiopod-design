import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SearchSuggestion {
  id: string;
  label: ReactNode;
  description?: ReactNode;
}

interface SearchSuggestionsProps {
  open: boolean;
  suggestions: SearchSuggestion[];
  activeId?: string | null;
  onSelect: (suggestion: SearchSuggestion) => void;
  emptyMessage?: ReactNode;
  className?: string;
}

/**
 * The dropdown of completions shown under a SearchField as the user types —
 * the same absolute-positioned listbox pattern Foundation Forms' own
 * ComboboxField already uses internally, pulled out standalone since a
 * free-text search (query stays as typed) has no single committed "value"
 * for Combobox's own value/onChange contract to bind to. Anchor it inside a
 * `relative` wrapper around your own SearchField; wire ArrowUp/ArrowDown/
 * Enter on that field's onKeyDown to move `activeId` and call `onSelect`,
 * matching this system's controlled-component convention rather than this
 * component owning keyboard state it can't expose back to the caller.
 */
export function SearchSuggestions({ open, suggestions, activeId, onSelect, emptyMessage = "No suggestions", className }: SearchSuggestionsProps) {
  if (!open) return null;

  return (
    <div
      role="listbox"
      className={cn(
        "absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-border bg-surface py-1 shadow-floating",
        className,
      )}
    >
      {suggestions.length === 0 ? (
        <div className="px-3 py-2 text-body-sm text-ink-tertiary">{emptyMessage}</div>
      ) : (
        suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            role="option"
            aria-selected={suggestion.id === activeId}
            onMouseDown={(event) => {
              event.preventDefault();
              onSelect(suggestion);
            }}
            className={cn(
              "flex cursor-pointer flex-col gap-0.5 px-3 py-2 text-body-sm text-ink-secondary",
              suggestion.id === activeId ? "bg-accent-soft/30 text-ink-primary" : "hover:bg-canvas-raised",
            )}
          >
            <span>{suggestion.label}</span>
            {suggestion.description ? <span className="text-caption text-ink-tertiary">{suggestion.description}</span> : null}
          </div>
        ))
      )}
    </div>
  );
}
