import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { CatalogExplorer } from "./_components/CatalogExplorer";
import { catalogSummary } from "./_data/catalog";
import { FOUNDATION_BLOCKERS, resolveBlockers } from "./_data/readiness";
import { MATURITY_LEVELS } from "../_data/maturity";
import { buildBacklog } from "./_data/backlog";
import { FOUNDATION_DESIGN_RULES } from "./_data/design-rules";
import { FOUNDATION_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const summary = catalogSummary();
const backlog = buildBacklog();
const entry = getEntry("foundation-components")!;

export default function FoundationComponentsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="summary"
            eyebrow={<Eyebrow tone="accent">Summary</Eyebrow>}
            title="Catalog summary"
            description="Every number below is computed live from the catalog — nothing here is hand-typed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            <Card className="flex flex-col gap-1">
              <span className="text-display-2 font-semibold text-ink-primary">{summary.total}</span>
              <Caption className="text-ink-tertiary">Total components</Caption>
            </Card>
            <Card className="flex flex-col gap-2">
              <Caption className="text-ink-tertiary">By status</Caption>
              <div className="flex flex-wrap gap-1.5">
                <Badge tone="success" size="sm">
                  {summary.byStatus.Exists} Exists
                </Badge>
                <Badge tone="warning" size="sm">
                  {summary.byStatus.Partial} Partial
                </Badge>
                <Badge tone="neutral" size="sm">
                  {summary.byStatus.Needed} Needed
                </Badge>
              </div>
            </Card>
            <Card className="flex flex-col gap-2 sm:col-span-2">
              <Caption className="text-ink-tertiary">Maturity distribution</Caption>
              <div className="flex flex-wrap gap-1.5">
                {MATURITY_LEVELS.map(({ level }) => (
                  <Badge key={level} tone="neutral" size="sm">
                    {summary.byMaturity[level]} {level}
                  </Badge>
                ))}
              </div>
            </Card>
            <Card className="flex flex-col gap-2 sm:col-span-4">
              <Caption className="text-ink-tertiary">High-priority gaps ({summary.highPriorityGaps.length})</Caption>
              <div className="flex flex-wrap gap-1.5">
                {summary.highPriorityGaps.map((component) => (
                  <Badge key={component.id} tone="warning" size="sm">
                    {component.name}
                  </Badge>
                ))}
              </div>
            </Card>
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="catalog"
            eyebrow={<Eyebrow tone="accent">Catalog</Eyebrow>}
            title="Component catalog"
            description="Filter by group or status, then select any component for its full spec."
            descriptionMaxWidth={false}
          />
          <CatalogExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="readiness"
            eyebrow={<Eyebrow tone="accent">Readiness</Eyebrow>}
            title="Foundation readiness"
            description="Which foundation components block each not-yet-built DS-2.x package — none of these four packages exist yet."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {FOUNDATION_BLOCKERS.map((blocker) => (
              <Card key={blocker.id} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-body-md font-medium text-ink-primary">{blocker.targetPackage}</span>
                  <Body size="sm" muted>
                    {blocker.targetDescription}
                  </Body>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {resolveBlockers(blocker).map((component) => (
                    <Badge key={component.id} tone={component.status === "Needed" ? "neutral" : "warning"} size="sm">
                      {component.name} · {component.status}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="certification-model"
            eyebrow={<Eyebrow tone="accent">Certification model</Eyebrow>}
            title="Certification model"
            description="The same five levels Workspace Architecture Certification defined — reused directly, not restated."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            labelWidth="sm:w-44"
            items={MATURITY_LEVELS.map((entry) => ({ label: entry.level, value: entry.description }))}
          />
          <Caption className="text-ink-tertiary">
            No component in this catalog has been marked Certified or Locked — neither level can be reached from
            status alone, and no foundation component has gone through that review yet.
          </Caption>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="backlog"
            eyebrow={<Eyebrow tone="accent">Backlog</Eyebrow>}
            title="Implementation backlog"
            description="Filtered live from the catalog above, in priority order."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-6">
            {backlog.map((bucket) => (
              <div key={bucket.id} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-body-md font-medium text-ink-primary">
                    {bucket.title} ({bucket.items.length})
                  </span>
                  <Body size="sm" muted>
                    {bucket.description}
                  </Body>
                </div>
                {bucket.items.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {bucket.items.map((component) => (
                      <Badge key={component.id} tone="neutral" size="sm">
                        {component.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <Caption className="text-ink-tertiary">Nothing in this bucket today.</Caption>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="design-rules" eyebrow={<Eyebrow tone="accent">Design rules</Eyebrow>} title="Design rules" descriptionMaxWidth={false} />
          <CardGrid columns={3}>
            {FOUNDATION_DESIGN_RULES.map((rule) => (
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
            id="future-extensions"
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
            description="Room the foundation layer leaves for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {FOUNDATION_FUTURE_EXTENSIONS.map((extension) => (
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
