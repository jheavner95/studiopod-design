import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-workflow")!;

// Workflow is one of the tier pages inside the Architecture section's "tier-model" group.
// The "related tiers" section below cross-links the rest of that group.
const tierModelEntries = getGroupEntries("tier-model");
const siblingTierPages = tierModelEntries.filter((e) => e.id !== entry.id);

const primaryEntryPoints = [getEntry("workflow-framework")!, getEntry("workflow-stepper")!];
const relatedGroups = [getGroup("components-overview")!, getGroup("playground-overview")!, getGroup("architecture-overview")!];

// Real per-system component counts, verified against src/components/workflow/
// (92 components total across the tier's eight systems).
const STATS = [
  { label: "Pages in Tier Model", value: String(tierModelEntries.length) },
  { label: "Real components", value: "92" },
  { label: "Workflow systems", value: "8" },
];

export default function DocsWorkflowPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={tierModelEntries} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="This page is architecture documentation explaining how the Workflow tier fits into the system — it is not the primary way to browse Workflow's actual components; for that, use the Components section. Workflow Tier is the domain-agnostic layer for multi-step processes and cross-cutting visualization — eight systems (Workflow Framework, Workflow Stepper, Workflow Timeline, Approval & Review, Pipeline Components, State Machine, Dependency & Relationship Views, and Workflow Visualization) built entirely on Foundation and Operational rather than raw HTML. Every other system in the tier composes from Workflow Framework's shared header/sidebar/stage/step/transition/progress/summary/actions/footer shell, and several reuse Workflow Timeline for their own history views. Together the eight systems total 92 components."
        whatYoullLearn={[
          "The eight systems and what each one owns — process shell, wizard progress, history timeline, approvals, pipelines, state-driven processes, dependency graphs, and the operational visualization layer.",
          "How later systems in the tier reuse earlier ones, such as Approval & Review and Pipeline Components both building on Workflow Timeline, and State Machine and Workflow Visualization building on Pipeline Components.",
          "Known limitations across the tier — like WorkflowStepperStep never setting aria-current on the active step, or the PipelineStage/PipelineStep naming collisions with the illustration library.",
          "Where Workflow sits relative to Foundation, Operational, and Platform in the tier model, and where each of those tiers' own architecture pages live.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="tier-model"
            eyebrow={<Eyebrow tone="accent">Tier model</Eyebrow>}
            title="Other tier model pages"
            descriptionMaxWidth={false}
          />
          <DocsEntryGrid entries={siblingTierPages} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
