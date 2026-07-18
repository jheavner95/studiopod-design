import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { FormAnatomyExplorer } from "./_components/FormAnatomyExplorer";
import { FieldGallery } from "./_components/FieldGallery";
import { FieldStatesDemo } from "./_components/FieldStatesDemo";
import { ValidationDemo } from "./_components/ValidationDemo";
import { PropertyEditingDemo } from "./_components/PropertyEditingDemo";
import { ControlTierDemo } from "./_components/ControlTierDemo";
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
            description="Select a region below to see which component owns it, from field label to submit action."
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
            description="Guidelines every field, row, and section follows — and how to tell when you want an editable form versus a read-only Foundation Metadata display."
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
            description="A live, working example of every field type, with guidance on when — and when not — to reach for it."
            descriptionMaxWidth={false}
          />
          <FieldGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="control-tiers"
            eyebrow={<Eyebrow tone="accent">Control tiers</Eyebrow>}
            title="Control tier vs field tier"
            description="Every control renders bare when given no label or helper text — the control only, intrinsically sized, for toolbars, filter bars, tables and inspectors. Pass a label (or use a Field wrapper) and you get the stacked form field. Size sm lands on h-8, the same height Button's own sm renders."
            descriptionMaxWidth={false}
          />
          <ControlTierDemo />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="How fields respond to interaction, validation, and error states. In the working form below, Validate runs a blocking check, fixing a flagged field re-validates it immediately, and every problem is aggregated once in the Validation Summary above the fields."
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
            description="How PropertyEditor composes into a real editing surface for property panels and settings pages."
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
              description="Capabilities not available in Forms yet:"
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
