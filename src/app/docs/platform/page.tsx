import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-platform")!;

// Platform is one of the tier pages inside the Architecture section's "tier-model" group.
// The "related tiers" section below cross-links the rest of that group.
const tierModelEntries = getGroupEntries("tier-model");
const siblingTierPages = tierModelEntries.filter((e) => e.id !== entry.id);

const primaryEntryPoints = [getEntry("platform-architecture-doc")!, getEntry("production-platform")!];
const relatedGroups = [getGroup("applications-overview")!, getGroup("playground-overview")!, getGroup("architecture-overview")!];

// Real counts, verified against src/components/platform/{admin,commerce,integrations,intelligence,
// operations,product,production,publishing}/ (12 files each, 96 total).
const STATS = [
  { label: "Pages in Tier Model", value: String(tierModelEntries.length) },
  { label: "Real components", value: "96" },
  { label: "Domain platforms", value: "8" },
];

export default function DocsPlatformPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={tierModelEntries} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="This page is architecture documentation explaining how the Platform tier fits into the system — it is not the primary way to browse Platform's actual domain libraries; for that, use the Applications section. Platform Tier is where business vocabulary — Order, Artwork, Content Item, Provider Connection — finally attaches to real UI. Its eight domain-specific libraries (Production, Product, Publishing, Commerce, Intelligence, Operations, Admin, and Integrations) scope the generic Foundation, Operational, and Workflow layers into screens a real StudioPOD user would recognize, almost entirely by re-exporting already-certified components rather than writing new ones."
        whatYoullLearn={[
          "The blueprint every domain platform is built against — layer composition and ownership rules.",
          "The eight domain platforms themselves, all presented in the Applications section.",
          "Why 95 of 96 Platform-tier components are pure re-exports of Foundation, Operational, or Workflow components, with a single thin wrapper the only new code in the tier.",
          "Where Platform sits relative to Foundation, Operational, and Workflow in the tier model, and where each of those tiers' own architecture pages live.",
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
