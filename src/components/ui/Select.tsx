"use client";

import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FieldStatus } from "./TextInput";

const statusBorderStyles: Record<FieldStatus, string> = {
  default: "border-border focus-within:border-accent-500",
  error: "border-error/60 focus-within:border-error",
  success: "border-success/60 focus-within:border-success",
};

const statusHelperStyles: Record<FieldStatus, string> = {
  default: "text-ink-tertiary",
  error: "text-error",
  success: "text-success",
};

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  className?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  status?: FieldStatus;
  options: SelectOption[];
  placeholder?: string;
  /** Overrides aria-describedby — used by SelectField to point at a separately-rendered FieldError instead of this component's own helperText paragraph. */
  describedBy?: string;
}

/**
 * A native <select>, styled to match the rest of the form system. Native
 * over a custom listbox: full keyboard support, screen-reader semantics,
 * and mobile picker UI come for free, with no extra dependency.
 */
export function Select({
  className,
  label,
  helperText,
  status = "default",
  options,
  placeholder,
  describedBy,
  id,
  disabled,
  required,
  value,
  ...domProps
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = helperText ? `${selectId}-helper` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={selectId} className="text-body-sm font-medium text-ink-primary">
          {label}
          {required ? <span className="ml-0.5 text-error">*</span> : null}
        </label>
      ) : null}

      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          required={required}
          value={value}
          defaultValue={value === undefined && placeholder ? "" : undefined}
          aria-invalid={status === "error" || undefined}
          aria-describedby={describedBy ?? helperId}
          className={cn(
            "w-full appearance-none rounded-md border bg-surface py-2 pl-3 pr-9 text-body-sm text-ink-primary outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:ring-2 focus-visible:ring-accent-500/30 disabled:cursor-not-allowed disabled:opacity-40",
            statusBorderStyles[status],
            className,
          )}
          {...domProps}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-tertiary"
          aria-hidden
        />
      </div>

      {helperText ? (
        <p id={helperId} className={cn("text-caption", statusHelperStyles[status])}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
