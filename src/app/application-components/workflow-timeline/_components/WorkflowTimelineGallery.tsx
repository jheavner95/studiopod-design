"use client";

import { useState } from "react";
import { Card, Body, Button } from "@/components/ui";
import {
  WorkflowTimeline,
  WorkflowTimelineHeader,
  WorkflowTimelineGroup,
  WorkflowTimelineEvent,
  WorkflowTimelineConnector,
  WorkflowTimelineFilters,
  WorkflowTimelineSummary,
  WorkflowTimelineLegend,
  WorkflowTimelineFooter,
  type WorkflowTimelineEventStatus,
  type WorkflowTimelineFilterValue,
} from "@/components/workflow";

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

function connectorFor(status: WorkflowTimelineEventStatus) {
  return status === "completed" ? "complete" : status === "running" ? "active" : "pending";
}

function ProductionTimelineDemo() {
  const events: { title: string; status: WorkflowTimelineEventStatus; timestamp: string }[] = [
    { title: "Build started", status: "completed", timestamp: "9:02 AM" },
    { title: "Unit tests", status: "completed", timestamp: "9:06 AM" },
    { title: "Integration tests", status: "running", timestamp: "9:11 AM" },
    { title: "Deploy to staging", status: "pending", timestamp: "—" },
  ];

  return (
    <GalleryCard title="Production Timeline" description="A pipeline's own execution history — one event per stage, source-tagged Production.">
      <WorkflowTimeline header={<WorkflowTimelineHeader name="Spring lookbook build" type="Production" />}>
        <WorkflowTimelineGroup title="Today">
          {events.map((event, index) => (
            <div key={event.title}>
              <WorkflowTimelineEvent title={event.title} status={event.status} timestamp={event.timestamp} source="Production" />
              {index < events.length - 1 ? <WorkflowTimelineConnector status={connectorFor(event.status)} /> : null}
            </div>
          ))}
        </WorkflowTimelineGroup>
      </WorkflowTimeline>
    </GalleryCard>
  );
}

function PublishingTimelineDemo() {
  const events: { title: string; status: WorkflowTimelineEventStatus; timestamp: string }[] = [
    { title: "Draft created", status: "completed", timestamp: "Mon 2:10 PM" },
    { title: "Editorial review", status: "completed", timestamp: "Tue 10:45 AM" },
    { title: "Scheduled", status: "waiting", timestamp: "Fri 8:00 AM" },
    { title: "Published", status: "pending", timestamp: "—" },
  ];

  return (
    <GalleryCard title="Publishing Timeline" description="Header, Legend, and event history composed together.">
      <WorkflowTimeline header={<WorkflowTimelineHeader name="Spring lookbook launch" type="Publishing" />}>
        <div className="flex flex-col gap-4">
          <WorkflowTimelineLegend statuses={["completed", "waiting", "pending"]} />
          <WorkflowTimelineGroup title="This week">
            {events.map((event, index) => (
              <div key={event.title}>
                <WorkflowTimelineEvent title={event.title} status={event.status} timestamp={event.timestamp} source="Publishing" />
                {index < events.length - 1 ? <WorkflowTimelineConnector status={connectorFor(event.status)} /> : null}
              </div>
            ))}
          </WorkflowTimelineGroup>
        </div>
      </WorkflowTimeline>
    </GalleryCard>
  );
}

function ApprovalTimelineDemo() {
  const [financeApproved, setFinanceApproved] = useState(false);

  const events: { title: string; description?: string; actor: string; status: WorkflowTimelineEventStatus; timestamp: string }[] = [
    { title: "Discount request submitted", actor: "Jane", status: "completed", timestamp: "Mon 9:00 AM" },
    { title: "Manager approval", actor: "Sam", status: "completed", timestamp: "Mon 11:20 AM" },
    {
      title: "Finance approval",
      description: financeApproved ? undefined : "Awaiting sign-off",
      actor: "Alex",
      status: financeApproved ? "completed" : "waiting",
      timestamp: financeApproved ? "Tue 9:15 AM" : "—",
    },
  ];

  return (
    <GalleryCard title="Approval Timeline" description="A real decision gates the last event — click Approve in the footer.">
      <WorkflowTimeline
        header={<WorkflowTimelineHeader name="Discount request" type="Commerce" />}
        footer={
          financeApproved ? undefined : (
            <WorkflowTimelineFooter>
              <Button size="sm" onClick={() => setFinanceApproved(true)}>
                Approve
              </Button>
            </WorkflowTimelineFooter>
          )
        }
      >
        <WorkflowTimelineGroup title="Approval chain">
          {events.map((event, index) => (
            <div key={event.title}>
              <WorkflowTimelineEvent title={event.title} description={event.description} actor={event.actor} status={event.status} timestamp={event.timestamp} />
              {index < events.length - 1 ? <WorkflowTimelineConnector status={connectorFor(event.status)} /> : null}
            </div>
          ))}
        </WorkflowTimelineGroup>
      </WorkflowTimeline>
    </GalleryCard>
  );
}

function JobTimelineDemo() {
  const events: { title: string; status: WorkflowTimelineEventStatus; timestamp: string }[] = [
    { title: "Job queued", status: "completed", timestamp: "10:00:01 AM" },
    { title: "Started", status: "completed", timestamp: "10:00:03 AM" },
    { title: "Processing 4,200 rows", status: "running", timestamp: "10:00:04 AM" },
    { title: "Completed", status: "pending", timestamp: "—" },
  ];

  return (
    <GalleryCard title="Job Timeline" description="One background job's own execution history — the same shape Queue & Job's JobTimeline already covers, richer here with per-event markers and connectors.">
      <WorkflowTimeline header={<WorkflowTimelineHeader name="Export orders.csv" type="Automation" />}>
        <WorkflowTimelineGroup title="Run #4821">
          {events.map((event, index) => (
            <div key={event.title}>
              <WorkflowTimelineEvent title={event.title} status={event.status} timestamp={event.timestamp} />
              {index < events.length - 1 ? <WorkflowTimelineConnector status={connectorFor(event.status)} /> : null}
            </div>
          ))}
        </WorkflowTimelineGroup>
      </WorkflowTimeline>
    </GalleryCard>
  );
}

