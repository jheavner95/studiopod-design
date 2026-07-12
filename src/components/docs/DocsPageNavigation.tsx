import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, Body, Caption } from "@/components/ui";
import { Inline } from "@/components/layout";
import { getPrevious, getNext, type NavEntry } from "@/lib/design-system-navigation";
import { cn } from "@/lib/utils";

interface DocsPageNavigationProps {
  entry: NavEntry;
  className?: string;
}

/**
 * A title-based Previous/Next footer, not a numbered pager — Foundation
 * Navigation's own Pagination is index-based ("Page X of Y") and doesn't
 * fit this shape, so this is new, thin, purpose-built code.
 */
export function DocsPageNavigation({ entry, className }: DocsPageNavigationProps) {
  const previous = getPrevious(entry);
  const next = getNext(entry);

  if (!previous && !next) return null;

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}>
      {previous ? (
        <Link href={previous.href} className="focus-ring group block rounded-lg">
          <Card interactive className="flex h-full flex-col gap-2 group-hover:bg-surface-hover">
            <Inline gap="xs" align="center" className="text-ink-tertiary">
              <ArrowLeft
                className="size-3.5 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] motion-safe:group-hover:-translate-x-0.5 group-hover:text-accent-400"
                aria-hidden
              />
              <Caption>Previous</Caption>
            </Inline>
            <Body size="sm" className="font-medium text-ink-primary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:text-accent-400">
              {previous.title}
            </Body>
          </Card>
        </Link>
      ) : (
        <div aria-hidden />
      )}
      {next ? (
        <Link href={next.href} className="focus-ring group block rounded-lg">
          <Card interactive className="flex h-full flex-col items-end gap-2 text-right group-hover:bg-surface-hover">
            <Inline gap="xs" align="center" className="text-ink-tertiary">
              <Caption>Next</Caption>
              <ArrowRight
                className="size-3.5 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] motion-safe:group-hover:translate-x-0.5 group-hover:text-accent-400"
                aria-hidden
              />
            </Inline>
            <Body size="sm" className="font-medium text-ink-primary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:text-accent-400">
              {next.title}
            </Body>
          </Card>
        </Link>
      ) : (
        <div aria-hidden />
      )}
    </div>
  );
}
