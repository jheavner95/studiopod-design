import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { CommercePlatformGallery } from "./_components/CommercePlatformGallery";
import { COMMERCE_ANATOMY } from "./_data/anatomy";
import { COMMERCE_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { COMMERCE_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { COMMERCE_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("commerce-platform")!;
const relatedComponents = [getEntry("publishing-platform")!, getEntry("product-platform")!, getEntry("intelligence-platform")!];

const WHEN_TO_USE_LABELS = ["Catalog synchronization", "Order lifecycle", "Inventory management"];
const COMPOSITION_LABELS = ["Platform composition", "Workflow integration", "Operational integration", "Fulfillment flow", "Pricing presentation"];
const whenToUseGuidance = IMPLEMENTATION_GUIDANCE.filter((topic) => WHEN_TO_USE_LABELS.includes(topic.label));
const compositionGuidance = IMPLEMENTATION_GUIDANCE.filter((topic) => COMPOSITION_LABELS.includes(topic.label));

export default function CommercePlatformPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Commerce patterns in action"
            description="Each demo below is a real, working composition with real props — not a static screenshot. Try the Pricing demo's live base/sale price fields, or watch an order move through Picked, Packed, and Shipped."
            descriptionMaxWidth={false}
          />
          <CommercePlatformGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Catalog, orders, and fulfillment in one workspace"
            description="Commerce Platform provides the pieces for the commerce side of a workspace: a synced product catalog, an order queue, per-SKU inventory, pick/pack/ship fulfillment, and inline pricing edits. Reach for it when you're building a screen around catalog, order, or inventory data. Eleven regions cover a typical commerce screen end to end, each composing proven Workflow, Pipeline, State Machine, and Operational components rather than introducing new visual patterns to learn."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {COMMERCE_ANATOMY.map((region) => (
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
            description="Where Commerce Platform's responsibility ends and your application logic begins — Catalog, Orders, and Inventory display data; they don't decide what happens to it."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={whenToUseGuidance.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="States and responsive behavior"
            description="The states this platform recognizes. Draft and Archived have no match in any existing status vocabulary — there's no shared concept of a content publish-state to map onto, so both render as a plain neutral badge instead of a borrowed status value."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={COMMERCE_STATES.map((item) => ({ label: item.state, value: item.note }))} />
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
          <DescriptionList items={COMMERCE_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="Every Commerce component composes a Workflow, Pipeline, State Machine, or Operational component directly — no separate wrapper layer to learn on top of it."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={compositionGuidance.map((topic) => ({ label: topic.label, value: topic.text }))} />
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
              {COMMERCE_FUTURE_EXTENSIONS.map((extension) => (
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
