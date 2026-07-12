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

// This section's real content groups — "playground-overview" is this page's
// own landing group, not a group of child pages to browse to.
const contentGroups = getGroupsForSection("playground").filter((group) => group.id !== "playground-overview");

const visualTools = getGroupEntries("visual-tools");
const interactiveDemos = getGroupEntries("interactive-demos");
const legacyExperiments = getGroupEntries("legacy-experiments");

const allChildren = [...visualTools, ...interactiveDemos, ...legacyExperiments];

// Every current (non-archived) destination in the section: both visual
// tools plus the composition playground.
const primaryEntryPoints = [getEntry("motion")!, getEntry("illustrations")!, getEntry("compositions")!];

const relatedGroups = [getGroup("components-overview")!, getGroup("patterns-overview")!, getGroup("applications-overview")!];

// Real counts, derived from the registry rather than guessed: two visual
// tools, one interactive demo, three archived experiments.
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
        purpose="Playground is the hands-on side of the design system: interactive tools for exploring motion and illustration by trial and error, instead of reading about them on a reference page. It's for anyone exploring or prototyping — not for someone who already knows which component they need and just wants its API. Here you can play with the system's raw visual material, preview marketing-page compositions assembled and resized live, and get a feel for how pieces fit together before committing to a layout. A few earlier exploration tools are also kept here for reference, even though the real platforms they prototyped have since replaced them. Start with the Motion Engine to get oriented, or jump straight into whichever tool matches what you're exploring."
        whatYoullLearn={[
          "The two visual tools — the Motion Engine and Illustration Engine — for exploring animation and the diagram engine outside of any single component's reference page. Token, color, typography, and layout exploration now lives in Foundations & Tokens.",
          "The Composition Playground, where you can preview marketing-page sections assembled together and resized live across device sizes.",
          "A small set of earlier exploration tools — kept reachable for reference even though the platforms they prototyped have since replaced them.",
          "Why this section stays separate from Components and Patterns: hands-on exploration and written reference serve different moments, and neither should crowd out the other.",
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
            description="Three earlier diagram-canvas playgrounds, superseded by their current counterparts in Applications. They're kept reachable here and clearly marked as historical rather than being removed outright."
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
