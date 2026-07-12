import { CardGrid, SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsLinkCard } from "@/components/docs";
import { DocsLandingSummary } from "@/app/docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "@/app/docs/_components/DocsSectionLanding";
import { getEntry, getGroup, getGroupEntries, getGroupsForSection } from "@/lib/design-system-navigation";

const entry = getEntry("application-components")!;

// Every real content group in this section, skipping this page's own
// "components-overview" group (its order-0 self-entry) the way every other
// top-level landing page does.
const contentGroups = getGroupsForSection("components").filter((group) => group.id !== "components-overview");

// Two clusters: the screen-building families, and the two shared kits that
// extend the same primitives to non-application surfaces.
const kitGroupIds = new Set(["core-ui", "marketing"]);
const familyGroups = contentGroups.filter((group) => !kitGroupIds.has(group.id));
const kitGroups = contentGroups.filter((group) => kitGroupIds.has(group.id));

const children = contentGroups.flatMap((group) => getGroupEntries(group.id));

const primaryEntryPoints = [
  getEntry("foundations")!,
  getEntry("foundation-layout")!,
  getEntry("foundation-table")!,
  getEntry("foundation-forms")!,
  getEntry("workflow-framework")!,
  getEntry("core-components")!,
];

const relatedAreaGroups = [getGroup("patterns-overview")!, getGroup("applications-overview")!, getGroup("architecture-overview")!];

const multiPageFamilies = contentGroups.filter((group) => getGroupEntries(group.id).length > 1).length;

const STATS = [
  { label: "Component families", value: String(contentGroups.length) },
  { label: "Pages in this section", value: String(children.length) },
  { label: "Multi-page families", value: String(multiPageFamilies) },
];

export default function ApplicationComponentsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={children} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Components is the reusable interface library every StudioPOD application screen is built from — widgets organized by what you're trying to build (Layout, Navigation, Data Display, Forms, Overlays, Feedback, Search & Filter, Inspector & Properties, Workflow & Process) instead of by which team built them, plus the shared Core UI Kit and Marketing Sections every product surface, application or marketing, draws from. It's built for engineers assembling or extending a screen who need a working component with its real states, accessibility behavior, and usage guidance, not a design file. Start with Foundations to learn the structural building blocks everything else sits on, then jump straight to the family that matches the problem in front of you — a form to build, a table to render, a multi-step process to guide someone through."
        whatYoullLearn={[
          "The families the component library is organized into, and which one to reach for a given UI problem — Layout, Navigation, Data Display, Forms, Overlays, Feedback, Search & Filter, Inspector & Properties, and Workflow & Process, plus the shared Core UI Kit and Marketing Sections.",
          "Which families are single-page references versus multi-page systems — Data Display and Workflow & Process are the largest, at six and eight pages each.",
          "How Foundations & Tokens underpins every other family, and how Core UI Kit and Marketing Sections extend the same primitives to non-application surfaces.",
          "Where to go next for composition rules (Architecture), reusable templates (Patterns), and real domain platforms (Applications) built from these same components.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedAreaGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="component-families"
            eyebrow={<Eyebrow tone="accent">Browse by family</Eyebrow>}
            title="Interface families"
            description="Everything you'd reach for to build an application screen, grouped by the problem it solves rather than its build history."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="md">
            {familyGroups.map((group) => {
              const count = getGroupEntries(group.id).length;
              return (
                <DocsLinkCard
                  key={group.id}
                  href={group.href}
                  title={group.title}
                  description={group.description}
                  actionLabel={`${count} ${count === 1 ? "page" : "pages"}`}
                />
              );
            })}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="shared-kits"
            eyebrow={<Eyebrow tone="accent">Beyond application screens</Eyebrow>}
            title="Shared UI kits"
            description="The primitives underneath both application and marketing surfaces, and the ready-made sections marketing pages are assembled from."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2} gap="md">
            {kitGroups.map((group) => {
              const count = getGroupEntries(group.id).length;
              return (
                <DocsLinkCard
                  key={group.id}
                  href={group.href}
                  title={group.title}
                  description={group.description}
                  actionLabel={`${count} ${count === 1 ? "page" : "pages"}`}
                />
              );
            })}
          </CardGrid>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
