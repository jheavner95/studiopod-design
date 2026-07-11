import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { getEntry, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-platform")!;
const children = getGroupEntries("platform-systems").filter((e) => e.id !== entry.id);

export default function DocsPlatformPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={children} />
      </DocsPageHeader>
      <DocsEntryGrid entries={children} />
    </DocsShell>
  );
}
