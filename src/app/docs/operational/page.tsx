import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { getEntry, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-operational")!;
const children = getGroupEntries("operational-systems").filter((e) => e.id !== entry.id);

export default function DocsOperationalPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={children} />
      </DocsPageHeader>
      <DocsEntryGrid entries={children} />
    </DocsShell>
  );
}
