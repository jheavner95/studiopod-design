import { Badge, Caption } from "@/components/ui";
import { Inline } from "@/components/layout";
import type { NavEntry } from "@/lib/design-system-navigation";

interface DocsLandingSummaryProps {
  entries: NavEntry[];
}

/** Page count + certification-status rollup every /docs/* landing page shows beneath its header. */
export function DocsLandingSummary({ entries }: DocsLandingSummaryProps) {
  const certifiedCount = entries.filter((entry) => entry.status === "certified").length;

  return (
    <Inline gap="sm" align="center" className="pt-1">
      <Badge tone={certifiedCount > 0 ? "success" : "neutral"} size="sm">
        {certifiedCount > 0 ? "Certified" : "Not yet certified"}
      </Badge>
      <Caption className="text-ink-tertiary">
        {entries.length} {entries.length === 1 ? "page" : "pages"}
      </Caption>
    </Inline>
  );
}
