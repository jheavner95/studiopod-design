import { SectionShell, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { PHILOSOPHY_TOPICS } from "./_data/philosophy";
import { FEATURE_TEMPLATES } from "./_data/templates";
import { COMPOSITION_MATRIX } from "./_data/composition-matrix";

const entry = getEntry("business-feature-templates")!;

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
            id="template-philosophy"
            eyebrow={<Eyebrow tone="accent">Template philosophy</Eyebrow>}
            title="Eight blueprints, one reuse discipline"
            descriptionMaxWidth={false}
          />
          <DescriptionList items={PHILOSOPHY_TOPICS.map((t) => ({ label: t.label, value: t.text }))} />
        </div>
      </SectionShell>

      {FEATURE_TEMPLATES.map((template, index) => (
        <SectionShell key={template.id} spacing="lg" divider>
          <div className="flex flex-col gap-10">
            <SectionHeader
              id={template.id}
              eyebrow={<Eyebrow tone="accent">{`Section ${index + 2}`}</Eyebrow>}
              title={template.name}
              description={template.purpose}
              descriptionMaxWidth={false}
            />
            <div className="flex flex-col gap-3">
              {template.layout.map((part) => (
                <Card key={part.name} className="flex flex-col gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{part.name}</span>
                  <Body size="sm" muted>
                    {part.composesFrom}
                  </Body>
                </Card>
              ))}
            </div>
          </div>
        </SectionShell>
      ))}

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition-matrix"
            eyebrow={<Eyebrow tone="accent">Composition matrix</Eyebrow>}
            title="Eight templates, five layers each"
            description="A rollup of every template's own composition, organized by layer instead of by named part so the eight templates can be compared side by side."
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
            Automation Feature, DS-5.2&rsquo;s ninth Feature Category, has no template or matrix row here — see Template Philosophy, above.
          </Caption>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
