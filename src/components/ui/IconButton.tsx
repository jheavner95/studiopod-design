"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./Button";

/**
 * Square footprints — `sm` matches Button's own sm height (h-8), `md` its md (h-10).
 *
 * `shrink-0` is load-bearing, not decoration: an IconButton's whole purpose is to
 * sit in a toolbar, which is a flex row. Without it the button is a shrinkable
 * flex item and collapses to its icon's intrinsic width the moment the row is
 * tight — square in isolation, 24px wide in the place it actually ships.
 */
const iconButtonSizeStyles = {
  sm: "size-8 shrink-0 p-0",
  md: "size-10 shrink-0 p-0",
} as const;

export type IconButtonSize = keyof typeof iconButtonSizeStyles;

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "aria-label"> {
  /** The icon to render. Sized by the caller (e.g. `<Trash2 className="size-4" />`). */
  icon: ReactNode;
  /** REQUIRED — an icon alone has no accessible name, so this is not optional. */
  "aria-label": string;
  className?: string;
  variant?: Extract<ButtonProps, { href?: undefined }>["variant"];
  size?: IconButtonSize;
  /** Shows a spinner in place of the icon and blocks interaction. */
  loading?: boolean;
}

/**
 * DS-5M — an icon-only button, built on `Button` rather than beside it, so
 * variants, focus ring, disabled, and loading behaviour can never drift from
 * the primary interactive primitive. It only squares the footprint and makes
 * the accessible name mandatory.
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
  loading = false,
  ...domProps
}: IconButtonProps) {
  return (
    <Button
      {...domProps}
      variant={variant}
      size={size}
      loading={loading}
      aria-label={ariaLabel}
      className={cn(iconButtonSizeStyles[size], className)}
    >
      {/* When loading, Button already renders its spinner in the leading slot —
          dropping the icon keeps the square button showing exactly one glyph. */}
      {loading ? null : icon}
    </Button>
  );
}
