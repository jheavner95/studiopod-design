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
        primary: "bg-accent-500 text-white hover:bg-accent-400 active:bg-accent-600",
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
        destructive: "bg-error text-white hover:bg-error/90 active:bg-error/95",
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
