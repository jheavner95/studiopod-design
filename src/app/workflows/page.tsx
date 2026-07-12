import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { IllustrationDevProvider } from "@/illustrations";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { DOCK_CLEARANCE_CLASS } from "@/motion";
import { ControlDock } from "./_components/ControlDock";
import { WorkflowGallerySection } from "./_sections/WorkflowGallerySection";
import { PlaybackSection } from "./_sections/PlaybackSection";
import { TimelineSection } from "./_sections/TimelineSection";
import { RailAndCardSection } from "./_sections/RailAndCardSection";
import { ResponsiveSection } from "./_sections/ResponsiveSection";

const entry = getEntry("workflows-library")!;
const relatedComponents = [getEntry("docs-workflow")!, getEntry("illustrations")!, getEntry("workflow-timeline")!];

// Plain-language descriptions for the related-components cards below —
// written here rather than pulled from each entry's own registry
// description, since two of these are similarly named to (but distinct
// from) this library and deserve that distinction spelled out.
const RELATED_NOTES: Record<string, string> = {
  "docs-workflow": "The interactive, in-application counterpart to this library — real multi-step process components, not illustration-engine diagrams.",
  illustrations: "The data-driven diagram engine every workflow diagram on this page renders through.",
  "workflow-timeline": "An application component with a similar name to WorkflowTimeline above — a real history/audit-trail timeline, not a diagram-library primitive.",
};

// Real, grep-verifiable against src/workflows/components/index.ts: eight
// reusable primitives, every one built on the shared illustration engine.
const PRIMITIVES = [
  { name: "WorkflowDiagram", description: "The primary entry point — compiles a workflow's steps and connections into a full diagram." },
  { name: "WorkflowLegend", description: "A legend of the statuses actually present in a given workflow." },
  { name: "WorkflowStepDetails", description: "An expandable panel showing one step's full detail on demand." },
  { name: "WorkflowTimeline", description: "The same steps rendered as a vertical or horizontal status timeline." },
  { name: "WorkflowRail", description: "A compact horizontal rail that summarizes a workflow in a single strip." },
  { name: "WorkflowCard", description: "One workflow step summarized as a standalone card." },
  { name: "WorkflowMiniMap", description: "A compact, label-less overview of a workflow's shape." },
  { name: "WorkflowProgress", description: "A workflow-level completion bar." },
];

// Real, grep-verifiable against src/workflows/types/workflow.ts (the
// WorkflowPattern union) and src/workflows/examples/*.tsx (each workflow's
// own `pattern` field and connections/branches).
const PATTERNS = [
  {
    name: "Linear",
    description: "A straight sequence from start to finish, with no branches or loops.",
    examples: "Prepare, Validate, Produce · Artwork Production · Quality Assurance",
  },
  {
    name: "Looping",
    description: "A cycle where a later step's output feeds back into an earlier one.",
    examples: "Publishing — Monitoring loops back into Product",
  },
  {
    name: "Branching",
    description: "A decision step that routes to one of several next steps.",
    examples: "Commerce — Orders routes to Production or straight to Fulfillment",
  },
  {
    name: "Parallel",
    description: "Two or more steps reachable from the same point, in either order.",
    examples: "Beta User Journey — Connect AI and Import Artwork",
  },
];

const ACCESSIBILITY_TOPICS = [
  {
    label: "Reduced motion",
    text: "Every animated diagram reads its motion preference from the same MotionPreferenceProvider used across the site, which falls back to the OS-level prefers-reduced-motion setting. The control dock's own Reduced motion toggle overrides that setting on demand, without touching your system preferences.",
  },
  {
    label: "Diagram semantics",
    text: "WorkflowDiagram renders through IllustrationCanvas, which carries role=\"group\" and aria-label=\"Diagram\" so assistive technology recognizes it as a single unit rather than a scatter of unrelated shapes.",
  },
  {
    label: "Keyboard-focusable steps",
    text: "Wherever a diagram accepts a step click handler — the gallery above, for example — each step renders as a real button with aria-pressed and an aria-label, focusable and operable from the keyboard, not a div with a click listener.",
  },
];

