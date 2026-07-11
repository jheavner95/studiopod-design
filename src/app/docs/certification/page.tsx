import { DocsShell, DocsPageHeader } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { getEntry, getRelated } from "@/lib/design-system-navigation";

const entry = getEntry("docs-certification")!;
const capstones = getRelated(entry);

export default function DocsCertificationPage() {
  return (
    <DocsShell entry={entry}>
      <DocsPageHeader entry={entry} />
      <DocsEntryGrid entries={capstones} />
    </DocsShell>
  );
}
