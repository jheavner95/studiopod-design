"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Card, Body, Button } from "@/components/ui";
import {
  DashboardGrid,
  DashboardSection,
  MetricCard,
  KPIWidget,
  TrendWidget,
  ChartWidget,
  StatusWidget,
  ActivityWidget,
  QueueWidget,
  HealthWidget,
  RecommendationWidget,
  type QueueRowJob,
  type JobTimelineEntry,
} from "@/components/operational";

function GalleryCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">{title}</span>
      <Body size="sm" muted>
        {description}
      </Body>
      <div className="rounded-lg border border-border-subtle p-4">{children}</div>
    </Card>
  );
}

function RefreshAction({ onRefresh }: { onRefresh: () => void }) {
  return (
    <Button variant="secondary" size="sm" onClick={onRefresh}>
      <RefreshCw className="size-3.5" aria-hidden />
      Refresh
    </Button>
  );
}

function ExecutiveDashboardDemo() {
  const [loading, setLoading] = useState(false);

  function refresh() {
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  }

  return (
    <GalleryCard title="Executive Dashboard" description="A refreshable overview section — click Refresh to see the loading/refreshing state live.">
      <DashboardSection title="Company overview" description="Last 30 days" actions={<RefreshAction onRefresh={refresh} />} loading={loading} loadingLabel="Refreshing overview…">
        <DashboardGrid minWidgetWidth="220px">
          <MetricCard value="$482K" label="Commerce revenue" trendValue="+12.4%" trendDirection="up" />
          <MetricCard value="428" label="Active print jobs" trendValue="+2.1%" trendDirection="up" />
          <MetricCard value="1.8%" label="Needs Validation rate" trendValue="-0.3%" trendDirection="down" />
          <MetricCard value="94" label="Provider health score" trendValue="flat" trendDirection="flat" />
        </DashboardGrid>
      </DashboardSection>
    </GalleryCard>
  );
}

function ProductionDashboardDemo() {
  return (
    <GalleryCard title="Production Dashboard" description="HealthWidget's compact score-plus-issues form, paired with a throughput metric.">
      <DashboardSection title="Production health">
        <DashboardGrid minWidgetWidth="240px">
          <HealthWidget
            title="Style pipeline"
            score={82}
            metrics={[
              { value: "12", label: "Jobs today" },
              { value: "2", label: "Blocked" },
            ]}
            issues={[{ id: "1", title: "Recipe validation slow", detail: "Averaging 4.2s, up from 2.1s", severity: "warning" }]}
          />
          <MetricCard value="96%" label="Pass rate" description="Last 500 validations" trendValue="+1.2%" trendDirection="up" />
        </DashboardGrid>
      </DashboardSection>
    </GalleryCard>
  );
}

const PUBLISHING_JOBS: QueueRowJob[] = [
  { id: "1", name: "Publish Trailhead mug wrap", status: "running", priority: "high", progress: { processed: 6, total: 10 } },
  { id: "2", name: "Publish Studio Tee — Black / M", status: "queued", priority: "normal" },
  { id: "3", name: "Publish Poster proof #118", status: "completed", priority: "low" },
];

function PublishingDashboardDemo() {
  return (
    <GalleryCard title="Publishing Dashboard" description="QueueWidget's bounded tile form — a limit and a view-all link, not an unbounded queue table.">
      <DashboardSection title="Publishing">
        <QueueWidget title="Publishing queue" caption="Publishing queue" jobs={PUBLISHING_JOBS} limit={2} viewAllHref="/application-components/queue-jobs" />
      </DashboardSection>
    </GalleryCard>
  );
}

function CommerceDashboardDemo() {
  return (
    <GalleryCard title="Commerce Dashboard" description="KPIWidget grouping related metrics, next to a ChartWidget breakdown by channel.">
      <DashboardSection title="Commerce">
        <DashboardGrid minWidgetWidth="260px">
          <KPIWidget
            title="Orders"
            columns={2}
            items={[
              { value: "1,204", label: "Orders", trendValue: "+8%", trendDirection: "up" },
              { value: "$61.20", label: "Avg. order value", trendValue: "-1%", trendDirection: "down" },
            ]}
          />
          <ChartWidget
            title="Revenue by channel"
            data={[
              { label: "Storefront", value: 42 },
              { label: "Etsy", value: 28 },
              { label: "Wholesale", value: 16 },
            ]}
            valueFormatter={(value) => `${value}K`}
          />
        </DashboardGrid>
      </DashboardSection>
    </GalleryCard>
  );
}

