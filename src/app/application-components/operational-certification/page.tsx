import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow, Heading } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { StatusWidget, MetricCard, HealthWidget } from "@/components/operational";
import { PageIntro } from "../_components/PageIntro";
import { Scorecard } from "./_components/Scorecard";
import { OPERATIONAL_SYSTEMS, TOTAL_COMPONENT_COUNT } from "./_data/systems";
import { DIMENSION_TALLIES, computeQualityTotals, computeAdoptionTotals } from "./_data/scorecard";
import { COMPLIANCE_FINDINGS, NEW_CODE_JUSTIFICATIONS, VIOLATIONS_FOUND } from "./_data/foundation-compliance";
import { ACCESSIBILITY_STRENGTHS, ACCESSIBILITY_GAPS } from "./_data/accessibility";
import { LAYER_CHECKS, LAYERING_NOTE } from "./_data/dependency-review";
import { RESOLVED, DEFERRED, REJECTED, PROMOTION_METHODOLOGY_NOTE } from "./_data/promotion-review";
import { READINESS_ASSESSMENT } from "./_data/readiness";
import { CERTIFICATION_LEVELS, CERTIFICATION_DECISION, CERTIFICATION_JUSTIFICATION, REMAINING_BLOCKERS } from "./_data/certification";
import { OPERATIONAL_ROADMAP } from "./_data/roadmap";
import { DS25_WORK_PACKAGES, EXECUTIVE_SUMMARY_STRENGTHS, EXECUTIVE_SUMMARY_WEAKNESSES, DS25_COMPLETION_SUMMARY } from "./_data/executive-summary";

