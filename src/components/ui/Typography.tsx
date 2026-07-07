import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

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

interface HeadingProps extends TypographyProps {
  level?: 1 | 2 | 3 | 4;
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
export function Heading({ children, className, as, level = 2 }: HeadingProps) {
  return createElement(
    as ?? headingTags[level],
    { className: cn(headingStyles[level], "text-ink-primary", className) },
    children,
  );
}

interface BodyProps extends TypographyProps {
  size?: "lg" | "md" | "sm";
  muted?: boolean;
}

const bodyStyles = {
  lg: "text-body-lg",
  md: "text-body-md",
  sm: "text-body-sm",
} as const;

export function Body({ children, className, as = "p", size = "md", muted = false }: BodyProps) {
  return createElement(
    as,
    { className: cn(bodyStyles[size], muted ? "text-ink-secondary" : "text-ink-primary", className) },
    children,
  );
}

export function Caption({ children, className, as = "p" }: TypographyProps) {
  return createElement(as, { className: cn("text-caption text-ink-secondary", className) }, children);
}

export function Metadata({ children, className, as = "span" }: TypographyProps) {
  return createElement(
    as,
    { className: cn("text-metadata text-ink-tertiary font-mono", className) },
    children,
  );
}
