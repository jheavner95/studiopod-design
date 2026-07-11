import { DocsShell, DocsPageHeader } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { getEntry, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-platform")!;
const children = getGroupEntries("platform-systems").filter((e) => e.id !== entry.id);

export default function DocsPlatformPage() {
  return (
    <DocsShell entry={entry}>
      <DocsPageHeader entry={entry} />
      <DocsEntryGrid entries={children} />
    </DocsShell>
  );
}
