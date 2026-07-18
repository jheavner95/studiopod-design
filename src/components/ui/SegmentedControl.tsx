"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  CONTROL_ICON_SLOT_CLASSES,
  CONTROL_SEGMENT_CLASSES,
  CONTROL_SEGMENT_TRACK_CLASSES,
  type ControlSize,
} from "@/lib/control-size";

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
  /** Accessible name for icon-only labels — the button has no other text content to compute one from. */
  "aria-label"?: string;
}

export interface SegmentedControlProps<T extends string> {
  className?: string;
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  /**
   * DS-5O — the shared `ControlSize` scale. `md` (default) is unchanged; `sm`
   * renders the whole pill at 28px for dense library and workspace headers,
   * matching every other `sm` control in this system.
   */
  size?: ControlSize;
  "aria-label"?: string;
}

/**
 * A single-select pill group (2–4 options) — playback speed, view mode,
 * density. Implements the ARIA APG "radio group" roving-tabindex pattern:
 * only the active segment is tab-stoppable, arrow keys move between the
 * rest, so keyboard users don't have to tab through every option.
 */
export function SegmentedControl<T extends string>({
  className,
  options,
  value,
  onChange,
  disabled = false,
  size = "md",
  "aria-label": ariaLabel,
}: SegmentedControlProps<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusIndex = (index: number) => {
    const target = refs.current[index];
    if (target) target.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const enabledIndexes = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i !== -1);
    if (enabledIndexes.length === 0) return;
    const currentPos = enabledIndexes.indexOf(index);

    let nextPos: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextPos = (currentPos + 1) % enabledIndexes.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextPos = (currentPos - 1 + enabledIndexes.length) % enabledIndexes.length;
    } else if (event.key === "Home") {
      nextPos = 0;
    } else if (event.key === "End") {
      nextPos = enabledIndexes.length - 1;
    }

    if (nextPos !== null) {
      event.preventDefault();
      const nextIndex = enabledIndexes[nextPos];
      focusIndex(nextIndex);
      onChange(options[nextIndex].value);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border-subtle",
        CONTROL_SEGMENT_TRACK_CLASSES[size],
        className,
      )}
    >
      {options.map((option, index) => {
        const isActive = option.value === value;
        const isDisabled = disabled || option.disabled;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={option["aria-label"]}
            disabled={isDisabled}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              // inline-flex centers the label against `sm`'s explicit height and
              // keeps an icon+text label on one baseline; at `md` the box is
              // still padding-driven, so the rendering is unchanged.
              "focus-ring inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              CONTROL_SEGMENT_CLASSES[size],
              CONTROL_ICON_SLOT_CLASSES[size],
              isActive ? "bg-accent-500 text-white" : "text-ink-tertiary hover:text-ink-primary",
              isDisabled && "cursor-not-allowed opacity-40",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
