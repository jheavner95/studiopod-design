import {
  createElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * A text primitive's own props, plus everything the chosen element accepts.
 *
 * `Body` and `Caption` took three props and forwarded none of them, so a
 * consumer needing an `id`, a `data-` hook, an `aria-` attribute or a handler
 * had to wrap the text in a `div`. Those wrappers are how invalid `<p>` nesting
 * and hydration failures reached three separate StudioPOD packages — recorded
 * as finding D8 across UX-2.5, UX-2.6 and UX-2.7.
 *
 * Forwarding is the smallest durable correction: nothing that compiles today
 * stops compiling, and `<Body as="div" data-x>` becomes expressible. The
 * generic is what makes it honest — choosing `as="div"` types the rest as div
 * attributes, so the escape hatch cannot be used to smuggle nonsense onto a
 * paragraph.
 */
type Polymorphic<E extends ElementType, P> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P | "as"> & { as?: E };

/**
 * Hero-scale display type. Reserve for one element per page — the
 * headline a visitor reads first.
 */
export function Display({ children, className, as = "h1" }: TypographyProps) {
  return createElement(
    as,
    { className: cn("text-display-1 font-semibold text-ink-primary", className) },
    children,
  );
}

export interface HeadingProps extends TypographyProps {
  level?: 1 | 2 | 3 | 4;
  /** When set, also marks the element `data-toc-heading` so DocsTableOfContents can index it. */
  id?: string;
}

const headingStyles = {
  1: "text-heading-1 font-semibold",
  2: "text-heading-2 font-semibold",
  3: "text-heading-3 font-semibold",
  4: "text-heading-4 font-medium",
} as const;

const headingTags = { 1: "h2", 2: "h2", 3: "h3", 4: "h4" } as const;

/**
 * Section / subsection headings. `level` controls the visual scale;
 * pass `as` separately if the semantic tag needs to differ (e.g. an
 * h2-styled heading that must render as an h3 for document outline).
 */
export function Heading({ children, className, as, level = 2, id }: HeadingProps) {
  return createElement(
    as ?? headingTags[level],
    {
      id,
      className: cn(headingStyles[level], "text-ink-primary", className),
      ...(id ? { "data-toc-heading": "" } : null),
    },
    children,
  );
}

export interface BodyOwnProps {
  children: ReactNode;
  className?: string;
  size?: "lg" | "md" | "sm";
  muted?: boolean;
}

/** Kept exported under its original name — `BodyProps` is a published type. */
export type BodyProps<E extends ElementType = "p"> = Polymorphic<E, BodyOwnProps>;

const bodyStyles = {
  lg: "text-body-lg",
  md: "text-body-md",
  sm: "text-body-sm",
} as const;

/**
 * Running text.
 *
 * Defaults to a paragraph, which is right for text and wrong for anything that
 * contains block content — so `as` is how a consumer says what this actually
 * is. Everything else is forwarded to the element.
 */
export function Body<E extends ElementType = "p">({
  children,
  className,
  as,
  size = "md",
  muted = false,
  ...rest
}: BodyProps<E>) {
  return createElement(
    (as ?? "p") as ElementType,
    {
      ...rest,
      className: cn(
        bodyStyles[size],
        muted ? "text-ink-secondary" : "text-ink-primary",
        className,
      ),
    },
    children,
  );
}

export interface CaptionOwnProps {
  children: ReactNode;
  className?: string;
  /** For pairing this text with another element via aria-labelledby (e.g. ProgressBar's label naming its progressbar) — mirrors Heading's own id prop. */
  id?: string;
}

/** Kept exported under its original name — `CaptionProps` is a published type. */
export type CaptionProps<E extends ElementType = "p"> = Polymorphic<E, CaptionOwnProps>;

/** Supporting text. Same contract as `Body`: `as` chooses the element. */
export function Caption<E extends ElementType = "p">({
  children,
  className,
  as,
  id,
  ...rest
}: CaptionProps<E>) {
  return createElement(
    (as ?? "p") as ElementType,
    { ...rest, id, className: cn("text-caption text-ink-secondary", className) },
    children,
  );
}

export function Metadata({ children, className, as = "span" }: TypographyProps) {
  return createElement(
    as,
    { className: cn("text-metadata text-ink-tertiary font-mono", className) },
    children,
  );
}
