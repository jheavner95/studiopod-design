import Link from "next/link";
import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { CatalogExplorer } from "./_components/CatalogExplorer";
import { catalogSummary, stateFrequency, accessibilityFrequency } from "./_data/catalog";
import { FOUNDATION_BLOCKERS, resolveBlockers } from "./_data/readiness";
import { MATURITY_LEVELS } from "../_data/maturity";
import { buildBacklog } from "./_data/backlog";
import { FOUNDATION_DESIGN_RULES } from "./_data/design-rules";
import { FOUNDATION_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const summary = catalogSummary();
const backlog = buildBacklog();
const requiredStateCounts = stateFrequency(3);
const accessibilityCounts = accessibilityFrequency(2);
const entry = getEntry("foundation-components")!;
const relatedComponents = [getEntry("foundation-layout")!, getEntry("foundation-table")!, getEntry("foundation-metadata")!];

export default function FoundationComponentsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="At-a-glance numbers for the whole Foundation-tier catalog — every count below is computed live from the data below it, nothing here is hand-typed."
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
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The rules that decide whether a pattern belongs in this Foundation layer, or graduates into an Operational, Workflow, or Platform component built on top of it."
            descriptionMaxWidth={false}
          />
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
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Examples"
            description="Filter by group or status, then select any component for its full spec — purpose, source, required states and variants, and its accessibility contract."
            descriptionMaxWidth={false}
          />
          <CatalogExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="The states specified most often across every component's own required-states list — the behavioral contract this catalog repeats regardless of which group a component belongs to."
            descriptionMaxWidth={false}
          />
          <Card className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Required states, by frequency across the catalog</Caption>
            <div className="flex flex-wrap gap-1.5">
              {requiredStateCounts.map((entry) => (
                <Badge key={entry.label} tone="neutral" size="sm">
                  {entry.label} · {entry.count}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="accessibility"
            eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>}
            title="Accessibility"
            description="Accessibility requirements repeated word-for-word across more than one component in the catalog — real overlap, not aspirational guidance."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={accessibilityCounts.map((entry) => ({
              label: entry.label,
              value: `Shared by ${entry.count} components`,
            }))}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="Which components in this catalog compose into each not-yet-built component group above it — grounded in the same catalog above, not a separate list."
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
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
            description="The next few Foundation-tier pages, in catalog order."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {relatedComponents.map((related) => (
              <Link key={related.id} href={related.href} className="focus-ring block rounded-lg">
                <Card interactive className="flex h-full flex-col gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{related.title}</span>
                  <Body size="sm" muted>
                    {related.description}
                  </Body>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="maturity-model"
              title="Maturity model"
              description="The same five levels Workspace Certification defined — reused directly here, not restated."
              descriptionMaxWidth={false}
            />
            <DescriptionList items={MATURITY_LEVELS.map((entry) => ({ label: entry.level, value: entry.description }))} />
            <Caption className="text-ink-tertiary">
              No component in this catalog has been marked Certified or Locked — neither level can be reached from
              status alone, and no foundation component has gone through that review yet.
            </Caption>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="implementation-backlog"
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

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
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
        </div>
      </SectionShell>
    </DocsShell>
  );
}
