"use client";

import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
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

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "size"> {
  className?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  status?: FieldStatus;
  /** DS-5M: `sm` (h-8, matching Button's own sm) for filter bars and toolbars; `md` (default) for forms. */
  size?: ControlSize;
  options: SelectOption[];
  placeholder?: string;
  /** DS-5M: an icon rendered inside the control's left edge — the filter-bar affordance operational rows rely on. */
  leadingIcon?: ReactNode;
  /** Overrides aria-describedby — used by SelectField to point at a separately-rendered FieldError instead of this component's own helperText paragraph. */
  describedBy?: string;
}

/**
 * A native <select>, styled to match the rest of the form system. Native
 * over a custom listbox: full keyboard support, screen-reader semantics,
 * and mobile picker UI come for free, with no extra dependency.
 *
 * DS-5M — two tiers in one component:
 *  - **Bare (control tier):** no `label`/`helperText` renders ONLY the select,
 *    intrinsically sized (no `w-full`), for filter bars and toolbars. Supply an
 *    accessible name via `aria-label`/`aria-labelledby`.
 *  - **Stacked (field tier):** `label`/`helperText` render exactly as before,
 *    full-width in their column.
 */
export function Select({
  className,
  label,
  helperText,
  status = "default",
  size = "md",
  options,
  placeholder,
  leadingIcon,
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
  const stacked = Boolean(label || helperText);

  const control = (
    <div className={cn("relative", stacked ? "w-full" : "inline-flex")}>
      {leadingIcon ? (
        <span
          className={cn(
            "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-tertiary",
            CONTROL_ICON_SLOT_CLASSES[size],
          )}
          aria-hidden
        >
          {leadingIcon}
        </span>
      ) : null}
      <select
        id={selectId}
        disabled={disabled}
        required={required}
        value={value}
        defaultValue={value === undefined && placeholder ? "" : undefined}
        aria-invalid={status === "error" || undefined}
        aria-describedby={describedBy ?? helperId}
        className={cn(
          "appearance-none rounded-md border bg-surface text-ink-primary outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:ring-2 focus-visible:ring-accent-500/30 disabled:cursor-not-allowed disabled:opacity-40",
          stacked && "w-full",
          CONTROL_SELECT_CLASSES[size],
          leadingIcon && CONTROL_LEADING_ICON_PADDING[size],
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
        className={cn("pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-tertiary", CONTROL_CHEVRON_CLASSES[size])}
        aria-hidden
      />
    </div>
  );

  if (!stacked) return control;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={selectId} className="text-body-sm font-medium text-ink-primary">
          {label}
          {required ? <span className="ml-0.5 text-error">*</span> : null}
        </label>
      ) : null}

      {control}

      {helperText ? (
        <p id={helperId} className={cn("text-caption", statusHelperStyles[status])}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
