import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsGroupCard } from "@/components/docs";
import { DocsLandingSummary } from "@/app/docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "@/app/docs/_components/DocsSectionLanding";
import { SectionShell, CardGrid } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries, getGroupsForSection } from "@/lib/design-system-navigation";

const entry = getEntry("workflow-patterns")!;

// Patterns' two real content groups — patterns-overview (this page's own
// group) is excluded so the landing never links to itself.
const contentGroups = getGroupsForSection("patterns").filter((group) => group.id !== "patterns-overview");

const platformTemplateEntries = getGroupEntries("platform-templates");
const processDiagramEntries = getGroupEntries("process-diagrams");
const children = [...platformTemplateEntries, ...processDiagramEntries];

// Three real pages exist in this section today, so all three earn a spot as
// primary entry points rather than a curated subset.
const primaryEntryPoints = children;
const relatedGroups = [getGroup("components-overview")!, getGroup("applications-overview")!, getGroup("architecture-overview")!];

// Real, grep-verifiable counts: 7 platform templates (PLATFORM_TEMPLATES in
// application-components/_data/templates.ts), 8-of-9 Feature Categories
// covered by the Business Feature Templates composition matrix (per the
// registry's own entry description), 6 example workflows in
// src/workflows/examples/index.ts rendered through the Process Diagrams
// library, 2 content groups this landing organizes.
const STATS = [
  { label: "Platform templates", value: "7" },
  { label: "Feature categories", value: "8" },
  { label: "Example workflows", value: "6" },
  { label: "Pattern groups", value: String(contentGroups.length) },
];

export default function WorkflowPatternsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={children} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Patterns is where you go for a proven starting shape instead of building a screen from scratch. It sits between Components, which documents individual widgets, and Applications, which shows full working platforms: a library of ready-made platform-screen and business-feature blueprints, plus a diagram library that turns any multi-step business process into a visual. It's built for engineers and designers assembling a new feature who need a starting layout or a process diagram, not a single primitive to look up or a finished product to study. Start with Platform Templates if you're laying out a new screen, or the Workflow Diagram Library if you need to visualize a process."
        whatYoullLearn={[
          "The two groups this section organizes — Platform Templates, the reusable platform-screen and business-feature blueprints assembled entirely from already-approved components, and the Workflow Diagram Library, which renders any multi-step process from structured data.",
          "The seven platform-screen templates and the component families each one requires, plus the Business Feature Templates catalog spanning eight standard feature categories.",
          "The four workflow shapes the diagram engine supports — linear, looping, branching, and parallel — and how to render any of six example workflows with a single component call.",
          "Why Patterns is the right stop for a recurring layout or process problem, rather than a single component (Components) or a finished platform (Applications).",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="browse-patterns"
            eyebrow={<Eyebrow tone="accent">Browse by group</Eyebrow>}
            title="Two pattern libraries"
            description="Everything in this section falls into one of these two groups."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2} gap="md">
            {contentGroups.map((group) => (
              <DocsGroupCard
                key={group.id}
                href={group.href}
                title={group.title}
                description={group.description}
                entries={getGroupEntries(group.id)}
              />
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
