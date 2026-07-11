"use client";

import { Card, Body, Badge, Button } from "@/components/ui";
import {
  IntelligenceWorkspace,
  IntelligenceHeader,
  IntelligenceRecommendations,
  IntelligenceOpportunities,
  IntelligenceHealth,
  IntelligenceDiagnostics,
  IntelligenceInsights,
  IntelligenceInspector,
  IntelligenceMetrics,
  IntelligenceSummary,
  IntelligenceActions,
} from "@/components/platform/intelligence";
import { WorkflowFooter } from "@/components/workflow";
import type { DataGridColumn, RecommendationEntry, HealthIssueEntry } from "@/components/operational";

function GalleryCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">{title}</span>
      <Body size="sm" muted>
        {description}
      </Body>
      <div className="h-[440px] overflow-hidden rounded-lg border border-border-subtle">{children}</div>
    </Card>
  );
}

function RecommendationCenterDemo() {
  const recommendations: RecommendationEntry[] = [
    { id: "1", title: "Reduce Warehouse A backlog", detail: "8 units below reorder threshold for 3 SKUs — consider a restock run.", action: <Button variant="secondary" size="sm">Review</Button> },
    { id: "2", title: "Retry failed catalog sync", detail: "Studio Tote Bag failed to sync 1 hour ago — a retry usually resolves this.", action: <Button variant="secondary" size="sm">Retry</Button> },
  ];
  return (
    <GalleryCard title="Recommendation Center" description="IntelligenceRecommendations is Dashboard Widget System's own RecommendationWidget, re-exported — real entries, not a mock list.">
      <div className="h-full overflow-y-auto p-2">
        <IntelligenceRecommendations title="Suggested next steps" recommendations={recommendations} />
      </div>
    </GalleryCard>
  );
}

interface OpportunityRow {
  id: string;
  name: string;
  impact: string;
  effort: string;
  score: number;
}

const OPPORTUNITY_ROWS: OpportunityRow[] = [
  { id: "1", name: "Bundle Studio Tee + Tote", impact: "High", effort: "Low", score: 92 },
  { id: "2", name: "Expand marketplace listing", impact: "Medium", effort: "Medium", score: 68 },
  { id: "3", name: "Automate low-stock reorder", impact: "High", effort: "High", score: 74 },
];

function OpportunityDiscoveryDemo() {
  const columns: DataGridColumn<OpportunityRow>[] = [
    { id: "name", header: "Opportunity", accessor: (row) => row.name },
    { id: "impact", header: "Impact", accessor: (row) => row.impact },
    { id: "effort", header: "Effort", accessor: (row) => row.effort },
    { id: "score", header: "Score", accessor: (row) => String(row.score), align: "right", nowrap: true },
  ];
  return (
    <GalleryCard title="Opportunity Discovery" description="IntelligenceOpportunities is Operational's own DataGrid, re-exported — real rows over real columns.">
      <div className="h-full overflow-y-auto p-2">
        <IntelligenceOpportunities<OpportunityRow> columns={columns} rows={OPPORTUNITY_ROWS} getRowId={(row) => row.id} caption="Scored opportunities" />
      </div>
    </GalleryCard>
  );
}

function HealthDashboardDemo() {
  const issues: HealthIssueEntry[] = [{ id: "1", title: "Catalog sync lagging", detail: "Last successful sync was 3 hours ago.", severity: "warning" }];
  return (
    <GalleryCard title="Health Dashboard" description="IntelligenceHealth is Status & Health System's own HealthPanel, re-exported — a full inspector-shell composition.">
      <IntelligenceHealth
        name="Studio commerce system"
        type="Intelligence"
        status="warning"
        score={78}
        metrics={[{ value: "3", label: "Active warnings" }, { value: "99.1%", label: "Uptime" }]}
        issues={issues}
      />
    </GalleryCard>
  );
}

