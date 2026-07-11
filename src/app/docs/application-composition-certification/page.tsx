import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow, Heading } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { StatusWidget, MetricCard, HealthWidget } from "@/components/operational";
import { REVIEWED_PACKAGES, VERIFY_DIMENSIONS, type VerifyVerdict } from "./_data/review";
import { LAYER_CHECKS, LAYERING_NOTE } from "./_data/layering-review";
import { BUSINESS_FEATURE_CHECKS } from "./_data/business-feature-review";
import { TEMPLATE_COMPLIANCE, TEMPLATE_DEVIATIONS } from "./_data/template-review";
import { ACCESSIBILITY_STRENGTHS, ACCESSIBILITY_GAPS } from "./_data/accessibility";
import { DEPENDENCY_FINDINGS } from "./_data/dependency-review";
import { RESOLVED, DEFERRED, REJECTED, PROMOTION_METHODOLOGY_NOTE } from "./_data/promotion-review";
import { READINESS_ASSESSMENT } from "./_data/readiness";
import { CERTIFICATION_LEVELS, CERTIFICATION_DECISION, CERTIFICATION_JUSTIFICATION, REMAINING_BLOCKERS } from "./_data/certification";
import { APPLICATION_COMPOSITION_ROADMAP } from "./_data/roadmap";
import { DS5_WORK_PACKAGES, EXECUTIVE_SUMMARY_STRENGTHS, EXECUTIVE_SUMMARY_WEAKNESSES, DS5_COMPLETION_SUMMARY } from "./_data/executive-summary";

const entry = getEntry("application-composition-certification")!;

const VERIFY_TONE: Record<VerifyVerdict, "success" | "warning" | "error"> = {
  Pass: "success",
  Partial: "warning",
  Fail: "error",
};

const READINESS_TONE: Record<string, "success" | "warning" | "error"> = {
  Ready: "success",
  "Mostly ready": "warning",
  "Not ready": "error",
};

const decisionLevel = CERTIFICATION_LEVELS.find((l) => l.id === CERTIFICATION_DECISION)!;
const passCount = VERIFY_DIMENSIONS.filter((d) => d.verdict === "Pass").length;

export default function ApplicationCompositionCertificationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="review"
            eyebrow={<Eyebrow tone="accent">Review</Eyebrow>}
            title="Four packages, one real Business Feature"
            description="Every DS-5 package independently re-audited against its own actual source for this certification, rather than trusting each package's own report."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {REVIEWED_PACKAGES.map((pkg) => (
              <Card key={pkg.code} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Link href={pkg.href} className="focus-ring flex items-center gap-1 text-body-md font-medium text-ink-primary hover:text-accent-400">
                    {pkg.code} — {pkg.title}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </Link>
                </div>
                <Body size="sm" muted>
                  {pkg.summary}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="verify"
            eyebrow={<Eyebrow tone="accent">Verify</Eyebrow>}
            title={`Eighteen dimensions, ${passCount} of ${VERIFY_DIMENSIONS.length} Pass`}
            description="Every dimension this package's own work order names, checked against the pilot's real source and the four architecture packages' own cross-references — not each package's own claims about itself."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {VERIFY_DIMENSIONS.map((dim) => (
              <Card key={dim.dimension} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{dim.dimension}</span>
                  <Badge tone={VERIFY_TONE[dim.verdict]} size="sm">
                    {dim.verdict}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {dim.finding}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="layering-review"
            eyebrow={<Eyebrow tone="accent">Layering review</Eyebrow>}
            title="Foundation → Operational → Workflow → Platform → Business Feature → Application"
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
            id="business-feature-review"
            eyebrow={<Eyebrow tone="accent">Business Feature review</Eyebrow>}
            title="Thirteen parts, checked against the pilot's own real files"
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {BUSINESS_FEATURE_CHECKS.map((check) => (
              <Card key={check.part} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
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
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="template-review"
            eyebrow={<Eyebrow tone="accent">Template review</Eyebrow>}
            title="Workspace Feature Template, Business Feature Framework, Application Composition Architecture"
            descriptionMaxWidth={false}
          />
          <DescriptionList items={TEMPLATE_COMPLIANCE.map((c) => ({ label: c.source, value: c.finding }))} />
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Deviations found</span>
            {TEMPLATE_DEVIATIONS.map((d) => (
              <Card key={d.title} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{d.title}</span>
                  <Badge tone="warning" size="sm">
                    Documentation gap
                  </Badge>
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
            id="dependency-review"
            eyebrow={<Eyebrow tone="accent">Dependency review</Eyebrow>}
            title="No reverse imports. No cross-feature imports. No architecture violations."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={DEPENDENCY_FINDINGS.map((f) => ({ label: f.label, value: f.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="promotion-review"
            eyebrow={<Eyebrow tone="accent">Promotion review</Eyebrow>}
            title="Every real finding across DS-5.1–5.4, classified"
            description={PROMOTION_METHODOLOGY_NOTE}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Resolved ({RESOLVED.length})</span>
            {RESOLVED.map((e) => (
              <Card key={e.title} className="flex flex-col gap-1 border-success/30 bg-success-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="min-w-0 break-words text-body-sm font-medium text-ink-primary">{e.title}</span>
                  <Caption className="min-w-0 break-words text-ink-tertiary">{e.system}</Caption>
                </div>
                <Body size="sm" muted>
                  {e.detail}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Deferred ({DEFERRED.length})</span>
            {DEFERRED.map((e) => (
              <Card key={e.title} className="flex flex-col gap-1 border-warning/30 bg-warning-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="min-w-0 break-words text-body-sm font-medium text-ink-primary">{e.title}</span>
                  <Caption className="min-w-0 break-words text-ink-tertiary">{e.system}</Caption>
                </div>
                <Body size="sm" muted>
                  {e.detail}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Rejected ({REJECTED.length})</span>
            {REJECTED.map((e) => (
              <Card key={e.title} className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="min-w-0 break-words text-body-sm font-medium text-ink-primary">{e.title}</span>
                  <Caption className="min-w-0 break-words text-ink-tertiary">{e.system}</Caption>
                </div>
                <Body size="sm" muted>
                  {e.detail}
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
              items={REMAINING_BLOCKERS.map((b) => ({
                label: b.toLevel === "certified" ? "To Certified" : "To Enterprise Certified",
                value: b.item,
              }))}
            />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="roadmap" eyebrow={<Eyebrow tone="accent">Roadmap</Eyebrow>} title="Where DS-5 sits in the larger plan" descriptionMaxWidth={false} />
          <div className="flex flex-col gap-3">
            {APPLICATION_COMPOSITION_ROADMAP.map((stage) => (
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
          <SectionHeader id="executive-summary" eyebrow={<Eyebrow tone="accent">Executive summary</Eyebrow>} title="DS-5 completion summary" descriptionMaxWidth={false} />
          <Body size="md" muted className="max-w-[var(--container-narrow)]">
            {DS5_COMPLETION_SUMMARY}
          </Body>
          <CardGrid columns={3}>
            <StatusWidget
              title="Package readiness"
              items={REVIEWED_PACKAGES.map((pkg) => ({ id: pkg.code, label: pkg.title, status: "healthy" }))}
            />
            <HealthWidget
              title="Verification quality"
              score={Math.round((passCount / VERIFY_DIMENSIONS.length) * 100)}
              metrics={[
                { value: "1", label: "Real Business Feature" },
                { value: "4", label: "DS-5 packages" },
              ]}
            />
            <MetricCard value="2" label="Real defects found and fixed" description="During this certification's own re-audit of DS-5.3 and DS-5.4's browser QA history" />
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
            <span className="text-body-sm font-medium text-ink-primary">Every DS-5 work package</span>
            <DescriptionList items={DS5_WORK_PACKAGES.map((pkg) => ({ label: `${pkg.code} — ${pkg.title}`, value: pkg.oneLiner }))} />
          </div>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
