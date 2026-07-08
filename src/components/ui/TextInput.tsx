"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FieldStatus = "default" | "error" | "success";

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

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size"> {
  className?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  status?: FieldStatus;
  leadingIcon?: ReactNode;
  /** A trailing slot — a clear button, a password-reveal toggle, a unit label. */
  trailingAction?: ReactNode;
}

/**
 * Standard single-line text input. For search-specific chrome (clear
 * button, loading state) use SearchInput, which wraps this same base look.
 */
export function TextInput({
  className,
  label,
  helperText,
  status = "default",
  leadingIcon,
  trailingAction,
  id,
  disabled,
  required,
  ...domProps
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-body-sm font-medium text-ink-primary">
          {label}
          {required ? <span className="ml-0.5 text-error">*</span> : null}
        </label>
      ) : null}

      <div
        className={cn(
          "flex items-center gap-2 rounded-md border bg-surface px-3 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
          "has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-accent-500/30",
          statusBorderStyles[status],
          disabled && "cursor-not-allowed opacity-40",
          className,
        )}
      >
        {leadingIcon ? (
          <span className="flex shrink-0 items-center text-ink-tertiary" aria-hidden>
            {leadingIcon}
          </span>
        ) : null}
        <input
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={status === "error" || undefined}
          aria-describedby={helperId}
          className="min-w-0 flex-1 bg-transparent py-2 text-body-sm text-ink-primary outline-none placeholder:text-ink-tertiary disabled:cursor-not-allowed"
          {...domProps}
        />
        {trailingAction ? (
          <span className="flex shrink-0 items-center" onClick={(e) => e.stopPropagation()}>
            {trailingAction}
          </span>
        ) : null}
      </div>

      {helperText ? (
        <p id={helperId} className={cn("text-caption", statusHelperStyles[status])}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
