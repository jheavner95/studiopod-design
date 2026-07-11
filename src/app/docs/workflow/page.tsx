import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-workflow")!;
const children = getGroupEntries("workflow-systems").filter((e) => e.id !== entry.id);

const primaryEntryPoints = children.filter((e) => e.id === "workflow-framework" || e.id === "workflow-certification");
const commonPages = children.filter((e) => !primaryEntryPoints.includes(e));
const relatedGroups = [getGroup("foundation-systems")!, getGroup("operational-systems")!, getGroup("platform-systems")!];

// Real per-system component counts, verified against
// src/app/application-components/workflow-certification/_data/systems.ts (WORKFLOW_SYSTEMS,
// TOTAL_COMPONENT_COUNT = 92) — the same audit data that page's own scorecard renders.
const STATS = [
  { label: "Pages in this section", value: String(children.length) },
  { label: "Real components", value: "92" },
  { label: "Certified families", value: "2 of 8" },
];

export default function DocsWorkflowPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={children} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Workflow Systems is the domain-agnostic layer for multi-step processes and cross-cutting visualization — eight systems (Workflow Framework, Workflow Stepper, Workflow Timeline, Approval & Review, Pipeline Components, State Machine, Dependency & Relationship Views, and Workflow Visualization) built entirely on Foundation and Operational rather than raw HTML. Every other system in the tier composes from Workflow Framework's shared header/sidebar/stage/step/transition/progress/summary/actions/footer shell, and several reuse Workflow Timeline for their own history views. Together the eight systems total 92 components, two of which — State Machine and Dependency & Relationship Views — are independently Certified with zero exceptions."
        whatYoullLearn={[
          "The eight systems and what each one owns — process shell, wizard progress, history timeline, approvals, pipelines, state-driven processes, dependency graphs, and the operational visualization layer.",
          "How later systems in the tier reuse earlier ones, such as Approval & Review and Pipeline Components both building on Workflow Timeline, and State Machine and Workflow Visualization building on Pipeline Components.",
          "Which two of the eight systems have earned the tier's highest Certified rating versus the six still rated Production Ready.",
          "Where a handful of real, disclosed issues live — like WorkflowStepperStep never setting aria-current on the active step, or the PipelineStage/PipelineStep naming collisions with the illustration library.",
          "Where to find the full certification scorecard and dependency review for the whole tier.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="common-pages"
            eyebrow={<Eyebrow tone="accent">Browse by system</Eyebrow>}
            title="Most commonly used pages"
            descriptionMaxWidth={false}
          />
          <DocsEntryGrid entries={commonPages} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
