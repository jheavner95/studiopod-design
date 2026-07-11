import { SectionShell, CardGrid, Stack, Cluster } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { StatGroup } from "@/components/metadata";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { AuditMatrix, type AuditMatrixColumn } from "./_components/AuditMatrix";
import { BarRow } from "./_components/BarRow";
import { MaturityLadder } from "./_components/MaturityLadder";
import { CompositionDiagram } from "./_components/CompositionDiagram";
import {
  FOUNDATION_LAYER_INVENTORY,
  CATALOG_SUMMARY,
  CATALOG_BY_FAMILY,
  HIGH_PRIORITY_GAPS,
  INVENTORY_NOTE,
} from "./_data/inventory";
import {
  API_CONSISTENCY_MATRIX,
  CONSISTENCY_FINDINGS,
  NORMALIZATION_RECOMMENDATIONS,
  type ConsistencyDimension,
} from "./_data/api-consistency";
import { COMPOSITION_RULES, COMPOSITION_SUMMARY, type ComplianceCheck } from "./_data/composition";
import { DUPLICATION_GROUPS, DUPLICATION_METHODOLOGY_NOTE } from "./_data/duplication";
import { MIGRATION_PLAN } from "./_data/migration-plan";
import { FAMILY_CERTIFICATION, CERTIFICATION_HEADLINE } from "./_data/certification";
import { DESIGN_RULES_REVIEW, RECOMMENDED_ADDITIONS, type RuleReview } from "./_data/design-rules-review";
import { READINESS_ASSESSMENT, READINESS_SUMMARY, type ReadinessRow } from "./_data/readiness";
import { ROADMAP_RECOMMENDATIONS } from "./_data/roadmap";
import {
  STRENGTHS,
  WEAKNESSES,
  TECHNICAL_DEBT,
  MIGRATION_PRIORITIES,
  RECOMMENDED_NEXT_PHASE,
  READINESS_SCORE_DIMENSIONS,
  computeReadinessScore,
  CERTIFICATION_RECOMMENDATION,
} from "./_data/executive-summary";

const STATUS_TONE: Record<string, "success" | "warning" | "neutral"> = {
  Exists: "success",
  Partial: "warning",
  Needed: "neutral",
};

const EFFORT_TONE: Record<string, "success" | "warning" | "accent"> = {
  Low: "success",
  Medium: "warning",
  High: "accent",
};

const BOOLEAN_VERDICT_TONE: Record<string, "success" | "warning" | "error"> = {
  Consistent: "success",
  Inconsistent: "warning",
  Verified: "success",
  "Partially verified": "warning",
  "Not verified": "error",
  Followed: "success",
  "Needs clarification": "warning",
  "Partially resolved": "warning",
  Violated: "error",
  Ready: "success",
  "Partially ready": "warning",
  "Not ready": "error",
};

const SEVERITY_TONE: Record<string, "neutral" | "warning" | "error"> = {
  low: "neutral",
  medium: "warning",
  high: "error",
};

const KIND_TONE: Record<string, "neutral" | "accent" | "warning" | "success"> = {
  "Fix existing data": "neutral",
  "New package": "accent",
  Reprioritize: "warning",
  "New opportunity": "success",
};

const consistencyColumns: AuditMatrixColumn<ConsistencyDimension>[] = [
  { key: "dimension", header: "Dimension", render: (row) => <span className="font-medium text-ink-primary">{row.dimension}</span> },
  { key: "layout", header: "Layout", render: (row) => row.layout },
  { key: "table", header: "Table", render: (row) => row.table },
  { key: "metadata", header: "Metadata", render: (row) => row.metadata },
  { key: "forms", header: "Forms", render: (row) => row.forms },
  {
    key: "verdict",
    header: "Verdict",
    render: (row) => (
      <Badge tone={BOOLEAN_VERDICT_TONE[row.verdict]} size="sm" className="w-fit whitespace-nowrap">
        {row.verdict}
      </Badge>
    ),
  },
];

