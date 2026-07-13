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
const relatedComponents = [getEntry("platform-architecture-doc")!, getEntry("product-platform")!];

export default function ProductionPlatformPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Production patterns in action"
            description="Each demo below is a real, working composition with real local state — not a static screenshot. Try the Artwork Production demo's click-to-inspect node, or watch a batch move through Proofing, Printing, and Shipped."
            descriptionMaxWidth={false}
          />
          <ProductionPlatformGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="The building blocks of a production screen"
            description="Production Platform provides the pieces for any screen built around a single production run: the render/print queue, the pipeline a job moves through stage by stage, the validation gates that decide whether an artifact can advance, and an inspector for a selected artifact's own history. Reach for it when you're building the print-production side of a workspace — a render queue, a proofing view, a batch dashboard. Ten regions cover a typical production screen end to end, each composing proven Workflow, Pipeline, State Machine, and Operational components rather than introducing new visual patterns to learn."
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
            title="When to reach for it"
            description="Production Platform components render production state — they don't decide it. Choose them when a screen's subject is a specific production run; compose Workflow, Pipeline, or Operational components directly when you're building something else."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Production-run screens</span>
              <Body size="sm" muted>
                Choose these ten regions when a screen is specifically about a production run&rsquo;s pipeline, queue, or an artifact&rsquo;s own
                lifecycle — not a generic workflow or operational surface.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Consistent by composition</span>
              <Body size="sm" muted>
                Every component composes a proven Workflow, Pipeline, State Machine, or Operational piece, so a production screen looks and
                behaves like the rest of the product — no new visual language to learn.
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
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="The states this platform recognizes are composed from the same status vocabulary used across the product, not a Production-specific status type — plus how the layout itself behaves across breakpoints."
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
            description="Where Production Platform's responsibility ends and your application logic begins."
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
              description="Capabilities outside this platform's current scope, and what each would depend on."
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
