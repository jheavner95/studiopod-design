import Link from "next/link";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { WorkflowFrameworkGallery } from "./_components/WorkflowFrameworkGallery";
import { WORKFLOW_ANATOMY } from "./_data/anatomy";
import { WORKFLOW_WHEN_TO_USE } from "./_data/when-to-use";
import { WORKFLOW_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { WORKFLOW_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { WORKFLOW_PROMOTION_CANDIDATES, WORKFLOW_CLEAN_FINDINGS, WORKFLOW_NAMING_NOTE } from "./_data/promotion-candidates";
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
            title="Nine regions, one framework"
            description="Every component in this family maps to exactly one region below — most delegate directly to an already-certified Foundation or Operational component. This package defines the framework only; no workflow-specific business logic lives here."
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
            description="Eight states this family recognizes, grounded in the real implementation detail behind each one — plus how the shell responds as the viewport narrows."
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
          <CardGrid columns={3}>
            {relatedComponents.map((related) => (
              <Link key={related.id} href={related.href} className="focus-ring block rounded-lg">
                <Card interactive className="flex h-full flex-col gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{related.title}</span>
                  <Body size="sm" muted>
                    {related.description}
                  </Body>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="migration-notes"
              title="Migration notes"
              description="Real, grep-verified duplication found while building this system — not estimated or carried over from memory."
              descriptionMaxWidth={false}
            />
            {WORKFLOW_PROMOTION_CANDIDATES.length === 0 ? (
              <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">Nothing to migrate</span>
                <Body size="sm" muted>
                  No existing hand-rolled stage/step/transition workflow UI was found anywhere in the codebase across all six named domains, including a direct read of the pre-existing Workflow Diagram Library&rsquo;s own eight components. See the clean findings below for what was actually checked.
                </Body>
              </Card>
            ) : null}
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
              {WORKFLOW_CLEAN_FINDINGS.map((finding) => (
                <Card key={finding.slice(0, 24)} className="flex flex-col gap-2 border-success/30 bg-success-soft">
                  <Body size="sm" muted>
                    {finding}
                  </Body>
                </Card>
              ))}
            </div>
            <Card className="flex flex-col gap-2 border-warning/30 bg-warning-soft">
              <span className="text-body-sm font-medium text-ink-primary">Naming overlap, documented rather than migrated</span>
              <Body size="sm" muted>
                {WORKFLOW_NAMING_NOTE}
              </Body>
            </Card>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Room the current system leaves for later — reserved, not scoped or committed."
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
