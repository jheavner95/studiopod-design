import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { MetadataAnatomyExplorer } from "./_components/MetadataAnatomyExplorer";
import { ComponentGallery } from "./_components/ComponentGallery";
import { PatternGallery } from "./_components/PatternGallery";
import { HierarchyDemo } from "./_components/HierarchyDemo";
import { INFORMATION_HIERARCHY } from "./_data/hierarchy";
import { METADATA_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { METADATA_GUIDANCE } from "./_data/implementation-guidance";
import { METADATA_FUTURE_EXTENSIONS } from "./_data/future-extensions";
import { METADATA_COMPONENTS } from "./_data/components";

const entry = getEntry("foundation-metadata")!;
const relatedComponents = [getEntry("foundation-layout")!, getEntry("foundation-forms")!, getEntry("foundation-table")!];

export default function FoundationMetadataPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Eight regions, top to bottom — select one to see the component that owns it."
            descriptionMaxWidth={false}
          />
          <MetadataAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The rules every region of a metadata block follows — and where the line sits against the Foundation Form System's own editable fields."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {METADATA_GUIDANCE.map((rule) => (
              <Card key={rule.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{rule.title}</span>
                <Body size="sm" muted>
                  {rule.explanation}
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
            description={`${METADATA_COMPONENTS.length} components, each with a live example plus when — and when not — to reach for it.`}
            descriptionMaxWidth={false}
          />
          <ComponentGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Four tiers, in visual-weight order — the rule that keeps a fully-populated metadata block from turning into visual noise — plus a real, working example showing all four composed together at once."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {INFORMATION_HIERARCHY.map((tier) => (
              <Card key={tier.id} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{tier.name}</span>
                <Body size="sm" muted>
                  {tier.description}
                </Body>
                <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border-subtle pt-3">
                  {tier.components.map((component) => (
                    <Badge key={component} tone="neutral" size="sm">
                      {component}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </CardGrid>
          <HierarchyDemo />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={METADATA_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="Seven ways the same metadata components can be arranged, with the advantages and tradeoffs of each."
            descriptionMaxWidth={false}
          />
          <PatternGallery />
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
              description="Capabilities this system does not currently include:"
              descriptionMaxWidth={false}
            />
            <CardGrid columns={4}>
              {METADATA_FUTURE_EXTENSIONS.map((extension) => (
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
