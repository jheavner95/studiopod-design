"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMotionPreference } from "@/components/motion/MotionPreference";
import { CONTROL_SWITCH_CLASSES, type ControlSize } from "@/lib/control-size";

export interface ToggleSwitchProps {
  className?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  helperText?: ReactNode;
  /** DS-5M: `sm` for dense operational rows; `md` (default) for forms. */
  size?: ControlSize;
  disabled?: boolean;
  id?: string;
  /** Required when rendering bare (no `label`) — the switch's accessible name. */
  "aria-label"?: string;
  /** Points at an existing element that names this switch, when rendering bare. */
  "aria-labelledby"?: string;
  /** Overrides aria-describedby — used by SwitchField to point at a separately-rendered FieldError instead of this component's own helperText paragraph. */
  describedBy?: string;
}

/**
 * A binary on/off control. Implemented as a native <button role="switch">
 * rather than a checkbox — the ARIA APG switch pattern, and it gets
 * Enter/Space toggling for free from button semantics.
 *
 * DS-5M: with no `label`/`helperText` it renders ONLY the switch (control
 * tier) — the shape a toolbar or settings row needs. Supply an accessible
 * name via `aria-label`/`aria-labelledby`.
 */
export function ToggleSwitch({
  className,
  checked,
  onChange,
  label,
  helperText,
  size = "md",
  disabled = false,
  id,
  describedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: ToggleSwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const helperId = helperText ? `${switchId}-helper` : undefined;
  const reduceMotion = useMotionPreference();
  const stacked = Boolean(label || helperText);
  const sizing = CONTROL_SWITCH_CLASSES[size];

  const control = (
    <button
      id={switchId}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={describedBy ?? helperId}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "focus-ring relative inline-flex shrink-0 items-center rounded-full border transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        sizing.track,
        checked ? "border-accent-500 bg-accent-500" : "border-border bg-surface-active",
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block rounded-full bg-white",
          sizing.thumb,
          !reduceMotion && "transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
          checked ? sizing.on : sizing.off,
        )}
      />
    </button>
  );

  if (!stacked) return control;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2.5">
        {control}
        {label ? (
          <label
            htmlFor={switchId}
            className={cn("text-body-sm text-ink-primary", disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer")}
          >
            {label}
          </label>
        ) : null}
      </div>

      {helperText ? (
        <p id={helperId} className="pl-[52px] text-caption text-ink-tertiary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