const ACTIVITY_EVENTS: { id: string; title: string; status: WorkflowTimelineEventStatus; timestamp: string; source: string }[] = [
  { id: "1", title: "Asset uploaded", status: "completed", timestamp: "2 min ago", source: "Production" },
  { id: "2", title: "Sync retrying", status: "waiting", timestamp: "6 min ago", source: "Commerce" },
  { id: "3", title: "Health check failed", status: "failed", timestamp: "14 min ago", source: "Operations" },
  { id: "4", title: "Newsletter queued", status: "pending", timestamp: "20 min ago", source: "Publishing" },
];

function ActivityTimelineDemo() {
  const [filter, setFilter] = useState<WorkflowTimelineFilterValue>("all");
  const visible = filter === "all" ? ACTIVITY_EVENTS : ACTIVITY_EVENTS.filter((event) => event.status === filter);

  return (
    <GalleryCard title="Activity Timeline" description="Filters are wired to real state — try narrowing to Failed or Waiting.">
      <WorkflowTimeline
        header={
          <WorkflowTimelineHeader name="Recent activity" type="Operations">
            <WorkflowTimelineFilters value={filter} onChange={setFilter} options={["all", "completed", "waiting", "failed"]} />
          </WorkflowTimelineHeader>
        }
      >
        <WorkflowTimelineGroup title={`Showing ${visible.length} of ${ACTIVITY_EVENTS.length}`}>
          {visible.map((event, index) => (
            <div key={event.id}>
              <WorkflowTimelineEvent title={event.title} status={event.status} timestamp={event.timestamp} source={event.source} />
              {index < visible.length - 1 ? <WorkflowTimelineConnector status={connectorFor(event.status)} /> : null}
            </div>
          ))}
        </WorkflowTimelineGroup>
      </WorkflowTimeline>
    </GalleryCard>
  );
}

function AuditTimelineDemo() {
  return (
    <GalleryCard title="Audit Timeline" description="Cross-domain events grouped by day, with a Summary of totals.">
      <WorkflowTimeline header={<WorkflowTimelineHeader name="Compliance trail" type="Audit" />}>
        <div className="flex flex-col gap-4">
          <WorkflowTimelineSummary items={[{ value: "12", label: "Events" }, { value: "3", label: "Domains" }]} columns={2} />
          <WorkflowTimelineGroup title="March 4, 2026">
            <WorkflowTimelineEvent title="Pricing rule changed" actor="Priya" status="completed" timestamp="4:12 PM" source="Commerce" />
            <WorkflowTimelineConnector status="complete" />
            <WorkflowTimelineEvent title="Provider credentials rotated" actor="System" status="completed" timestamp="6:30 PM" source="Operations" />
          </WorkflowTimelineGroup>
        </div>
      </WorkflowTimeline>
    </GalleryCard>
  );
}

function GroupedTimelineDemo() {
  return (
    <GalleryCard title="Grouped Timeline" description="Two WorkflowTimelineGroup sections — Today and Yesterday.">
      <WorkflowTimeline header={<WorkflowTimelineHeader name="Store setup" type="Commerce" />}>
        <div className="flex flex-col gap-4">
          <WorkflowTimelineGroup title="Today">
            <WorkflowTimelineEvent title="Payment methods connected" status="completed" timestamp="11:00 AM" />
            <WorkflowTimelineConnector status="complete" />
            <WorkflowTimelineEvent title="Tax settings" status="running" timestamp="11:15 AM" />
          </WorkflowTimelineGroup>
          <WorkflowTimelineGroup title="Yesterday">
            <WorkflowTimelineEvent title="Store details saved" status="completed" timestamp="3:40 PM" />
            <WorkflowTimelineConnector status="complete" />
            <WorkflowTimelineEvent title="Business type selected" status="completed" timestamp="3:22 PM" />
          </WorkflowTimelineGroup>
        </div>
      </WorkflowTimeline>
    </GalleryCard>
  );
}

function ReadOnlyTimelineDemo() {
  return (
    <GalleryCard title="Read-only Timeline" description="No onClick on any event and no footer — every WorkflowTimelineEvent renders as a plain, non-interactive row.">
      <WorkflowTimeline header={<WorkflowTimelineHeader name="Order #10236 (archived)" type="Commerce" />}>
        <WorkflowTimelineGroup title="History">
          <WorkflowTimelineEvent title="Order placed" status="completed" timestamp="Jan 4" />
          <WorkflowTimelineConnector status="complete" />
          <WorkflowTimelineEvent title="Payment failed" status="failed" timestamp="Jan 4" />
          <WorkflowTimelineConnector status="pending" />
          <WorkflowTimelineEvent title="Order cancelled" status="cancelled" timestamp="Jan 5" />
        </WorkflowTimelineGroup>
      </WorkflowTimeline>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function WorkflowTimelineGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ProductionTimelineDemo />
      <PublishingTimelineDemo />
      <ApprovalTimelineDemo />
      <JobTimelineDemo />
      <ActivityTimelineDemo />
      <AuditTimelineDemo />
      <GroupedTimelineDemo />
      <ReadOnlyTimelineDemo />
    </div>
  );
}
