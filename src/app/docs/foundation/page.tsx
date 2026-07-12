import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-foundation")!;

// Foundation is one of the tier pages inside the Architecture section's "tier-model" group.
// The "related tiers" section below cross-links the rest of that group.
const tierModelEntries = getGroupEntries("tier-model");
const siblingTierPages = tierModelEntries.filter((e) => e.id !== entry.id);

const primaryEntryPoints = [getEntry("application-components")!, getEntry("foundation-components")!];
const relatedGroups = [getGroup("components-overview")!, getGroup("playground-overview")!, getGroup("architecture-overview")!];

const STATS = [{ label: "Component families", value: "7" }];

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
          "Why every higher tier composes from these families instead of reaching for raw HTML — the boundary that keeps business logic out of Foundation entirely.",
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
