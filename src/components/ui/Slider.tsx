"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SliderProps {
  className?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Formats the current value for display next to the label — e.g. `(v) => \`${v}%\`` . Defaults to the raw number. */
  formatValue?: (value: number) => ReactNode;
  id?: string;
  /** Overrides aria-describedby — used by SliderField to point at a separately-rendered FieldError instead of this component's own helperText paragraph. */
  describedBy?: string;
}

/** A native range input — arrow keys, Home/End, and Page Up/Down all work automatically — styled with the accent token via `accent-*`. */
export function Slider({
  className,
  label,
  helperText,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  formatValue,
  id,
  describedBy,
}: SliderProps) {
  const generatedId = useId();
  const sliderId = id ?? generatedId;
  const helperId = helperText ? `${sliderId}-helper` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        {label ? (
          <label htmlFor={sliderId} className="text-body-sm font-medium text-ink-primary">
            {label}
          </label>
        ) : null}
        <span className="text-caption text-ink-tertiary" aria-hidden>
          {formatValue ? formatValue(value) : value}
        </span>
      </div>

      <input
        id={sliderId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-describedby={describedBy ?? helperId}
        aria-valuetext={formatValue ? String(formatValue(value)) : undefined}
        className={cn(
          "focus-ring h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-active accent-accent-500",
          disabled && "cursor-not-allowed opacity-40",
          className,
        )}
      />

      {helperText ? (
        <p id={helperId} className="text-caption text-ink-tertiary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
