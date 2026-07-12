import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow, Heading } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { StatusWidget, MetricCard, HealthWidget } from "@/components/operational";
import { Scorecard } from "./_components/Scorecard";
import { PLATFORM_SYSTEMS, TOTAL_COMPONENT_COUNT } from "./_data/systems";
import { DIMENSION_TALLIES, computeQualityTotals, computeAdoptionTotals } from "./_data/scorecard";
import { COMPLIANCE_FINDINGS, NEW_CODE_JUSTIFICATIONS, VIOLATIONS_FOUND } from "./_data/foundation-compliance";
import { ACCESSIBILITY_STRENGTHS, ACCESSIBILITY_GAPS } from "./_data/accessibility";
import { LAYER_CHECKS, LAYERING_NOTE } from "./_data/dependency-review";
import { RESOLVED, DEFERRED, REJECTED, PROMOTION_METHODOLOGY_NOTE } from "./_data/promotion-review";
import { NAMING_COLLISIONS, NAMING_SUMMARY } from "./_data/naming-review";
import { READINESS_ASSESSMENT } from "./_data/readiness";
import { CERTIFICATION_LEVELS, CERTIFICATION_DECISION, CERTIFICATION_JUSTIFICATION, REMAINING_BLOCKERS } from "./_data/certification";
import { DS4_WORK_PACKAGES, EXECUTIVE_SUMMARY_STRENGTHS, EXECUTIVE_SUMMARY_WEAKNESSES, DS4_COMPLETION_SUMMARY } from "./_data/executive-summary";

const entry = getEntry("platform-certification")!;

const READINESS_TONE: Record<string, "success" | "warning" | "error"> = {
  Ready: "success",
  "Mostly ready": "warning",
  "Not ready": "error",
};

const NAMING_VERDICT_TONE: Record<string, "success" | "warning"> = {
  "Intentional, disclosed": "success",
  "Real gap found this audit": "warning",
};

const decisionLevel = CERTIFICATION_LEVELS.find((l) => l.id === CERTIFICATION_DECISION)!;
const qualityTotals = computeQualityTotals();
const adoptionTotals = computeAdoptionTotals();
const domainPlatforms = PLATFORM_SYSTEMS.filter((s) => s.readiness === "Certified");

