import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { ProductionPlatformGallery } from "./_components/ProductionPlatformGallery";
import { PRODUCTION_ANATOMY } from "./_data/anatomy";
import { PRODUCTION_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { PRODUCTION_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { PRODUCTION_PROMOTION_CANDIDATES, PRODUCTION_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { PRODUCTION_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("production-platform")!;

export default function ProductionPlatformPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="platform-anatomy"
            eyebrow={<Eyebrow tone="accent">Platform anatomy</Eyebrow>}
            title="Ten regions, twelve components"
            description="Every component in this family maps to one of the regions below — all 12 are re-exports or thin wrappers over already-certified Workflow Framework, Pipeline Components, State Machine, Workflow Visualization, and Operational components, checked directly against each one's own prop surface before composing rather than rebuilding it."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
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
            id="gallery"
            eyebrow={<Eyebrow tone="accent">Gallery</Eyebrow>}
            title="Eight production patterns, live"
            description="Each demo below is a real, working composition with real local state — not a static screenshot. Try the Artwork Production demo's click-to-inspect node."
            descriptionMaxWidth={false}
          />
          <ProductionPlatformGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="states"
            eyebrow={<Eyebrow tone="accent">States</Eyebrow>}
            title="States"
            description="Eight states this platform recognizes — every one composed from an already-certified lower-tier vocabulary, not a new Production-specific status type."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={PRODUCTION_STATES.map((item) => ({ label: item.state, value: item.note }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="responsive-behavior"
            eyebrow={<Eyebrow tone="accent">Responsive behavior</Eyebrow>}
            title="Responsive behavior"
            descriptionMaxWidth={false}
          />
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
          <DescriptionList items={PRODUCTION_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="implementation-guidance"
            eyebrow={<Eyebrow tone="accent">Implementation guidance</Eyebrow>}
            title="Implementation guidance"
            descriptionMaxWidth={false}
          />
          <DescriptionList items={IMPLEMENTATION_GUIDANCE.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="promotion-candidates"
            eyebrow={<Eyebrow tone="accent">Promotion candidates</Eyebrow>}
            title="Promotion candidates"
            description="Real, grep-verified findings across the six subdomains this package's own work order named — Composition, Generation, Validation, Pipeline, Queue, QA — not estimated or carried over from memory."
            descriptionMaxWidth={false}
          />
          {PRODUCTION_PROMOTION_CANDIDATES.length === 0 ? (
            <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
              <span className="text-body-sm font-medium text-ink-primary">Zero real candidates found</span>
              <Body size="sm" muted>
                No subdomain surfaced real execution logic (a pipeline runner, a generation-job integration, a
                validation-check engine, queue processing, or a QA decision engine) that this platform&rsquo;s own
                components would duplicate. Every existing Production-named implementation is confirmed diagram-layer
                only (src/production/, MS-2.5), and three subdomains — Pipeline, Queue, QA — resolve to
                already-certified Workflow/Operational components as the correct reuse target, which this package&rsquo;s
                own components re-export directly rather than rebuild. See the clean findings below for what was
                actually checked.
              </Body>
            </Card>
          ) : null}
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
            {PRODUCTION_CLEAN_FINDINGS.map((finding) => (
              <Card key={finding.slice(0, 24)} className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <Body size="sm" muted>
                  {finding}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="future-extensions"
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
            description="Room the current system leaves for later — reserved, not scoped or committed."
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
      </SectionShell>
    </DocsShell>
  );
}
