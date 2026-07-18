"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./Button";

/**
 * DS-5N — a four-step square scale, anchored to the heights the rest of the
 * system already uses:
 *
 *   xs 24 · sm 28 · **md 32 (default)** · lg 40
 *
 * `md` (32) is `Button`'s own `sm` and the control tier's `sm` (h-8), so an
 * icon button sits flush beside either in a toolbar row. `lg` (40) is
 * `Button`'s `md` / the control tier's `md` (h-10). `xs` and `sm` sit below
 * that floor because dense table hover-actions and inspector rows genuinely
 * need them — DS-5L's rule: design around demonstrated need.
 *
 * `shrink-0` is load-bearing, not decoration: an IconButton's whole purpose is
 * to sit in a toolbar, which is a flex row. Without it the button is a
 * shrinkable flex item and collapses to its icon's intrinsic width the moment
 * the row is tight — square in isolation, 24px wide in the place it ships.
 */
const iconButtonSizeStyles = {
  xs: "size-6 shrink-0 p-0",
  sm: "size-7 shrink-0 p-0",
  md: "size-8 shrink-0 p-0",
  lg: "size-10 shrink-0 p-0",
} as const;

/** Icon sizing per footprint, so a 24px button never carries a 20px glyph. */
const iconButtonGlyphStyles = {
  xs: "[&_svg]:size-3.5",
  sm: "[&_svg]:size-4",
  md: "[&_svg]:size-4",
  lg: "[&_svg]:size-5",
} as const;

export type IconButtonSize = keyof typeof iconButtonSizeStyles;

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "aria-label"> {
  /** The icon to render. Sized by the button unless the caller overrides it. */
  icon: ReactNode;
  /** REQUIRED — an icon alone has no accessible name, so this is not optional. */
  "aria-label": string;
  className?: string;
  variant?: Extract<ButtonProps, { href?: undefined }>["variant"];
  size?: IconButtonSize;
  /**
   * DS-5N — a toggle button that is currently on (a pinned filter, an active
   * canvas tool). Renders `aria-pressed`, which is the ARIA toggle-button
   * pattern, plus the selected treatment. Leave undefined for a plain action
   * button, so `aria-pressed` is absent rather than "false".
   */
  pressed?: boolean;
  /** Shows a spinner in place of the icon and blocks interaction. */
  loading?: boolean;
}

/**
 * DS-5M/DS-5N — an icon-only button, built on `Button` rather than beside it,
 * so variants, focus ring, disabled, and loading behaviour can never drift
 * from the primary interactive primitive. It squares the footprint, sizes the
 * glyph, makes the accessible name mandatory, and adds a pressed state.
 *
 * Variants are Button's: `primary` · `secondary` · `outline` · `ghost` ·
 * `destructive`. `ghost` is the usual choice for toolbar affordances.
 */
export function IconButton({
  icon,
  "aria-label": ariaLabel,
  className,
  variant = "ghost",
  size = "md",
  pressed,
  loading = false,
  ...domProps
}: IconButtonProps) {
  return (
    <Button
      {...domProps}
      variant={variant}
      size={size === "lg" ? "md" : "sm"}
      loading={loading}
      aria-label={ariaLabel}
      aria-pressed={pressed}
      className={cn(
        iconButtonSizeStyles[size],
        iconButtonGlyphStyles[size],
        // Selected treatment for a toggle that is on — reads as depressed
        // without changing the variant the consumer chose.
        pressed && "bg-accent-soft text-accent-400 hover:bg-accent-soft",
        className,
      )}
    >
      {/* When loading, Button already renders its spinner in the leading slot —
          dropping the icon keeps the square button showing exactly one glyph. */}
      {loading ? null : icon}
    </Button>
  );
}
