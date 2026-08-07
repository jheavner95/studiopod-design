import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTROL_SPINNER_CLASSES, type GlyphSize } from "@/lib/control-size";

export type SpinnerSize = GlyphSize;

export interface SpinnerProps {
  /** Sizes on the shared glyph scale. Omit `size` entirely to inherit from a parent's `[&_svg]` rule. */
  size?: SpinnerSize;
  /**
   * Pass ONLY when the spinner is the sole indication that something is
   * happening. It renders `role="status"` with this as the accessible name.
   *
   * Leave it off whenever the spinner sits next to visible text or inside a
   * container that already carries `role="status"`/`aria-live` — the spinner
   * then renders `aria-hidden`, so a caller-owned live region never ends up
   * nested inside another one and nothing is announced twice.
   */
  label?: string;
  className?: string;
}

/**
 * DS-5P — the **bare tier** of the loading family: a busy indicator and
 * nothing else, for embedding inside a layout the application owns (a status
 * row, a toolbar, a table overlay, a card, a menu).
 *
 * This is deliberately not the other three:
 *   • `LoadingState` — the *composed* tier: this spinner plus a label, centered
 *     in its own region, owning its own `role="status"`. Use it for a whole
 *     region; use `Spinner` for a glyph inside something else.
 *   • `Skeleton` — a shape-accurate placeholder while content streams in.
 *   • `ProgressRing` — a `role="progressbar"`; a *progress* semantic, not a
 *     busy one. Never reach for it just because it spins.
 *
 * `Button` keeps its own built-in `loading` prop; it renders the same
 * `Loader2 + animate-spin` used here, sized to the button.
 *
 * Reduced motion is inherited from the package's global
 * `prefers-reduced-motion` rule, which disables `animate-spin` — the same
 * baseline `Skeleton`'s pulse relies on, so there is no per-component branch.
 */
export function Spinner({ size = "md", label, className }: SpinnerProps) {
  return (
    <Loader2
      className={cn("animate-spin shrink-0", size ? CONTROL_SPINNER_CLASSES[size] : undefined, className)}
      role={label ? "status" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    />
  );
}