export default function WorkflowsLibraryPage() {
  return (
    <IllustrationDevProvider>
      <DocsShell entry={entry} toc={<DocsTableOfContents />}>
        <DocsPageHeader entry={entry} />

        <ControlDock />

        <SectionShell spacing="lg" divider>
          <div className="flex flex-col gap-10">
            <SectionHeader
              id="overview"
              eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
              title="Overview"
              description="Every diagram on this page renders through one of eight reusable primitives, all built on the shared illustration engine and driven entirely by data — no page-specific rendering code exists anywhere in this library."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={4}>
              {PRIMITIVES.map((primitive) => (
                <Card key={primitive.name} className="flex flex-col gap-2">
                  <span className="font-mono text-body-sm font-medium text-ink-primary">{primitive.name}</span>
                  <Body size="sm" muted>
                    {primitive.description}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>
        </SectionShell>

        <SectionShell spacing="lg" divider>
          <div className="flex flex-col gap-10">
            <SectionHeader
              id="when-to-use"
              eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
              title="When to use"
              description="Every example workflow declares one of four patterns. Pick the one that matches the real shape of the process — the diagram engine renders each identically from data, so the choice is about which shape reads clearly, not implementation effort."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={2}>
              {PATTERNS.map((pattern) => (
                <Card key={pattern.name} className="flex flex-col gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{pattern.name}</span>
                  <Body size="sm" muted>
                    {pattern.description}
                  </Body>
                  <Body size="sm" className="text-ink-tertiary">
                    {pattern.examples}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>
        </SectionShell>

        <SectionShell spacing="lg" divider>
          <div className="flex flex-col gap-10">
            <SectionHeader
              id="examples"
              eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
              title="Examples"
              description="All six example workflows, every pattern represented, rendered from data through the same WorkflowDiagram component. Click a step to expand its details."
              descriptionMaxWidth={false}
            />
            <WorkflowGallerySection />
          </div>
        </SectionShell>

        <SectionShell spacing="lg" divider>
          <div className="flex flex-col gap-14">
            <SectionHeader
              id="behavior"
              eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
              title="Behavior"
              description="How a workflow diagram responds to interaction and to the space it's given — driven automatically, scrubbed by hand, or squeezed into a narrower container."
              descriptionMaxWidth={false}
            />

            <div className="flex flex-col gap-6">
              <SectionHeader
                id="workflow-playback"
                title="Playback and scrubbing"
                description="The same workflow data, advanced automatically or scrubbed by hand. WorkflowDiagram, WorkflowProgress, and WorkflowMiniMap all stay in sync because they all read from the same played-workflow value."
                descriptionMaxWidth={false}
              />
              <PlaybackSection />
            </div>

            <div className="flex flex-col gap-6">
              <SectionHeader
                id="workflow-responsive"
                title="Desktop, tablet, mobile"
                description="The same branching workflow at three container widths. Desktop keeps the authored horizontal layout, tablet compresses spacing, mobile stacks the steps automatically."
                descriptionMaxWidth={false}
              />
              <ResponsiveSection />
            </div>
          </div>
        </SectionShell>

        <SectionShell spacing="lg" divider>
          <div className="flex flex-col gap-10">
            <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
            <DescriptionList items={ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
          </div>
        </SectionShell>

        <SectionShell spacing="lg" divider>
          <div className="flex flex-col gap-14">
            <SectionHeader
              id="composition"
              eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
              title="Composition"
              description="A single workflow value composes into more than one shape — the full diagram is only the default rendering."
              descriptionMaxWidth={false}
            />

            <div className="flex flex-col gap-6">
              <SectionHeader
                id="workflow-timeline-variants"
                title="Timeline variants"
                description="A workflow rendered as a status timeline instead of a diagram, useful anywhere a step-by-step narrative reads better than a spatial layout."
                descriptionMaxWidth={false}
              />
              <TimelineSection />
            </div>

            <div className="flex flex-col gap-6">
              <SectionHeader
                id="workflow-rail-card"
                title="Compact summaries"
                description="A workflow reduced to a single rail for a status strip, or expanded into a card per step for a grid layout."
                descriptionMaxWidth={false}
              />
              <RailAndCardSection />
            </div>
          </div>
        </SectionShell>

        <SectionShell spacing="lg" divider>
          <div className="flex flex-col gap-6">
            <SectionHeader
              id="related-components"
              eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
              title="Related components"
              descriptionMaxWidth={false}
            />
            <DocsRelatedGrid
              entries={relatedComponents.map((related) => ({
                id: related.id,
                href: related.href,
                title: related.title,
                description: RELATED_NOTES[related.id] ?? related.description,
              }))}
            />
          </div>
        </SectionShell>

        <SectionShell spacing="lg">
          <div className="flex flex-col gap-10">
            <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

            <div className="flex flex-col gap-6">
              <SectionHeader
                id="migration-notes"
                title="Migration notes"
                description="This library exists precisely so future pages stop writing one-off diagram code. Any new marketing or documentation page that needs to explain a multi-step process should define a Workflow data value and hand it to WorkflowDiagram (or one of the other seven primitives above) rather than building a bespoke visual."
                descriptionMaxWidth={false}
              />
            </div>
          </div>
        </SectionShell>

        <div className={DOCK_CLEARANCE_CLASS} aria-hidden="true" />
      </DocsShell>
    </IllustrationDevProvider>
  );
}
