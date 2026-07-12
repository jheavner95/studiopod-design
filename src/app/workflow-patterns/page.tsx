import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsLandingSummary } from "@/app/docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "@/app/docs/_components/DocsSectionLanding";
import { getEntry, getGroup, getGroupEntries, getGroupsForSection } from "@/lib/design-system-navigation";

const entry = getEntry("workflow-patterns")!;

// Patterns' two real content groups — patterns-overview (this page's own
// group) is excluded so the landing never links to itself.
const contentGroups = getGroupsForSection("patterns").filter((group) => group.id !== "patterns-overview");

const platformTemplateEntries = getGroupEntries("platform-templates");
const processDiagramEntries = getGroupEntries("process-diagrams");
const children = [...platformTemplateEntries, ...processDiagramEntries];

const primaryEntryPoints = children;
const relatedGroups = [getGroup("components-overview")!, getGroup("workflow-process")!, getGroup("applications-overview")!];

// Real, grep-verifiable counts: 7 platform templates (PLATFORM_TEMPLATES in
// application-components/_data/templates.ts), 8-of-9 Feature Categories
// covered by the Business Feature Templates composition matrix (per the
// registry's own entry description), 6 example workflows in
// src/workflows/examples/index.ts rendered through the Process Diagrams
// library, 2 content groups this landing organizes.
const STATS = [
  { label: "Platform templates", value: "7" },
  { label: "Feature categories covered", value: "8 of 9" },
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
        purpose="Patterns is StudioPOD's library of reusable compositions and templates for recurring problems — the layer between Components and Applications. Where Components documents individual widgets and Applications documents full domain compositions, Patterns is for engineers and designers assembling a new feature who need a proven starting shape rather than either a single primitive or a finished platform. It holds two real groups today: Platform Templates, the reusable platform-screen and Business Feature blueprints assembled from certified components, and Process Diagrams, the workflow visualization library that renders any multi-step process from structured data through the illustration engine."
        whatYoullLearn={[
          "The two groups this section organizes — Platform Templates (reusable platform-screen and Business Feature blueprints) and Process Diagrams (the workflow visualization library) — and when to reach for each.",
          "The seven platform-screen templates and their required component families, plus the Business Feature Templates catalog covering eight of the composition framework's nine Feature Categories.",
          "The four workflow patterns the diagram engine supports — linear, looping, branching, and parallel — and how to render any of the six example workflows with a single <WorkflowDiagram workflow={data} /> call.",
          "Why Patterns is distinct from both Components' own Workflow & Process family and from Applications' full domain platforms, even though all three touch multi-step processes.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />
    </DocsShell>
  );
}
