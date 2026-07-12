import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-foundation")!;

// DS-7.1: Foundation no longer owns a dedicated top-level group — it's one of nine entries
// inside the Architecture section's "tier-model" group, alongside the other tier pages and
// their capstone certifications. The "related tiers" section below cross-links the rest of
// that group instead of the old (now-nonexistent) foundation-systems group.
const tierModelEntries = getGroupEntries("tier-model");
const siblingTierPages = tierModelEntries.filter((e) => e.id !== entry.id);

const primaryEntryPoints = [getEntry("application-components")!, getEntry("foundation-audit")!];
const relatedGroups = [getGroup("components-overview")!, getGroup("quality-overview")!, getGroup("architecture-overview")!];

// Real per-family component counts, verified against src/components/{layout,table,metadata,form,overlay,navigation,feedback}/.
const STATS = [
  { label: "Pages in Tier Model", value: String(tierModelEntries.length) },
  { label: "Real components", value: "92" },
  { label: "Certified families", value: "1 of 7" },
];

export default function DocsFoundationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={tierModelEntries} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="This page is architecture documentation explaining how the Foundation tier fits into the system — it is not the primary way to browse Foundation's actual components; for that, use the Components section. Foundation Tier is the generic UI layer with zero business or workflow awareness — Layout, Table, Metadata, Forms, Overlays, Navigation, and Feedback. Every higher tier (Operational, Workflow, Platform) composes exclusively from these seven families rather than reaching for raw HTML or one-off styling."
        whatYoullLearn={[
          "The seven component families and what each one owns — structure, tabular data, read-only display, editing, transient surfaces, wayfinding, and status.",
          "Which families have real production adoption versus which exist but aren't yet used by a real screen.",
          "How Foundation Table earned the tier's only Certified rating, and where the other six families currently stand on that same ladder.",
          "Where Foundation sits relative to Operational, Workflow, and Platform in the tier model, and where each of those tiers' own architecture pages live.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="tier-model"
            eyebrow={<Eyebrow tone="accent">Tier model</Eyebrow>}
            title="Other tier model pages"
            descriptionMaxWidth={false}
          />
          <DocsEntryGrid entries={siblingTierPages} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
