"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Stack } from "@/components/layout";
import { RequiredIndicator } from "./RequiredIndicator";
import { FieldError } from "./FieldError";

interface DatePickerFieldProps {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/**
 * A native <input type="date"> — the browser's own calendar grid gives
 * real keyboard navigation for free, which is why this is marked
 * Exists (not just Partial) in the Foundation Component Catalog. A
 * custom-styled calendar popover is tracked as a Future Extension, not
 * a blocker for this being a real, accessible date field today.
 */
export function DatePickerField({
  label,
  description,
  helperText,
  error,
  required = false,
  value,
  onChange,
  min,
  max,
  disabled = false,
  id,
  className,
}: DatePickerFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const helperId = helperText || error ? `${fieldId}-message` : undefined;

  return (
    <Stack gap="xs" className={className}>
      {description ? <p className="text-caption text-ink-tertiary">{description}</p> : null}
      {label ? (
        <label htmlFor={fieldId} className="text-body-sm font-medium text-ink-primary">
          {label}
          {required ? <RequiredIndicator /> : null}
        </label>
      ) : null}
      <input
        id={fieldId}
        type="date"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={helperId}
        className={cn(
          "w-full rounded-md border bg-surface px-3 py-2 text-body-sm text-ink-primary outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
          "[color-scheme:dark]",
          error ? "border-error/60 focus-within:border-error" : "border-border focus-within:border-accent-500",
          disabled && "cursor-not-allowed opacity-40",
        )}
      />
      {error ? (
        <FieldError id={helperId}>{error}</FieldError>
      ) : helperText ? (
        <p id={helperId} className="text-caption text-ink-tertiary">
          {helperText}
        </p>
      ) : null}
    </Stack>
  );
}
