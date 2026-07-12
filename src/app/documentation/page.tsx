import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsLinkCard } from "@/components/docs";
import { DocsLandingSummary } from "../docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "../docs/_components/DocsSectionLanding";
import { SectionShell, CardGrid } from "@/components/layout";
import { SectionHeader, Eyebrow, Card, Body } from "@/components/ui";
import { NAV_SECTIONS, NAV_REGISTRY, getEntry, getGroup } from "@/lib/design-system-navigation";

const entry = getEntry("documentation")!;

const primaryEntryPoints = [getEntry("home")!, getEntry("docs-root")!, getEntry("docs-certification")!];
const relatedGroups = [getGroup("components-overview")!, getGroup("patterns-overview")!, getGroup("applications-overview")!];

// The other six sections this "About & Principles" page points out to —
// everything except Overview, which this page and the homepage already are.
const OTHER_SECTIONS = NAV_SECTIONS.filter((section) => section.id !== "overview");

// Real counts, derived from NAV_REGISTRY rather than hardcoded, so this
// stays correct as the registry grows.
const certifiedCount = NAV_REGISTRY.filter((e) => e.badge === "certification").length;
const STATS = [
  { label: "Top-level sections", value: String(NAV_SECTIONS.length) },
  { label: "Pages in the system", value: String(NAV_REGISTRY.length) },
  { label: "Certified capstone reviews", value: String(certifiedCount) },
];

const CONTRIBUTION_DOCS = [
  { title: "README.md", description: "Project purpose, architecture overview, package map, and local dev workflow." },
  { title: "AGENTS.md", description: "Conventions and constraints for this repo's customized Next.js fork." },
];

export default function DocumentationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={NAV_REGISTRY} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="This is the design system's own about page: what it is, why it's organized goal-first — Overview, Components, Patterns, Applications, Architecture, Playground, Quality — instead of tier-first, and how to find the right place to add something new. It's the second stop after the homepage, not a catch-all listing of every historical group in the old tier-first index."
        whatYoullLearn={[
          "Why the system is organized by what you're trying to do (goal-first) instead of by which package built it (tier-first), and how the seven top-level sections map onto routes that already existed before this restructure.",
          "Where the deeper composition rules and the old Foundation/Operational/Workflow/Platform tier model still live, for anyone who needs that architectural detail — see Architecture.",
          "Where the system's evidence trail — every certification, audit, and coverage/maturity view — lives, for anyone assessing production-readiness — see Quality.",
          "How to contribute: which section a new component, pattern, platform library, or architecture doc belongs in.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="package-structure"
            eyebrow={<Eyebrow tone="accent">Package structure</Eyebrow>}
            title="The seven sections"
            description="The full taxonomy this page and the homepage are both organized around."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="md">
            {OTHER_SECTIONS.map((section) => (
              <DocsLinkCard
                key={section.id}
                href={section.href}
                title={section.title}
                description={section.description}
                actionLabel={`For: ${section.audience}`}
              />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="contribution-workflow"
            eyebrow={<Eyebrow tone="accent">Contribution workflow</Eyebrow>}
            title="Where the rules are written down"
            description="This page describes the system's own principles; these two repo-root documents govern how to actually work in it."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2} gap="md">
            {CONTRIBUTION_DOCS.map((doc) => (
              <Card key={doc.title} className="flex h-full flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{doc.title}</span>
                <Body size="sm" muted>
                  {doc.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
