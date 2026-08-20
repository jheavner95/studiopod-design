import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { LinkComponent, LinkComponentProps } from "@/framework";

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
type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
  href: string;
  /**
   * What renders the link. Defaults to `"a"`. Pass your framework's link
   * component — `next/link`, a router Link — to get client-side navigation.
   * A prop rather than context, so Button stays server-safe: see
   * `@/framework/types`.
   */
  linkComponent?: LinkComponent;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Primary interactive primitive. Renders a link when `href` is passed, a <button> otherwise.
 *
 * The link element is `linkComponent` if given, otherwise a plain `<a>`.
 *
 * Variants: `primary` (default) · `secondary` · `outline` · `ghost` · `destructive`.
 * `destructive` is for irreversible actions (delete/discard/remove); use `primary` for
 * confirm/approve/save. There is intentionally no `success` variant — green is a status
 * tone in this system, not an action colour (DS-5G).
 *
 * ## Attribute forwarding (UX-5.7)
 *
 * Every prop this component does not itself consume reaches the rendered
 * element — `data-*`, `aria-*`, `id`, `title`, `name`, `form`, event handlers,
 * `target`/`rel` on the link form. The component's own computed attributes win
 * over anything passed in: `className` is composed rather than replaced, `href`
 * is authoritative, and the `loading` guard cannot be overridden from outside.
 *
 * **This was a silent, five-times-rediscovered defect, and the silence had a
 * specific cause.** The `<button>` branch always spread its rest props; the
 * link branch destructured a closed set and forwarded none of the remainder, so
 * `<Button href=…  data-x="1">` dropped `data-x` at render. Nothing caught it,
 * because TypeScript deliberately exempts hyphenated JSX attributes from
 * excess-property checking — `data-*` and `aria-*` type-check against *any*
 * component whether or not its props admit them. The type system permits the
 * attribute by design and the implementation discarded it, so the only way to
 * observe the defect was to read the served DOM. Consumers found it four times
 * on other primitives and once here, and each time wrote a wrapper element
 * instead.
 *
 * `Button.test.tsx` holds the contract, including the link form specifically,
 * so a future refactor that closes the branch again fails a test rather than a
 * downstream reviewer.
 */
export function Button(props: ButtonProps) {
  const size = props.size ?? "md";
  const spinner = <Loader2 className={cn("animate-spin", spinnerSizeMap[size])} aria-hidden />;

  if (typeof props.href === "string") {
    const {
      children,
      className,
      variant,
      size: _linkSize,
      leadingIcon,
      trailingIcon,
      loading,
      href,
      linkComponent,
      ...domProps
    } = props;
    void _linkSize;
    /*
     * `LinkComponent` is `ElementType<LinkComponentProps>`, which resolves to
     * every intrinsic tag whose props those satisfy — SVG tags included, since
     * their props are all optional. Handing a full set of anchor attributes to
     * that union makes the compiler check them against, say,
     * `SVGProps<SVGSymbolElement>`. Naming the one thing this actually renders
     * resolves it: whatever a caller passes, Design is rendering a link and
     * passing it link props.
     */
    const LinkEl = (linkComponent ?? "a") as unknown as ComponentType<LinkComponentProps>;
    return (
      // `loading` used to also attach an onClick that called preventDefault.
      // That made the whole component client-only for a guard the stylesheet
      // already provides: the base class carries
      // `aria-disabled:pointer-events-none`, which blocks the pointer path.
      // `tabIndex={-1}` closes the keyboard path without a handler. Same
      // behaviour, no event handler, server-renderable. See DH-3 § API impact.
      <LinkEl
        {...domProps}
        href={href}
        className={cn(buttonStyles({ variant, size }), className)}
        {...(loading ? { "aria-disabled": true, tabIndex: -1 } : {})}
      >
        {loading ? spinner : leadingIcon}
        {children}
        {!loading && trailingIcon}
      </LinkEl>
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
      {...domProps}
      className={cn(buttonStyles({ variant, size }), className)}
      disabled={disabled || loading}
      {...(loading ? { "aria-busy": true } : {})}
    >
      {loading ? spinner : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  );
}
