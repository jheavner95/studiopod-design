"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { PlatformArchitecture } from "../types";

export interface PlatformNavigatorProps {
  architecture: PlatformArchitecture;
  selectedPlatformId?: string;
  onSelectPlatform?: (id: string) => void;
  className?: string;
}

/**
 * A keyboard-navigable list of every platform in an architecture, using a
 * roving-tabindex listbox pattern: arrow keys move focus, Enter/Space
 * selects, only one button sits in the tab order at a time.
 */
export function PlatformNavigator({
  architecture,
  selectedPlatformId,
  onSelectPlatform,
  className,
}: PlatformNavigatorProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusIndex = (index: number) => {
    const count = architecture.platforms.length;
    const clamped = (index + count) % count;
    buttonRefs.current[clamped]?.focus();
  };

  return (
    <div role="listbox" aria-label="Platforms" className={cn("flex flex-wrap gap-2", className)}>
      {architecture.platforms.map((platform, index) => {
        const selected = platform.id === selectedPlatformId;
        const isTabbable = selectedPlatformId ? selected : index === 0;

        return (
          <button
            key={platform.id}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            type="button"
            role="option"
            aria-selected={selected}
            tabIndex={isTabbable ? 0 : -1}
            onClick={() => onSelectPlatform?.(platform.id)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                focusIndex(index + 1);
              }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                focusIndex(index - 1);
              }
            }}
            className={cn(
              "focus-ring flex items-center gap-2 rounded-full border px-3 py-1.5 text-body-sm transition-colors duration-[var(--duration-fast)]",
              selected
                ? "border-accent-500 bg-accent-soft text-accent-400"
                : "border-border-subtle text-ink-secondary hover:text-ink-primary",
            )}
          >
            {platform.icon}
            {platform.shortName ?? platform.name}
          </button>
        );
      })}
    </div>
  );
}
