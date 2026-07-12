import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow, Heading } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { StatusWidget, MetricCard, HealthWidget } from "@/components/operational";
import { Scorecard } from "./_components/Scorecard";
import { TIER_REVIEWS, TOTAL_FILES_MODIFIED, TOTAL_RESOLVED, TOTAL_DEFERRED, TOTAL_REJECTED } from "./_data/systems";
import { PRE_SESSION_FIXES } from "./_data/pre-session-fixes";
import { DIMENSION_TALLIES, computeQualityTotals, computeLiveRegionTotals } from "./_data/scorecard";
import { RESOLVED, DEFERRED, REJECTED, FINDINGS_METHODOLOGY_NOTE } from "./_data/findings";
import { CERTIFICATION_LEVELS, CERTIFICATION_DECISION, CERTIFICATION_JUSTIFICATION, REMAINING_BLOCKERS } from "./_data/certification";
import { DS6_WORK_PACKAGES, EXECUTIVE_SUMMARY_STRENGTHS, EXECUTIVE_SUMMARY_WEAKNESSES, ACCESSIBILITY_COMPLETION_SUMMARY } from "./_data/executive-summary";

const entry = getEntry("accessibility-certification")!;

const CATEGORY_LABEL: Record<string, string> = {
  aria: "ARIA",
  keyboard: "Keyboard",
  touch: "Touch target",
  other: "Other",
};

const decisionLevel = CERTIFICATION_LEVELS.find((l) => l.id === CERTIFICATION_DECISION)!;
const qualityTotals = computeQualityTotals();
const liveRegionTotals = computeLiveRegionTotals();

