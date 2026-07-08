"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  className?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  name?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
}

/** A set of mutually-exclusive native radio inputs under custom dot styling. */
export function RadioGroup({
  className,
  label,
  helperText,
  name,
  options,
  value,
  defaultValue,
  onChange,
  orientation = "vertical",
  disabled = false,
}: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const groupLabelId = `${groupName}-label`;
  const helperId = helperText ? `${groupName}-helper` : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)} role="radiogroup" aria-labelledby={label ? groupLabelId : undefined}>
      {label ? (
        <span id={groupLabelId} className="text-body-sm font-medium text-ink-primary">
          {label}
        </span>
      ) : null}

      <div className={cn("flex gap-3", orientation === "horizontal" ? "flex-row flex-wrap items-center" : "flex-col")}>
        {options.map((option) => {
          const optionId = `${groupName}-${option.value}`;
          const isDisabled = disabled || option.disabled;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                "inline-flex items-center gap-2.5",
                isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
              )}
            >
              <span className="relative inline-flex size-5 shrink-0">
                <input
                  id={optionId}
                  type="radio"
                  name={groupName}
                  value={option.value}
                  disabled={isDisabled}
                  checked={value !== undefined ? value === option.value : undefined}
                  defaultChecked={value === undefined ? defaultValue === option.value : undefined}
                  onChange={() => onChange?.(option.value)}
                  aria-describedby={helperId}
                  className={cn(
                    "peer absolute inset-0 size-5 cursor-pointer appearance-none rounded-full border border-border bg-surface transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                    "checked:border-accent-500",
                    "focus-ring disabled:cursor-not-allowed",
                  )}
                />
                <span className="pointer-events-none relative m-auto size-2 scale-0 rounded-full bg-accent-500 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] peer-checked:scale-100" />
              </span>
              <span className="text-body-sm text-ink-primary">{option.label}</span>
            </label>
          );
        })}
      </div>

      {helperText ? (
        <p id={helperId} className="text-caption text-ink-tertiary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
