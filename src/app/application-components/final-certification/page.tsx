import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow, Heading } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { StatusWidget, MetricCard, HealthWidget } from "@/components/operational";
import { FinalScorecard } from "./_components/FinalScorecard";
import { CERTIFICATION_SUMMARIES, EXECUTIVE_SUMMARY_STRENGTHS, EXECUTIVE_SUMMARY_WEAKNESSES, CLOSING_NOTE } from "./_data/executive-summary";
import { tallyFinalScorecard } from "./_data/final-scorecard";
import { ARCHITECTURE_HEADLINE, ARCHITECTURE_FINDINGS, ARCHITECTURE_CONFIRMATIONS } from "./_data/architecture-summary";
import { ACCESSIBILITY_HEADLINE, ACCESSIBILITY_RESOLVED, ACCESSIBILITY_REOPENED, ACCESSIBILITY_STILL_OPEN } from "./_data/accessibility-summary";
import { DOCUMENTATION_HEADLINE, DOCUMENTATION_CHECKS, DOCUMENTATION_VERDICT } from "./_data/documentation-summary";
import { DEBT_REGISTER, tallyDebtStatus, DEBT_METHODOLOGY_NOTE, type DebtStatus } from "./_data/technical-debt-register";
import { CERTIFICATION_HISTORY } from "./_data/certification-history";
import { FINAL_VERDICT_NAME, FINAL_VERDICT_DESCRIPTION, FINAL_VERDICT_JUSTIFICATION, STANDING_DISCLOSURES, CLOSING_STATEMENT } from "./_data/final-verdict";

const entry = getEntry("final-certification")!;

const DEBT_STATUS_TONE: Record<DebtStatus, "success" | "warning" | "error"> = {
  Resolved: "success",
  "Substantially resolved": "warning",
  "Still open": "error",
  Unconfirmed: "warning",
};

const scorecardTally = tallyFinalScorecard();
const debtTally = tallyDebtStatus();

