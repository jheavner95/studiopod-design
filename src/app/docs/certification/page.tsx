import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { getEntry, getRelated } from "@/lib/design-system-navigation";

const entry = getEntry("docs-certification")!;
const capstones = getRelated(entry);

export default function DocsCertificationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={capstones} />
      </DocsPageHeader>
      <DocsEntryGrid entries={capstones} />
    </DocsShell>
  );
}
