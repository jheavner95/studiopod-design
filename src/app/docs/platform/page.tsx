import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-platform")!;
const children = getGroupEntries("platform-systems").filter((e) => e.id !== entry.id);

const primaryEntryPoints = children.filter((e) => e.id === "platform-architecture" || e.id === "platform-certification");
const commonPages = children.filter((e) => !primaryEntryPoints.includes(e));
const relatedGroups = [getGroup("workflow-systems")!, getGroup("certification")!, getGroup("business-features")!];

// Real counts, verified against src/components/platform/{admin,commerce,integrations,intelligence,
// operations,product,production,publishing}/ (12 files each, 96 total) and the platform-certification
// package's own executive summary.
const STATS = [
  { label: "Pages in this section", value: String(children.length) },
  { label: "Real components", value: "96" },
  { label: "Platforms certified", value: "8 of 8" },
];

export default function DocsPlatformPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={children} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Platform Systems is where business vocabulary — Order, Artwork, Content Item, Provider Connection — finally attaches to real UI. Its eight domain-specific libraries (Production, Product, Publishing, Commerce, Intelligence, Operations, Admin, and Integrations) scope the generic Foundation, Operational, and Workflow layers into screens a real StudioPOD user would recognize, almost entirely by re-exporting already-certified components rather than writing new ones."
        whatYoullLearn={[
          "The blueprint every domain platform was built against — layer composition, ownership rules, and the certification ladder — before any platform existed.",
          "The eight domain platforms themselves, from the first one built (Production) through the ninth and final page (Integrations).",
          "Why 95 of 96 Platform-tier components are pure re-exports of certified Foundation, Operational, or Workflow components, with a single thin wrapper the only new code in the tier.",
          "What's still missing even after certification — no platform has first-party aria-live announcements, and none has been adopted by a real application screen yet.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="common-pages"
            eyebrow={<Eyebrow tone="accent">Browse by platform</Eyebrow>}
            title="Most commonly used pages"
            descriptionMaxWidth={false}
          />
          <DocsEntryGrid entries={commonPages} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
