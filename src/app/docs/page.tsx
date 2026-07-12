import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsGroupCard } from "@/components/docs";
import { DocsSectionLanding } from "./_components/DocsSectionLanding";
import { SectionShell, CardGrid } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupsForSection, getGroupEntries, getSectionEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-root")!;

// Architecture is the composition-rules/layering documentation for a builder
// studying how the system fits together, distinct from Components/Applications
// where a builder actually goes to find and use things. Its own
// "architecture-overview" group is this page itself, so every other real
// group is what gets browsed.
const architectureGroups = getGroupsForSection("architecture").filter((group) => group.id !== "architecture-overview");

// One representative entry point per group — each group's own order-0 landing
// entry — surfaced as this page's "Start here" cards.
const primaryEntryPoints = architectureGroups.map((group) => getGroupEntries(group.id)[0]).filter((candidate) => candidate !== undefined);

// Components and Applications are where a builder goes to find and use things;
// Architecture is where the rules governing how those things compose live.
// Patterns sits between the two — reusable compositions built on top of both.
const relatedGroups = [getGroup("components-overview")!, getGroup("applications-overview")!, getGroup("patterns-overview")!];

// Real counts, derived from NAV_REGISTRY rather than hardcoded: the architecture
// section holds this landing plus four real groups — Workspace Shell (the
// six-region blueprint), Tier Model (how Foundation, Operational, Workflow,
// and Platform compose), Platform Architecture, and Application Composition.
const sectionEntries = getSectionEntries("architecture");
const STATS = [
  { label: "Pages in this section", value: String(sectionEntries.length) },
  { label: "Composition groups", value: String(architectureGroups.length) },
  { label: "Tiers documented", value: "4" },
];

export default function DocsHomePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <DocsSectionLanding
        purpose="Architecture is where the composition rules and layering model that hold the rest of the design system together live — the workspace blueprint every screen is built on, the tier stack that separates raw building blocks from full business features, and the rules that govern how a domain platform or a real feature gets assembled from existing pieces. It's for architects and anyone studying how the system fits together, not for someone looking for a live example to copy — there's nothing to browse and drop into a screen here, only the relationships between pieces documented elsewhere. Start with the Workspace Shell for the six-region blueprint every application screen composes, or the Tier Model for how Foundation, Operational, Workflow, and Platform build on one another."
        whatYoullLearn={[
          "The six-region Workspace Shell blueprint every application screen composes, down to its header, toolbar, content areas, and status bar.",
          "How the Tier Model's four layers — Foundation, Operational, Workflow, Platform — build strictly on the ones before them, and where each tier's own architecture page lives.",
          "How Platform Architecture and Application Composition define the rules a real domain platform and a real Business Feature are each built against.",
          "Where to go for a live example instead of the rules behind it — Components for individual pieces, Applications for full domain compositions, Patterns for reusable templates in between.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="browse-architecture"
            eyebrow={<Eyebrow tone="accent">Browse by group</Eyebrow>}
            title="The four composition groups"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2} gap="md">
            {architectureGroups.map((group) => {
              const groupEntries = getGroupEntries(group.id);
              return <DocsGroupCard key={group.id} href={group.href} title={group.title} description={group.description} entries={groupEntries} />;
            })}
          </CardGrid>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
