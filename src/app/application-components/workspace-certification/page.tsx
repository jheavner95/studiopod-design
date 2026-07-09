import Link from "next/link";
import { ArrowUpRight, ArrowDown, ShieldCheck } from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow, Heading } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { BlueprintDiagram } from "./_components/BlueprintDiagram";
import { ScorecardTable } from "./_components/ScorecardTable";
import { CertificationMatrix } from "./_components/CertificationMatrix";
import { SCORECARD_CATEGORIES, EXAMPLE_SCORE, TOTAL_POSSIBLE_POINTS, computeExampleTotal } from "./_data/scorecard";
import { DESIGN_REVIEW_CHECKLIST } from "./_data/checklist";
import { WORKSPACE_EVOLUTION_STEPS } from "./_data/evolution-process";
import { ARCHITECTURE_PRINCIPLES } from "./_data/principles";
import { CERTIFICATION_LEVELS } from "./_data/certification-levels";
import { ARCHITECTURE_ROADMAP } from "./_data/roadmap";
import { DS1_WORK_PACKAGES } from "./_data/completion-summary";

function CrossLinks() {
  const links = [
    { label: "Workspace Framework", href: "/application-components/workspace-framework" },
    { label: "Workspace Header", href: "/application-components/workspace-header" },
    { label: "Workspace Layout", href: "/application-components/workspace-layout" },
    { label: "Workspace Toolbar", href: "/application-components/workspace-toolbar" },
    { label: "Asset Workspace", href: "/application-components/asset-workspace" },
    { label: "Primary Workspace", href: "/application-components/primary-workspace" },
    { label: "Inspector Workspace", href: "/application-components/inspector-workspace" },
    { label: "Operational Status Workspace", href: "/application-components/status-workspace" },
    { label: "Foundation Component Catalog", href: "/application-components/foundation-components" },
    { label: "Foundation Layout Primitives", href: "/application-components/foundation-layout" },
    { label: "Foundation Layer Audit", href: "/application-components/foundation-audit" },
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

const example = computeExampleTotal();

export default function WorkspaceCertificationPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · workspace certification"
          title="Workspace architecture certification"
          description="The capstone of DS-1 — the governance standard every current and future StudioPOD workspace is evaluated against before implementation. Documentation and an interactive demonstration only; this doesn't touch the production application."
        >
          <div className="pt-2">
            <CrossLinks />
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div id="blueprint" className="flex scroll-mt-24 flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Blueprint</Eyebrow>}
            title="Canonical workspace blueprint"
            description="Six tiers, top to bottom — every region a new workspace is measured against. Click any node to see its full purpose and relationships, or open its documentation directly."
            descriptionMaxWidth={false}
          />
          <BlueprintDiagram />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Scorecard</Eyebrow>}
            title="Workspace certification scorecard"
            description={`A weighted model across ${SCORECARD_CATEGORIES.length} categories, ${TOTAL_POSSIBLE_POINTS} points total. Category weights are raw points, not percentages — they don't sum to 100.`}
            descriptionMaxWidth={false}
          />
          <ScorecardTable />

          <Card padding="lg" className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Caption className="text-ink-tertiary">Example score calculation</Caption>
              <Body size="sm" muted>
                A hypothetical Commerce workspace, scored category by category.
              </Body>
            </div>
            <ul className="flex flex-col">
              {EXAMPLE_SCORE.map((entry, index) => {
                const category = SCORECARD_CATEGORIES.find((c) => c.id === entry.categoryId);
                if (!category) return null;
                return (
                  <li
                    key={entry.categoryId}
                    className={
                      index < EXAMPLE_SCORE.length - 1
                        ? "flex flex-col gap-1 border-b border-border-subtle py-3 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                        : "flex flex-col gap-1 py-3 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    }
                  >
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-body-sm font-medium text-ink-primary">{category.label}</span>
                      <Caption className="min-w-0 break-words text-ink-tertiary">{entry.note}</Caption>
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-body-sm text-ink-secondary">
                      {entry.earned} / {category.weight}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-body-md font-medium text-ink-primary">
                  {example.earned} / {example.possible} points
                </span>
                <Caption className="text-ink-tertiary">{example.percent}% of total possible</Caption>
              </div>
              <Badge tone="success" size="md">
                Resulting level: {example.level.name}
              </Badge>
            </div>
          </Card>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Review checklist</Eyebrow>}
            title="Workspace design review checklist"
            description="Ten questions a reviewer works through for any workspace under review."
            descriptionMaxWidth={false}
          />
          <div className="rounded-lg border border-border-subtle bg-surface p-4 sm:p-6">
            <ul className="flex flex-col">
              {DESIGN_REVIEW_CHECKLIST.map((item, index) => (
                <li
                  key={item.id}
                  className={
                    index < DESIGN_REVIEW_CHECKLIST.length - 1
                      ? "flex flex-col gap-1.5 border-b border-border-subtle py-4 first:pt-0"
                      : "flex flex-col gap-1.5 py-4 first:pt-0"
                  }
                >
                  <span className="text-body-sm font-medium text-ink-primary">{item.question}</span>
                  <Body size="sm" muted className="min-w-0 break-words">
                    {item.explanation}
                  </Body>
                  {item.reuseLink ? (
                    <Link
                      href={item.reuseLink.href}
                      className="focus-ring flex w-fit items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
                    >
                      {item.reuseLink.label}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Platform certification</Eyebrow>}
            title="Platform certification matrix"
            description="Every current StudioPOD platform, scored honestly against today's state — no platform has completed a formal Scorecard review yet, since this page is what defines that review. Product has no architecture or coverage tracking anywhere yet, which this matrix surfaces rather than hides."
            descriptionMaxWidth={false}
          />
          <CertificationMatrix />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Governance</Eyebrow>}
            title="Workspace evolution process"
            description="How the architecture itself is allowed to change, in order."
            descriptionMaxWidth={false}
          />
          <ol className="flex flex-col gap-3">
            {WORKSPACE_EVOLUTION_STEPS.map((step, index) => (
              <li key={step.id}>
                <Card padding="md" className="flex items-start gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-accent-500/40 bg-accent-soft/20 text-caption font-medium text-accent-300">
                    {index + 1}
                  </span>
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-body-sm font-medium text-ink-primary">{step.title}</span>
                    <Body size="sm" muted className="min-w-0 break-words">
                      {step.description}
                    </Body>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Principles</Eyebrow>}
            title="Architecture principles"
            description="The DS-1 philosophy, in eight statements."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {ARCHITECTURE_PRINCIPLES.map((principle) => (
              <Card key={principle.title} className="flex h-full flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{principle.title}</span>
                <Body size="sm" muted>
                  {principle.explanation}
                </Body>
                {principle.reuseLink ? (
                  <Link
                    href={principle.reuseLink.href}
                    className="focus-ring mt-auto flex w-fit items-center gap-1 rounded-md pt-2 text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
                  >
                    {principle.reuseLink.label}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </Link>
                ) : null}
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Certification levels</Eyebrow>}
            title="Certification levels"
            description="Five stages, ascending — the Scorecard percentage above decides where a workspace lands."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {CERTIFICATION_LEVELS.map((level) => (
              <Card key={level.id} className="flex h-full flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-body-md font-medium text-ink-primary">{level.name}</span>
                  <Badge tone="accent" size="sm">
                    {level.minScorePercent}%+
                  </Badge>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Caption className="text-ink-tertiary">Requirements</Caption>
                  <ul className="flex flex-col gap-1">
                    {level.requirements.map((requirement) => (
                      <li key={requirement} className="flex gap-2 text-body-sm text-ink-secondary">
                        <span className="text-ink-tertiary" aria-hidden>
                          –
                        </span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Caption className="text-ink-tertiary">Typical use</Caption>
                  <Body size="sm" muted>
                    {level.typicalUse}
                  </Body>
                </div>
                <div className="mt-auto flex flex-col gap-1.5 border-t border-border-subtle pt-4">
                  <Caption className="text-ink-tertiary">Review expectations</Caption>
                  <Body size="sm" muted>
                    {level.reviewExpectations}
                  </Body>
                </div>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Roadmap</Eyebrow>}
            title="Future architecture roadmap"
            description="DS-1 establishes the architectural foundation everything below it builds on."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col items-stretch gap-1 rounded-xl border border-border-subtle bg-surface/40 p-6 sm:p-10">
            {ARCHITECTURE_ROADMAP.map((stage, index) => (
              <div key={stage.id} className="flex flex-col items-center gap-1">
                <Card
                  padding="md"
                  className={
                    stage.status === "complete"
                      ? "flex w-full flex-col gap-1 border-success/40 bg-success/10 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
                      : "flex w-full flex-col gap-1 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
                  }
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-body-md font-medium text-ink-primary">{stage.title}</span>
                    <Body size="sm" muted>
                      {stage.description}
                    </Body>
                  </div>
                  <Badge tone={stage.status === "complete" ? "success" : "neutral"} size="sm" className="mx-auto w-fit sm:mx-0">
                    {stage.status === "complete" ? "Complete" : "Future"}
                  </Badge>
                </Card>
                {index < ARCHITECTURE_ROADMAP.length - 1 ? (
                  <ArrowDown className="size-4 text-ink-tertiary" aria-hidden />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">DS-1 complete</Eyebrow>}
            title="DS-1 completion summary"
            description="Every work package this certification depends on."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {DS1_WORK_PACKAGES.map((pkg) => (
              <Link key={pkg.code} href={pkg.href} className="focus-ring block rounded-lg">
                <Card interactive padding="md" className="flex h-full flex-col gap-1.5">
                  <Badge tone="neutral" size="sm" className="w-fit">
                    {pkg.code}
                  </Badge>
                  <span className="text-body-sm font-medium text-ink-primary">{pkg.title}</span>
                  <Body size="sm" muted className="line-clamp-2">
                    {pkg.oneLiner}
                  </Body>
                </Card>
              </Link>
            ))}
          </CardGrid>

          <Card padding="lg" className="flex flex-col items-center gap-3 border-success/40 bg-success/10 text-center">
            <ShieldCheck className="size-8 text-success" aria-hidden />
            <Heading level={3}>Workspace Architecture Certified</Heading>
            <Body muted className="max-w-prose">
              DS-1 is complete. Every current and future StudioPOD workspace is now evaluated against the blueprint,
              scorecard, and checklist this page defines.
            </Body>
          </Card>
        </div>
      </SectionShell>
    </PageShell>
  );
}
