import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { TableAnatomyExplorer } from "./_components/TableAnatomyExplorer";
import { VariantGallery } from "./_components/VariantGallery";
import { CellTypesTable } from "./_components/CellTypesTable";
import { SelectionDemo } from "./_components/SelectionDemo";
import { StatesDemo } from "./_components/StatesDemo";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { TABLE_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { TABLE_PROMOTION_CANDIDATES, TABLE_RESOLVED_MIGRATIONS, totalPromotionLines } from "./_data/promotion-candidates";
import { TABLE_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const EFFORT_TONE: Record<string, "success" | "warning" | "accent"> = {
  Low: "success",
  Medium: "warning",
  High: "accent",
};

const entry = getEntry("foundation-table")!;

export default function FoundationTablePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="anatomy"
            eyebrow={<Eyebrow tone="accent">Anatomy</Eyebrow>}
            title="Table anatomy"
            description="Seven regions, top to bottom — select one to see the component that owns it."
            descriptionMaxWidth={false}
          />
          <TableAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="variants"
            eyebrow={<Eyebrow tone="accent">Variants</Eyebrow>}
            title="Table variants"
            description="Nine named variants, each a real, live table built from the same underlying components."
            descriptionMaxWidth={false}
          />
          <VariantGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="cell-types"
            eyebrow={<Eyebrow tone="accent">Cell types</Eyebrow>}
            title="Cell types"
            description="Eleven cell types, each with its own alignment, wrapping, truncation, and accessibility rules."
            descriptionMaxWidth={false}
          />
          <CellTypesTable />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="selection"
            eyebrow={<Eyebrow tone="accent">Selection</Eyebrow>}
            title="Selection"
            description="Single click toggles a row, shift-click selects a range, the header checkbox selects or clears all, and the Toolbar becomes a bulk-action bar the moment anything is selected."
            descriptionMaxWidth={false}
          />
          <SelectionDemo />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="states"
            eyebrow={<Eyebrow tone="accent">States</Eyebrow>}
            title="States"
            description="Six states a table can be in, switched live on one shared table below."
            descriptionMaxWidth={false}
          />
          <StatesDemo />
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
          <DescriptionList items={TABLE_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
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
            description={`Every hand-rolled <table> implementation still remaining in this codebase — ${TABLE_PROMOTION_CANDIDATES.length} files, ${totalPromotionLines()} lines combined, neither a native <table>. Four categories have been migrated already, completing every genuine native-table candidate; see below.`}
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {TABLE_PROMOTION_CANDIDATES.map((candidate) => (
              <Card key={candidate.id} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <code className="min-w-0 break-words text-metadata text-ink-secondary">{candidate.file}</code>
                  <Badge tone={EFFORT_TONE[candidate.migrationEffort]} size="sm" className="w-fit shrink-0 whitespace-nowrap">
                    {candidate.migrationEffort} effort
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {candidate.description}
                </Body>
                <div className="flex items-center gap-2">
                  <Caption className="text-ink-tertiary">{candidate.lineCount} lines</Caption>
                </div>
                <Body size="sm" muted className="border-t border-border-subtle pt-3">
                  {candidate.migrationNote}
                </Body>
              </Card>
            ))}
          </CardGrid>
          {TABLE_RESOLVED_MIGRATIONS.map((migration) => (
            <Card key={migration.id} className="flex flex-col gap-2 border-success/30 bg-success-soft">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <span className="text-body-md font-medium text-ink-primary">{migration.title} — resolved</span>
                <Badge tone="success" size="sm" className="w-fit shrink-0 whitespace-nowrap">
                  Certified
                </Badge>
              </div>
              <Caption className="text-ink-tertiary">
                {migration.filesRemoved} files removed ({migration.linesRemoved} lines) · {migration.linesAdded} lines added · {migration.resolvedIn}
              </Caption>
              <Body size="sm" muted>
                {migration.note}
              </Body>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="future-extensions"
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
            description="Room the current system leaves for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
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
      </SectionShell>
    </DocsShell>
  );
}
