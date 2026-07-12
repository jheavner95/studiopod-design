import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, Body } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface DocsGroupCardEntry {
  id?: string;
  href: string;
  title: string;
}

export interface DocsGroupCardProps {
  href: string;
  title: string;
  description?: string;
  /** Rendered beside the title, e.g. a "Certified" status Badge. */
  badge?: ReactNode;
  entries: DocsGroupCardEntry[];
  className?: string;
}

/**
 * DS-8.1 — the one "group with a title-link plus a list of member links"
 * treatment, replacing two independently hand-built duplicates. The outer
 * Card is deliberately static (no hover lift, no cursor change) since it
 * isn't itself a link — only the title and each list entry are, and each
 * gets the same visible-arrow-at-rest / hover-color / focus-ring signal as
 * every other link on the site.
 */
export function DocsGroupCard({ href, title, description, badge, entries, className }: DocsGroupCardProps) {
  return (
    <Card className={cn("flex h-full flex-col gap-4", className)}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={href}
            className="focus-ring rounded-md text-body-lg font-medium text-ink-primary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-400"
          >
            {title}
          </Link>
          {badge}
        </div>
        {description ? (
          <Body size="sm" muted>
            {description}
          </Body>
        ) : null}
      </div>
      <ul className="flex flex-col gap-1.5 border-t border-border-subtle pt-3">
        {entries.map((entry) => (
          <li key={entry.id ?? entry.href}>
            <Link
              href={entry.href}
              className="focus-ring group flex items-center justify-between gap-2 rounded-md text-body-sm text-ink-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-400"
            >
              {entry.title}
              <ArrowRight
                className="size-3.5 shrink-0 text-ink-tertiary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] motion-safe:group-hover:translate-x-0.5 group-hover:text-accent-400"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
