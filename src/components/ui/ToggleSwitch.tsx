"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMotionPreference } from "@/components/motion/MotionPreference";

export interface ToggleSwitchProps {
  className?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  helperText?: ReactNode;
  disabled?: boolean;
  id?: string;
}

/**
 * A binary on/off control. Implemented as a native <button role="switch">
 * rather than a checkbox — the ARIA APG switch pattern, and it gets
 * Enter/Space toggling for free from button semantics.
 */
export function ToggleSwitch({ className, checked, onChange, label, helperText, disabled = false, id }: ToggleSwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const helperId = helperText ? `${switchId}-helper` : undefined;
  const reduceMotion = useMotionPreference();

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2.5">
        <button
          id={switchId}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-describedby={helperId}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={cn(
            "focus-ring relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
            checked ? "border-accent-500 bg-accent-500" : "border-border bg-surface-active",
            disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
            className,
          )}
        >
          <span
            className={cn(
              "inline-block size-4 translate-x-1 rounded-full bg-white",
              !reduceMotion && "transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              checked && "translate-x-5",
            )}
          />
        </button>
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
