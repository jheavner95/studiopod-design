"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotion, useMotionEnabled, useEscapeKey, useFocusTrap, useBodyLock } from "@/hooks";
import { transition } from "@/motion/utils";
import { Portal } from "./Portal";

export interface CommandPaletteItem {
  id: string;
  label: string;
  /** e.g. "Actions" or "Navigation destinations" — the two variants this system scopes. */
  group: string;
  onSelect: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandPaletteItem[];
  placeholder?: string;
  /** Global shortcut (with Cmd/Ctrl) that opens the palette from anywhere — "k" by default. */
  shortcutKey?: string;
}

/**
 * A searchable, keyboard-first overlay for jumping to an action or destination without
 * the mouse — ARIA combobox/listbox pattern (input drives aria-activedescendant into a
 * role="listbox"), plus a global Cmd/Ctrl+key shortcut that opens it even while closed.
 */
export function CommandPalette({ open, onOpenChange, items, placeholder = "Search actions and destinations…", shortcutKey = "k" }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [wasOpen, setWasOpen] = useState(open);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }
  const listId = useId();
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();

  function close() {
    onOpenChange(false);
  }

  useEscapeKey(close, open);
  // A full-screen, backdrop-blocking overlay needs the same trap/restore machinery as
  // Dialog/Drawer — it focuses the input (the panel's only focusable descendant) on
  // open and restores the trigger's focus on close, replacing the old requestAnimationFrame
  // effect below that focused the input but never trapped Tab or declared dialog semantics.
  // useBodyLock must run before useFocusTrap — see Dialog.tsx for why the order matters.
  useBodyLock(open);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === shortcutKey.toLowerCase()) {
        event.preventDefault();
        onOpenChange(true);
      }
    }
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, [onOpenChange, shortcutKey]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q.length === 0 ? items : items.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, query]);

  const groups = useMemo(() => {
    const byGroup = new Map<string, CommandPaletteItem[]>();
    for (const item of filtered) {
      const list = byGroup.get(item.group) ?? [];
      list.push(item);
      byGroup.set(item.group, list);
    }
    return Array.from(byGroup.entries());
  }, [filtered]);

  function selectActive() {
    const item = filtered[activeIndex];
    if (item) {
      item.onSelect();
      close();
    }
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (filtered.length === 0 ? 0 : (index + 1) % filtered.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (filtered.length === 0 ? 0 : (index - 1 + filtered.length) % filtered.length));
    } else if (event.key === "Enter") {
      event.preventDefault();
      selectActive();
    }
  }

  const activeId = filtered[activeIndex] ? `${listId}-${filtered[activeIndex].id}` : undefined;

  return (
    <Portal>
      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0" style={{ zIndex: "var(--z-modal)" }}>
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={motionEnabled ? { opacity: 0 } : undefined}
              animate={motionEnabled ? { opacity: 1 } : undefined}
              exit={motionEnabled ? { opacity: 0 } : undefined}
              transition={motionEnabled ? transition({ duration: "fast", ease: "standard", speed }) : undefined}
              onClick={close}
              aria-hidden
            />
            <div className="absolute inset-x-0 top-24 flex justify-center px-4">
              <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                tabIndex={-1}
                initial={motionEnabled ? { opacity: 0, scale: 0.97, y: -8 } : undefined}
                animate={motionEnabled ? { opacity: 1, scale: 1, y: 0 } : undefined}
                exit={motionEnabled ? { opacity: 0, scale: 0.97, y: -8 } : undefined}
                transition={motionEnabled ? transition({ duration: "normal", ease: "enter", speed }) : undefined}
                className="flex w-full max-w-lg flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-[var(--shadow-modal)]"
              >
                <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-3">
                  <Search className="size-4 shrink-0 text-ink-tertiary" aria-hidden />
                  <input
                    ref={inputRef}
                    type="text"
                    role="combobox"
                    aria-expanded={open}
                    aria-controls={listId}
                    aria-activedescendant={activeId}
                    aria-autocomplete="list"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setActiveIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="min-w-0 flex-1 bg-transparent text-body-md text-ink-primary outline-none placeholder:text-ink-tertiary"
                  />
                </div>
                <ul id={listId} role="listbox" className="max-h-80 overflow-y-auto p-2">
                  {filtered.length === 0 ? (
                    <li className="px-3 py-6 text-center text-body-sm text-ink-tertiary">No results for &ldquo;{query}&rdquo;</li>
                  ) : (
                    groups.map(([group, groupItems]) => (
                      <li key={group} role="group" aria-label={group}>
                        <span className="block px-3 py-1.5 text-metadata text-ink-tertiary">{group}</span>
                        <ul>
                          {groupItems.map((item) => {
                            const index = filtered.indexOf(item);
                            return (
                              <li
                                key={item.id}
                                id={`${listId}-${item.id}`}
                                role="option"
                                aria-selected={index === activeIndex}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={selectActive}
                                className={cn(
                                  "cursor-pointer rounded-md px-3 py-2 text-body-sm text-ink-primary",
                                  index === activeIndex && "bg-surface-hover",
                                )}
                              >
                                {item.label}
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ))
                  )}
                </ul>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </Portal>
  );
}
