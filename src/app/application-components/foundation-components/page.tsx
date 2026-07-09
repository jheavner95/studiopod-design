import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { CatalogExplorer } from "./_components/CatalogExplorer";
import { catalogSummary } from "./_data/catalog";
import { FOUNDATION_BLOCKERS, resolveBlockers } from "./_data/readiness";
import { MATURITY_LEVELS } from "../_data/maturity";
import { buildBacklog } from "./_data/backlog";
import { FOUNDATION_DESIGN_RULES } from "./_data/design-rules";
import { FOUNDATION_FUTURE_EXTENSIONS } from "./_data/future-extensions";

function CrossLinks() {
  const links = [
    { label: "Application Components", href: "/application-components" },
    { label: "Workspace Certification", href: "/application-components/workspace-certification" },
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

const summary = catalogSummary();
const backlog = buildBacklog();

export default function FoundationComponentsPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · foundation components"
          title="Foundation component catalog"
          description="The primitive UI layer every StudioPOD operational component builds on — the official catalog for Web and App alike. Documentation, inventory, and planning only; this doesn't touch the production application."
        >
          <div className="pt-2">
            <CrossLinks />
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
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
            eyebrow={<Eyebrow tone="accent">Certification model</Eyebrow>}
            title="Certification model"
            description="The same five levels Workspace Architecture Certification defined — reused directly, not restated."
            descriptionMaxWidth={false}
          />
          <div className="rounded-lg border border-border-subtle bg-surface p-4 sm:p-6">
            <dl className="flex flex-col">
              {MATURITY_LEVELS.map((entry, index) => (
                <div
                  key={entry.level}
                  className={
                    index < MATURITY_LEVELS.length - 1
                      ? "flex flex-col gap-1.5 border-b border-border-subtle py-4 first:pt-0 sm:flex-row sm:gap-6"
                      : "flex flex-col gap-1.5 py-4 first:pt-0 sm:flex-row sm:gap-6"
                  }
                >
                  <dt className="w-full shrink-0 text-body-sm font-medium text-ink-primary sm:w-44">{entry.level}</dt>
                  <dd className="min-w-0 break-words text-body-sm text-ink-secondary">{entry.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Caption className="text-ink-tertiary">
            No component in this catalog has been marked Certified or Locked — neither level can be reached from
            status alone, and no foundation component has gone through that review yet.
          </Caption>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
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
          <SectionHeader eyebrow={<Eyebrow tone="accent">Design rules</Eyebrow>} title="Design rules" descriptionMaxWidth={false} />
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
    </PageShell>
  );
}
