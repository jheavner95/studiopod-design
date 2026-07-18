"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FieldStatus } from "./TextInput";
import {
  CONTROL_CHEVRON_CLASSES,
  CONTROL_ICON_SLOT_CLASSES,
  CONTROL_LEADING_ICON_PADDING,
  CONTROL_SELECT_CLASSES,
  type ControlSize,
} from "@/lib/control-size";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** DS-5M: `sm` (h-8) for filter bars and toolbars; `md` (default) for forms. */
  size?: ControlSize;
  /** DS-5M: an icon rendered inside the control's left edge. */
  leadingIcon?: ReactNode;
  status?: FieldStatus;
  className?: string;
  id?: string;
  /** Required when rendering bare — the combobox's accessible name. */
  "aria-label"?: string;
  /** Points at an existing element that names this combobox. */
  "aria-labelledby"?: string;
  /** Points at a separately-rendered message (used by ComboboxField). */
  describedBy?: string;
}

/**
 * DS-5M — the bare combobox control tier: a real typeahead that searches
 * options as you type, with Arrow/Enter/Escape support and the ARIA combobox
 * pattern (`role="combobox"` + a `role="listbox"` popup).
 *
 * This is the control only — no label, description, or error message. For a
 * full form field use `ComboboxField`, which composes this and adds them.
 * Rendering bare requires an accessible name via `aria-label`/`aria-labelledby`.
 */
export function Combobox({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  size = "md",
  leadingIcon,
  status = "default",
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  describedBy,
}: ComboboxProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const listId = `${fieldId}-listbox`;
  const [query, setQuery] = useState(() => options.find((option) => option.value === value)?.label ?? "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const filtered = options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));

  function selectOption(option: ComboboxOption) {
    onChange(option.value);
    setQuery(option.label);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      if (open && activeIndex >= 0 && filtered[activeIndex]) {
        event.preventDefault();
        selectOption(filtered[activeIndex]);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div className="relative">
      {leadingIcon ? (
        <span
          className={cn(
            "pointer-events-none absolute left-2.5 top-1/2 z-10 -translate-y-1/2 text-ink-tertiary",
            CONTROL_ICON_SLOT_CLASSES[size],
          )}
          aria-hidden
        >
          {leadingIcon}
        </span>
      ) : null}
      <input
        id={fieldId}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        aria-autocomplete="list"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={describedBy}
        aria-invalid={status === "error" || undefined}
        autoComplete="off"
        disabled={disabled}
        value={query}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        className={cn(
          "w-full rounded-md border bg-surface text-ink-primary outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
          CONTROL_SELECT_CLASSES[size],
          leadingIcon && CONTROL_LEADING_ICON_PADDING[size],
          status === "error" ? "border-error/60 focus-within:border-error" : "border-border focus-within:border-accent-500",
          disabled && "cursor-not-allowed opacity-40",
          className,
        )}
      />
      <ChevronDown
        className={cn("pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-tertiary", CONTROL_CHEVRON_CLASSES[size])}
        aria-hidden
      />
      {open && filtered.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-border bg-surface py-1 shadow-floating"
        >
          {filtered.map((option, index) => (
            <li
              key={option.value}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={option.value === value}
              onMouseDown={(event) => {
                event.preventDefault();
                selectOption(option);
              }}
              className={cn(
                "cursor-pointer px-3 py-2 text-body-sm text-ink-secondary",
                index === activeIndex ? "bg-accent-soft/30 text-ink-primary" : "hover:bg-canvas-raised",
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
      {open && query.length > 0 && filtered.length === 0 ? (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-body-sm text-ink-tertiary shadow-floating">
          No results
        </div>
      ) : null}
    </div>
  );
}