const compositionColumns: AuditMatrixColumn<ComplianceCheck>[] = [
  { key: "rule", header: "Rule", render: (row) => <span className="font-medium text-ink-primary">{row.rule}</span> },
  {
    key: "verdict",
    header: "Verdict",
    render: (row) => (
      <Badge tone={BOOLEAN_VERDICT_TONE[row.verdict]} size="sm" className="w-fit whitespace-nowrap">
        {row.verdict}
      </Badge>
    ),
  },
  { key: "evidence", header: "Evidence", render: (row) => row.evidence },
];

const designRulesColumns: AuditMatrixColumn<RuleReview>[] = [
  { key: "rule", header: "Rule", render: (row) => <span className="font-medium text-ink-primary">{row.rule}</span> },
  { key: "source", header: "Source", render: (row) => row.source },
  {
    key: "verdict",
    header: "Verdict",
    render: (row) => (
      <Badge tone={BOOLEAN_VERDICT_TONE[row.verdict]} size="sm" className="w-fit whitespace-nowrap">
        {row.verdict}
      </Badge>
    ),
  },
  { key: "detail", header: "Detail", render: (row) => row.detail },
];

const readinessColumns: AuditMatrixColumn<ReadinessRow>[] = [
  { key: "system", header: "System", render: (row) => <span className="font-medium text-ink-primary">{row.system}</span> },
  {
    key: "verdict",
    header: "Verdict",
    render: (row) => (
      <Badge tone={BOOLEAN_VERDICT_TONE[row.verdict]} size="sm" className="w-fit whitespace-nowrap">
        {row.verdict}
      </Badge>
    ),
  },
  { key: "reasoning", header: "Reasoning", render: (row) => row.reasoning },
  {
    key: "blocking",
    header: "Blocking components",
    render: (row) => (
      <Cluster gap="xs">
        {row.blockingComponents.map((component) => (
          <Badge key={component} tone="neutral" size="sm">
            {component}
          </Badge>
        ))}
      </Cluster>
    ),
  },
];

const readinessScore = computeReadinessScore();

const entry = getEntry("foundation-audit")!;

