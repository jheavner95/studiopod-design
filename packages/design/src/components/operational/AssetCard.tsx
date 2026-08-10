"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Checkbox, INTERACTIVE_CARD_CLASSES } from "@/components/ui";
import type { LinkComponent } from "@/framework";
import { AssetThumbnail } from "./AssetThumbnail";
import { AssetMetadata } from "./AssetMetadata";

export interface AssetCardProps {
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
  /**
   * Where the card goes. Prefer this over `onClick` whenever the card opens
   * something addressable: the card then renders a real anchor, so
   * middle-click, ⌘-click, "copy link" and the browser's own status bar work,
   * and assistive technology announces a link rather than a button.
   *
   * `onClick` remains for cards that select rather than navigate. Passing both
   * is a contradiction — `href` wins, and the card is a link.
   */
  href?: string;
  /**
   * What renders the link. Defaults to `"a"`; pass your framework's link
   * component for client-side navigation. A prop, not context, so this
   * component stays framework-independent.
   */
  linkComponent?: LinkComponent;
  /**
   * The card's accessible name, when the visible content is not a good one.
   *
   * The default name is the whole card — title plus every secondary line —
   * which a screen reader reads out in full. Supply something shorter when the
   * card carries metadata a listener does not need in order to choose.
   */
  "aria-label"?: string;
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
  href,
  linkComponent,
  "aria-label": ariaLabel,
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

  const interactive = href !== undefined || onClick !== undefined;

  const classes = cn(
    "flex flex-col gap-2 rounded-lg border p-2",
    selected ? "border-accent-500/60 bg-accent-soft/20" : "border-border-subtle",
    interactive
      ? cn("focus-ring cursor-pointer", INTERACTIVE_CARD_CLASSES)
      : "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
    className,
  );

  const body = (
    <>
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
    </>
  );

  /*
   * A card that navigates is an anchor, not a div pretending to be a button.
   * The selection checkbox keeps working inside it because its wrapper stops
   * the click from reaching the anchor.
   */
  if (href !== undefined) {
    const Link = linkComponent ?? "a";
    return (
      <Link href={href} className={cn(classes, "no-underline")} {...(ariaLabel === undefined ? {} : { "aria-label": ariaLabel })}>
        {body}
      </Link>
    );
  }

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={classes}
      {...(ariaLabel === undefined ? {} : { "aria-label": ariaLabel })}
    >
      {body}
    </div>
  );
}