function OperationsDashboardDemo() {
  return (
    <GalleryCard title="Operations Dashboard" description="StatusWidget's multi-service list next to RecommendationWidget's stacked suggestions.">
      <DashboardSection title="Operations">
        <DashboardGrid minWidgetWidth="240px">
          <StatusWidget
            title="Services"
            items={[
              { id: "1", label: "Ingest API", status: "healthy" },
              { id: "2", label: "Render workers", status: "syncing" },
              { id: "3", label: "Storage sync", status: "warning" },
            ]}
          />
          <RecommendationWidget
            title="Recommendations"
            recommendations={[{ id: "1", title: "Rotate storage sync credential", detail: "Expires in 4 days — renew before it blocks writes." }]}
          />
        </DashboardGrid>
      </DashboardSection>
    </GalleryCard>
  );
}

function HealthDashboardDemo() {
  return (
    <GalleryCard title="Health Dashboard" description="HealthWidget's full form — score, metrics, and issues together in one tile.">
      <DashboardSection title="Platform health">
        <HealthWidget
          title="StudioPOD platform"
          score={58}
          metrics={[
            { value: "3", label: "Open incidents" },
            { value: "99.2%", label: "Uptime (30d)" },
          ]}
          issues={[
            { id: "1", title: "Elevated API latency", detail: "p95 at 840ms, above the 500ms target", severity: "critical" },
            { id: "2", title: "Queue backlog growing", detail: "Publishing queue up 40% since yesterday", severity: "warning" },
          ]}
        />
      </DashboardSection>
    </GalleryCard>
  );
}

const TIMELINE_ENTRIES: JobTimelineEntry[] = [
  { id: "1", description: "Catalog refresh completed", actor: "System", timestamp: "10:05" },
  { id: "2", description: "Publish Sunset ridge tee — front print started", actor: "System", timestamp: "10:03" },
  { id: "3", description: "Batch run #204 queued", actor: "System", timestamp: "10:01" },
];

function QueueDashboardDemo() {
  return (
    <GalleryCard title="Queue Dashboard" description="QueueWidget and ActivityWidget together — what's running now, and what just happened.">
      <DashboardSection title="Queue activity">
        <DashboardGrid minWidgetWidth="260px">
          <QueueWidget title="Active jobs" caption="Active jobs" jobs={PUBLISHING_JOBS} limit={3} />
          <ActivityWidget title="Recent activity" entries={TIMELINE_ENTRIES} />
        </DashboardGrid>
      </DashboardSection>
    </GalleryCard>
  );
}

function AnalyticsDashboardDemo() {
  return (
    <GalleryCard title="Analytics Dashboard" description="TrendWidget's sparkline paired with a ChartWidget breakdown — the two chart-shaped widgets side by side.">
      <DashboardSection title="Analytics">
        <DashboardGrid minWidgetWidth="240px">
          <TrendWidget title="Daily active users" value="8,412" series={[6100, 6400, 6900, 6700, 7300, 7800, 8412]} trendValue="+38%" trendDirection="up" />
          <ChartWidget
            title="Sessions by surface"
            data={[
              { label: "Web", value: 62 },
              { label: "Desktop", value: 24 },
              { label: "API", value: 14 },
            ]}
            valueFormatter={(value) => `${value}%`}
          />
        </DashboardGrid>
      </DashboardSection>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real widget props — not a static screenshot. */
export function DashboardWidgetsGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ExecutiveDashboardDemo />
      <ProductionDashboardDemo />
      <PublishingDashboardDemo />
      <CommerceDashboardDemo />
      <OperationsDashboardDemo />
      <HealthDashboardDemo />
      <QueueDashboardDemo />
      <AnalyticsDashboardDemo />
    </div>
  );
}
