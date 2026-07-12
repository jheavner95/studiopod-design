import { DocsLinkCard } from "./DocsLinkCard";
import { getPrevious, getNext, type NavEntry } from "@/lib/design-system-navigation";
import { cn } from "@/lib/utils";

interface DocsPageNavigationProps {
  entry: NavEntry;
  className?: string;
}

/**
 * A title-based Previous/Next footer, not a numbered pager — Foundation
 * Navigation's own Pagination is index-based ("Page X of Y") and doesn't
 * fit this shape, so this is new, thin, purpose-built code. Composes
 * DocsLinkCard (DS-8.1) rather than a bespoke hover treatment — grid
 * position (left/right) plus the "Previous"/"Next" action label carry the
 * directionality DocsLinkCard's single right-pointing arrow doesn't.
 */
export function DocsPageNavigation({ entry, className }: DocsPageNavigationProps) {
  const previous = getPrevious(entry);
  const next = getNext(entry);

  if (!previous && !next) return null;

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}>
      {previous ? (
        <DocsLinkCard href={previous.href} title={previous.title} actionLabel="← Previous" />
      ) : (
        <div aria-hidden />
      )}
      {next ? <DocsLinkCard href={next.href} title={next.title} actionLabel="Next →" /> : <div aria-hidden />}
    </div>
  );
}
