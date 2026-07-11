import { DocsShell, DocsPageHeader } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { getEntry, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-foundation")!;
const children = getGroupEntries("foundation-systems").filter((e) => e.id !== entry.id);

export default function DocsFoundationPage() {
  return (
    <DocsShell entry={entry}>
      <DocsPageHeader entry={entry} />
      <DocsEntryGrid entries={children} />
    </DocsShell>
  );
}
