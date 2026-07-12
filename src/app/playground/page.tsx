import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsLinkCard } from "@/components/docs";
import { DocsEntryGrid } from "@/app/docs/_components/DocsEntryGrid";
import { DocsLandingSummary } from "@/app/docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "@/app/docs/_components/DocsSectionLanding";
import { CardGrid, SectionShell } from "@/components/layout";
import { Badge, SectionHeader, Eyebrow } from "@/components/ui";
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
  { label: "Historical references", value: String(legacyExperiments.length) },
];

export default function PlaygroundPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={allChildren} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Playground is the hands-on side of the design system: try motion, illustration, and page composition directly instead of reading about them. Start with the Motion Engine to get oriented, or jump straight into whichever tool matches what you're exploring."
        whatYoullLearn={[
          "The Motion Engine and Illustration Engine — build and preview animation and diagrams live, outside of any single component's reference page.",
          "The Composition Playground, where marketing-page sections assemble and resize live across device sizes.",
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
            title="Historical Reference — kept reachable, not deleted"
            description="Three earlier diagram-canvas playgrounds, kept reachable here as historical reference alongside their current counterparts in Applications, and clearly marked as such rather than being removed outright."
          />
          <CardGrid columns={3} gap="md">
            {legacyExperiments.map((item) => (
              <DocsLinkCard
                key={item.id}
                href={item.href}
                title={item.title}
                description={item.description}
                adornment={
                  <Badge tone="neutral" size="sm">
                    Historical Reference
                  </Badge>
                }
                actionLabel="Historical Reference — see Applications for current"
                srLabel={`${item.title} (historical reference — see Applications for current): ${item.description}`}
                className="opacity-75 grayscale-[0.4] transition-[opacity,filter] duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
