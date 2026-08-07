"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";
import { Body, Caption } from "./Typography";
import { Activate } from "@/motion";

export interface SelectableCardProps {
  title: ReactNode;
  description?: ReactNode;
  /** Trailing metadata line, e.g. "3 required · 2 optional". */
  meta?: ReactNode;
  /** Rendered beside the title, e.g. a status Badge. */
  badge?: ReactNode;
  selected: boolean;
  onSelect: () => void;
  padding?: "sm" | "md";
  descriptionClamp?: 1 | 2;
  /** Accessible label override for the whole card, when `title` alone doesn't say enough. */
  srLabel?: string;
  id?: string;
  className?: string;
}

/**
 * DS-8.1 — the one selection-card treatment for "click to select or
 * highlight, not navigate" surfaces: anatomy-region explorers, filterable
 * catalogs, mode pickers. A native `<button aria-pressed>` wraps
 * `Card interactive` so the hover/focus/lift affordance matches every
 * navigating `DocsLinkCard`, while `aria-pressed` (not a link) correctly
 * announces this as a toggle rather than navigation.
 */
export function SelectableCard({
  title,
  description,
  meta,
  badge,
  selected,
  onSelect,
  padding = "md",
  descriptionClamp = 2,
  srLabel,
  id,
  className,
}: SelectableCardProps) {
  return (
    <button
      type="button"
      id={id}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={srLabel}
      className="focus-ring block w-full rounded-lg text-left"
    >
      <Activate state={selected ? "active" : "inactive"} className="rounded-lg">
        <Card
          interactive
          padding={padding}
          className={cn("flex h-full flex-col gap-1.5", selected && "border-accent-500/60 bg-accent-soft/30", className)}
        >
          <div className="flex items-start justify-between gap-2">
            <span className={cn("font-medium text-ink-primary", padding === "sm" ? "text-body-sm" : "text-body-md")}>{title}</span>
            {badge}
          </div>
          {description ? (
            <Body size="sm" muted className={descriptionClamp === 1 ? "line-clamp-1" : "line-clamp-2"}>
              {description}
            </Body>
          ) : null}
          {meta ? <Caption className="mt-auto text-ink-tertiary">{meta}</Caption> : null}
        </Card>
      </Activate>
    </button>
  );
}
