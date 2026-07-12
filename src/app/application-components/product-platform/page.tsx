import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { ProductPlatformGallery } from "./_components/ProductPlatformGallery";
import { PRODUCT_ANATOMY } from "./_data/anatomy";
import { PRODUCT_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { PRODUCT_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { PRODUCT_PROMOTION_CANDIDATES, PRODUCT_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { PRODUCT_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("product-platform")!;
const relatedComponents = [getEntry("production-platform")!, getEntry("publishing-platform")!, getEntry("asset-browser")!];

// Implementation guidance items split by what they actually describe: the
// boundary-setting entries (what this platform decides vs. leaves to the
// caller) read as "when to use it"; the compose-with entries (what each
// component is built from) read as "how it's composed."
const WHEN_TO_USE_LABELS = ["Platform composition", "Catalog flow", "Provider mapping", "Validation flow"];
const COMPOSITION_LABELS = ["Workflow integration", "Operational integration", "Variant management"];

export default function ProductPlatformPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Eleven regions, twelve components — every component in this family maps to one of the regions below. All 12 are re-exports of already-certified Workflow Framework, Pipeline Components, State Machine, Dependency & Relationship Views, and Operational components, checked directly against each one's own prop surface before composing rather than rebuilding it."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {PRODUCT_ANATOMY.map((region) => (
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
            description="Where this platform's own responsibility ends and caller-supplied Business Feature logic begins — reuse an existing certified component rather than rebuild it, and let the composing screen own the decisions these components deliberately don't make."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {IMPLEMENTATION_GUIDANCE.filter((topic) => WHEN_TO_USE_LABELS.includes(topic.label)).map((topic) => (
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
            title="Examples"
            description="Eight product patterns, live — each demo below is a real, working composition with real local state, not a static screenshot. Try the Variant Management demo's live size/color selects."
            descriptionMaxWidth={false}
          />
          <ProductPlatformGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this platform recognizes, plus how the layout responds across breakpoints. Unlike Production Platform Components, four of the states below — Draft, Published, Archived, Retired — have no match in any existing status vocabulary, a real, disclosed gap rather than a forced mapping."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-4">
            <span className="text-body-sm font-medium text-ink-primary">States</span>
            <DescriptionList items={PRODUCT_STATES.map((item) => ({ label: item.state, value: item.note }))} />
          </div>
          <div className="flex flex-col gap-4">
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
          <DescriptionList items={PRODUCT_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="Three Workflow systems and three Operational systems, each reused for the sub-concern it was actually built for."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {IMPLEMENTATION_GUIDANCE.filter((topic) => COMPOSITION_LABELS.includes(topic.label)).map((topic) => (
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
              description="Real, grep-verified findings across the seven subdomains this platform covers — Product platform, Catalog, Variants, Provider mappings, Validation, Drafts, Library — not estimated or carried over from memory."
              descriptionMaxWidth={false}
            />
            {PRODUCT_PROMOTION_CANDIDATES.length === 0 ? (
              <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">No prior implementation to migrate</span>
                <Body size="sm" muted>
                  No subdomain surfaced real execution logic (a catalog engine, a variant-selection system, a
                  provider-sync integration, a validation engine, or a draft-persistence layer) that this
                  platform&rsquo;s own components would duplicate. No src/product/ directory exists at all, and
                  Library resolves to the same already-certified Asset Browser this package&rsquo;s own ProductLibrary
                  re-exports directly. See the findings below for what was actually checked.
                </Body>
              </Card>
            ) : null}
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Findings</span>
              {PRODUCT_CLEAN_FINDINGS.map((finding) => (
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
              {PRODUCT_FUTURE_EXTENSIONS.map((extension) => (
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
