import { DocsShell, DocsPageHeader } from "@/components/docs";
import { DocsEntryGrid } from "./_components/DocsEntryGrid";
import { CANONICAL_APPLICATION_GROUPS, getEntry, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-root")!;
const landingEntries = CANONICAL_APPLICATION_GROUPS.map((groupId) => getGroupEntries(groupId)[0]).filter(
  (candidate) => candidate !== undefined,
);

export default function DocsHomePage() {
  return (
    <DocsShell entry={entry}>
      <DocsPageHeader entry={entry} />
      <DocsEntryGrid entries={landingEntries} />
    </DocsShell>
  );
}