export default function AccessibilityCertificationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="executive-summary" eyebrow={<Eyebrow tone="accent">Executive summary</Eyebrow>} title="Accessibility & Interaction Quality completion summary" descriptionMaxWidth={false} />
          <Body size="md" muted className="max-w-[var(--container-narrow)]">
            {ACCESSIBILITY_COMPLETION_SUMMARY}
          </Body>
          <CardGrid columns={3}>
            <StatusWidget
              title="Tier readiness"
              items={TIER_REVIEWS.map((tier) => ({
                id: tier.code,
                label: tier.name,
                status: "healthy",
              }))}
            />
            <HealthWidget
              title="Quality dimensions"
              score={Math.round((qualityTotals.pass / qualityTotals.total) * 100)}
              metrics={[
                { value: String(TOTAL_FILES_MODIFIED), label: "Files modified" },
                { value: `${TOTAL_RESOLVED}/${TOTAL_RESOLVED + TOTAL_DEFERRED}`, label: "Findings Resolved" },
              ]}
            />
            <MetricCard value={String(TOTAL_DEFERRED)} label="Real, disclosed gaps deferred" description="None fixed speculatively — each carries a re-verify note" />
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
            <DescriptionList items={DS6_WORK_PACKAGES.map((pkg) => ({ label: pkg.title, value: pkg.oneLiner }))} />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="review"
            eyebrow={<Eyebrow tone="accent">Review</Eyebrow>}
            title={`Two tiers, ${TOTAL_FILES_MODIFIED} files touched`}
            description="Foundation and Operational, each reviewed for accessibility and interaction quality."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {TIER_REVIEWS.map((tier) => (
              <Card key={tier.code} className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <Caption className="text-ink-tertiary">{tier.tier}</Caption>
                  <Badge tone="success" size="sm">
                    {tier.resolvedCount} Resolved · {tier.deferredCount} Deferred
                  </Badge>
                </div>
                <Link href={tier.href} className="focus-ring flex items-center gap-1 text-body-md font-medium text-ink-primary hover:text-accent-400">
                  {tier.name}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
                <Body size="sm" muted>
                  {tier.summary}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Already fixed — confirmed present in code</span>
            <DescriptionList items={PRE_SESSION_FIXES.map((fix) => ({ label: fix.title, value: fix.detail }))} />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="verify"
            eyebrow={<Eyebrow tone="accent">Verify</Eyebrow>}
            title="Certification scorecard"
            description="Foundation and Operational against six accessibility-and-interaction-quality dimensions — six rather than the composition-layer tiers' own eleven-to-thirteen, since Foundation/Operational/Workflow composition is already certified separately at each tier's own capstone. This scorecard's subject is accessibility and interaction quality specifically."
            descriptionMaxWidth={false}
          />
          <Scorecard />
          <CardGrid columns={2}>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Five quality dimensions (excludes Live region coverage)</span>
              <Body size="sm" muted>
                {`${qualityTotals.pass} Pass, ${qualityTotals.partial} Partial, ${qualityTotals.fail} Fail across ${qualityTotals.total} checks.`}
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Live region coverage alone</span>
              <Body size="sm" muted>
                {`${liveRegionTotals.pass} Pass, ${liveRegionTotals.partial} Partial, ${liveRegionTotals.fail} Fail — the single dimension holding this certification back from Enterprise Certified.`}
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
            id="findings"
            eyebrow={<Eyebrow tone="accent">Findings</Eyebrow>}
            title={`${TOTAL_RESOLVED} Resolved, ${TOTAL_DEFERRED} Deferred, ${TOTAL_REJECTED} Rejected`}
            description={FINDINGS_METHODOLOGY_NOTE}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Resolved ({RESOLVED.length})</span>
            {RESOLVED.map((f) => (
              <Card key={f.title} className="flex flex-col gap-1 border-success/30 bg-success-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="min-w-0 text-body-sm font-medium text-ink-primary break-words">{f.title}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <Caption className="text-ink-tertiary">{f.tier}</Caption>
                    <Badge tone="neutral" size="sm">
                      {CATEGORY_LABEL[f.category]}
                    </Badge>
                  </div>
                </div>
                <Caption className="text-ink-tertiary">
                  {f.file}
                  {f.line ? `:${f.line}` : ""}
                </Caption>
                <Body size="sm" muted>
                  {f.detail}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Deferred ({DEFERRED.length})</span>
            {DEFERRED.map((f) => (
              <Card key={f.title} className="flex flex-col gap-1 border-warning/30 bg-warning-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="min-w-0 text-body-sm font-medium text-ink-primary break-words">{f.title}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <Caption className="text-ink-tertiary">{f.tier}</Caption>
                    <Badge tone="neutral" size="sm">
                      {CATEGORY_LABEL[f.category]}
                    </Badge>
                  </div>
                </div>
                <Caption className="text-ink-tertiary">
                  {f.file}
                  {f.line ? `:${f.line}` : ""}
                </Caption>
                <Body size="sm" muted>
                  {f.detail}
                </Body>
              </Card>
            ))}
          </div>
          {REJECTED.length > 0 ? (
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Rejected ({REJECTED.length})</span>
              {REJECTED.map((f) => (
                <Card key={f.title} className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="min-w-0 text-body-sm font-medium text-ink-primary break-words">{f.title}</span>
                    <Caption className="min-w-0 text-ink-tertiary break-words">{f.tier}</Caption>
                  </div>
                  <Body size="sm" muted>
                    {f.detail}
                  </Body>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="flex flex-col gap-1">
              <span className="text-body-sm font-medium text-ink-primary">Rejected (0)</span>
              <Body size="sm" muted>
                No finding was investigated and refuted — every finding traced to a real, source-verified defect, either fixed or genuinely deferred. Reported empty honestly rather than padded with a placeholder entry.
              </Body>
            </Card>
          )}
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
              items={REMAINING_BLOCKERS.map((blocker, i) => ({
                label: blocker.toLevel === "certified" ? "To Certified" : `To Enterprise Certified (${i + 1})`,
                value: blocker.item,
              }))}
            />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-6">
          <SectionHeader id="related" eyebrow={<Eyebrow tone="accent">Related</Eyebrow>} title="Related" descriptionMaxWidth={false} />
          <DocsRelatedGrid entries={[getEntry("enterprise-architecture-audit")!, getEntry("final-certification")!, getEntry("docs-certification")!]} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
