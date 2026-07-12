import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { TableAnatomyExplorer } from "./_components/TableAnatomyExplorer";
import { VariantGallery } from "./_components/VariantGallery";
import { CellTypesTable } from "./_components/CellTypesTable";
import { SelectionDemo } from "./_components/SelectionDemo";
import { StatesDemo } from "./_components/StatesDemo";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { TABLE_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { TABLE_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("foundation-table")!;
const relatedComponents = [getEntry("foundation-layout")!, getEntry("foundation-metadata")!, getEntry("data-grid")!];

export default function FoundationTablePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Seven regions, top to bottom — select one to see the component that owns it."
            descriptionMaxWidth={false}
          />
          <TableAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The rules that decide when a table is the right shape, and how it should be configured once it is."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {IMPLEMENTATION_GUIDANCE.map((rule) => (
              <Card key={rule.label} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{rule.label}</span>
                <Body size="sm" muted>
                  {rule.text}
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
            description="Nine named variants, each a real, live table built from the same underlying components — followed by all eleven cell types, rendered as a real table documenting itself."
            descriptionMaxWidth={false}
          />
          <VariantGallery />
          <div className="flex flex-col gap-6">
            <SectionHeader id="cell-types" title="Cell types" description="Eleven cell types, each with its own alignment, wrapping, truncation, and accessibility rules." descriptionMaxWidth={false} />
            <CellTypesTable />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="How selection and state presentation behave on a real, working table."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-10">
            <SectionHeader
              id="selection"
              title="Selection"
              description="Single click toggles a row, shift-click selects a range, the header checkbox selects or clears all, and the Toolbar becomes a bulk-action bar the moment anything is selected."
              descriptionMaxWidth={false}
            />
            <SelectionDemo />
          </div>
          <div className="flex flex-col gap-10">
            <SectionHeader
              id="states"
              title="States"
              description="Six states a table can be in, switched live on one shared table below."
              descriptionMaxWidth={false}
            />
            <StatesDemo />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={TABLE_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How Table composes with the viewport across breakpoints — what's built in today, and what still relies on a caller's own judgment."
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
              {TABLE_FUTURE_EXTENSIONS.map((extension) => (
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
