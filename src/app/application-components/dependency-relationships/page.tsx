import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { DependencyGallery } from "./_components/DependencyGallery";
import { DEPENDENCY_ANATOMY } from "./_data/anatomy";
import { DEPENDENCY_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { DEPENDENCY_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { WHEN_TO_USE_TOPICS, COMPOSITION_TOPICS } from "./_data/implementation-guidance";
import { DEPENDENCY_PROMOTION_CANDIDATES, DEPENDENCY_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { DEPENDENCY_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("dependency-relationships")!;
const relatedComponents = [getEntry("state-machine")!, getEntry("workflow-visualization")!, getEntry("workflow-framework")!];

export default function DependencyRelationshipsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Ten regions, twelve components"
            description="Every component in this family maps to one of the regions below — four of twelve delegate directly to Workflow Framework's own components (re-exported, not rebuilt), one composes Operational Inspector Panel directly, and Relationships is its own sibling node/edge pair built on the same primitives; Node, Edge, Group, and Filters are genuinely new."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {DEPENDENCY_ANATOMY.map((region) => (
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
            description="The decisions a caller makes before reaching for this family — which edge direction fits the relationship, who owns grouping and impact analysis, and how filtering gets wired up."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {WHEN_TO_USE_TOPICS.map((topic) => (
              <Card key={topic.label} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{topic.label}</span>
                <Body size="sm" muted>
                  {topic.text}
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
            title="Eight dependency and relationship patterns, live"
            description="Each demo below is a real, working composition with real local state — not a static screenshot. Try the Artwork Dependencies demo's click-to-inspect node and the Platform Dependencies demo's status filter."
            descriptionMaxWidth={false}
          />
          <DependencyGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this family recognizes, grounded in the real implementation detail behind each one, plus how the graph adapts across breakpoints."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={DEPENDENCY_STATES.map((item) => ({ label: item.state, value: item.note }))} />
          <div className="flex flex-col gap-6">
            <span className="text-body-md font-medium text-ink-primary">Responsive behavior</span>
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
          <DescriptionList items={DEPENDENCY_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How this family composes with the state and components a caller already owns — controlled node status, and an Inspector built directly on Operational Inspector Panel."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {COMPOSITION_TOPICS.map((topic) => (
              <Card key={topic.label} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{topic.label}</span>
                <Body size="sm" muted>
                  {topic.text}
                </Body>
              </Card>
            ))}
          </CardGrid>
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
              description="Real, grep-verified findings from building this system — including genuine pre-existing dependency and relationship models this package deliberately does not replace, since they render through a different layer entirely."
              descriptionMaxWidth={false}
            />
            <div className="flex flex-col gap-3">
              {DEPENDENCY_PROMOTION_CANDIDATES.map((candidate) => (
                <Card key={candidate.id} className="flex flex-col gap-2 border-warning/30 bg-warning-soft">
                  <span className="text-body-sm font-medium text-ink-primary">{candidate.pattern}</span>
                  <Body size="sm" muted>
                    {candidate.description}
                  </Body>
                  <Caption className="text-ink-tertiary">{candidate.files.join(" · ")}</Caption>
                  <Body size="sm" muted className="border-t border-border-subtle pt-2">
                    {candidate.migrationNote}
                  </Body>
                </Card>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
              {DEPENDENCY_CLEAN_FINDINGS.map((finding) => (
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
              {DEPENDENCY_FUTURE_EXTENSIONS.map((extension) => (
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
