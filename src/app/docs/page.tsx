import Link from "next/link";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsSectionLanding } from "./_components/DocsSectionLanding";
import { SectionShell, CardGrid } from "@/components/layout";
import { Card, Body, Badge, SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupsForSection, getGroupEntries, getSectionEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-root")!;

// DS-7.1 Part 2: Architecture is no longer a tier-first primary-nav listing —
// it's the composition-rules/layering documentation for a builder auditing how
// the system fits together, distinct from Components/Applications where a
// builder actually goes to find and use things. Its own "architecture-overview"
// group is this page itself, so every other real group is what gets browsed.
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
// six-region blueprint), Tier Model (how Foundation/Operational/Workflow/Platform
// compose, now framed as internal documentation rather than primary nav),
// Platform Architecture, and Application Composition.
const sectionEntries = getSectionEntries("architecture");
const certifiedCount = sectionEntries.filter((e) => e.status === "certified").length;
const STATS = [
  { label: "Pages in this section", value: String(sectionEntries.length) },
  { label: "Composition groups", value: String(architectureGroups.length) },
  { label: "Certified capstones", value: String(certifiedCount) },
  { label: "Tiers documented", value: "4" },
];

export default function DocsHomePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <DocsSectionLanding
        purpose="Architecture is where the old tier concepts — Foundation, Operational, Workflow, Platform, and Business Feature — now live as documentation, not as primary navigation. This section has no live examples to browse and nothing to pick up and use; it exists to explain the composition rules and layering model that everything in Components, Patterns, and Applications is built against. Start with the Workspace Shell for the six-region blueprint every application screen composes, or the Tier Model for how the four lower tiers stack on top of one another."
        whatYoullLearn={[
          "Why Foundation, Operational, Workflow, and Platform moved out of primary navigation and now live here as internal documentation instead of top-level tiers a builder browses.",
          "The six-region Workspace Shell blueprint every application screen composes, and how its own capstone certification covers it end to end.",
          "How the Tier Model's four layers — Foundation, Operational, Workflow, Platform — build strictly on the ones before them, and where each tier's own certification record lives.",
          "How Platform Architecture and Application Composition define the rules a real domain platform and a real Business Feature are each built against.",
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
              const groupCertifiedCount = groupEntries.filter((e) => e.status === "certified").length;
              return (
                <Card key={group.id} className="flex h-full flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={group.href}
                        className="focus-ring rounded-md text-body-lg font-medium text-ink-primary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-400"
                      >
                        {group.title}
                      </Link>
                      {groupCertifiedCount > 0 ? (
                        <Badge tone="success" size="sm">
                          Certified
                        </Badge>
                      ) : null}
                    </div>
                    <Body size="sm" muted>
                      {group.description}
                    </Body>
                  </div>
                  <ul className="flex flex-col gap-1.5 border-t border-border-subtle pt-3">
                    {groupEntries.map((groupEntry) => (
                      <li key={groupEntry.id}>
                        <Link
                          href={groupEntry.href}
                          className="focus-ring block rounded-md text-body-sm text-ink-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ink-primary"
                        >
                          {groupEntry.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </CardGrid>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
