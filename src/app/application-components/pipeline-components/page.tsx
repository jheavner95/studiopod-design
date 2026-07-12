import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { PipelineGallery } from "./_components/PipelineGallery";
import { PIPELINE_ANATOMY } from "./_data/anatomy";
import { PIPELINE_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { PIPELINE_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { PIPELINE_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("pipeline-components")!;
const relatedComponents = [getEntry("approval-review")!, getEntry("workflow-timeline")!, getEntry("state-machine")!];

export default function PipelineComponentsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Nine regions, twelve components — five of twelve delegate directly to Workflow Framework's own components (re-exported, not rebuilt), one composes Approval & Review's own ApprovalDecision, and one composes Workflow Timeline directly; Step, Connector, Status, Branch, and Metrics are genuinely new."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {PIPELINE_ANATOMY.map((region) => (
              <Card key={region.name} className="flex flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                <Body size="sm" muted>
                  {region.description}
                </Body>
                <Caption className="border-t border-border-subtle pt-3 text-ink-tertiary">{region.component}</Caption>
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
            description="Pipeline is a DOM-composed component library, not a diagram renderer — two other real, pre-existing pipeline models in this codebase sit at a different layer and remain the right tool for their own use case."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Reach for Pipeline</span>
              <Body size="sm" muted>
                When a screen needs a real, interactive DOM-based stage list with clickable steps, inline gates, and composable actions a
                user actually works with — not a rendered diagram.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Reach for a diagram instead</span>
              <Body size="sm" muted>
                When a screen needs an at-a-glance node-and-connection graph — Production&rsquo;s own ProductionPipelineDiagram or the
                Illustration Library&rsquo;s IllustrationPipeline render that through the illustration-canvas engine, and the two can coexist
                with Pipeline on the same screen.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Reach for PipelineGate</span>
              <Body size="sm" muted>
                When a stage needs an actual approval decision, not just a status marker — it composes Approval & Review&rsquo;s own
                ApprovalDecision directly.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Reach for PipelineHistory</span>
              <Body size="sm" muted>
                When a run needs the chronological record of every stage transition — it composes Workflow Timeline directly rather than
                reimplementing its own history list.
              </Body>
            </Card>
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Eight pipeline patterns, live"
            description="Each demo below is a real, working composition with real local state — not a static screenshot. Try the Linear Pipeline's Advance button and the Publishing Pipeline's gate Approve button."
            descriptionMaxWidth={false}
          />
          <PipelineGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this family recognizes, grounded in the real implementation detail behind each one, plus how the same components respond across breakpoints."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={PIPELINE_STATES.map((item) => ({ label: item.state, value: item.note }))} />
          <CardGrid columns={3}>
            {BREAKPOINT_NOTES.map((item) => (
              <Card key={item.breakpoint} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{item.breakpoint}</span>
                <Body size="sm" muted>
                  {item.note}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <DescriptionList items={RESPONSIVE_TOPICS.map((topic) => ({ label: topic.label, value: topic.note }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={PIPELINE_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="Six contracts describing where responsibility sits between this package and the screen composing it."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={IMPLEMENTATION_GUIDANCE.map((topic) => ({ label: topic.label, value: topic.text }))} />
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
          <DocsRelatedGrid entries={relatedComponents} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Capabilities this system does not currently include:"
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {PIPELINE_FUTURE_EXTENSIONS.map((extension) => (
                <Card key={extension.title} className="flex flex-col gap-2 border-dashed">
                  <span className="text-body-sm font-medium text-ink-primary">{extension.title}</span>
                  <Body size="sm" muted>
                    {extension.description}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
