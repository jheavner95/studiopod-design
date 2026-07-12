import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { WorkflowStepperGallery } from "./_components/WorkflowStepperGallery";
import { STEPPER_ANATOMY } from "./_data/anatomy";
import { STEPPER_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { STEPPER_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { STEPPER_PROMOTION_CANDIDATES, STEPPER_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { STEPPER_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("workflow-stepper")!;
const relatedComponents = [getEntry("workflow-framework")!, getEntry("foundation-navigation")!, getEntry("workflow-timeline")!];

export default function WorkflowStepperPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Nine regions, one wizard"
            description="Every component in this family maps to exactly one region below — six of nine delegate directly to Workflow Framework's own components (re-exported, not rebuilt); only Steps, Connectors, and Navigation are genuinely new."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {STEPPER_ANATOMY.map((region) => (
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
            description="Workflow Stepper is for a guided, multi-step process with real interaction — not every step list belongs here."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Guided, multi-step wizards</span>
              <Body size="sm" muted>
                A process with Back/Next navigation, a current-step cursor, and this family&rsquo;s own eight-value state model (Not
                Started, Current, Completed, Blocked, Waiting, Skipped, Failed, Cancelled) — the Linear Wizard, Approval Wizard, and
                Resume Later patterns in the gallery below are all built from these same pieces.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Read-only step display</span>
              <Body size="sm" muted>
                For a step indicator with no Back/Next, no internal state, and no interaction, reach for Foundation Navigation&rsquo;s
                own Stepper instead — a plain, read-only list explicitly documented as not an interactive control.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Branching or dynamic flows</span>
              <Body size="sm" muted>
                This family&rsquo;s connectors are linear only — two possible next steps from one point, steps shown or hidden by an
                earlier answer, or a step inserted mid-flow are not yet supported. See Future Enhancements below.
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
            title="Eight wizard patterns, live"
            description="Each demo below is a real, working composition with real local state — not a static screenshot. Try the Linear Wizard's Back/Next, the Approval Wizard's Approve button, and the Resume Later demo's Save and exit / Resume flow."
            descriptionMaxWidth={false}
          />
          <WorkflowStepperGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this family recognizes, grounded in the real implementation detail behind each one, plus how the stepper bar adapts across viewport widths."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={STEPPER_STATES.map((item) => ({ label: item.state, value: item.note }))} />

          <div className="flex flex-col gap-6">
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
          <DescriptionList items={STEPPER_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="What this family decides for the caller, and what it deliberately leaves to the screen composing it."
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
              id="migration-notes"
              title="Migration notes"
              description="Real, grep-verified duplication search across every named domain in the codebase — not estimated or carried over from memory."
              descriptionMaxWidth={false}
            />
            {STEPPER_PROMOTION_CANDIDATES.length === 0 ? (
              <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">No migration matches found</span>
                <Body size="sm" muted>
                  No existing hand-rolled stepper/wizard UI was found anywhere in the codebase across all six named domains, including a
                  direct re-read of Foundation Navigation&rsquo;s own Stepper and the brand-new Workflow Framework files. See the
                  findings below for what was actually checked.
                </Body>
              </Card>
            ) : null}
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Findings</span>
              {STEPPER_CLEAN_FINDINGS.map((finding) => (
                <Card key={finding.slice(0, 24)} className="flex flex-col gap-2 border-success/30 bg-success-soft">
                  <Body size="sm" muted>
                    {finding}
                  </Body>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Room the current system leaves for later — reserved, not scoped or committed."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {STEPPER_FUTURE_EXTENSIONS.map((extension) => (
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
