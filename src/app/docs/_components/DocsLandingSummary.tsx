import { Caption } from "@/components/ui";
import { Inline } from "@/components/layout";
import { type NavEntry } from "@/lib/design-system-navigation";

interface DocsLandingSummaryProps {
  entries: NavEntry[];
}

/** Page count rollup every /docs/* landing page shows beneath its header. */
export function DocsLandingSummary({ entries }: DocsLandingSummaryProps) {
  return (
    <Inline gap="sm" align="center" className="pt-1">
      <Caption className="text-ink-tertiary">
        {entries.length} {entries.length === 1 ? "page" : "pages"}
      </Caption>
    </Inline>
  );
}
