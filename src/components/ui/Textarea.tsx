"use client";

import { useId, type TextareaHTMLAttributes } from "react";
import type { ReactNode } from "react";
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

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  className?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  status?: FieldStatus;
  /** Allows the user to drag-resize vertically. Defaults to fixed (no resize handle). */
  resizable?: boolean;
}

/** Standard multi-line text input, sharing TextInput's label/status/helper-text conventions. */
export function Textarea({
  className,
  label,
  helperText,
  status = "default",
  resizable = false,
  id,
  disabled,
  required,
  rows = 4,
  ...domProps
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const helperId = helperText ? `${textareaId}-helper` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={textareaId} className="text-body-sm font-medium text-ink-primary">
          {label}
          {required ? <span className="ml-0.5 text-error">*</span> : null}
        </label>
      ) : null}

      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        required={required}
        aria-invalid={status === "error" || undefined}
        aria-describedby={helperId}
        className={cn(
          "rounded-md border bg-surface px-3 py-2 text-body-sm text-ink-primary outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] placeholder:text-ink-tertiary focus-visible:ring-2 focus-visible:ring-accent-500/30 disabled:cursor-not-allowed disabled:opacity-40",
          resizable ? "resize-y" : "resize-none",
          statusBorderStyles[status],
          className,
        )}
        {...domProps}
      />

      {helperText ? (
        <p id={helperId} className={cn("text-caption", statusHelperStyles[status])}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
