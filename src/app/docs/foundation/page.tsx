import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-foundation")!;
const children = getGroupEntries("foundation-systems").filter((e) => e.id !== entry.id);

const primaryEntryPoints = children.filter((e) => e.id === "foundation-components" || e.id === "foundation-audit");
const commonPages = children.filter((e) => !primaryEntryPoints.includes(e));
const relatedGroups = [getGroup("workspace-architecture")!, getGroup("operational-systems")!, getGroup("certification")!];

// Real per-family component counts, verified against src/components/{layout,table,metadata,form,overlay,navigation,feedback}/.
const STATS = [
  { label: "Pages in this section", value: String(children.length) },
  { label: "Real components", value: "92" },
  { label: "Certified families", value: "1 of 7" },
];

export default function DocsFoundationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={children} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Foundation Systems is the generic UI layer with zero business or workflow awareness — Layout, Table, Metadata, Forms, Overlays, Navigation, and Feedback. Every higher tier (Operational, Workflow, Platform) composes exclusively from these seven families rather than reaching for raw HTML or one-off styling."
        whatYoullLearn={[
          "The seven component families and what each one owns — structure, tabular data, read-only display, editing, transient surfaces, wayfinding, and status.",
          "Which families have real production adoption today versus which are built but not yet used by a real screen.",
          "How Foundation Table earned the tier's only Certified rating, and what the other six families still need to get there.",
          "Where to find the full accessibility and layering audit for the whole tier.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="common-pages"
            eyebrow={<Eyebrow tone="accent">Browse by family</Eyebrow>}
            title="Most commonly used pages"
            descriptionMaxWidth={false}
          />
          <DocsEntryGrid entries={commonPages} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
