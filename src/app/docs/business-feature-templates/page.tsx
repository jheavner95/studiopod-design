import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { PHILOSOPHY_TOPICS } from "./_data/philosophy";
import { FEATURE_TEMPLATES } from "./_data/templates";
import { COMPOSITION_MATRIX } from "./_data/composition-matrix";

const entry = getEntry("business-feature-templates")!;
const purposeTopic = PHILOSOPHY_TOPICS.find((t) => t.label === "Purpose")!;
const guidanceTopics = PHILOSOPHY_TOPICS.filter((t) => t.label !== "Purpose");
const relatedComponents = [getEntry("business-features-doc")!, getEntry("platform-architecture-doc")!, getEntry("application-composition-doc")!];

function getTemplate(id: string) {
  const template = FEATURE_TEMPLATES.find((t) => t.id === id);
  if (!template) throw new Error(`No template found for id "${id}"`);
  return template;
}

export default function BusinessFeatureTemplatesPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Eight blueprints, one reuse discipline"
            description="What this catalog is for, and the one Feature Category it deliberately leaves out."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={[{ label: purposeTopic.label, value: purposeTopic.text }]} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The reuse and consistency rules every template below follows."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {guidanceTopics.map((topic) => (
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
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Examples"
            description="The eight standard layouts below — one per Feature Category — each naming which already-certified Foundation, Operational, Workflow, and Platform components a real feature in that category composes."
            descriptionMaxWidth={false}
          />
          {FEATURE_TEMPLATES.map((template) => (
            <div key={template.id} className="flex flex-col gap-6">
              <SectionHeader id={template.id} title={template.name} description={template.purpose} descriptionMaxWidth={false} />
              <CardGrid columns={3}>
                {template.layout.map((part) => (
                  <Card key={part.name} className="flex flex-col gap-2">
                    <span className="text-body-sm font-medium text-ink-primary">{part.name}</span>
                    <Body size="sm" muted>
                      {part.composesFrom}
                    </Body>
                  </Card>
                ))}
              </CardGrid>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Eight templates, five layers each"
            description="A rollup of every template's own composition above, organized by layer instead of by named part so the eight templates can be compared side by side."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-6">
            {COMPOSITION_MATRIX.map((entryRow) => (
              <Card key={entryRow.templateId} className="flex flex-col gap-4">
                <span className="text-body-md font-medium text-ink-primary">{getTemplate(entryRow.templateId).name}</span>
                <DescriptionList
                  items={[
                    { label: "Foundation", value: entryRow.foundation },
                    { label: "Operational", value: entryRow.operational },
                    { label: "Workflow", value: entryRow.workflow },
                    { label: "Platform", value: entryRow.platform },
                    { label: "Business Feature", value: entryRow.businessFeature },
                  ]}
                />
              </Card>
            ))}
          </div>
          <Caption className="text-ink-tertiary">
            Automation Feature, the ninth Feature Category, has no template or matrix row here — see Overview, above.
          </Caption>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
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
    </DocsShell>
  );
}
