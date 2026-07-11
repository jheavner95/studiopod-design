"use client";

import { Card, Body, Badge, Button } from "@/components/ui";
import {
  PublishingWorkspace,
  PublishingHeader,
  PublishingTargets,
  PublishingProviders,
  PublishingQueue,
  PublishingHistory,
  PublishingValidationPanel,
  PublishingMetrics,
  PublishingSummary,
  PublishingInspector,
  PublishingActions,
} from "@/components/platform/publishing";
import { WorkflowFooter } from "@/components/workflow";
import type { DataGridColumn } from "@/components/operational";
import type { ProviderHealthRow } from "@/components/operational";
import type { QueueRowJob } from "@/components/operational";
import type { StateHistoryEntry } from "@/components/workflow";

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

interface PublishTarget {
  id: string;
  name: string;
  type: string;
  status: "Draft" | "Ready" | "Published" | "Failed";
  lastPublished: string;
}

const TARGETS: PublishTarget[] = [
  { id: "1", name: "Studio website", type: "Website", status: "Published", lastPublished: "2 hours ago" },
  { id: "2", name: "App store listing", type: "App Store", status: "Ready", lastPublished: "—" },
  { id: "3", name: "Marketplace feed", type: "Marketplace", status: "Failed", lastPublished: "1 day ago" },
];

function targetTone(status: PublishTarget["status"]) {
  return status === "Published" ? "success" : status === "Ready" ? "accent" : status === "Failed" ? "error" : "neutral";
}

function PublishingTargetsDemo() {
  const columns: DataGridColumn<PublishTarget>[] = [
    { id: "name", header: "Target", accessor: (row) => row.name },
    { id: "type", header: "Type", accessor: (row) => row.type },
    { id: "lastPublished", header: "Last published", accessor: (row) => row.lastPublished, nowrap: true },
    {
      id: "status",
      header: "Status",
      accessor: (row) => (
        <Badge tone={targetTone(row.status)} size="sm">
          {row.status}
        </Badge>
      ),
    },
  ];
  return (
    <GalleryCard title="Publishing Targets" description="PublishingTargets is Operational's own DataGrid, re-exported — real rows over real columns.">
      <PublishingWorkspace header={<PublishingHeader name="Summer collection" type="Publishing" />}>
        <div className="p-2">
          <PublishingTargets<PublishTarget> columns={columns} rows={TARGETS} getRowId={(row) => row.id} caption="Publishing targets" />
        </div>
      </PublishingWorkspace>
    </GalleryCard>
  );
}

function ProviderManagementDemo() {
  const providers: ProviderHealthRow[] = [
    { id: "1", name: "WordPress", status: "healthy", latency: "120ms", uptime: "99.9%" },
    { id: "2", name: "Shopify", status: "warning", latency: "340ms", uptime: "98.2%" },
    { id: "3", name: "Instagram", status: "critical", latency: "—", uptime: "91.4%" },
  ];
  return (
    <GalleryCard title="Provider Management" description="PublishingProviders is Operational's own ProviderHealthPanel, re-exported — connection health, not a diagram card.">
      <div className="h-full overflow-y-auto p-2">
        <PublishingProviders providers={providers} caption="Publishing providers" />
      </div>
    </GalleryCard>
  );
}

function PublishingQueueDemo() {
  const jobs: QueueRowJob[] = [
    { id: "1", name: "Publish — Summer collection", status: "running", priority: "high", progress: { processed: 2, total: 3 } },
    { id: "2", name: "Publish — Winter preview", status: "queued", priority: "normal" },
    { id: "3", name: "Publish — Clearance feed", status: "blocked", priority: "low" },
  ];
  return (
    <GalleryCard title="Publishing Queue" description="PublishingQueue is Operational's own Queue, re-exported — real job rows, not a mock table.">
      <div className="h-full overflow-y-auto p-2">
        <PublishingQueue title="Publish queue" caption="3 jobs" jobs={jobs} />
      </div>
    </GalleryCard>
  );
}

