import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsLandingSummary } from "@/app/docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "@/app/docs/_components/DocsSectionLanding";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("workflow-patterns")!;
const children = getGroupEntries("workflow-patterns").filter((e) => e.id !== entry.id);

// The only real page in this group today — see the group landing entry's
// own "next" pointer in the registry.
const primaryEntryPoints = children;
const relatedGroups = [getGroup("foundations")!, getGroup("workflow-systems")!, getGroup("diagram-libraries")!];

// Real, grep-verifiable counts against src/workflows/: 6 workflows in
// src/workflows/examples/index.ts, 4 patterns in WorkflowPattern
// (src/workflows/types/workflow.ts), 8 files under src/workflows/components/.
const STATS = [
  { label: "Example workflows", value: "6" },
  { label: "Diagram patterns", value: "4" },
  { label: "Reusable components", value: "8" },
  { label: "Pages in this section", value: String(children.length) },
];

export default function WorkflowPatternsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={children} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Workflow Patterns is StudioPOD's library of reusable diagrams for visualizing multi-step processes end to end, rendered entirely from structured data through the illustration engine. It exists because production workflows keep needing the same handful of shapes — linear pipelines, looping retry cycles, branching decision points, and parallel tracks — and this section proves all four render through one reusable component instead of one-off diagram code per page. It's deliberately scoped to visualization patterns rather than application behavior, which is why it sits alongside Foundations and the Application Components tiers rather than inside either."
        whatYoullLearn={[
          "The four workflow patterns the diagram engine supports — linear, looping, branching, and parallel — and which of the six example workflows demonstrates each.",
          "How to render a full workflow from a plain data value with <WorkflowDiagram workflow={data} />, with no page-specific rendering code required.",
          "The reusable primitives — diagram, legend, step details, timeline, rail, card, mini-map, and progress — that compose into full diagrams, timelines, and compact summaries.",
          "Playback and scrubbing controls for walking through a workflow step by step, and how the same diagram adapts across desktop, tablet, and mobile.",
          "Why this library is distinct from the similarly-named Workflow Systems group under Application Components, even though both work with multi-step processes.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />
    </DocsShell>
  );
}
