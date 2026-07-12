import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { StateMachineGallery } from "./_components/StateMachineGallery";
import { STATE_ANATOMY } from "./_data/anatomy";
import { MACHINE_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { STATE_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { STATE_PROMOTION_CANDIDATES, STATE_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { STATE_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("state-machine")!;
const relatedComponents = [getEntry("pipeline-components")!, getEntry("workflow-timeline")!, getEntry("inspector-panel")!];

export default function StateMachinePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Nine regions, twelve components"
            description="Every component in this family maps to one of the regions below — three of twelve delegate directly to Workflow Framework's own components (re-exported, not rebuilt), one composes Inspector Panel directly, and one composes Workflow Timeline directly; Node, Transition, Condition, Action, and Events are genuinely new."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {STATE_ANATOMY.map((region) => (
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
            description="State Machine is for a process defined by discrete states, guarded transitions, and enter/exit actions — not every status display belongs here."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">State-driven processes</span>
              <Body size="sm" muted>
                A process with discrete named states, guard conditions gating a transition, and actions that fire on
                enter, exit, or transition — the eight-value state model documented in Behavior below, plus the
                StateCondition guards and StateAction records shown live in the gallery.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Not a transition-rule engine</span>
              <Body size="sm" muted>
                This family holds no opinion on which states a machine may move between — StateTransition renders a
                line and an optional label, nothing more. Whether a real transition is allowed is entirely the
                caller&rsquo;s own domain logic; see Composition below.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Distinct from Pipeline Components</span>
              <Body size="sm" muted>
                Pipeline Components&rsquo; own PipelineStatus reuses Workflow Framework&rsquo;s WorkflowStateValue
                verbatim for a business-pipeline stage list. This family declares its own independent StateValue
                vocabulary — including a Terminal value with no WorkflowStateValue counterpart at all — for genuine
                state-machine semantics rather than a relabeled pipeline status.
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
            title="Eight state machine patterns, live"
            description="Each demo below is a real, working composition with real local state — not a static screenshot. Try the Linear State Machine's Advance button and the Failure Recovery's Retry button."
            descriptionMaxWidth={false}
          />
          <StateMachineGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this family recognizes, grounded in the real implementation detail behind each one, plus how the machine adapts across viewport widths."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={MACHINE_STATES.map((item) => ({ label: item.state, value: item.note }))} />

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
          <DescriptionList items={STATE_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="What this family decides internally, and what it deliberately leaves to the screen composing it."
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
              description="Real, grep-verified findings across six named domains — Production, Publishing, Commerce, Automation, Intelligence, Operations — plus a repo-wide search for exported state-machine patterns, not estimated or carried over from memory."
              descriptionMaxWidth={false}
            />
            {STATE_PROMOTION_CANDIDATES.length === 0 ? (
              <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">No migration matches found</span>
                <Body size="sm" muted>
                  No genuine state-machine implementation — states plus explicit allowed-transition rules plus guard
                  conditions — was found anywhere in the codebase across all six named domains. What exists
                  everywhere is the same recurring status-display-bridge pattern (a flat status enum mapped through a
                  lookup table to a visual tone), which this family is positioned as formalizing into a real
                  state-transition vocabulary for the first time, not deduplicating. See the findings below for what
                  was actually checked, including the pre-existing (plural) Workflow Diagram Library&rsquo;s own
                  playback hook, confirmed to be a simple index-stepping timer rather than real transition logic.
                </Body>
              </Card>
            ) : null}
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Findings</span>
              {STATE_CLEAN_FINDINGS.map((finding) => (
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
              {STATE_FUTURE_EXTENSIONS.map((extension) => (
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
