import { Badge, Caption } from "@/components/ui";
import { Inline } from "@/components/layout";
import { BADGE_TONE, BADGE_LABEL, type NavEntry } from "@/lib/design-system-navigation";

interface DocsLandingSummaryProps {
  entries: NavEntry[];
}

/** Page count + certification-status rollup every /docs/* landing page shows beneath its header. */
export function DocsLandingSummary({ entries }: DocsLandingSummaryProps) {
  const certifiedCount = entries.filter((entry) => entry.badge === "certification").length;

  return (
    <Inline gap="sm" align="center" className="pt-1">
      {certifiedCount > 0 ? (
        <Badge tone={BADGE_TONE.certification} size="sm">
          {BADGE_LABEL.certification}
        </Badge>
      ) : null}
      <Caption className="text-ink-tertiary">
        {entries.length} {entries.length === 1 ? "page" : "pages"}
      </Caption>
    </Inline>
  );
}
