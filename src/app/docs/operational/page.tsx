import { DocsShell, DocsPageHeader } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { getEntry, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-operational")!;
const children = getGroupEntries("operational-systems").filter((e) => e.id !== entry.id);

export default function DocsOperationalPage() {
  return (
    <DocsShell entry={entry}>
      <DocsPageHeader entry={entry} />
      <DocsEntryGrid entries={children} />
    </DocsShell>
  );
}
