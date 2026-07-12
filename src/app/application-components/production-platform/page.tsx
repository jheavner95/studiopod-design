import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { ProductionPlatformGallery } from "./_components/ProductionPlatformGallery";
import { PRODUCTION_ANATOMY } from "./_data/anatomy";
import { PRODUCTION_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { PRODUCTION_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { PRODUCTION_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("production-platform")!;
const relatedComponents = [getEntry("platform-architecture-doc")!, getEntry("product-platform")!, getEntry("production-workspace-feature")!];

export default function ProductionPlatformPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Ten regions, twelve components"
            description="Every component in this family maps to one of the regions below — all 12 are re-exports or thin wrappers over already-certified Workflow Framework, Pipeline Components, State Machine, Workflow Visualization, and Operational components, checked directly against each one's own prop surface before composing rather than rebuilding it."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {PRODUCTION_ANATOMY.map((region) => (
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
            title="Reach for Production Platform when the screen is a real production run"
            description="Pick these components over composing Workflow Framework, Pipeline Components, State Machine, Workflow Visualization, or Operational components directly whenever the surface is specifically a production run — its pipeline progression, render/print queue, validation gates, or an artifact's own lifecycle."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Production-run screens</span>
              <Body size="sm" muted>
                Ten regions covering workspace shell through actions — reach for these when the screen is specifically about a production
                run&rsquo;s pipeline, queue, or artifact lifecycle, not a generic Workflow or Operational surface.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Already certified underneath</span>
              <Body size="sm" muted>
                All 12 components are pure re-exports or thin wrappers over already-certified Workflow Framework, Pipeline Components, State
                Machine, Workflow Visualization, and Operational components — no new visual language to learn.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Not for execution logic</span>
              <Body size="sm" muted>
                ProductionValidationPanel and its siblings render whatever state the caller supplies — they don&rsquo;t implement gate-decision
                engines, pipeline runners, or queue processing. Reach for them to display production state, not to build it.
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
            title="Eight production patterns, live"
            description="Each demo below is a real, working composition with real local state — not a static screenshot. Try the Artwork Production demo's click-to-inspect node."
            descriptionMaxWidth={false}
          />
          <ProductionPlatformGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this platform recognizes — every one composed from an already-certified lower-tier vocabulary, not a new Production-specific status type — plus how the layout itself behaves across breakpoints."
            descriptionMaxWidth={false}
          />

          <div className="flex flex-col gap-10">
            <SectionHeader id="states" title="States" descriptionMaxWidth={false} />
            <DescriptionList items={PRODUCTION_STATES.map((item) => ({ label: item.state, value: item.note }))} />
          </div>

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
          <DescriptionList items={PRODUCTION_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="How these components compose"
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
              description="Capabilities these components do not implement today, and what each would require."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {PRODUCTION_FUTURE_EXTENSIONS.map((extension) => (
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
