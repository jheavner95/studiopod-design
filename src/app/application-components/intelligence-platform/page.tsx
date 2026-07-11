import Link from "next/link";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { IntelligencePlatformGallery } from "./_components/IntelligencePlatformGallery";
import { INTELLIGENCE_ANATOMY } from "./_data/anatomy";
import { INTELLIGENCE_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { INTELLIGENCE_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { INTELLIGENCE_SCOPE_GUIDANCE, INTELLIGENCE_COMPOSITION_GUIDANCE } from "./_data/implementation-guidance";
import { INTELLIGENCE_PROMOTION_CANDIDATES, INTELLIGENCE_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { INTELLIGENCE_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("intelligence-platform")!;
const relatedComponents = [getEntry("status-health")!, getEntry("dashboard-widgets")!, getEntry("data-grid")!];

export default function IntelligencePlatformPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Eleven regions, twelve components"
            description="Every component in this family maps to one of the regions below — five of the twelve reuse Operational's own Status & Health and Dashboard Widget systems directly, more reuse than any other platform in this family, since Intelligence sits closest to those systems' own original design intent."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {INTELLIGENCE_ANATOMY.map((region) => (
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
            description="Every component here renders whatever data a caller supplies — it never generates, scores, or ranks that data itself. Reach for these components to display a recommendation, a health score, a diagnosis, or an insight; the logic that decides what to show belongs in Business Feature code, not here."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {INTELLIGENCE_SCOPE_GUIDANCE.map((rule) => (
              <Card key={rule.label} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{rule.label}</span>
                <Body size="sm" muted>
                  {rule.text}
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
            title="Eight intelligence patterns, live"
            description="Each demo below is a real, working composition with real props — not a static screenshot. Try Decision Support's own embedded recommendation."
            descriptionMaxWidth={false}
          />
          <IntelligencePlatformGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this platform recognizes, plus how the layout adapts across breakpoints. Archived has no match in any other status vocabulary in the system, and Idle is the first state here to map onto WorkflowNodeStatus rather than any of the other vocabularies."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={INTELLIGENCE_STATES.map((item) => ({ label: item.state, value: item.note }))} />
          <div className="flex flex-col gap-6">
            <span className="text-body-sm font-medium text-ink-primary">Responsive behavior</span>
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
          <DescriptionList items={INTELLIGENCE_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How these twelve components compose from the Workflow and Operational tiers beneath them."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={INTELLIGENCE_COMPOSITION_GUIDANCE.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
            description="The Operational systems this platform composes most directly."
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
              description="A dedicated search across the six subdomains this family covers — Recommendations, Opportunities, Health, Diagnostics, Insights, and Decision support — before a single Intelligence component was written. No speculative findings: every result below traces to a specific file that was actually read."
              descriptionMaxWidth={false}
            />
            {INTELLIGENCE_PROMOTION_CANDIDATES.length === 0 ? (
              <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">No real migration opportunities found</span>
                <Body size="sm" muted>
                  No subdomain surfaced real execution logic (a recommendation engine, an opportunity-scoring system,
                  real health-monitoring, a root-cause-analysis engine, or an analytics pipeline) that this
                  platform&rsquo;s own components would duplicate. No src/intelligence/ directory exists at all, and
                  every existing Intelligence-named implementation is confirmed diagram-layer only (src/platforms/,
                  src/capabilities/). See the findings below for what was actually checked.
                </Body>
              </Card>
            ) : null}
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">What was checked</span>
              {INTELLIGENCE_CLEAN_FINDINGS.map((finding) => (
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
              {INTELLIGENCE_FUTURE_EXTENSIONS.map((extension) => (
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