function PublishingHistoryDemo() {
  const entries: StateHistoryEntry[] = [
    { id: "1", title: "Published to website", actor: "Publish bot", timestamp: "2 hours ago", status: "completed" },
    { id: "2", title: "Validation passed", actor: "QA bot", timestamp: "2 hours ago", status: "completed" },
    { id: "3", title: "Queued for publish", actor: "Studio user", timestamp: "3 hours ago", status: "waiting" },
  ];
  return (
    <GalleryCard title="Publishing History" description="PublishingHistory is State Machine's own StateHistory, re-exported — a chronological record, not the Workflow shell WorkflowTimeline's own name might suggest.">
      <div className="h-full overflow-y-auto p-2">
        <PublishingHistory entries={entries} />
      </div>
    </GalleryCard>
  );
}

function PublishingValidationDemo() {
  return (
    <GalleryCard title="Publishing Validation" description={'PublishingValidationPanel renders whatever ApprovalStateValue the caller supplies — "Published" is downstream of the approved outcome.'}>
      <PublishingWorkspace header={<PublishingHeader name="Summer collection — Pre-publish review" type="Publishing" />}>
        <div className="flex flex-col gap-4 p-2">
          <PublishingValidationPanel title="Format gate" status="approved" reason="All assets meet channel spec." actor="QA bot" timestamp="10 min ago" />
          <PublishingValidationPanel title="Content gate" status="in-review" reason="Awaiting copy review." actor="Editor bot" timestamp="5 min ago" />
        </div>
      </PublishingWorkspace>
    </GalleryCard>
  );
}

function PublishingDashboardDemo() {
  return (
    <GalleryCard title="Publishing Dashboard" description="PublishingSummary (overview row) and PublishingMetrics (measured numbers) composed together.">
      <PublishingWorkspace header={<PublishingHeader name="This week's publishing" type="Publishing" />}>
        <div className="flex flex-col gap-4 p-2">
          <PublishingSummary items={[{ value: "34", label: "Published" }, { value: "2", label: "Failed" }]} columns={2} />
          <PublishingMetrics items={[{ value: "96%", label: "Success rate" }, { value: "1.8h", label: "Avg. queue time" }]} columns={2} />
        </div>
      </PublishingWorkspace>
    </GalleryCard>
  );
}

function PublishingReviewDemo() {
  return (
    <GalleryCard title="Publishing Review" description="PublishingInspector showing a single publication's own lifecycle detail.">
      <PublishingInspector
        name="Summer collection"
        type="Publishing"
        status="completed"
        properties={[
          { id: "1", label: "Target", value: "Studio website" },
          { id: "2", label: "Published by", value: "Publish bot" },
        ]}
      />
    </GalleryCard>
  );
}

function CompletedPublishingDemo() {
  return (
    <GalleryCard title="Completed Publishing" description="A publication across its full lifecycle, PublishingActions available in the footer.">
      <PublishingWorkspace
        header={<PublishingHeader name="Spring lookbook" type="Publishing" />}
        footer={
          <WorkflowFooter>
            <PublishingActions>
              <Button variant="secondary" size="sm">
                Archive
              </Button>
            </PublishingActions>
          </WorkflowFooter>
        }
      >
        <div className="flex flex-wrap gap-2 p-2">
          <Badge tone="neutral" size="sm">
            Draft
          </Badge>
          <Badge tone="accent" size="sm">
            Ready
          </Badge>
          <Badge tone="accent" size="sm">
            Queued
          </Badge>
          <Badge tone="warning" size="sm">
            Publishing
          </Badge>
          <Badge tone="success" size="sm">
            Published
          </Badge>
          <Badge tone="neutral" size="sm">
            Archived
          </Badge>
        </div>
      </PublishingWorkspace>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function PublishingPlatformGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <PublishingTargetsDemo />
      <ProviderManagementDemo />
      <PublishingQueueDemo />
      <PublishingHistoryDemo />
      <PublishingValidationDemo />
      <PublishingDashboardDemo />
      <PublishingReviewDemo />
      <CompletedPublishingDemo />
    </div>
  );
}
