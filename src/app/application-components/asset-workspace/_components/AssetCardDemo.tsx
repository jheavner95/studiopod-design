"use client";

import { useState } from "react";
import { Check, Copy, Archive, Image as ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, Body, Caption, INTERACTIVE_CARD_CLASSES } from "@/components/ui";
import { ASSET_CARD_ANATOMY } from "../_data/asset-card-anatomy";

/**
 * A genuinely interactive asset card — real :hover and :focus-visible via
 * the browser, toggleable Selection and Expanded State via click/keyboard.
 * The outer surface is a div with role="button" (not a real <button>)
 * specifically so Quick Actions can be real, non-nested <button> siblings.
 */
export function AssetCardDemo() {
  const [selected, setSelected] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleSelected = () => setSelected((value) => !value);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <div
          role="button"
          tabIndex={0}
          aria-pressed={selected}
          aria-label="Summer Collection Tee — press to toggle selection"
          onClick={toggleSelected}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toggleSelected();
            }
          }}
          className={cn(
            "focus-ring group flex cursor-pointer flex-col gap-0 overflow-hidden rounded-lg border bg-surface",
            INTERACTIVE_CARD_CLASSES,
            selected ? "border-accent-500/70 bg-accent-soft/20" : "border-border",
          )}
        >
          <div className="relative flex h-36 items-center justify-center bg-canvas-raised">
            <ImageIcon className="size-8 text-ink-tertiary" aria-hidden />
            <div
              className={cn(
                "absolute left-2 top-2 flex size-5 items-center justify-center rounded border transition-opacity duration-[var(--duration-fast)]",
                selected
                  ? "border-accent-500 bg-accent-500 opacity-100"
                  : "border-border bg-canvas/80 opacity-0 group-hover:opacity-100",
              )}
              aria-hidden
            >
              {selected ? <Check className="size-3.5 text-white" /> : null}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 p-3">
            <span className="text-body-sm font-medium text-ink-primary">Summer Collection — Tee</span>
            <Caption className="text-ink-tertiary">SKU-10293 · Publishing</Caption>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <Badge tone="success" size="sm">
                Published
              </Badge>
              <Badge tone="warning" size="sm">
                2 issues
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Badge tone="neutral" size="sm">
                Apparel
              </Badge>
              <Badge tone="neutral" size="sm">
                Q3
              </Badge>
            </div>

            {expanded ? (
              <div className="flex flex-col gap-1 border-t border-border-subtle pt-2 mt-1">
                <Caption className="text-ink-tertiary">Modified 2 days ago · Owner J. Rivera</Caption>
                <Caption className="text-ink-tertiary">3 ratios · 2 export presets</Caption>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between border-t border-border-subtle px-2 py-1.5">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(event) => event.stopPropagation()}
                aria-label="Duplicate"
                className="focus-ring flex size-7 items-center justify-center rounded-md text-ink-tertiary transition-colors duration-[var(--duration-fast)] hover:bg-surface-hover hover:text-ink-primary"
              >
                <Copy className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={(event) => event.stopPropagation()}
                aria-label="Archive"
                className="focus-ring flex size-7 items-center justify-center rounded-md text-ink-tertiary transition-colors duration-[var(--duration-fast)] hover:bg-surface-hover hover:text-ink-primary"
              >
                <Archive className="size-4" aria-hidden />
              </button>
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setExpanded((value) => !value);
              }}
              className="focus-ring flex items-center gap-1 rounded-md px-2 py-1 text-caption font-medium text-ink-tertiary transition-colors duration-[var(--duration-fast)] hover:bg-surface-hover hover:text-ink-primary"
            >
              {expanded ? "Less" : "More"}
              {expanded ? <ChevronUp className="size-3.5" aria-hidden /> : <ChevronDown className="size-3.5" aria-hidden />}
            </button>
          </div>
        </div>

        <Caption className="text-ink-tertiary">
          Try it: hover, tab to it and press Space, click to select, or use Quick Actions and More.
        </Caption>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ASSET_CARD_ANATOMY.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 rounded-md border border-border-subtle bg-surface p-3">
              <span className="text-body-sm font-medium text-ink-primary">{item.label}</span>
              <Body size="sm" muted className="min-w-0 break-words">
                {item.description}
              </Body>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