export default function FinalCertificationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="executive-summary"
            eyebrow={<Eyebrow tone="accent">Executive summary</Eyebrow>}
            title="Nine certifications, one final record"
            description="This page is the permanent, canonical release record for the StudioPOD Design System — the terminal capstone in a nine-part certification series that began with Workspace Architecture and closes here. It doesn't re-audit every prior claim from scratch; it independently re-verifies the three tiers no subsequent audit had ever re-checked (Workspace, Foundation, Operational), confirms Enterprise Architecture Audit's own structural findings with a second full-repo parse, certifies Documentation Experience for the first time, and consolidates every certification's own open items into one final, terminal Technical Debt Register."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            <StatusWidget
              title="Certification history"
              items={CERTIFICATION_SUMMARIES.map((c) => ({
                id: c.code,
                label: c.title,
                status: "healthy",
              }))}
            />
            <HealthWidget
              title="Final scorecard"
              score={Math.round((scorecardTally.pass / scorecardTally.total) * 100)}
              metrics={[
                { value: `${scorecardTally.pass}/${scorecardTally.total}`, label: "Dimensions passing" },
                { value: `${debtTally.Resolved + debtTally["Substantially resolved"]}/${DEBT_REGISTER.length}`, label: "Debt items resolved" },
              ]}
            />
            <MetricCard value="9" label="Certifications synthesized into this final record" description="Eight prior capstones plus Documentation Experience, certified here for the first time" />
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
          <Card className="flex flex-col gap-2 border-accent-500/30 bg-accent-soft/40">
            <Body size="sm" muted>
              {CLOSING_NOTE}
            </Body>
          </Card>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="final-scorecard"
            eyebrow={<Eyebrow tone="accent">Final scorecard</Eyebrow>}
            title="Eleven dimensions, synthesized from every prior scorecard"
            description="The union of every quality axis tracked anywhere across the nine prior certifications, scored once, system-wide, rather than repeated per tier."
            descriptionMaxWidth={false}
          />
          <FinalScorecard />
          <CardGrid columns={3}>
            <Card className="flex flex-col gap-1">
              <span className="text-heading-4 font-medium text-success">{scorecardTally.pass}</span>
              <Caption className="text-ink-tertiary">Pass</Caption>
            </Card>
            <Card className="flex flex-col gap-1">
              <span className="text-heading-4 font-medium text-warning">{scorecardTally.partial}</span>
              <Caption className="text-ink-tertiary">Partial</Caption>
            </Card>
            <Card className="flex flex-col gap-1">
              <span className="text-heading-4 font-medium text-error">{scorecardTally.fail}</span>
              <Caption className="text-ink-tertiary">Fail</Caption>
            </Card>
          </CardGrid>
          <Body size="sm" muted className="max-w-[var(--container-narrow)]">
            {`${scorecardTally.pass} of ${scorecardTally.total} dimensions Pass cleanly, ${scorecardTally.partial} carry real but bounded, non-structural gaps, and exactly one — adoption & production readiness — is an honest Fail: the single dimension this page cannot certify away by auditing more carefully, because it depends on a production feature shipping, not on documentation accuracy.`}
          </Body>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="architecture-summary"
            eyebrow={<Eyebrow tone="accent">1. Architecture summary</Eyebrow>}
            title="Sound end to end, confirmed twice — plus two new findings in the one tier nobody had re-checked"
            description={ARCHITECTURE_HEADLINE}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">New findings — Workspace Architecture Certification, re-verified for the first time since its original publication</span>
            {ARCHITECTURE_FINDINGS.map((f) => (
              <Card key={f.title} className="flex flex-col gap-2 border-warning/30 bg-warning-soft">
                <span className="text-body-sm font-medium text-ink-primary">{f.title}</span>
                <Caption className="text-ink-tertiary">{f.location}</Caption>
                <Body size="sm" muted>
                  {f.detail}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Confirmed unchanged</span>
            <ul className="flex flex-col gap-2">
              {ARCHITECTURE_CONFIRMATIONS.map((point) => (
                <li key={point.slice(0, 24)} className="text-body-sm text-ink-secondary">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="accessibility-summary"
            eyebrow={<Eyebrow tone="accent">2. Accessibility summary</Eyebrow>}
            title="Two items closed, one reopened at a worse severity than reported"
            description={ACCESSIBILITY_HEADLINE}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Resolved since Enterprise Architecture Audit ({ACCESSIBILITY_RESOLVED.length})</span>
            {ACCESSIBILITY_RESOLVED.map((item) => (
              <Card key={item.title} className="flex flex-col gap-1 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">{item.title}</span>
                <Caption className="text-ink-tertiary">{item.location}</Caption>
                <Body size="sm" muted>
                  {item.detail}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Reopened — a claim two prior certifications trusted without independently re-checking</span>
            {ACCESSIBILITY_REOPENED.map((item) => (
              <Card key={item.title} className="flex flex-col gap-1 border-error/30 bg-error-soft">
                <span className="text-body-sm font-medium text-ink-primary">{item.title}</span>
                <Caption className="text-ink-tertiary">{item.location}</Caption>
                <Body size="sm" muted>
                  {item.detail}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Still open</span>
            {ACCESSIBILITY_STILL_OPEN.map((item) => (
              <Card key={item.title} className="flex flex-col gap-1 border-warning/30 bg-warning-soft">
                <span className="text-body-sm font-medium text-ink-primary">{item.title}</span>
                <Caption className="text-ink-tertiary">{item.location}</Caption>
                <Body size="sm" muted>
                  {item.detail}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="documentation-summary"
            eyebrow={<Eyebrow tone="accent">3. Documentation summary</Eyebrow>}
            title="Documentation Experience, certified for the first time"
            description={DOCUMENTATION_HEADLINE}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {DOCUMENTATION_CHECKS.map((check) => (
              <Card key={check.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{check.label}</span>
                  <Badge tone={check.verdict === "Pass" ? "success" : "neutral"} size="sm">
                    {check.verdict}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {check.result}
                </Body>
              </Card>
            ))}
          </div>
          <Card padding="lg" className="flex flex-col gap-2 border-success/30 bg-success-soft">
            <Body size="sm" muted>
              {DOCUMENTATION_VERDICT}
            </Body>
          </Card>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="technical-debt-register"
            eyebrow={<Eyebrow tone="accent">4. Technical debt register</Eyebrow>}
            title={`${DEBT_REGISTER.length} items — the terminal register`}
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
          <SectionHeader
            id="certification-history"
            eyebrow={<Eyebrow tone="accent">5. Certification history</Eyebrow>}
            title="All nine certifications, in order"
            description="Every capstone that precedes this one, with a link to its own page and a one-line status reflecting this page's own re-verification, not a republish of each page's original verdict."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {CERTIFICATION_HISTORY.map((c) => (
              <Card key={c.code} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Caption className="text-ink-tertiary">{c.code}</Caption>
                  {c.external ? (
                    <Link href={c.href} className="focus-ring flex items-center gap-1 text-body-md font-medium text-ink-primary hover:text-accent-400">
                      {c.title}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  ) : (
                    <a href={c.href} className="focus-ring flex items-center gap-1 text-body-md font-medium text-ink-primary hover:text-accent-400">
                      {c.title}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </a>
                  )}
                </div>
                <Body size="sm" muted>
                  {c.status}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="final-verdict" eyebrow={<Eyebrow tone="accent">Final verdict</Eyebrow>} title="Certification ledger" descriptionMaxWidth={false} />
          <Card padding="lg" className="flex flex-col gap-6 border-accent-500/30 bg-accent-soft/40">
            <div className="flex flex-wrap items-center gap-4">
              <ShieldCheck className="size-6 text-accent-400" aria-hidden />
              <Heading level={3}>{FINAL_VERDICT_NAME}</Heading>
            </div>
            <Body size="sm" muted>
              {FINAL_VERDICT_DESCRIPTION}
            </Body>
            <ul className="flex flex-col gap-3 border-t border-border-subtle pt-4">
              {FINAL_VERDICT_JUSTIFICATION.map((point) => (
                <li key={point.slice(0, 24)} className="text-body-sm text-ink-secondary">
                  {point}
                </li>
              ))}
            </ul>
          </Card>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Standing disclosures — permanent, not deferred to later work</span>
            <DescriptionList items={STANDING_DISCLOSURES.map((item, i) => ({ label: `${i + 1}`, value: item }))} />
          </div>
          <Card className="flex flex-col gap-2">
            <span className="text-body-sm font-medium text-ink-primary">Closing statement</span>
            <Body size="sm" muted>
              {CLOSING_STATEMENT}
            </Body>
          </Card>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-6">
          <SectionHeader id="related" eyebrow={<Eyebrow tone="accent">Related</Eyebrow>} title="Related" descriptionMaxWidth={false} />
          <DocsRelatedGrid entries={[getEntry("docs-certification")!, getEntry("enterprise-architecture-audit")!, getEntry("workspace-certification")!]} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
