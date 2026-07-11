"use client";

import { Card, Body, Badge, Button } from "@/components/ui";
import {
  OperationsWorkspace,
  OperationsHeader,
  OperationsMonitoring,
  OperationsScheduler,
  OperationsAutomation,
  OperationsHealth,
  OperationsAlerts,
  OperationsInspector,
  OperationsMetrics,
  OperationsSummary,
  OperationsActions,
} from "@/components/platform/operations";
import { WorkflowFooter, WorkflowStep } from "@/components/workflow";
import type { ProviderHealthRow, QueueRowJob, HealthIssueEntry, OperationalAlertEntry } from "@/components/operational";

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

function SystemMonitoringDemo() {
  const systems: ProviderHealthRow[] = [
    { id: "1", name: "Catalog sync service", status: "healthy", latency: "82ms", uptime: "99.9%" },
    { id: "2", name: "Publish queue worker", status: "warning", latency: "410ms", uptime: "97.4%" },
    { id: "3", name: "Fulfillment tracker", status: "critical", latency: "—", uptime: "88.2%" },
  ];
  return (
    <GalleryCard title="System Monitoring" description="OperationsMonitoring is Status & Health System's own ProviderHealthPanel, re-exported — real rows, not a mock table.">
      <div className="h-full overflow-y-auto p-2">
        <OperationsMonitoring providers={systems} caption="Monitored systems" />
      </div>
    </GalleryCard>
  );
}

function AutomationDashboardDemo() {
  return (
    <GalleryCard title="Automation Dashboard" description="OperationsAutomation composes Pipeline Components' own PipelineStage — the caller arranges stage content, the shell doesn't.">
      <OperationsWorkspace header={<OperationsHeader name="Nightly catalog sync" type="Operations" />}>
        <div className="flex flex-col gap-3 p-2">
          <OperationsAutomation title="Fetch source data" status="completed">
            <WorkflowStep label="Pulled 1,204 records" status="completed" />
          </OperationsAutomation>
          <OperationsAutomation title="Validate & transform" status="running">
            <WorkflowStep label="Validating in progress" status="running" />
          </OperationsAutomation>
          <OperationsAutomation title="Publish updates" status="not-started">
            <WorkflowStep label="Awaiting validation" status="not-started" />
          </OperationsAutomation>
        </div>
      </OperationsWorkspace>
    </GalleryCard>
  );
}

function SchedulerDemo() {
  const jobs: QueueRowJob[] = [
    { id: "1", name: "Nightly catalog sync", status: "running", priority: "high", progress: { processed: 640, total: 1204 } },
    { id: "2", name: "Weekly analytics rollup", status: "queued", priority: "normal" },
    { id: "3", name: "Stale session cleanup", status: "blocked", priority: "low" },
  ];
  return (
    <GalleryCard title="Scheduler" description="OperationsScheduler is Operational's own Queue, re-exported — real scheduled jobs, not a mock table.">
      <div className="h-full overflow-y-auto p-2">
        <OperationsScheduler title="Scheduled tasks" caption="3 tasks" jobs={jobs} />
      </div>
    </GalleryCard>
  );
}

function HealthMonitoringDemo() {
  const issues: HealthIssueEntry[] = [{ id: "1", title: "Fulfillment tracker degraded", detail: "Uptime dropped below 90% in the last hour.", severity: "critical" }];
  return (
    <GalleryCard title="Health Monitoring" description="OperationsHealth is Status & Health System's own HealthPanel, re-exported — a full inspector-shell composition.">
      <OperationsHealth
        name="Studio operations system"
        type="Operations"
        status="warning"
        score={71}
        metrics={[{ value: "2", label: "Active warnings" }, { value: "98.4%", label: "Overall uptime" }]}
        issues={issues}
      />
    </GalleryCard>
  );
}

function AlertCenterDemo() {
  const alerts: OperationalAlertEntry[] = [
    { id: "1", tone: "error", title: "Fulfillment tracker unreachable", message: "No response from the fulfillment tracker in 5 minutes.", action: <Button variant="secondary" size="sm">Investigate</Button> },
    { id: "2", tone: "warning", title: "Publish queue backlog growing", message: "Queue depth has doubled in the last hour.", action: <Button variant="secondary" size="sm">Review</Button> },
  ];
  return (
    <GalleryCard title="Alert Center" description="OperationsAlerts is Status & Health System's own OperationalAlertPanel, re-exported — real active alerts, not a mock list.">
      <div className="h-full overflow-y-auto p-2">
        <OperationsAlerts alerts={alerts} />
      </div>
    </GalleryCard>
  );
}

function OperationsDashboardDemo() {
  return (
    <GalleryCard title="Operations Dashboard" description="OperationsSummary (overview row) and OperationsMetrics (measured numbers) composed together.">
      <OperationsWorkspace header={<OperationsHeader name="This week's operations" type="Operations" />}>
        <div className="flex flex-col gap-4 p-2">
          <OperationsSummary items={[{ value: "14", label: "Automations run" }, { value: "3", label: "Active alerts" }]} columns={2} />
          <OperationsMetrics items={[{ value: "98.4%", label: "Overall uptime" }, { value: "12m", label: "Avg. alert resolution" }]} columns={2} />
        </div>
      </OperationsWorkspace>
    </GalleryCard>
  );
}

function OperationsReviewDemo() {
  return (
    <GalleryCard title="Operations Review" description="OperationsInspector showing a single operational item's own lifecycle detail.">
      <OperationsInspector
        name="Nightly catalog sync"
        type="Operations"
        status="completed"
        properties={[
          { id: "1", label: "Records processed", value: "1,204" },
          { id: "2", label: "Run by", value: "Scheduler" },
        ]}
      />
    </GalleryCard>
  );
}

function CompletedOperationsDemo() {
  return (
    <GalleryCard title="Completed Operations" description="An operational item across its full lifecycle, OperationsActions available in the footer.">
      <OperationsWorkspace
        header={<OperationsHeader name="Weekly analytics rollup" type="Operations" />}
        footer={
          <WorkflowFooter>
            <OperationsActions>
              <Button variant="secondary" size="sm">
                Resolve
              </Button>
            </OperationsActions>
          </WorkflowFooter>
        }
      >
        <div className="flex flex-wrap gap-2 p-2">
          <Badge tone="neutral" size="sm">
            Idle
          </Badge>
          <Badge tone="accent" size="sm">
            Running
          </Badge>
          <Badge tone="neutral" size="sm">
            Paused
          </Badge>
          <Badge tone="success" size="sm">
            Healthy
          </Badge>
          <Badge tone="success" size="sm">
            Completed
          </Badge>
        </div>
      </OperationsWorkspace>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function OperationsPlatformGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <SystemMonitoringDemo />
      <AutomationDashboardDemo />
      <SchedulerDemo />
      <HealthMonitoringDemo />
      <AlertCenterDemo />
      <OperationsDashboardDemo />
      <OperationsReviewDemo />
      <CompletedOperationsDemo />
    </div>
  );
}