export default function PlatformCertificationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="executive-summary" eyebrow={<Eyebrow tone="accent">Executive summary</Eyebrow>} title="Platform tier completion summary" descriptionMaxWidth={false} />
          <Body size="md" muted className="max-w-[var(--container-narrow)]">
            {DS4_COMPLETION_SUMMARY}
          </Body>
          <CardGrid columns={3}>
            <StatusWidget
              title="Platform readiness"
              items={domainPlatforms.map((system) => ({
                id: system.code,
                label: system.name,
                status: "healthy",
              }))}
            />
            <HealthWidget
              title="Library quality"
              score={Math.round((qualityTotals.pass / qualityTotals.total) * 100)}
              metrics={[
                { value: String(TOTAL_COMPONENT_COUNT), label: "Components" },
                { value: `${domainPlatforms.length}/8`, label: "Platforms Certified" },
              ]}
            />
            <MetricCard value="5" label="Documentation defects found and fixed" description="Across nine independent audits, this same certification pass" />
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
            <span className="text-body-sm font-medium text-ink-primary">Every package in this review</span>
            <DescriptionList items={DS4_WORK_PACKAGES.map((pkg) => ({ label: pkg.title, value: pkg.oneLiner }))} />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="review"
            eyebrow={<Eyebrow tone="accent">Review</Eyebrow>}
            title={`Nine packages, ${TOTAL_COMPONENT_COUNT} components`}
            description="Platform Architecture (the blueprint) plus every domain platform built on top of it, each independently re-audited for this certification rather than trusting its own docs page."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {PLATFORM_SYSTEMS.map((system) => (
              <Card key={system.code} className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge tone={system.readiness === "Certified" ? "success" : "neutral"} size="sm">
                    {system.readiness === "Certified" ? "Certified" : "Architecture"}
                  </Badge>
                </div>
                <Link href={system.href} className="focus-ring flex items-center gap-1 text-body-md font-medium text-ink-primary hover:text-accent-400">
                  {system.name}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
                <Body size="sm" muted>
                  {system.componentCount > 0
                    ? `${system.componentCount} components · composes ${system.composesFrom.join(", ")}`
                    : "The blueprint every domain platform below built against — no components of its own."}
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
            description="Every domain platform against all thirteen verification dimensions — the full matrix behind each platform's Certified label above. Platform Architecture is excluded from this scorecard (it is documentation, not a component library) and reviewed instead in the Layering Review below. Thirteen dimensions rather than the Workflow tier's twelve: this tier composes from three lower tiers at once (Foundation, Operational, Workflow) plus a Platform-specific boundary check."
            descriptionMaxWidth={false}
          />
          <Scorecard />
          <CardGrid columns={2}>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Twelve quality dimensions (excludes Adoption readiness)</span>
              <Body size="sm" muted>
                {`${qualityTotals.pass} Pass, ${qualityTotals.partial} Partial, ${qualityTotals.fail} Fail across ${qualityTotals.total} checks — zero outright failures anywhere except the one dimension every platform structurally can’t clear yet.`}
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
            id="foundation-operational-workflow-compliance"
            eyebrow={<Eyebrow tone="accent">Foundation, Operational &amp; Workflow compliance</Eyebrow>}
            title="Foundation → Operational → Workflow → Platform, verified at every step"
            description={`${VIOLATIONS_FOUND} violations found across all eight domain platforms — every composition point below was confirmed by reading the actual import, not the docs comment claiming it.`}
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
          <SectionHeader id="accessibility-review" eyebrow={<Eyebrow tone="accent">Accessibility review</Eyebrow>} title="Accessibility review" descriptionMaxWidth={false} />
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
            id="layering-review"
            eyebrow={<Eyebrow tone="accent">Layering review</Eyebrow>}
            title="Foundation → Operational → Workflow → Platform → Business Features"
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
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="promotion-review"
            eyebrow={<Eyebrow tone="accent">Promotion review</Eyebrow>}
            title="Every real duplication finding across the platform tier, reclassified"
            description={PROMOTION_METHODOLOGY_NOTE}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Resolved ({RESOLVED.length})</span>
            {RESOLVED.map((entry) => (
              <Card key={entry.title} className="flex flex-col gap-1 border-success/30 bg-success-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="min-w-0 text-body-sm font-medium text-ink-primary break-words">{entry.title}</span>
                  <Caption className="min-w-0 text-ink-tertiary break-words">{entry.system}</Caption>
                </div>
                <Body size="sm" muted>
                  {entry.detail}
                </Body>
              </Card>
            ))}
          </div>
          {DEFERRED.length > 0 ? (
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Deferred ({DEFERRED.length})</span>
              {DEFERRED.map((entry) => (
                <Card key={entry.title} className="flex flex-col gap-1 border-warning/30 bg-warning-soft">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="min-w-0 text-body-sm font-medium text-ink-primary break-words">{entry.title}</span>
                    <Caption className="min-w-0 text-ink-tertiary break-words">{entry.system}</Caption>
                  </div>
                  <Body size="sm" muted>
                    {entry.detail}
                  </Body>
                </Card>
              ))}
            </div>
          ) : null}
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Rejected ({REJECTED.length})</span>
            {REJECTED.map((entry) => (
              <Card key={entry.title} className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="min-w-0 text-body-sm font-medium text-ink-primary break-words">{entry.title}</span>
                  <Caption className="min-w-0 text-ink-tertiary break-words">{entry.system}</Caption>
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
            id="naming-review"
            eyebrow={<Eyebrow tone="accent">Naming review</Eyebrow>}
            title="Every collision against the Illustration Library, the Workflow Diagram Library, and Foundation/Operational/Workflow"
            description={NAMING_SUMMARY}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {NAMING_COLLISIONS.map((entry) => (
              <Card key={entry.name} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{entry.name}</span>
                  <div className="flex items-center gap-2">
                    <Caption className="text-ink-tertiary">{entry.system}</Caption>
                    <Badge tone={NAMING_VERDICT_TONE[entry.verdict]} size="sm">
                      {entry.verdict}
                    </Badge>
                  </div>
                </div>
                <Body size="sm" muted>
                  Collides with: {entry.collidesWith}
                </Body>
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
          <SectionHeader id="readiness-review" eyebrow={<Eyebrow tone="accent">Readiness review</Eyebrow>} title="Readiness" descriptionMaxWidth={false} />
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

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-6">
          <SectionHeader id="related" eyebrow={<Eyebrow tone="accent">Related</Eyebrow>} title="Related" descriptionMaxWidth={false} />
          <DocsRelatedGrid entries={[getEntry("docs-platform")!, getEntry("workflow-certification")!, getEntry("architecture-doc")!]} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
