"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Stack } from "@/components/layout";
import { RequiredIndicator } from "./RequiredIndicator";
import { FieldError } from "./FieldError";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxFieldProps {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/**
 * A real, working typeahead — searches options as you type, with
 * Arrow/Enter/Escape keyboard support and the ARIA combobox pattern
 * (role="combobox" + a role="listbox" popup). Fills the Combobox gap
 * the Foundation Component Catalog has tracked as Needed since DS-2.1.1.
 */
export function ComboboxField({
  label,
  description,
  helperText,
  error,
  required = false,
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
  id,
}: ComboboxFieldProps) {
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
    <Stack gap="xs" className={className}>
      {description ? <p className="text-caption text-ink-tertiary">{description}</p> : null}
      {label ? (
        <label htmlFor={fieldId} className="text-body-sm font-medium text-ink-primary">
          {label}
          {required ? <RequiredIndicator /> : null}
        </label>
      ) : null}
      <div className="relative">
        <input
          id={fieldId}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          aria-autocomplete="list"
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
            "w-full rounded-md border bg-surface px-3 py-2 text-body-sm text-ink-primary outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
            error ? "border-error/60 focus-within:border-error" : "border-border focus-within:border-accent-500",
            disabled && "cursor-not-allowed opacity-40",
          )}
        />
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-tertiary" aria-hidden />
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
      {error ? <FieldError>{error}</FieldError> : helperText ? <p className="text-caption text-ink-tertiary">{helperText}</p> : null}
    </Stack>
  );
}