function DiagnosticsDemo() {
  const issues: HealthIssueEntry[] = [
    { id: "1", title: "Provider connection degraded", detail: "Shopify latency exceeds 300ms threshold.", severity: "warning" },
    { id: "2", title: "Inventory sync failed", detail: "Warehouse B feed returned an error 1 hour ago.", severity: "critical" },
    { id: "3", title: "No pricing conflicts detected", severity: "info" },
  ];
  return (
    <GalleryCard title="Diagnostics" description="IntelligenceDiagnostics is Status & Health System's own HealthIssueList, re-exported — one row per identified issue.">
      <div className="h-full overflow-y-auto p-2">
        <IntelligenceDiagnostics issues={issues} />
      </div>
    </GalleryCard>
  );
}

function InsightReviewDemo() {
  return (
    <GalleryCard title="Insight Review" description="IntelligenceInsights is Dashboard Widget System's own ChartWidget, re-exported — a real chart over real data.">
      <div className="h-full overflow-y-auto p-2">
        <IntelligenceInsights
          title="Orders by channel"
          description="Last 7 days"
          data={[
            { label: "Website", value: 34 },
            { label: "Marketplace", value: 18 },
            { label: "App", value: 9 },
          ]}
        />
      </div>
    </GalleryCard>
  );
}

function IntelligenceDashboardDemo() {
  return (
    <GalleryCard title="Intelligence Dashboard" description="IntelligenceSummary (overview row) and IntelligenceMetrics (measured numbers) composed together.">
      <IntelligenceWorkspace header={<IntelligenceHeader name="This week's intelligence" type="Intelligence" />}>
        <div className="flex flex-col gap-4 p-2">
          <IntelligenceSummary items={[{ value: "12", label: "Recommendations" }, { value: "2", label: "Critical issues" }]} columns={2} />
          <IntelligenceMetrics items={[{ value: "78", label: "Avg. health score" }, { value: "4.1h", label: "Avg. resolution time" }]} columns={2} />
        </div>
      </IntelligenceWorkspace>
    </GalleryCard>
  );
}

function DecisionSupportDemo() {
  return (
    <GalleryCard title="Decision Support" description="IntelligenceInspector's own children slot holds real recommendation content alongside the analysis' own lifecycle detail.">
      <IntelligenceInspector
        name="Restock decision — TEE-BLK-001"
        type="Intelligence"
        status="active"
        properties={[
          { id: "1", label: "Current stock", value: "8 units" },
          { id: "2", label: "Reorder threshold", value: "20 units" },
        ]}
      >
        <IntelligenceRecommendations
          title="Recommended action"
          recommendations={[{ id: "1", title: "Reorder 100 units", detail: "Based on the last 30 days of sell-through.", action: <Button variant="primary" size="sm">Approve</Button> }]}
        />
      </IntelligenceInspector>
    </GalleryCard>
  );
}

function CompletedAnalysisDemo() {
  return (
    <GalleryCard title="Completed Analysis" description="An analysis across its full lifecycle, IntelligenceActions available in the footer.">
      <IntelligenceWorkspace
        header={<IntelligenceHeader name="Q3 catalog health review" type="Intelligence" />}
        footer={
          <WorkflowFooter>
            <IntelligenceActions>
              <Button variant="secondary" size="sm">
                Archive
              </Button>
            </IntelligenceActions>
          </WorkflowFooter>
        }
      >
        <div className="flex flex-wrap gap-2 p-2">
          <Badge tone="neutral" size="sm">
            Idle
          </Badge>
          <Badge tone="accent" size="sm">
            Analyzing
          </Badge>
          <Badge tone="accent" size="sm">
            Ready
          </Badge>
          <Badge tone="success" size="sm">
            Completed
          </Badge>
          <Badge tone="neutral" size="sm">
            Archived
          </Badge>
        </div>
      </IntelligenceWorkspace>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function IntelligencePlatformGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <RecommendationCenterDemo />
      <OpportunityDiscoveryDemo />
      <HealthDashboardDemo />
      <DiagnosticsDemo />
      <InsightReviewDemo />
      <IntelligenceDashboardDemo />
      <DecisionSupportDemo />
      <CompletedAnalysisDemo />
    </div>
  );
}
