import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { FormAnatomyExplorer } from "./_components/FormAnatomyExplorer";
import { FieldGallery } from "./_components/FieldGallery";
import { FieldStatesDemo } from "./_components/FieldStatesDemo";
import { ValidationDemo } from "./_components/ValidationDemo";
import { PropertyEditingDemo } from "./_components/PropertyEditingDemo";
import { FIELD_STATE_DOCS } from "./_data/states";
import { FORM_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { FORM_GUIDANCE } from "./_data/implementation-guidance";
import { FORM_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("foundation-forms")!;
const relatedComponents = [getEntry("foundation-metadata")!, getEntry("property-panel")!, getEntry("foundation-layout")!];

export default function FoundationFormsPage() {
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
          <FormAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The rules every field, row, and section in this system follows — and where the line sits against Foundation Metadata's own read-only display."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {FORM_GUIDANCE.map((rule) => (
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
            description="Ten fields, each with a live, working example plus when — and when not — to reach for it."
            descriptionMaxWidth={false}
          />
          <FieldGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eleven states every field can be in — three of them live below, the rest documented alongside — plus a real, working form: Validate runs a blocking form-level check, and fixing a flagged field re-validates it immediately (progressive validation), with every problem aggregated once in the Validation Summary above the fields."
            descriptionMaxWidth={false}
          />
          <FieldStatesDemo />
          <CardGrid columns={4}>
            {FIELD_STATE_DOCS.map((state) => (
              <Card key={state.id} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{state.name}</span>
                <Body size="sm" muted>
                  {state.behavior}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <ValidationDemo />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={FORM_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="Four ways PropertyEditor composes into a real editing surface."
            descriptionMaxWidth={false}
          />
          <PropertyEditingDemo />
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
              {FORM_FUTURE_EXTENSIONS.map((extension) => (
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
