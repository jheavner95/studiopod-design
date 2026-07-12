import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Card, Body, Caption } from "@/components/ui";
import { cn } from "@/lib/utils";

interface DocsLinkCardProps {
  href: string;
  title: ReactNode;
  description?: ReactNode;
  /** Rendered inline beside the title — typically a status Badge. */
  adornment?: ReactNode;
  /** Renders an external-link icon and opens in a new tab, for references outside this site. */
  external?: boolean;
  /** Short action microcopy under the description, e.g. "View component". Optional — the icon and title-color change already signal "this is a link" on their own. */
  actionLabel?: string;
  /** Accessible label override for the whole card, for when `title` isn't plain text (e.g. external links should announce that they open a new tab). */
  srLabel?: string;
  /** "lg" for primary/featured entry points (DS-7.5 Part 7); "md" (default) for secondary/related links. */
  size?: "md" | "lg";
  className?: string;
}

/**
 * DS-7.5 Part 1/2 — the single navigation-card treatment for every
 * "this card is a link" surface site-wide: entry points, related pages,
 * see-also, prev/next, external references. Never relies on hover alone —
 * the directional icon and its cue are visible at rest; hover/focus only
 * strengthen an already-visible signal (title color, border, background,
 * lift). Static, non-linking cards (StatCard, MetricCard, FeatureCard)
 * deliberately do not use this component or `Card interactive`.
 */
export function DocsLinkCard({
  href,
  title,
  description,
  adornment,
  external = false,
  actionLabel,
  srLabel,
  size = "md",
  className,
}: DocsLinkCardProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const isLarge = size === "lg";
  return (
    <Link
      href={href}
      className="focus-ring group block rounded-lg"
      aria-label={srLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <Card
        interactive
        padding={isLarge ? "lg" : "md"}
        className={cn(
          "flex h-full flex-col gap-2 group-hover:bg-surface-hover",
          isLarge && "border-border-strong bg-surface-hover/40",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "font-medium text-ink-primary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:text-accent-400",
                isLarge ? "text-body-lg" : "text-body-md",
              )}
            >
              {title}
            </span>
            {adornment}
          </div>
          <Icon
            className={cn(
              "shrink-0 text-ink-tertiary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] motion-safe:group-hover:translate-x-0.5 group-hover:text-accent-400",
              isLarge ? "mt-1 size-5" : "mt-0.5 size-4",
            )}
            aria-hidden
          />
        </div>
        {description ? (
          <Body size={isLarge ? "md" : "sm"} muted className="flex-1">
            {description}
          </Body>
        ) : null}
        {actionLabel ? <Caption className="font-medium text-accent-400">{actionLabel}</Caption> : null}
      </Card>
    </Link>
  );
}
