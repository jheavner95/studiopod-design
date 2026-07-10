"use client";

import { useEffect, useState } from "react";
import { RotateCw, X, Eye } from "lucide-react";
import { Card, Body } from "@/components/ui";
import {
  Queue,
  QueueFilters,
  QueueStatus,
  JobCard,
  JobProgress,
  JobError,
  JobResults,
  JobRetry,
  BulkActionButton,
  useDataGridSelection,
  type QueueRowJob,
  type QueueFilterValue,
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

const PUBLISHING_JOBS: QueueRowJob[] = [
  { id: "1", name: "Publish hero-banner.png", status: "running", priority: "high", progress: { processed: 6, total: 10 } },
  { id: "2", name: "Publish product-shot-a.jpg", status: "queued", priority: "normal" },
  { id: "3", name: "Publish brand-guidelines.pdf", status: "completed", priority: "low" },
  { id: "4", name: "Publish launch-teaser.mp4", status: "failed", priority: "urgent" },
];

function PublishingQueueDemo() {
  const { selectedIds, setSelectedIds, clear } = useDataGridSelection();

  return (
    <GalleryCard title="Publishing Queue" description="Selectable jobs with a bulk-action bar — check a row to reveal Retry/Cancel.">
      <Queue
        title="Publishing"
        caption="Publishing queue"
        jobs={PUBLISHING_JOBS}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        bulkActions={
          <>
            <BulkActionButton icon={<RotateCw className="size-3.5" />} onClick={clear}>
              Retry
            </BulkActionButton>
            <BulkActionButton icon={<X className="size-3.5" />} destructive onClick={clear}>
              Cancel
            </BulkActionButton>
          </>
        }
      />
    </GalleryCard>
  );
}

const PRODUCTION_JOBS: QueueRowJob[] = [
  { id: "1", name: "Validate style-recipe-04", status: "running", priority: "normal", progress: { processed: 3, total: 8 } },
  { id: "2", name: "Validate style-recipe-05", status: "blocked", priority: "high" },
  { id: "3", name: "Validate style-recipe-06", status: "completed", priority: "normal" },
];

function ProductionQueueDemo() {
  return (
    <GalleryCard title="Production Queue" description="A validation pipeline with a blocked job — priority is visible per row.">
      <Queue title="Production validation" caption="Production queue" jobs={PRODUCTION_JOBS} />
    </GalleryCard>
  );
}

const COMMERCE_JOBS: QueueRowJob[] = [
  { id: "1", name: "Sync order #10234", status: "completed", priority: "normal" },
  { id: "2", name: "Sync order #10235", status: "completed", priority: "normal" },
  { id: "3", name: "Sync order #10236", status: "queued", priority: "high" },
];

function CommerceQueueDemo() {
  return (
    <GalleryCard title="Commerce Queue" description="Per-row actions via JobActions — every row gets a View action.">
      <Queue
        title="Order sync"
        caption="Commerce queue"
        jobs={COMMERCE_JOBS}
        getActions={() => <BulkActionButton icon={<Eye className="size-3.5" />}>View</BulkActionButton>}
      />
    </GalleryCard>
  );
}

function RetryQueueDemo() {
  const [attempts, setAttempts] = useState(1);
  const [status, setStatus] = useState<"failed" | "retrying" | "completed">("failed");

  return (
    <GalleryCard title="Retry Queue" description="JobRetry's own confirmation gate kicks in once attempts get high enough — retry a few times to see it.">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border-subtle p-3">
          <div className="flex flex-col gap-1">
            <span className="text-body-sm font-medium text-ink-primary">Export catalog feed</span>
            <QueueStatus value={status} />
          </div>
          <JobRetry
            attempts={attempts}
            maxAttempts={5}
            confirmAfterAttempts={3}
            onRetry={() => {
              setStatus("retrying");
              setTimeout(() => {
                setAttempts((value) => value + 1);
                setStatus("failed");
              }, 600);
            }}
          />
        </div>
      </div>
    </GalleryCard>
  );
}

const FAILED_JOBS: QueueRowJob[] = [
  { id: "1", name: "Publish social-carousel.png", status: "failed", priority: "high" },
  { id: "2", name: "Publish onboarding-script.pdf", status: "failed", priority: "normal" },
];

function FailedJobsDemo() {
  return (
    <GalleryCard title="Failed Jobs" description="A filtered queue paired with JobError detail for the selected failure.">
      <div className="flex flex-col gap-3">
        <Queue title="Failed" caption="Failed jobs" jobs={FAILED_JOBS} />
        <JobError title="Publish social-carousel.png failed">Provider timeout after 30s — the destination platform didn&rsquo;t respond in time.</JobError>
      </div>
    </GalleryCard>
  );
}

const COMPLETED_JOBS: QueueRowJob[] = [
  { id: "1", name: "Publish hero-banner.png", status: "completed", priority: "normal" },
  { id: "2", name: "Publish brand-guidelines.pdf", status: "completed", priority: "low" },
];

function CompletedJobsDemo() {
  return (
    <GalleryCard title="Completed Jobs" description="A filtered queue paired with JobResults for the most recent success.">
      <div className="flex flex-col gap-3">
        <Queue title="Completed" caption="Completed jobs" jobs={COMPLETED_JOBS} />
        <JobResults success title="Publish hero-banner.png completed">Published to 3 platforms in 4.2s.</JobResults>
      </div>
    </GalleryCard>
  );
}

function LiveQueueDemo() {
  const [processed, setProcessed] = useState(2);
  const total = 10;
  const running = processed < total;

  useEffect(() => {
    if (!running) return;
    const timeout = setTimeout(() => setProcessed((value) => value + 1), 500);
    return () => clearTimeout(timeout);
  }, [running, processed]);

  const jobs: QueueRowJob[] = [
    { id: "1", name: "Batch export — 10 assets", status: running ? "running" : "completed", priority: "normal", progress: { processed, total } },
  ];

  return (
    <GalleryCard title="Live Queue" description="A single job's progress advancing on its own — QueueRow's inline JobProgress updates live.">
      <div className="flex flex-col gap-3">
        <Queue title="Live" caption="Live queue" jobs={jobs} />
        <JobProgress processed={processed} total={total} />
      </div>
    </GalleryCard>
  );
}

function JobDetailDemo() {
  const [filter, setFilter] = useState<QueueFilterValue>("all");
  const timeline: JobTimelineEntry[] = [
    { id: "1", description: "Job queued", actor: "System", timestamp: "10:02" },
    { id: "2", description: "Started running", actor: "System", timestamp: "10:03" },
    { id: "3", description: "Completed successfully", actor: "System", timestamp: "10:05" },
  ];

  return (
    <GalleryCard title="Job Detail" description="JobCard's full composition — status, progress, outcome, and timeline together.">
      <div className="flex flex-col gap-3">
        <QueueFilters value={filter} onChange={setFilter} />
        <JobCard
          name="Publish hero-banner.png"
          type="Publishing job"
          status="completed"
          priority="high"
          outcome={<JobResults success title="Completed">Published to 3 platforms in 4.2s.</JobResults>}
          timeline={timeline}
        />
      </div>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each with real state and real interaction — not a static screenshot. */
export function QueueJobsGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <PublishingQueueDemo />
      <ProductionQueueDemo />
      <CommerceQueueDemo />
      <RetryQueueDemo />
      <FailedJobsDemo />
      <CompletedJobsDemo />
      <LiveQueueDemo />
      <JobDetailDemo />
    </div>
  );
}
