import { DocsShell, DocsPageHeader } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { getEntry, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-workflow")!;
const children = getGroupEntries("workflow-systems").filter((e) => e.id !== entry.id);

export default function DocsWorkflowPage() {
  return (
    <DocsShell entry={entry}>
      <DocsPageHeader entry={entry} />
      <DocsEntryGrid entries={children} />
    </DocsShell>
  );
}
