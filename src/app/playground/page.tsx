import Link from "next/link";
import { Archive } from "lucide-react";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "@/app/docs/_components/DocsEntryGrid";
import { DocsLandingSummary } from "@/app/docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "@/app/docs/_components/DocsSectionLanding";
import { CardGrid, SectionShell, Inline } from "@/components/layout";
import { Card, Body, Badge, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries, getGroupsForSection } from "@/lib/design-system-navigation";

const entry = getEntry("playground")!;

// The three real content groups DS-7.1 Part 6 scoped into this section —
// "playground-overview" is this page's own landing group, not a group of
// child pages to browse to.
const contentGroups = getGroupsForSection("playground").filter((group) => group.id !== "playground-overview");

const visualTools = getGroupEntries("visual-tools");
const interactiveDemos = getGroupEntries("interactive-demos");
const legacyExperiments = getGroupEntries("legacy-experiments");

const allChildren = [...visualTools, ...interactiveDemos, ...legacyExperiments];

const primaryEntryPoints = [getEntry("design-system")!, getEntry("motion")!, getEntry("compositions")!];

const relatedGroups = [getGroup("core-ui")!, getGroup("components-overview")!, getGroup("patterns-overview")!];

// Real counts, derived from the registry rather than guessed: three visual
// tools, one interactive demo, three archived pre-DS-4 experiments.
const STATS = [
  { label: "Visual tools", value: String(visualTools.length) },
  { label: "Interactive demos", value: String(interactiveDemos.length) },
  { label: "Archived experiments", value: String(legacyExperiments.length) },
];

export default function PlaygroundPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={allChildren} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Playground is where exploration and prototyping tools live, deliberately separated from reference documentation. DS-7.1 Part 6 moved every interactive demo page out of the component and pattern reference docs it used to sit alongside, on the theory that a page for exploring tokens, motion, or layout by trial and error serves a different reader than a page documenting a component's API — so neither should crowd out the other. It groups three kinds of pages: Visual Tools for exploring the design system's own raw material, Interactive Demos for composing real pages from it, and a small set of Archived Experiments — three pre-DS-4 diagram-canvas playgrounds kept reachable as historical reference after being superseded by the real Applications platforms they prototyped."
        whatYoullLearn={[
          "The three visual tools — the Design System Explorer, Motion Engine, and Illustration Engine — for exploring tokens, typography, layout, animation, and the diagram engine outside any single component's reference page.",
          "The Composition Playground's device-preview tool, for seeing marketing section compositions assembled and resized live instead of reading about them.",
          "Why three pre-DS-4 illustration-canvas playgrounds — Platform Architecture, Production & Validation, and Capability Library — are kept here rather than deleted: they're superseded by the real Applications platforms but still useful as historical reference.",
          "Why this section is separate from Components and Patterns: interactive exploration and API reference serve different readers and shouldn't compete for the same page.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="visual-tools"
            eyebrow={<Eyebrow tone="accent">{contentGroups.find((g) => g.id === "visual-tools")?.title}</Eyebrow>}
            title="Explore the system's own raw material"
            description={getGroup("visual-tools")!.description}
          />
          <DocsEntryGrid entries={visualTools} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="interactive-demos"
            eyebrow={<Eyebrow tone="accent">{contentGroups.find((g) => g.id === "interactive-demos")?.title}</Eyebrow>}
            title="Compose and preview live"
            description={getGroup("interactive-demos")!.description}
          />
          <DocsEntryGrid entries={interactiveDemos} columns={interactiveDemos.length <= 2 ? 2 : 3} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="legacy-experiments"
            eyebrow={<Eyebrow>{contentGroups.find((g) => g.id === "legacy-experiments")?.title}</Eyebrow>}
            title="Archived — kept reachable, not deleted"
            description="Three pre-DS-4 illustration-canvas playgrounds, superseded by their real Applications-tier counterparts. DS-7.1 Part 9's Archive disposition keeps them reachable and clearly marked as historical rather than removing them outright."
          />
          <CardGrid columns={3} gap="md">
            {legacyExperiments.map((item) => (
              <Link key={item.id} href={item.href} className="focus-ring block rounded-lg">
                <Card
                  interactive
                  className="flex h-full flex-col gap-3 opacity-75 grayscale-[0.4] transition-[opacity,filter] duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:opacity-100 hover:grayscale-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-body-md font-medium text-ink-secondary">{item.title}</span>
                    <Badge tone="warning" size="sm">
                      Legacy
                    </Badge>
                  </div>
                  <Body size="sm" muted className="flex-1">
                    {item.description}
                  </Body>
                  <Inline gap="xs" align="center" className="border-t border-border-subtle pt-2">
                    <Archive className="size-3.5 shrink-0 text-ink-tertiary" aria-hidden />
                    <Caption className="text-ink-tertiary">Archived — superseded by Applications</Caption>
                  </Inline>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
