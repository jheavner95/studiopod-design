import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40",
  {
    variants: {
      variant: {
        // UX-2 / CR-3 — the whole primary ramp moved one step darker.
        //
        // It was accent-500 rest / accent-400 hover / accent-600 active, which
        // put white-on-fill at 3.68:1 at rest and 2.54:1 on hover: the most
        // clicked surface in both products failed WCAG AA, and HOVERING IT MADE
        // IT WORSE. Only `active` passed — the state a user sees for a few
        // hundred milliseconds.
        //
        // Now 5.17:1 rest and 6.70:1 hover/active — AA throughout, with contrast
        // rising on interaction instead of collapsing. The cost is that hover and
        // active share accent-700 (the DS defines no accent-800), so press
        // feedback rides the existing colour transition rather than a third fill.
        // That is the right trade: a distinct pressed tint is a nicety, a legible
        // label is not.
        primary: "bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-700",
        secondary:
          "border border-border bg-surface text-ink-primary hover:border-border-strong hover:bg-surface-hover",
        outline: "border border-border-strong text-ink-primary hover:bg-surface-hover",
        ghost: "text-ink-secondary hover:bg-surface-hover hover:text-ink-primary",
        // destructive — a prominent, irreversible action (delete / discard / remove).
        // Solid weight mirrors `primary` (bg-accent → bg-error, both white-on-fill),
        // so a destructive button reads as the strong action it is. Composed from the
        // DS's existing --color-error token (via the `error` colour utility) — the same
        // token MenuItem/BulkActionButton already use for their `destructive` prop, and
        // NO new token, NO application colour. This adds a fifth Button variant that
        // aligns the DS's established `destructive` vocabulary with Button's variant
        // mechanism (DS-5G). Success is deliberately NOT added — see DS-5G decision:
        // it has no action precedent in the DS (a status/feedback tone only) and confirm
        // actions are `primary`.
        //
        // UX-2 / CR-3 — the LABEL changed from white to `canvas`; the fill did not
        // move. White-on-error measured 3.03:1 rest, 3.60:1 hover, 3.29:1 active:
        // all three below AA. The obvious fix — darkening `--color-error` — is
        // explicitly forbidden by Foundation ("Deliberately NOT red-500 —
        // contrast-adjusted derivative. Do not 'fix'."), and it would repaint every
        // error tint in both products to repair one button. Inverting the label
        // instead touches only this variant and yields 6.37 / 5.36 / 5.87:1.
        //
        // Dark-on-warm is the conventional accessible treatment for coral and amber
        // fills, so this reads as intentional rather than as a defect.
        destructive: "bg-error text-canvas hover:bg-error/90 active:bg-error/95",
      },
      size: {
        sm: "h-8 px-3 text-body-sm",
        md: "h-10 px-4 text-body-md",
        lg: "h-12 px-6 text-body-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

const spinnerSizeMap = { sm: "size-3.5", md: "size-4", lg: "size-[18px]" };

interface CommonProps extends VariantProps<typeof buttonStyles> {
  children: ReactNode;
  className?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Shows a spinner in place of the leading icon and blocks interaction, without hiding the label. */
  loading?: boolean;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };
type ButtonAsLink = CommonProps & { href: string; target?: string; rel?: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Primary interactive primitive. Renders a <Link> when `href` is passed, a <button> otherwise.
 *
 * Variants: `primary` (default) · `secondary` · `outline` · `ghost` · `destructive`.
 * `destructive` is for irreversible actions (delete/discard/remove); use `primary` for
 * confirm/approve/save. There is intentionally no `success` variant — green is a status
 * tone in this system, not an action colour (DS-5G).
 */
export function Button(props: ButtonProps) {
  const size = props.size ?? "md";
  const spinner = <Loader2 className={cn("animate-spin", spinnerSizeMap[size])} aria-hidden />;

  if (typeof props.href === "string") {
    const { children, className, variant, leadingIcon, trailingIcon, loading, href, target, rel } = props;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-disabled={loading || undefined}
        onClick={loading ? (event) => event.preventDefault() : undefined}
        className={cn(buttonStyles({ variant, size }), className)}
      >
        {loading ? spinner : leadingIcon}
        {children}
        {!loading && trailingIcon}
      </Link>
    );
  }

  const {
    children,
    className,
    variant,
    size: _size,
    leadingIcon,
    trailingIcon,
    loading,
    href: _href,
    disabled,
    ...domProps
  } = props;
  void _href;
  void _size;

  return (
    <button
      className={cn(buttonStyles({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...domProps}
    >
      {loading ? spinner : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  );
}
