"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  CONTROL_FRAME_CLASSES,
  CONTROL_FRAME_INPUT_CLASSES,
  CONTROL_ICON_SLOT_CLASSES,
  type ControlSize,
} from "@/lib/control-size";

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
  /** DS-5M: `sm` (h-8, matching Button's own sm) for dense operational rows; `md` (default) for forms. */
  size?: ControlSize;
  leadingIcon?: ReactNode;
  /** A trailing slot — a clear button, a password-reveal toggle, a unit label. */
  trailingAction?: ReactNode;
  /** Overrides aria-describedby — used by *Field wrappers to point the input at a separately-rendered FieldError instead of this component's own helperText paragraph. */
  describedBy?: string;
}

/**
 * Standard single-line text input. For search-specific chrome (clear
 * button, loading state) use SearchInput, which wraps this same base look.
 *
 * DS-5M — two tiers in one component:
 *  - **Bare (control tier):** with no `label` and no `helperText` it renders
 *    ONLY the input frame, intrinsically sized, so it drops into a toolbar or
 *    table row without a stacked wrapper forcing a block layout. Supply an
 *    accessible name via `aria-label`/`aria-labelledby`.
 *  - **Stacked (field tier):** pass `label`/`helperText` and it renders exactly
 *    as it always has — label above, helper below.
 */
export function TextInput({
  className,
  label,
  helperText,
  status = "default",
  size = "md",
  leadingIcon,
  trailingAction,
  describedBy,
  id,
  disabled,
  required,
  ...domProps
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const stacked = Boolean(label || helperText);

  const frame = (
    <div
      className={cn(
        // Bare controls size to their content; stacked fields fill their column.
        stacked ? "flex" : "inline-flex",
        "items-center rounded-md border bg-surface transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        "has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-accent-500/30",
        CONTROL_FRAME_CLASSES[size],
        statusBorderStyles[status],
        disabled && "cursor-not-allowed opacity-40",
        className,
      )}
    >
      {leadingIcon ? (
        <span className={cn("flex shrink-0 items-center text-ink-tertiary", CONTROL_ICON_SLOT_CLASSES[size])} aria-hidden>
          {leadingIcon}
        </span>
      ) : null}
      <input
        id={inputId}
        disabled={disabled}
        required={required}
        aria-invalid={status === "error" || undefined}
        aria-describedby={describedBy ?? helperId}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-ink-primary outline-none placeholder:text-ink-tertiary disabled:cursor-not-allowed",
          CONTROL_FRAME_INPUT_CLASSES[size],
        )}
        {...domProps}
      />
      {trailingAction ? (
        <span className={cn("flex shrink-0 items-center", CONTROL_ICON_SLOT_CLASSES[size])} onClick={(e) => e.stopPropagation()}>
          {trailingAction}
        </span>
      ) : null}
    </div>
  );

  if (!stacked) return frame;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-body-sm font-medium text-ink-primary">
          {label}
          {required ? <span className="ml-0.5 text-error">*</span> : null}
        </label>
      ) : null}

      {frame}

      {helperText ? (
        <p id={helperId} className={cn("text-caption", statusHelperStyles[status])}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
