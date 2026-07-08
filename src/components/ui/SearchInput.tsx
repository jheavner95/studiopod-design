"use client";

import { useId, type ReactNode } from "react";
import { Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: ReactNode;
  /** Shown below the input — e.g. "No results for “x”" once a search has run empty. */
  emptyStateHelper?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  id?: string;
}

/** A search field with a leading icon, a clear button once there's a query, and an inline loading spinner. */
export function SearchInput({
  className,
  value,
  onChange,
  placeholder = "Search",
  label,
  emptyStateHelper,
  loading = false,
  disabled = false,
  id,
}: SearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = emptyStateHelper ? `${inputId}-helper` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-body-sm font-medium text-ink-primary">
          {label}
        </label>
      ) : null}

      <div
        className={cn(
          "flex items-center gap-2 rounded-md border border-border bg-surface px-3 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-within:border-accent-500",
          disabled && "cursor-not-allowed opacity-40",
          className,
        )}
      >
        <Search className="size-4 shrink-0 text-ink-tertiary" aria-hidden />
        <input
          id={inputId}
          type="text"
          role="searchbox"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-describedby={helperId}
          className="min-w-0 flex-1 bg-transparent py-2 text-body-sm text-ink-primary outline-none placeholder:text-ink-tertiary disabled:cursor-not-allowed"
        />
        {loading ? (
          <Loader2 className="size-4 shrink-0 animate-spin text-ink-tertiary" aria-hidden />
        ) : value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="focus-ring flex shrink-0 items-center justify-center rounded-full p-0.5 text-ink-tertiary hover:text-ink-primary"
          >
            <X className="size-3.5" />
          </button>
        ) : null}
      </div>

      {emptyStateHelper ? (
        <p id={helperId} className="text-caption text-ink-tertiary">
          {emptyStateHelper}
        </p>
      ) : null}
    </div>
  );
}
