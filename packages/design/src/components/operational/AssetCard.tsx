"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Checkbox, INTERACTIVE_CARD_CLASSES } from "@/components/ui";
import { AssetThumbnail } from "./AssetThumbnail";
import { AssetMetadata } from "./AssetMetadata";

interface AssetCardProps {
  name: ReactNode;
  secondary?: ReactNode[];
  thumbnailSrc?: string;
  thumbnailFallbackIcon?: ReactNode;
  /** A Badge element (or similar) overlaid on the thumbnail's corner. */
  status?: ReactNode;
  selectable?: boolean;
  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;
  selectLabel?: string;
  onClick?: () => void;
  className?: string;
}

/** The single visual unit AssetGrid arranges — composes AssetThumbnail + AssetMetadata directly, plus an always-visible selection checkbox (never hover-only, so it stays keyboard- and touch-discoverable). */
export function AssetCard({
  name,
  secondary,
  thumbnailSrc,
  thumbnailFallbackIcon,
  status,
  selectable = false,
  selected = false,
  onSelectChange,
  selectLabel,
  onClick,
  className,
}: AssetCardProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  }

  function stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex flex-col gap-2 rounded-lg border p-2",
        selected ? "border-accent-500/60 bg-accent-soft/20" : "border-border-subtle",
        onClick ? cn("focus-ring cursor-pointer", INTERACTIVE_CARD_CLASSES) : "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        className,
      )}
    >
      <div className="relative">
        <AssetThumbnail src={thumbnailSrc} alt={typeof name === "string" ? name : "Asset"} fallbackIcon={thumbnailFallbackIcon} />
        {selectable ? (
          <div className="absolute left-1.5 top-1.5" onClick={stopPropagation}>
            <Checkbox checked={selected} onChange={(event) => onSelectChange?.(event.target.checked)} aria-label={selectLabel ?? "Select"} />
          </div>
        ) : null}
        {status ? <div className="absolute right-1.5 top-1.5">{status}</div> : null}
      </div>
      <AssetMetadata name={name} secondary={secondary} />
    </div>
  );
}
