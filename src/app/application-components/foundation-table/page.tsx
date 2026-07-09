import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { TableAnatomyExplorer } from "./_components/TableAnatomyExplorer";
import { VariantGallery } from "./_components/VariantGallery";
import { CellTypesTable } from "./_components/CellTypesTable";
import { SelectionDemo } from "./_components/SelectionDemo";
import { StatesDemo } from "./_components/StatesDemo";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { TABLE_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { TABLE_PROMOTION_CANDIDATES, totalPromotionLines } from "./_data/promotion-candidates";
import { TABLE_FUTURE_EXTENSIONS } from "./_data/future-extensions";

function CrossLinks() {
  const links = [
    { label: "Foundation Components", href: "/application-components/foundation-components" },
    { label: "Foundation Layout Primitives", href: "/application-components/foundation-layout" },
    { label: "Workspace Layout", href: "/application-components/workspace-layout" },
    { label: "Asset Workspace", href: "/application-components/asset-workspace" },
    { label: "Inspector Workspace", href: "/application-components/inspector-workspace" },
  ];
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
        >
          {link.label}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      ))}
    </div>
  );
}

const EFFORT_TONE: Record<string, "success" | "warning" | "accent"> = {
  Low: "success",
  Medium: "warning",
  High: "accent",
};

export default function FoundationTablePage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · foundation table"
          title="Foundation table system"
          description="The canonical StudioPOD table — Publishing Queue, Commerce Orders, Products, Assets, Styles, Ratios, Integrations, Users, Audit Log, Diagnostics all build from this one system. Documentation, reusable foundation components, and an interactive demonstration. Existing pages are not refactored yet — migration is a later work package."
        >
          <div className="pt-2">
            <CrossLinks />
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
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
          <SectionHeader eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={TABLE_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
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
            eyebrow={<Eyebrow tone="accent">Promotion candidates</Eyebrow>}
            title="Promotion candidates"
            description={`Every hand-rolled <table> implementation found in this codebase today — ${TABLE_PROMOTION_CANDIDATES.length} files, ${totalPromotionLines()} lines combined. None have been migrated yet, per this work package's own scope.`}
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
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
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
    </PageShell>
  );
}
