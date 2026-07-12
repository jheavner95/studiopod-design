import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { ResponsiveRulesTable } from "@/components/table";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { WidthModeExplorer } from "./_components/WidthModeExplorer";
import { DensityCard } from "./_components/DensityCard";
import { RegionLayoutCard } from "./_components/RegionLayoutCard";
import { ScrollingDiagram } from "./_components/ScrollingDiagram";
import { HeightComparison } from "./_components/HeightComparison";
import { DENSITY_LEVELS } from "./_data/density";
import { REGION_LAYOUTS } from "./_data/region-layouts";
import { RESPONSIVE_RULES } from "./_data/responsive-rules";
import { SCROLL_CONCEPTS } from "./_data/scrolling";
import { SPACING_RULES, SPACING_SCALE_NOTE } from "./_data/spacing";
import { LAYOUT_PRINCIPLES } from "./_data/principles";
import { LAYOUT_ANTI_PATTERNS } from "./_data/anti-patterns";
import { LAYOUT_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("workspace-layout")!;
const relatedComponents = [getEntry("workspace-framework")!, getEntry("workspace-header")!, getEntry("workspace-toolbar")!];

export default function WorkspaceLayoutPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Five workspace width modes — select one to see its purpose, typical use cases, and where it shows up. Every width here is expressed as intent, never a pixel value."
            descriptionMaxWidth={false}
          />
          <WidthModeExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="Two decisions every workspace makes independently of its width mode: how to split the Library / Primary Workspace / Inspector row, and how dense to render the content inside it."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-4">
            <span className="text-body-sm font-medium text-ink-primary">Canonical region layout</span>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {REGION_LAYOUTS.map((layout) => (
                <RegionLayoutCard key={layout.id} layout={layout} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-body-sm font-medium text-ink-primary">Workspace density</span>
            <CardGrid columns={3}>
              {DENSITY_LEVELS.map((level) => (
                <DensityCard key={level.id} level={level} />
              ))}
            </CardGrid>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Examples"
            description="A worked example of a full workspace, region by region — five scrolling concepts and the six regions they apply to. Select a region below to see why it behaves the way it does."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {SCROLL_CONCEPTS.map((concept) => (
              <Card key={concept.term} className="flex flex-col gap-1.5">
                <span className="text-body-sm font-medium text-ink-primary">{concept.term}</span>
                <Body size="sm" muted>
                  {concept.definition}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <ScrollingDiagram />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Seven dimensions of behavior across three conceptual breakpoints — see Workspace Header's own responsive behavior section for what this looks like on an actual header."
            descriptionMaxWidth={false}
          />
          <ResponsiveRulesTable
            caption="Responsive rules: how seven dimensions of workspace behavior change across desktop, tablet, and mobile."
            rows={RESPONSIVE_RULES}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How spacing, height, and the principles above combine into a real screen — and the shapes that show up when they don't."
            descriptionMaxWidth={false}
          />

          <div className="flex flex-col gap-10">
            <SectionHeader id="spacing" title="Spacing system" description="Six relationships, described relative to each other rather than as pixel values." descriptionMaxWidth={false} />
            <DescriptionList items={SPACING_RULES.map((rule) => ({ label: rule.label, value: rule.text }))} />
            <Caption className="text-ink-tertiary">{SPACING_SCALE_NOTE}</Caption>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader id="heights" title="Height rules" description="Four relative tiers across six named regions — intent, not implementation values." descriptionMaxWidth={false} />
            <HeightComparison />
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader id="principles" title="Layout principles" descriptionMaxWidth={false} />
            <CardGrid columns={4}>
              {LAYOUT_PRINCIPLES.map((principle) => (
                <Card key={principle.title} className="flex flex-col gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{principle.title}</span>
                  <Body size="sm" muted>
                    {principle.explanation}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="anti-patterns"
              title="Anti-patterns"
              description="Every one of these has shipped somewhere before — the rules above exist specifically to make them harder to repeat."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {LAYOUT_ANTI_PATTERNS.map((pattern) => (
                <Card key={pattern.title} className="flex flex-col gap-2 border-error/30 bg-error-soft/20">
                  <span className="text-body-sm font-medium text-ink-primary">{pattern.title}</span>
                  <Body size="sm" muted>
                    {pattern.explanation}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
            description="The rest of the workspace shell these layout rules govern — the overall anatomy above this page and the two regions immediately on either side of it."
            descriptionMaxWidth={false}
          />
          <DocsRelatedGrid entries={relatedComponents} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-10">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Capabilities these layout rules do not currently include:"
              descriptionMaxWidth={false}
            />
            <CardGrid columns={4}>
              {LAYOUT_FUTURE_EXTENSIONS.map((extension) => (
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
