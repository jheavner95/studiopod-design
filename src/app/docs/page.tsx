import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "./_components/DocsEntryGrid";
import { DocsSectionLanding } from "./_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { CANONICAL_APPLICATION_GROUPS, getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-root")!;
const landingEntries = CANONICAL_APPLICATION_GROUPS.map((groupId) => getGroupEntries(groupId)[0]).filter(
  (candidate) => candidate !== undefined,
);

const primaryEntryPoints = landingEntries.filter((e) =>
  ["docs-workspace", "docs-foundation", "docs-certification"].includes(e.id),
);

const relatedGroups = [getGroup("foundations")!, getGroup("core-components")!, getGroup("workflow-patterns")!];

// Real counts verified against src/lib/design-system-navigation.ts: the six canonical Application
// Components groups hold 55 pages total (10 Workspace + 10 Foundation + 11 Operational + 10 Workflow +
// 11 Platform + 3 Certification: the index plus the Accessibility & Interaction Quality and Enterprise
// Architecture & Adoption audit pages). Five of those tiers — Workspace, Foundation, Operational,
// Workflow, and Platform — each carry a completed capstone certification entry (status: "certified").
// Platform Systems scopes 8 domain-specific libraries (Production, Product, Publishing, Commerce,
// Intelligence, Operations, Admin, Integrations).
const STATS = [
  { label: "Pages in this hub", value: "55" },
  { label: "Documentation tiers", value: "6" },
  { label: "Tiers certified", value: "5 of 5" },
  { label: "Platform domains", value: "8" },
];

export default function DocsHomePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <DocsSectionLanding
        purpose="This is the entry point to the Application Components documentation — the architecture behind the StudioPOD application itself, organized into six tiers you can read in order or jump into directly. Workspace defines the six-region shell every screen composes; Foundation supplies the generic UI primitives underneath everything else; Operational and Workflow compose those primitives into ready-to-use panels and multi-step process systems; and Platform scopes all of it into eight domain-specific libraries. Certification is where each tier's own audit record lives."
        whatYoullLearn={[
          "The six-tier architecture — Workspace, Foundation, Operational, Workflow, Platform, Certification — and how each tier builds only on the ones before it.",
          "Where the six-region workspace shell and the seven generic Foundation primitive families live, and which higher tiers reuse them.",
          "How nine Operational panels and eight Workflow systems get scoped into eight domain-specific Platform libraries — Production, Product, Publishing, Commerce, Intelligence, Operations, Admin, and Integrations.",
          "Which tiers already hold a completed capstone certification, and where to read each tier's full audit record.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="all-tiers"
            eyebrow={<Eyebrow tone="accent">Browse by tier</Eyebrow>}
            title="All six tiers"
            descriptionMaxWidth={false}
          />
          <DocsEntryGrid entries={landingEntries} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
