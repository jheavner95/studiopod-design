"use client";

import { useId, type ReactNode } from "react";
import { Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONTROL_FRAME_CLASSES,
  CONTROL_FRAME_INPUT_CLASSES,
  CONTROL_ICON_SLOT_CLASSES,
  type ControlSize,
} from "@/lib/control-size";

export interface SearchInputProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: ReactNode;
  /** DS-5M: `sm` (h-8) for toolbars and filter bars; `md` (default) for forms. */
  size?: ControlSize;
  /** Shown below the input — e.g. "No results for “x”" once a search has run empty. */
  emptyStateHelper?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  id?: string;
  /** Required when rendering bare (no `label`) — a placeholder is not an accessible name. */
  "aria-label"?: string;
  /** Points at an existing element that names this search field, when rendering bare. */
  "aria-labelledby"?: string;
}

/**
 * A search field with a leading icon, a clear button once there's a query, and an inline loading spinner.
 *
 * DS-5M: with no `label`/`emptyStateHelper` it renders ONLY the frame (control
 * tier), intrinsically sized for a toolbar. Supply an accessible name via
 * `aria-label`/`aria-labelledby` — `placeholder` is not one.
 */
export function SearchInput({
  className,
  value,
  onChange,
  placeholder = "Search",
  label,
  size = "md",
  emptyStateHelper,
  loading = false,
  disabled = false,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = emptyStateHelper ? `${inputId}-helper` : undefined;
  const stacked = Boolean(label || emptyStateHelper);

  const frame = (
    <div
      className={cn(
        stacked ? "flex" : "inline-flex",
        "items-center rounded-md border border-border bg-surface transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-within:border-accent-500",
        CONTROL_FRAME_CLASSES[size],
        CONTROL_ICON_SLOT_CLASSES[size],
        disabled && "cursor-not-allowed opacity-40",
        className,
      )}
    >
      <Search className="shrink-0 text-ink-tertiary" aria-hidden />
      <input
        id={inputId}
        type="text"
        role="searchbox"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={helperId}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-ink-primary outline-none placeholder:text-ink-tertiary disabled:cursor-not-allowed",
          CONTROL_FRAME_INPUT_CLASSES[size],
        )}
      />
      {loading ? (
        <Loader2 className="shrink-0 animate-spin text-ink-tertiary" aria-hidden />
      ) : value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="focus-ring flex shrink-0 items-center justify-center rounded-full p-0.5 text-ink-tertiary hover:text-ink-primary"
        >
          <X />
        </button>
      ) : null}
    </div>
  );

  if (!stacked) return frame;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-body-sm font-medium text-ink-primary">
          {label}
        </label>
      ) : null}

      {frame}

      {emptyStateHelper ? (
        <p id={helperId} className="text-caption text-ink-tertiary">
          {emptyStateHelper}
        </p>
      ) : null}
    </div>
  );
}
