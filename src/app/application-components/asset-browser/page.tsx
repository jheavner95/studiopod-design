import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { AssetBrowserGallery } from "./_components/AssetBrowserGallery";
import { BROWSER_ANATOMY } from "./_data/anatomy";
import { BROWSER_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { BROWSER_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { WHEN_TO_USE_TOPICS, COMPOSITION_TOPICS } from "./_data/implementation-guidance";
import { BROWSER_PROMOTION_CANDIDATES, BROWSER_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { BROWSER_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("asset-browser")!;
const relatedComponents = [getEntry("data-grid")!, getEntry("inspector-panel")!, getEntry("filter-search")!];

export default function AssetBrowserPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Nine regions, one browser"
            description="Every Asset* component maps to exactly one region below — most delegate directly to an already-established Foundation or Operational component."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {BROWSER_ANATOMY.map((region) => (
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
            description="The decisions a caller makes before reaching for Asset Browser — which view fits the content, and how search, filtering, and sorting are wired up."
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
            title="Eight browser variants, live"
            description="Each demo below is a real, working browser with real local state — not a static screenshot. Try Product Library's selection, Mixed Assets' view toggle, and List View's Inspector Panel integration."
            descriptionMaxWidth={false}
          />
          <AssetBrowserGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this family recognizes, grounded in the real implementation detail behind each one, plus how the browser adapts across breakpoints."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={BROWSER_STATES.map((item) => ({ label: item.state, value: item.note }))} />
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
          <DescriptionList items={BROWSER_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How Asset Browser composes with the state and components a caller already owns — shared selection across views, and an inspector slot left entirely to the screen using it."
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
              description="Real, grep-verified duplication — not estimated or carried over from memory."
              descriptionMaxWidth={false}
            />
            {BROWSER_PROMOTION_CANDIDATES.length === 0 ? (
              <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">No migration candidates found</span>
                <Body size="sm" muted>
                  No existing hand-rolled asset/library browsing UI was found anywhere in the codebase across all eight named domains, including a specific check of this repo&rsquo;s own four Library Playground pages. See the clean findings below for what was actually checked.
                </Body>
              </Card>
            ) : null}
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
              {BROWSER_CLEAN_FINDINGS.map((finding) => (
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
              {BROWSER_FUTURE_EXTENSIONS.map((extension) => (
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
