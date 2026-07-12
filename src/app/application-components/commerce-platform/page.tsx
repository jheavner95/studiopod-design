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
import { COMMERCE_PROMOTION_CANDIDATES, COMMERCE_CLEAN_FINDINGS } from "./_data/promotion-candidates";
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
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Eleven regions, twelve components"
            description="Every component in this family maps to one of the regions below — all 12 are re-exports of already-certified Workflow Framework, Pipeline Components, State Machine, and Operational components, checked directly against each one's own prop surface before composing rather than rebuilding it."
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
            title="When to use"
            description="Where each subdomain draws the line between what this platform's components render and what stays Business Feature logic — Catalog, Orders, and Inventory each hold data, not the behavior that changes it."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={whenToUseGuidance.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Eight commerce patterns, live"
            description="Each demo below is a real, working composition with real props — not a static screenshot. Try the Pricing demo's live base/sale price fields."
            descriptionMaxWidth={false}
          />
          <CommercePlatformGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="States and responsive behavior"
            description="Eight states this platform recognizes. Draft and Archived have no match in any existing status vocabulary, the same disclosed gap Product and Publishing Platform Components already found for the identical state names — while Syncing is the first Platform state to map onto HealthStatusValue verbatim."
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
            description="Zero new wrapper code — every Commerce component composes an already-certified Workflow, Pipeline, State Machine, or Operational component directly, checked against that component's own prop surface first."
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
              id="migration-notes"
              title="Migration notes"
              description="Real, grep-verified findings across the seven subdomains this platform covers — Commerce platform, Catalog, Orders, Inventory, Fulfillment, Pricing, Operations — not estimated or carried over from memory."
              descriptionMaxWidth={false}
            />
            {COMMERCE_PROMOTION_CANDIDATES.length === 0 ? (
              <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">No real migration targets found</span>
                <Body size="sm" muted>
                  No subdomain surfaced real execution logic (a sync engine, an order-management system, stock-tracking
                  math, pick/pack/ship logic, or a pricing calculator) that this platform&rsquo;s own components would
                  duplicate. No src/commerce/ directory exists at all, and every existing Commerce-named implementation
                  is confirmed diagram-layer only (src/capabilities/, src/workflows/examples/). See the clean findings
                  below for what was actually checked.
                </Body>
              </Card>
            ) : null}
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
              {COMMERCE_CLEAN_FINDINGS.map((finding) => (
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
