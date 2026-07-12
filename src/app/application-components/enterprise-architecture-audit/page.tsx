import { ShieldCheck } from "lucide-react";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow, Heading } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { StatusWidget, MetricCard, HealthWidget } from "@/components/operational";
import { Scorecard } from "./_components/Scorecard";
import { REVIEW_AREAS, TOTAL_IMPORT_EDGES, TOTAL_FILES_ANALYZED } from "./_data/systems";
import { DIMENSION_TALLIES, computeQualityTotals, computeLayeringTotals } from "./_data/scorecard";
import { LAYER_CHECKS, LAYERING_NOTE, UTILITY_SUBSTRATE_NOTES } from "./_data/dependency-review";
import { CONSISTENCY_FINDINGS, TIER_API_CHECKS, API_CONSISTENCY_SUMMARY } from "./_data/api-consistency";
import { ADOPTION_FINDINGS, ADOPTION_SUMMARY } from "./_data/adoption";
import { NAMING_COLLISIONS, NAMING_SUMMARY } from "./_data/naming-review";
import { BUSINESS_FEATURE_CHECKS, BUSINESS_FEATURE_NEW_FINDINGS, BUSINESS_FEATURE_SUMMARY } from "./_data/business-feature-review";
import { NEW_FINDING, RESOLVED as DUPLICATION_RESOLVED, DEFERRED as DUPLICATION_DEFERRED, DUPLICATION_METHODOLOGY_NOTE } from "./_data/duplication-review";
import { DEBT_REGISTER, tallyDebtStatus, DEBT_METHODOLOGY_NOTE, type DebtStatus } from "./_data/technical-debt";
import { READINESS_ASSESSMENT, type ReadinessVerdict } from "./_data/readiness";
import { CERTIFICATION_LEVELS, CERTIFICATION_DECISION, CERTIFICATION_JUSTIFICATION, REMAINING_BLOCKERS, DS65_NOTE } from "./_data/certification";
import { ENTERPRISE_ROADMAP } from "./_data/roadmap";
import { DS6_4_AREAS, EXECUTIVE_SUMMARY_STRENGTHS, EXECUTIVE_SUMMARY_WEAKNESSES, ENTERPRISE_COMPLETION_SUMMARY } from "./_data/executive-summary";

const entry = getEntry("enterprise-architecture-audit")!;

const READINESS_TONE: Record<ReadinessVerdict, "success" | "warning" | "error"> = {
  Ready: "success",
  "Mostly ready": "warning",
  "Not ready": "error",
};

const DEBT_STATUS_TONE: Record<DebtStatus, "success" | "warning" | "error"> = {
  Resolved: "success",
  "Substantially resolved": "warning",
  "Still open": "error",
  Unconfirmed: "warning",
};

const NAMING_VERDICT_TONE: Record<string, "success" | "warning"> = {
  "Intentional, disclosed": "success",
  "Real gap, still open": "warning",
  "New, checked — clean": "success",
};

const decisionLevel = CERTIFICATION_LEVELS.find((l) => l.id === CERTIFICATION_DECISION)!;
const qualityTotals = computeQualityTotals();
const layeringTotals = computeLayeringTotals();
const debtTally = tallyDebtStatus();

export default function EnterpriseArchitectureAuditPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="review"
            eyebrow={<Eyebrow tone="accent">Review</Eyebrow>}
            title={`Eight audit areas, ${TOTAL_IMPORT_EDGES.toLocaleString()} import edges across ${TOTAL_FILES_ANALYZED.toLocaleString()} files`}
            description="The final architectural audit before Final Enterprise Certification — every layering, dependency, naming, API-consistency, adoption, and duplication claim from all seven prior certification pages independently re-verified against current source, not trusted from any single page's own point-in-time snapshot."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {REVIEW_AREAS.map((area) => (
              <Card key={area.code} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <Caption className="text-ink-tertiary">Area {area.code}</Caption>
                  <Badge tone={area.verdict === "Clean" ? "success" : "warning"} size="sm">
                    {area.verdict}
                  </Badge>
                </div>
                <span className="text-body-md font-medium text-ink-primary">{area.title}</span>
                <Body size="sm" muted>
                  {area.summary}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="verify"
            eyebrow={<Eyebrow tone="accent">Verify</Eyebrow>}
            title="Certification scorecard"
            description="Five tiers by four verification dimensions — Business Features rather than Application, since Application is a consumption surface, not a component library, checked instead in the Layering & Dependency Graph section below."
            descriptionMaxWidth={false}
          />
          <Scorecard />
          <CardGrid columns={2}>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">All four dimensions</span>
              <Body size="sm" muted>
                {`${qualityTotals.pass} Pass, ${qualityTotals.partial} Partial, ${qualityTotals.fail} Fail across ${qualityTotals.total} checks — zero outright Fail anywhere.`}
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Layering discipline alone</span>
              <Body size="sm" muted>
                {`${layeringTotals.pass} Pass, ${layeringTotals.partial} Partial, ${layeringTotals.fail} Fail — the one dimension with a clean sweep across every tier.`}
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
            id="layering-dependency-graph"
            eyebrow={<Eyebrow tone="accent">1. Layering &amp; dependency graph</Eyebrow>}
            title="Foundation → Operational → Workflow → Platform → Business Features → Application"
            description={LAYERING_NOTE}
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
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
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">The utility substrate no prior certification page documents</span>
            <DescriptionList items={UTILITY_SUBSTRATE_NOTES.map((n) => ({ label: n.label, value: n.text }))} />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="api-consistency"
            eyebrow={<Eyebrow tone="accent">2. API consistency</Eyebrow>}
            title="Foundation's own findings, re-checked — plus Operational, Workflow, and Platform"
            description={API_CONSISTENCY_SUMMARY}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {CONSISTENCY_FINDINGS.map((f) => (
              <Card key={f.id} className={f.status === "resolved" ? "flex flex-col gap-1 border-success/30 bg-success-soft" : "flex flex-col gap-1 border-warning/30 bg-warning-soft"}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="min-w-0 text-body-sm font-medium text-ink-primary break-words">{f.title}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <Caption className="text-ink-tertiary uppercase">{f.severity}</Caption>
                    <Badge tone={f.status === "resolved" ? "success" : "warning"} size="sm">
                      {f.status === "resolved" ? "Resolved" : "Still open"}
                    </Badge>
                  </div>
                </div>
                <Body size="sm" muted>
                  {f.detail}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Operational, Workflow, and Platform — checked for the same classes of drift</span>
            <DescriptionList items={TIER_API_CHECKS.map((c) => ({ label: c.tier, value: c.finding }))} />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="adoption" eyebrow={<Eyebrow tone="accent">3. Adoption</Eyebrow>} title="One real Business Feature, re-measured" description={ADOPTION_SUMMARY} descriptionMaxWidth={false} />
          <DescriptionList items={ADOPTION_FINDINGS.map((f) => ({ label: f.label, value: f.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="naming-audit"
            eyebrow={<Eyebrow tone="accent">4. Naming audit</Eyebrow>}
            title="Every already-disclosed collision, re-checked — plus the two newest primitives"
            description={NAMING_SUMMARY}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {NAMING_COLLISIONS.map((entry) => (
              <Card key={entry.name} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{entry.name}</span>
                  <div className="flex items-center gap-2">
                    <Caption className="text-ink-tertiary">{entry.scope}</Caption>
                    <Badge tone={NAMING_VERDICT_TONE[entry.verdict]} size="sm">
                      {entry.verdict}
                    </Badge>
                  </div>
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
          <SectionHeader
            id="business-feature-review"
            eyebrow={<Eyebrow tone="accent">5. Business feature review</Eyebrow>}
            title="All thirteen Composition Framework parts, re-checked against current source"
            description={BUSINESS_FEATURE_SUMMARY}
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {BUSINESS_FEATURE_CHECKS.map((check) => (
              <Card key={check.part} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{check.part}</span>
                  <Badge tone={check.verdict === "Pass" ? "success" : check.verdict === "Partial" ? "warning" : "error"} size="sm">
                    {check.verdict}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {check.evidence}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Found this pass — recorded nowhere until now</span>
            {BUSINESS_FEATURE_NEW_FINDINGS.map((f) => (
              <Card key={f.title} className="flex flex-col gap-1 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">{f.title}</span>
                <Body size="sm" muted>
                  {f.detail}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="duplication-review"
            eyebrow={<Eyebrow tone="accent">6. Duplication review</Eyebrow>}
            title="One new finding, plus every prior tier's own findings reclassified"
            description={DUPLICATION_METHODOLOGY_NOTE}
            descriptionMaxWidth={false}
          />
          <Card padding="lg" className="flex flex-col gap-2 border-warning/30 bg-warning-soft">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-body-sm font-medium text-ink-primary">{NEW_FINDING.title}</span>
              <Caption className="text-ink-tertiary">{NEW_FINDING.scope}</Caption>
            </div>
            <Body size="sm" muted>
              {NEW_FINDING.detail}
            </Body>
          </Card>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Resolved ({DUPLICATION_RESOLVED.length})</span>
            {DUPLICATION_RESOLVED.map((d) => (
              <Card key={d.title} className="flex flex-col gap-1 border-success/30 bg-success-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="min-w-0 text-body-sm font-medium text-ink-primary break-words">{d.title}</span>
                  <Caption className="min-w-0 text-ink-tertiary break-words">{d.scope}</Caption>
                </div>
                <Body size="sm" muted>
                  {d.detail}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Deferred ({DUPLICATION_DEFERRED.length})</span>
            {DUPLICATION_DEFERRED.map((d) => (
              <Card key={d.title} className="flex flex-col gap-1 border-warning/30 bg-warning-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="min-w-0 text-body-sm font-medium text-ink-primary break-words">{d.title}</span>
                  <Caption className="min-w-0 text-ink-tertiary break-words">{d.scope}</Caption>
                </div>
                <Body size="sm" muted>
                  {d.detail}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="technical-debt-register"
            eyebrow={<Eyebrow tone="accent">7. Technical debt register</Eyebrow>}
            title={`${DEBT_REGISTER.length} items, consolidated from all seven prior certification pages`}
            description={DEBT_METHODOLOGY_NOTE}
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            <Card className="flex flex-col gap-1">
              <span className="text-heading-4 font-medium text-success">{debtTally.Resolved}</span>
              <Caption className="text-ink-tertiary">Resolved</Caption>
            </Card>
            <Card className="flex flex-col gap-1">
              <span className="text-heading-4 font-medium text-warning">{debtTally["Substantially resolved"]}</span>
              <Caption className="text-ink-tertiary">Substantially resolved</Caption>
            </Card>
            <Card className="flex flex-col gap-1">
              <span className="text-heading-4 font-medium text-error">{debtTally["Still open"]}</span>
              <Caption className="text-ink-tertiary">Still open</Caption>
            </Card>
            <Card className="flex flex-col gap-1">
              <span className="text-heading-4 font-medium text-ink-secondary">{debtTally.Unconfirmed}</span>
              <Caption className="text-ink-tertiary">Unconfirmed</Caption>
            </Card>
          </CardGrid>
          <div className="flex flex-col gap-3">
            {DEBT_REGISTER.map((d) => (
              <Card key={d.item} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="min-w-0 text-body-sm font-medium text-ink-primary break-words">{d.item}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <Caption className="text-ink-tertiary">{d.source}</Caption>
                    <Badge tone={DEBT_STATUS_TONE[d.status]} size="sm">
                      {d.status}
                    </Badge>
                  </div>
                </div>
                <Body size="sm" muted>
                  {d.note}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="enterprise-readiness" eyebrow={<Eyebrow tone="accent">8. Enterprise readiness</Eyebrow>} title="Readiness" descriptionMaxWidth={false} />
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
          <SectionHeader id="certification-decision" eyebrow={<Eyebrow tone="accent">Certification decision</Eyebrow>} title="Certification ledger" descriptionMaxWidth={false} />
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
            <span className="text-body-sm font-medium text-ink-primary">Remaining blockers to Enterprise-Ready</span>
            <DescriptionList items={REMAINING_BLOCKERS.map((blocker, i) => ({ label: `${i + 1}`, value: blocker.item }))} />
          </div>
          <Card className="flex flex-col gap-2">
            <span className="text-body-sm font-medium text-ink-primary">Looking ahead to Final Enterprise Certification</span>
            <Body size="sm" muted>
              {DS65_NOTE}
            </Body>
          </Card>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="enterprise-roadmap" eyebrow={<Eyebrow tone="accent">Roadmap</Eyebrow>} title="Where this audit sits in the larger plan" descriptionMaxWidth={false} />
          <div className="flex flex-col gap-3">
            {ENTERPRISE_ROADMAP.map((stage) => (
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
          <SectionHeader id="executive-summary" eyebrow={<Eyebrow tone="accent">Executive summary</Eyebrow>} title="Enterprise Architecture &amp; Adoption Audit completion summary" descriptionMaxWidth={false} />
          <Body size="md" muted className="max-w-[var(--container-narrow)]">
            {ENTERPRISE_COMPLETION_SUMMARY}
          </Body>
          <CardGrid columns={3}>
            <StatusWidget
              title="Audit areas"
              items={REVIEW_AREAS.map((area) => ({
                id: area.code,
                label: area.title,
                status: area.verdict === "Clean" ? "healthy" : "warning",
              }))}
            />
            <HealthWidget
              title="Scorecard dimensions"
              score={Math.round((qualityTotals.pass / qualityTotals.total) * 100)}
              metrics={[
                { value: String(TOTAL_IMPORT_EDGES), label: "Import edges parsed" },
                { value: `${debtTally.Resolved + debtTally["Substantially resolved"]}/${DEBT_REGISTER.length}`, label: "Debt items resolved" },
              ]}
            />
            <MetricCard value="0" label="Structural architecture violations found" description="Zero reverse dependencies, zero cycles, zero unjustified layer skips — reported as 0, not padded" />
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
            <span className="text-body-sm font-medium text-ink-primary">Every area in this review</span>
            <DescriptionList items={DS6_4_AREAS.map((pkg) => ({ label: `${pkg.code} — ${pkg.title}`, value: pkg.oneLiner }))} />
          </div>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
