import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { WorkflowFrameworkGallery } from "./_components/WorkflowFrameworkGallery";
import { WORKFLOW_ANATOMY } from "./_data/anatomy";
import { WORKFLOW_WHEN_TO_USE } from "./_data/when-to-use";
import { WORKFLOW_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { WORKFLOW_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { WORKFLOW_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("workflow-framework")!;
const relatedComponents = [getEntry("workflow-stepper")!, getEntry("workflow-timeline")!, getEntry("approval-review")!];

export default function WorkflowFrameworkPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="A shared shell for multi-stage processes"
            description="Workflow Framework gives operator-facing processes — an approval chain, a deployment, a multi-step onboarding flow — a consistent shell: a header, stages made of steps, transitions between them, and a footer for actions. Reach for it when a screen needs to show live, independent status for each step rather than a single progress bar. The framework renders structure and state; your application supplies the logic that decides what happens next. Each region below composes an existing Foundation or Operational component, so the visual language matches the rest of the system automatically."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {WORKFLOW_ANATOMY.map((region) => (
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
            description="Where this framework's scope starts and stops — and where a different system is the better fit."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {WORKFLOW_WHEN_TO_USE.map((rule) => (
              <Card key={rule.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{rule.title}</span>
                <Body size="sm" muted>
                  {rule.explanation}
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
            title="Eight workflow patterns, live"
            description="Each demo below is a real, working composition with real local state — not a static screenshot. Try the Approval Workflow's Approve/Reject buttons, the Publishing Workflow's sidebar toggle, and the Long-running Workflow's advancing progress."
            descriptionMaxWidth={false}
          />
          <WorkflowFrameworkGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="The eight statuses a step or stage can hold, and how the shell adapts as the viewport narrows."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={WORKFLOW_STATES.map((item) => ({ label: item.state, value: item.note }))} />

          <div className="flex flex-col gap-10">
            <SectionHeader id="responsive-behavior" title="Responsive behavior" descriptionMaxWidth={false} />
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
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={WORKFLOW_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How Workflow, WorkflowStage, WorkflowStep, and the rest nest together, and where each piece's responsibility ends."
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
              description="Capabilities the framework doesn't support yet — worth knowing before you design around them:"
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {WORKFLOW_FUTURE_EXTENSIONS.map((extension) => (
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