function CrossLinks() {
  const links = [
    { label: "Foundation Components", href: "/application-components/foundation-components" },
    { label: "Foundation Layer Audit", href: "/application-components/foundation-audit" },
    { label: "Workspace Certification", href: "/application-components/workspace-certification" },
    ...OPERATIONAL_SYSTEMS.map((system) => ({ label: system.name, href: system.href })),
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

const READINESS_TONE: Record<string, "success" | "warning" | "error"> = {
  Ready: "success",
  "Mostly ready": "warning",
  "Not ready": "error",
};

const decisionLevel = CERTIFICATION_LEVELS.find((l) => l.id === CERTIFICATION_DECISION)!;
const qualityTotals = computeQualityTotals();
const adoptionTotals = computeAdoptionTotals();

export default function OperationalCertificationPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · operational certification"
          title="Operational Component Library certification"
          description="The DS-2.5 capstone — a final review of all nine operational systems (113 components) against API consistency, composition, Foundation reuse, accessibility, and adoption readiness. A certification and audit package: no new components, no migrations, just a verified record of where the library actually stands."
        >
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Badge tone="warning" size="sm" className="w-fit">
              DS-2.5.10 — Certification Review
            </Badge>
          </div>
          <div className="pt-2">
            <CrossLinks />
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Review</Eyebrow>}
            title={`Nine systems, ${TOTAL_COMPONENT_COUNT} components`}
            description="Every system built across DS-2.5.1–2.5.9, each independently re-audited for this certification rather than trusting its own docs page."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {OPERATIONAL_SYSTEMS.map((system) => (
              <Card key={system.code} className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <Caption className="text-ink-tertiary">{system.code}</Caption>
                  <Badge tone={system.readiness === "Certified" ? "success" : "warning"} size="sm">
                    {system.readiness}
                  </Badge>
                </div>
                <Link href={system.href} className="focus-ring flex items-center gap-1 text-body-md font-medium text-ink-primary hover:text-accent-400">
                  {system.name}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
                <Body size="sm" muted>
                  {system.componentCount} components · composes {system.composesFrom.join(", ")}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Verify</Eyebrow>}
            title="Certification scorecard"
            description="Every system against all eleven verification dimensions — the full matrix behind each system's readiness label above."
            descriptionMaxWidth={false}
          />
          <Scorecard />
          <CardGrid columns={2}>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Ten quality dimensions (excludes Adoption readiness)</span>
              <Body size="sm" muted>
                {`${qualityTotals.pass} Pass, ${qualityTotals.partial} Partial, ${qualityTotals.fail} Fail across ${qualityTotals.total} checks — zero outright failures anywhere except the one dimension every system structurally can’t clear yet.`}
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Adoption readiness alone</span>
              <Body size="sm" muted>
                {`${adoptionTotals.pass} Pass, ${adoptionTotals.partial} Partial, ${adoptionTotals.fail} Fail — every single Fail verdict in the whole matrix traces to this one dimension.`}
              </Body>
            </Card>
          </CardGrid>
          <DescriptionList
            items={DIMENSION_TALLIES.map((tally) => ({
              label: tally.dimension,
              value: `${tally.pass} Pass · ${tally.partial} Partial · ${tally.fail} Fail`,
            }))}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Foundation compliance</Eyebrow>}
            title="Zero duplicated Forms, Tables, Metadata, Navigation, Feedback, Overlay, or Layout"
            description={`${VIOLATIONS_FOUND} violations found across all nine systems — every composition point below was confirmed by reading the actual import, not the docs comment claiming it.`}
            descriptionMaxWidth={false}
          />
          <DescriptionList items={COMPLIANCE_FINDINGS.map((f) => ({ label: f.system, value: f.finding }))} />
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Genuinely new code, and why it&rsquo;s justified</span>
            {NEW_CODE_JUSTIFICATIONS.map((f) => (
              <Card key={f.system} className="flex flex-col gap-1">
                <Caption className="text-ink-tertiary">{f.system}</Caption>
                <Body size="sm" muted>
                  {f.finding}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Accessibility review</Eyebrow>} title="Accessibility review" descriptionMaxWidth={false} />
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Verified strengths</span>
            <DescriptionList items={ACCESSIBILITY_STRENGTHS.map((t) => ({ label: t.label, value: t.text }))} />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Remaining gaps</span>
            <DescriptionList items={ACCESSIBILITY_GAPS.map((t) => ({ label: t.label, value: t.text }))} />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Dependency review</Eyebrow>}
            title="Foundation → Operational → Platform Components"
            description={LAYERING_NOTE}
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {LAYER_CHECKS.map((check) => (
              <Card key={check.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{check.label}</span>
                  <Badge tone={check.verdict === "Pass" ? "success" : "error"} size="sm">
                    {check.verdict}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {check.result}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Promotion review</Eyebrow>}
            title="Every real duplication finding across DS-2.5, reclassified"
            description={PROMOTION_METHODOLOGY_NOTE}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Resolved ({RESOLVED.length})</span>
            {RESOLVED.map((entry) => (
              <Card key={entry.title} className="flex flex-col gap-1 border-success/30 bg-success-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{entry.title}</span>
                  <Caption className="text-ink-tertiary">{entry.system}</Caption>
                </div>
                <Body size="sm" muted>
                  {entry.detail}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Deferred ({DEFERRED.length})</span>
            {DEFERRED.map((entry) => (
              <Card key={entry.title} className="flex flex-col gap-1 border-warning/30 bg-warning-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{entry.title}</span>
                  <Caption className="text-ink-tertiary">{entry.system}</Caption>
                </div>
                <Body size="sm" muted>
                  {entry.detail}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Rejected ({REJECTED.length})</span>
            {REJECTED.map((entry) => (
              <Card key={entry.title} className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{entry.title}</span>
                  <Caption className="text-ink-tertiary">{entry.system}</Caption>
                </div>
                <Body size="sm" muted>
                  {entry.detail}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Readiness</Eyebrow>} title="Readiness" descriptionMaxWidth={false} />
          <CardGrid columns={2}>
            {READINESS_ASSESSMENT.map((row) => (
              <Card key={row.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{row.label}</span>
                  <Badge tone={READINESS_TONE[row.verdict]} size="sm">
                    {row.verdict}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {row.note}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Certification decision</Eyebrow>} title="Certification ledger" descriptionMaxWidth={false} />
          <Card padding="lg" className="flex flex-col gap-6 border-accent-500/30 bg-accent-soft/40">
            <div className="flex flex-wrap items-center gap-4">
              <ShieldCheck className="size-6 text-accent-400" aria-hidden />
              <Heading level={3}>{decisionLevel.name}</Heading>
            </div>
            <Body size="sm" muted>
              {decisionLevel.description}
            </Body>
            <ul className="flex flex-col gap-3 border-t border-border-subtle pt-4">
              {CERTIFICATION_JUSTIFICATION.map((point) => (
                <li key={point.slice(0, 24)} className="text-body-sm text-ink-secondary">
                  {point}
                </li>
              ))}
            </ul>
          </Card>
          <CardGrid columns={4}>
            {CERTIFICATION_LEVELS.map((level) => (
              <Card key={level.id} className={level.id === CERTIFICATION_DECISION ? "flex flex-col gap-2 border-accent-500/40" : "flex flex-col gap-2"}>
                <span className="text-body-sm font-medium text-ink-primary">{level.name}</span>
                <Body size="sm" muted>
                  {level.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Remaining blockers</span>
            <DescriptionList
              items={REMAINING_BLOCKERS.map((blocker) => ({
                label: blocker.toLevel === "certified" ? "To Certified" : "To Enterprise Certified",
                value: blocker.item,
              }))}
            />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Operational roadmap</Eyebrow>} title="Where DS-2.5 sits in the larger plan" descriptionMaxWidth={false} />
          <div className="flex flex-col gap-3">
            {OPERATIONAL_ROADMAP.map((stage) => (
              <Card key={stage.id} className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-body-sm font-medium text-ink-primary">{stage.title}</span>
                  <Body size="sm" muted className="max-w-[var(--container-narrow)]">
                    {stage.description}
                  </Body>
                </div>
                <Badge tone={stage.status === "complete" ? "success" : stage.status === "next" ? "accent" : "neutral"} size="sm" className="w-fit shrink-0">
                  {stage.status === "complete" ? "Complete" : stage.status === "next" ? "Next" : "Future"}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Executive summary</Eyebrow>} title="DS-2.5 completion summary" descriptionMaxWidth={false} />
          <Body size="md" muted className="max-w-[var(--container-narrow)]">
            {DS25_COMPLETION_SUMMARY}
          </Body>
          <CardGrid columns={3}>
            <StatusWidget
              title="System readiness"
              items={OPERATIONAL_SYSTEMS.map((system) => ({
                id: system.code,
                label: system.name,
                status: system.readiness === "Certified" ? "healthy" : "syncing",
              }))}
            />
            <HealthWidget
              title="Library quality"
              score={Math.round((qualityTotals.pass / qualityTotals.total) * 100)}
              metrics={[
                { value: String(TOTAL_COMPONENT_COUNT), label: "Components" },
                { value: `${OPERATIONAL_SYSTEMS.filter((s) => s.readiness === "Certified").length}/9`, label: "Systems Certified" },
              ]}
            />
            <MetricCard value="0" label="Foundation violations" description="Across 113 components, nine independent audits" />
          </CardGrid>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Strengths</span>
              <ul className="flex flex-col gap-2">
                {EXECUTIVE_SUMMARY_STRENGTHS.map((point) => (
                  <li key={point.slice(0, 24)} className="text-body-sm text-ink-secondary">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Weaknesses</span>
              <ul className="flex flex-col gap-2">
                {EXECUTIVE_SUMMARY_WEAKNESSES.map((point) => (
                  <li key={point.slice(0, 24)} className="text-body-sm text-ink-secondary">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Every DS-2.5 work package</span>
            <DescriptionList items={DS25_WORK_PACKAGES.map((pkg) => ({ label: `${pkg.code} — ${pkg.title}`, value: pkg.oneLiner }))} />
          </div>
        </div>
      </SectionShell>
    </PageShell>
  );
}
