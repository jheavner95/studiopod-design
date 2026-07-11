"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type" | "size"> {
  className?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  /** Visually mixed state (e.g. a "select all" driving mixed children) — sets the DOM indeterminate property, which HTML has no attribute for. */
  indeterminate?: boolean;
  /** Overrides aria-describedby — used by CheckboxField to point at a separately-rendered FieldError instead of this component's own helperText paragraph. */
  describedBy?: string;
}

/** Standard checkbox — a native, fully-accessible input under a custom visual box, so keyboard/screen-reader behavior is never reimplemented. */
export function Checkbox({
  className,
  label,
  helperText,
  indeterminate = false,
  describedBy,
  id,
  disabled,
  ...domProps
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const helperId = helperText ? `${checkboxId}-helper` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-2.5">
        <span className="relative mt-0.5 inline-flex size-5 shrink-0">
          <input
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            aria-describedby={describedBy ?? helperId}
            ref={(el) => {
              if (el) el.indeterminate = indeterminate;
            }}
            className={cn(
              "peer absolute inset-0 size-5 shrink-0 cursor-pointer appearance-none rounded-md border border-border bg-surface transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              "checked:border-accent-500 checked:bg-accent-500 indeterminate:border-accent-500 indeterminate:bg-accent-500",
              "focus-ring disabled:cursor-not-allowed disabled:opacity-40",
              className,
            )}
            {...domProps}
          />
          <Check
            className="pointer-events-none relative m-auto size-3.5 text-white opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0"
            aria-hidden
          />
          <Minus
            className="pointer-events-none absolute inset-0 m-auto size-3.5 text-white opacity-0 peer-indeterminate:opacity-100"
            aria-hidden
          />
        </span>
        {label ? (
          <label
            htmlFor={checkboxId}
            className={cn("text-body-sm text-ink-primary", disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer")}
          >
            {label}
          </label>
        ) : null}
      </div>

      {helperText ? (
        <p id={helperId} className="pl-[30px] text-caption text-ink-tertiary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
