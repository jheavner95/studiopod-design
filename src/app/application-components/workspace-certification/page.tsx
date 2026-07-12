import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { SectionShell, CardGrid } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow, Heading } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { BlueprintDiagram } from "./_components/BlueprintDiagram";
import { ScorecardTable } from "./_components/ScorecardTable";
import { CertificationMatrix } from "./_components/CertificationMatrix";
import { SCORECARD_CATEGORIES, EXAMPLE_SCORE, TOTAL_POSSIBLE_POINTS, computeExampleTotal } from "./_data/scorecard";
import { DESIGN_REVIEW_CHECKLIST } from "./_data/checklist";
import { WORKSPACE_EVOLUTION_STEPS } from "./_data/evolution-process";
import { ARCHITECTURE_PRINCIPLES } from "./_data/principles";
import { CERTIFICATION_LEVELS } from "./_data/certification-levels";
import { DS1_WORK_PACKAGES } from "./_data/completion-summary";

const entry = getEntry("workspace-certification")!;
const example = computeExampleTotal();

export default function WorkspaceCertificationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

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
            id="scorecard"
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
            id="review-checklist"
            eyebrow={<Eyebrow tone="accent">Review checklist</Eyebrow>}
            title="Workspace design review checklist"
            description="Ten questions a reviewer works through for any workspace under review."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {DESIGN_REVIEW_CHECKLIST.map((item) => (
              <Card key={item.id} className="flex h-full flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{item.question}</span>
                <Body size="sm" muted>
                  {item.explanation}
                </Body>
                {item.reuseLink ? (
                  <Link
                    href={item.reuseLink.href}
                    className="focus-ring mt-auto flex w-fit items-center gap-1 rounded-md pt-2 text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
                  >
                    {item.reuseLink.label}
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
            id="platform-certification"
            eyebrow={<Eyebrow tone="accent">Platform certification</Eyebrow>}
            title="Platform certification matrix"
            description="Every current StudioPOD platform, scored against the same certification criteria."
            descriptionMaxWidth={false}
          />
          <CertificationMatrix />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="governance"
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
            id="principles"
            eyebrow={<Eyebrow tone="accent">Principles</Eyebrow>}
            title="Architecture principles"
            description="The workspace architecture philosophy, in eight statements."
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
            id="certification-levels"
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
            id="ds-1-complete"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Workspace architecture components"
            description="Every component this certification depends on."
            descriptionMaxWidth={false}
          />
          <DocsRelatedGrid
            columns={4}
            entries={DS1_WORK_PACKAGES.map((pkg) => ({ id: pkg.code, href: pkg.href, title: pkg.title, description: pkg.oneLiner }))}
          />

          <Card padding="lg" className="flex flex-col items-center gap-3 border-success/40 bg-success/10 text-center">
            <ShieldCheck className="size-8 text-success" aria-hidden />
            <Heading level={3}>Workspace Architecture Certified</Heading>
            <Body muted className="max-w-prose">
              This certification is complete. Every current and future StudioPOD workspace is now evaluated against
              the blueprint, scorecard, and checklist this page defines.
            </Body>
          </Card>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
