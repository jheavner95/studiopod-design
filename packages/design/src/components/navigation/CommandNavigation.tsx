"use client";

import { useState } from "react";
import { Search, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandPalette, type CommandPaletteItem } from "@/components/overlay";

interface CommandNavigationProps {
  items: CommandPaletteItem[];
  placeholder?: string;
  shortcutKey?: string;
  className?: string;
  /** Icon-only rendering for tight spaces (e.g. a mobile header) — still opens the same CommandPalette, just needs an explicit aria-label since the visible text label is dropped. */
  compact?: boolean;
}

/**
 * The visible trigger for jumping to any action or destination without the mouse — pairs
 * with the Overlay System's CommandPalette (which already owns the search/keyboard/ARIA
 * logic and the global shortcut) rather than re-implementing any of that here. Drop this
 * into a TopNavigation's trailing slot for the common "search bar that opens ⌘K" pattern.
 */
export function CommandNavigation({ items, placeholder, shortcutKey = "k", className, compact = false }: CommandNavigationProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={compact ? "Search" : undefined}
        className={cn(
          "focus-ring flex items-center gap-2 rounded-md border border-border bg-surface text-caption text-ink-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ink-primary",
          compact ? "p-2" : "px-3 py-1.5",
          className,
        )}
      >
        <Search className="size-3.5" aria-hidden />
        {!compact ? (
          <>
            <span>Search…</span>
            <span className="ml-2 flex items-center gap-0.5 rounded border border-border-subtle px-1 text-ink-tertiary">
              <Command className="size-3" aria-hidden />
              {shortcutKey.toUpperCase()}
            </span>
          </>
        ) : null}
      </button>
      <CommandPalette open={open} onOpenChange={setOpen} items={items} placeholder={placeholder} shortcutKey={shortcutKey} />
    </>
  );
}