export default function FoundationAuditPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider id="inventory">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="inventory"
            eyebrow={<Eyebrow tone="accent">Section 1 · Inventory</Eyebrow>}
            title="Foundation inventory"
            description="Every figure below is computed live from the Foundation Component Catalog, cross-checked against real directory listings for the four built packages."
            descriptionMaxWidth={false}
          />
          <StatGroup
            columns={3}
            items={[
              { value: CATALOG_SUMMARY.total, label: "Total catalog components" },
              { value: CATALOG_SUMMARY.byStatus.Exists, label: "Exists" },
              { value: CATALOG_SUMMARY.byStatus.Partial, label: "Partial" },
              { value: CATALOG_SUMMARY.byStatus.Needed, label: "Needed" },
              { value: CATALOG_SUMMARY.byMaturity.Certified, label: "Certified" },
              { value: CATALOG_SUMMARY.byMaturity.Locked, label: "Locked" },
            ]}
          />
          <CardGrid columns={2}>
            {FOUNDATION_LAYER_INVENTORY.map((row) => (
              <Card key={row.id} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-body-md font-medium text-ink-primary">{row.family}</span>
                  <Cluster gap="xs">
                    <Badge tone="neutral" size="sm">
                      {row.sourcePath}
                    </Badge>
                    <Badge tone={STATUS_TONE[row.status]} size="sm">
                      {row.status}
                    </Badge>
                  </Cluster>
                </div>
                <Caption className="text-ink-tertiary">
                  {row.fileCount} files · {row.primitiveCount} documented primitives · {row.maturity}
                </Caption>
                <Body size="sm" muted className="border-t border-border-subtle pt-3 break-words">
                  {row.note}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <div className="flex flex-col gap-4">
            <span className="text-body-sm font-medium text-ink-primary">Catalog readiness by family (Exists / total)</span>
            <Stack gap="sm">
              {CATALOG_BY_FAMILY.map((row) => (
                <BarRow key={row.group} label={row.group} value={row.exists} max={row.total} suffix={` / ${row.total} exist`} />
              ))}
            </Stack>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">High-priority gaps ({HIGH_PRIORITY_GAPS.length})</span>
            <Cluster gap="xs">
              {HIGH_PRIORITY_GAPS.map((gap) => (
                <Badge key={gap} tone="warning" size="sm">
                  {gap}
                </Badge>
              ))}
            </Cluster>
          </div>
          <Body size="sm" muted className="break-words">
            {INVENTORY_NOTE}
          </Body>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider id="api-consistency">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="api-consistency"
            eyebrow={<Eyebrow tone="accent">Section 2 · API consistency</Eyebrow>}
            title="API consistency review"
            description="Every public component across all four families, read in full — naming, props, composition, variants, accessibility, state naming, and responsive behavior."
            descriptionMaxWidth={false}
          />
          <AuditMatrix caption="API consistency matrix across the four Foundation Layer families" columns={consistencyColumns} rows={API_CONSISTENCY_MATRIX} rowKey={(row) => row.id} />
          <CardGrid columns={2}>
            {CONSISTENCY_FINDINGS.map((finding) => (
              <Card key={finding.id} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-body-sm font-medium text-ink-primary">{finding.title}</span>
                  <Badge tone={SEVERITY_TONE[finding.severity]} size="sm" className="w-fit shrink-0 whitespace-nowrap">
                    {finding.severity}
                  </Badge>
                </div>
                <Body size="sm" muted className="break-words">
                  {finding.detail}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Normalization recommendations</span>
            <ul className="flex flex-col gap-2">
              {NORMALIZATION_RECOMMENDATIONS.map((item) => (
                <li key={item} className="flex gap-2 break-words text-body-sm text-ink-secondary">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-400" aria-hidden />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider id="composition">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Section 3 · Composition</Eyebrow>}
            title="Composition review"
            description="A dependency read of the whole layer, built from real import grep — not assumed from folder structure."
            descriptionMaxWidth={false}
          />
          <CompositionDiagram />
          <AuditMatrix caption="Composition and behavioral-rule compliance checks" columns={compositionColumns} rows={COMPOSITION_RULES} rowKey={(row) => row.id} />
          <Body size="sm" muted className="break-words">
            {COMPOSITION_SUMMARY}
          </Body>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider id="duplication">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="duplication"
            eyebrow={<Eyebrow tone="accent">Section 4 · Duplication</Eyebrow>}
            title="Duplication review"
            description="Real, grep-verified duplication still present in the codebase, grouped by family — including a re-run of every family's own duplication-tracking findingCommand to check for drift."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {DUPLICATION_GROUPS.map((group) => (
              <Card key={group.id} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-body-md font-medium text-ink-primary">{group.group}</span>
                  <Badge tone={EFFORT_TONE[group.effort]} size="sm" className="w-fit shrink-0 whitespace-nowrap">
                    {group.effort} effort
                  </Badge>
                </div>
                <Caption className="text-ink-tertiary">
                  {group.fileCount} files{group.lineCount ? ` · ${group.lineCount} lines` : ""}
                </Caption>
                <ul className="flex flex-col gap-2 border-t border-border-subtle pt-3">
                  {group.findings.map((finding) => (
                    <li key={finding} className="flex gap-2 break-words text-body-sm text-ink-secondary">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-ink-tertiary" aria-hidden />
                      <span className="min-w-0 break-words">{finding}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </CardGrid>
          <Body size="sm" muted className="break-words">
            {DUPLICATION_METHODOLOGY_NOTE}
          </Body>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider id="migration-plan">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="migration-plan"
            eyebrow={<Eyebrow tone="accent">Section 5 · Migration plan</Eyebrow>}
            title="Migration plan"
            description="The recommended sequence — not a priority ranking by importance, a sequencing by risk and dependency. Each step explains why it sits where it does relative to its neighbors."
            descriptionMaxWidth={false}
          />
          <Stack gap="md">
            {MIGRATION_PLAN.map((step) => (
              <Card key={step.id} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-caption font-medium text-accent-400">
                    {step.order}
                  </span>
                  <span className="text-body-md font-medium text-ink-primary">{step.title}</span>
                  <Badge tone={EFFORT_TONE[step.effort]} size="sm" className="w-fit shrink-0 whitespace-nowrap">
                    {step.effort} effort
                  </Badge>
                  <Badge tone={step.status === "Completed" ? "success" : "neutral"} size="sm" className="w-fit shrink-0 whitespace-nowrap">
                    {step.status}
                  </Badge>
                </div>
                <Caption className="break-words text-ink-tertiary">{step.scope}</Caption>
                <Body size="sm" muted className="border-t border-border-subtle pt-3 break-words">
                  {step.reasoning}
                </Body>
              </Card>
            ))}
          </Stack>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider id="certification">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="certification"
            eyebrow={<Eyebrow tone="accent">Section 6 · Certification</Eyebrow>}
            title="Foundation certification"
            description="Applying the design system's own five-level maturity model to each family. Foundation Table reached Certified first — the first family to do so; the rest remain Production Ready, which is itself a finding, not an oversight, and isn't fabricated to look better."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {FAMILY_CERTIFICATION.map((entry) => (
              <Card key={entry.id} className="flex flex-col gap-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-body-md font-medium text-ink-primary">{entry.family}</span>
                  {entry.adoptionStatus ? (
                    <Badge tone="success" size="sm" className="w-fit shrink-0 whitespace-nowrap">
                      {entry.adoptionStatus}
                    </Badge>
                  ) : null}
                </div>
                <MaturityLadder level={entry.level} />
                <ul className="flex flex-col gap-2 border-t border-border-subtle pt-3">
                  {entry.reasoning.map((line) => (
                    <li key={line} className="flex gap-2 break-words text-body-sm text-ink-secondary">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-ink-tertiary" aria-hidden />
                      <span className="min-w-0 break-words">{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2">
                  <Caption className="text-ink-tertiary">{entry.blockers.length > 0 ? "To reach Certified" : "Certification"}</Caption>
                  {entry.blockers.length > 0 ? (
                    <Cluster gap="xs">
                      {entry.blockers.map((blocker) => (
                        <Badge key={blocker} tone="warning" size="sm">
                          {blocker}
                        </Badge>
                      ))}
                    </Cluster>
                  ) : (
                    <Badge tone="success" size="sm" className="w-fit">
                      No blockers
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </CardGrid>
          <Body size="sm" muted className="break-words">
            {CERTIFICATION_HEADLINE}
          </Body>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider id="design-rules">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="design-rules"
            eyebrow={<Eyebrow tone="accent">Section 7 · Design rules</Eyebrow>}
            title="Design rules review"
            description="Which rules the Foundation Layer actually follows, which it violates today, and which need clarification before more families are built on top of it."
            descriptionMaxWidth={false}
          />
          <AuditMatrix caption="Design rule compliance across the Foundation Layer" columns={designRulesColumns} rows={DESIGN_RULES_REVIEW} rowKey={(row) => row.id} />
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Recommended additions</span>
            <ul className="flex flex-col gap-2">
              {RECOMMENDED_ADDITIONS.map((item) => (
                <li key={item} className="flex gap-2 break-words text-body-sm text-ink-secondary">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-400" aria-hidden />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider id="readiness">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="readiness"
            eyebrow={<Eyebrow tone="accent">Section 8 · Readiness</Eyebrow>}
            title="Readiness assessment"
            description="Whether the Foundation Layer is ready to support each of the six systems planned next."
            descriptionMaxWidth={false}
          />
          <AuditMatrix caption="Readiness of downstream systems, given the current Foundation Layer" columns={readinessColumns} rows={READINESS_ASSESSMENT} rowKey={(row) => row.id} />
          <Body size="sm" muted className="break-words">
            {READINESS_SUMMARY}
          </Body>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider id="roadmap">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="roadmap"
            eyebrow={<Eyebrow tone="accent">Section 9 · Roadmap</Eyebrow>}
            title="Roadmap adjustments"
            description="Recommended changes to the Operational Components roadmap, and the one genuinely new opportunity this audit surfaced — deliberately not padded with unnecessary work."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {ROADMAP_RECOMMENDATIONS.map((rec) => (
              <Card key={rec.id} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-body-sm font-medium text-ink-primary">{rec.title}</span>
                  <Badge tone={KIND_TONE[rec.kind]} size="sm" className="w-fit shrink-0 whitespace-nowrap">
                    {rec.kind}
                  </Badge>
                </div>
                <Body size="sm" muted className="break-words">
                  {rec.detail}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" id="executive-summary">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="executive-summary"
            eyebrow={<Eyebrow tone="accent">Section 10 · Executive summary</Eyebrow>}
            title="Executive summary"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            <Card className="flex flex-col gap-3">
              <span className="text-body-md font-medium text-success">Strengths</span>
              <ul className="flex flex-col gap-2">
                {STRENGTHS.map((item) => (
                  <li key={item} className="flex gap-2 break-words text-body-sm text-ink-secondary">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-success" aria-hidden />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="flex flex-col gap-3">
              <span className="text-body-md font-medium text-warning">Weaknesses</span>
              <ul className="flex flex-col gap-2">
                {WEAKNESSES.map((item) => (
                  <li key={item} className="flex gap-2 break-words text-body-sm text-ink-secondary">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-warning" aria-hidden />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="flex flex-col gap-3">
              <span className="text-body-md font-medium text-ink-primary">Technical debt</span>
              <ul className="flex flex-col gap-2">
                {TECHNICAL_DEBT.map((item) => (
                  <li key={item} className="flex gap-2 break-words text-body-sm text-ink-secondary">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-ink-tertiary" aria-hidden />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="flex flex-col gap-3">
              <span className="text-body-md font-medium text-ink-primary">Migration priorities</span>
              <ul className="flex flex-col gap-2">
                {MIGRATION_PRIORITIES.map((item) => (
                  <li key={item} className="break-words text-body-sm text-ink-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </CardGrid>

          <div className="flex flex-col gap-4">
            <span className="text-body-sm font-medium text-ink-primary">Foundation readiness score</span>
            <div className="flex flex-col gap-6 rounded-lg border border-border-subtle bg-surface p-4 sm:flex-row sm:items-center sm:p-6">
              <div className="flex shrink-0 flex-col items-center gap-1 sm:w-32">
                <span className="text-display-2 font-semibold text-ink-primary">{readinessScore}</span>
                <Caption className="text-ink-tertiary">/ 100</Caption>
              </div>
              <Stack gap="sm" className="w-full">
                {READINESS_SCORE_DIMENSIONS.map((dim) => (
                  <BarRow key={dim.id} label={`${dim.label} (${dim.weight}% weight)`} value={dim.score} max={100} suffix="/100" />
                ))}
              </Stack>
            </div>
          </div>

          <Card className="flex flex-col gap-2 border-accent-500/30 bg-accent-soft/20">
            <span className="text-body-md font-medium text-ink-primary">Recommended next phase</span>
            <Body size="sm" muted className="break-words">
              {RECOMMENDED_NEXT_PHASE}
            </Body>
          </Card>

          <Card className="flex flex-col gap-2 border-accent-500/30 bg-accent-soft/20">
            <span className="text-body-md font-medium text-ink-primary">Final foundation layer certification recommendation</span>
            <Body size="sm" muted className="break-words">
              {CERTIFICATION_RECOMMENDATION}
            </Body>
          </Card>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
