"use client";

import { useState } from "react";
import { Database, ShoppingCart, Radio } from "lucide-react";
import { Card, Body, Button } from "@/components/ui";
import { StatGroup } from "@/components/metadata";
import {
  HealthPanel,
  HealthScore,
  HealthIndicator,
  StatusSummary,
  StatusTimeline,
  HealthIssueList,
  HealthRecommendation,
  SyncStatusPanel,
  ProviderHealthPanel,
  OperationalAlertPanel,
  type SyncSource,
  type OperationalAlertEntry,
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

function PlatformHealthDemo() {
  return (
    <GalleryCard title="Platform Health" description="The full HealthPanel composition — score, metrics, issues, and a recommendation.">
      <HealthPanel
        icon={<Database className="size-4" />}
        name="Production Platform"
        type="Platform"
        status="warning"
        score={72}
        metrics={[
          { value: "1,204", label: "Jobs completed" },
          { value: "18", label: "Queue depth" },
          { value: "3", label: "Errors (24h)" },
        ]}
        issues={[
          { id: "1", title: "Elevated error rate", detail: "3 failed jobs in the last hour, up from a baseline of 0-1.", severity: "warning" },
        ]}
        recommendations={<HealthRecommendation title="Review recent job failures">Check the error log for the 3 failed jobs — they share the same provider timeout.</HealthRecommendation>}
      />
    </GalleryCard>
  );
}

function PublishingHealthDemo() {
  return (
    <GalleryCard title="Publishing Health" description="A publishing queue's own health, with a clean issue list.">
      <HealthPanel
        icon={<Radio className="size-4" />}
        name="Publishing Queue"
        type="Queue"
        status="healthy"
        score={96}
        metrics={[
          { value: "412", label: "Published today" },
          { value: "0", label: "Failed" },
        ]}
        issues={[]}
      />
    </GalleryCard>
  );
}

function CommerceHealthDemo() {
  return (
    <GalleryCard title="Commerce Health" description="An orders pipeline in a critical state, with two active issues.">
      <HealthPanel
        icon={<ShoppingCart className="size-4" />}
        name="Commerce Orders"
        type="Pipeline"
        status="critical"
        score={38}
        metrics={[
          { value: "89", label: "Orders stuck" },
          { value: "12m", label: "Avg. delay" },
        ]}
        issues={[
          { id: "1", title: "Payment provider timeout", detail: "Orders are stuck at the payment-confirmation step.", severity: "critical" },
          { id: "2", title: "Inventory sync lagging", detail: "Stock levels are 12 minutes behind the source of truth.", severity: "warning" },
        ]}
      />
    </GalleryCard>
  );
}

function ProviderHealthDemo() {
  return (
    <GalleryCard title="Provider Health" description="Every provider's current health in a table — built directly on Operational Data Grid.">
      <ProviderHealthPanel
        caption="Provider health"
        providers={[
          { id: "1", name: "Stripe", status: "healthy", latency: "82ms", uptime: "99.98%" },
          { id: "2", name: "Shopify", status: "warning", latency: "340ms", uptime: "99.2%" },
          { id: "3", name: "Meta Ads", status: "critical", latency: "—", uptime: "94.1%" },
          { id: "4", name: "Klaviyo", status: "healthy", latency: "110ms", uptime: "99.95%" },
        ]}
      />
    </GalleryCard>
  );
}

function SyncStatusDemo() {
  const [sources, setSources] = useState<SyncSource[]>([
    { id: "1", name: "Google Merchant Center", status: "healthy", lastSynced: "2 minutes ago" },
    { id: "2", name: "Instagram Shop", status: "syncing", progress: 0.45 },
    { id: "3", name: "Amazon Marketplace", status: "paused" },
  ]);

  return (
    <GalleryCard title="Sync Status" description="&quot;Last synced at X&quot; per data source — click Instagram Shop's row-advancing button to see the progress move.">
      <div className="flex flex-col gap-3">
        <SyncStatusPanel sources={sources} />
        <div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              setSources((prev) =>
                prev.map((source) =>
                  source.id === "2"
                    ? source.progress !== undefined && source.progress < 1
                      ? { ...source, progress: Math.min(1, source.progress + 0.25) }
                      : { ...source, status: "healthy", lastSynced: "just now", progress: undefined }
                    : source,
                ),
              )
            }
          >
            Advance sync
          </Button>
        </div>
      </div>
    </GalleryCard>
  );
}

function ValidationHealthDemo() {
  return (
    <GalleryCard title="Validation Health" description="A compact status summary paired with the issues behind it.">
      <div className="flex flex-col gap-3">
        <StatusSummary items={[{ label: "3 passed", tone: "success" }, { label: "1 warning", tone: "warning" }, { label: "1 failed", tone: "error" }]} />
        <HealthIssueList
          issues={[
            { id: "1", title: "Missing alt text", detail: "2 images are missing accessible alt text.", severity: "warning" },
            { id: "2", title: "Broken destination link", detail: "The primary CTA links to a 404.", severity: "critical" },
          ]}
        />
      </div>
    </GalleryCard>
  );
}

function OperationalDashboardDemo() {
  const alerts: OperationalAlertEntry[] = [
    { id: "1", tone: "warning", title: "Elevated queue depth", message: "Publishing queue depth is 3x its usual baseline." },
  ];

  return (
    <GalleryCard title="Operational Dashboard" description="Score, a metric grid, and active alerts together — the broad-overview shape.">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <HealthScore score={84} />
          <StatGroup
            columns={2}
            items={[
              { value: "12", label: "Active platforms" },
              { value: "2", label: "Degraded" },
            ]}
          />
        </div>
        <OperationalAlertPanel alerts={alerts} />
      </div>
    </GalleryCard>
  );
}

function IncidentViewDemo() {
  return (
    <GalleryCard title="Incident View" description="A status timeline of what happened, paired with the currently active alert.">
      <div className="flex flex-col gap-4">
        <OperationalAlertPanel
          alerts={[{ id: "1", tone: "error", title: "Payment provider outage", message: "Stripe webhooks have been failing since 14:02." }]}
        />
        <StatusTimeline
          entries={[
            { id: "1", description: "Alert triggered — payment provider outage", actor: "System", timestamp: "14:02", icon: <HealthIndicator value="critical" /> },
            { id: "2", description: "On-call engineer acknowledged", actor: "J. Rivera", timestamp: "14:05" },
            { id: "3", description: "Escalated to provider status page", actor: "System", timestamp: "14:10" },
          ]}
        />
      </div>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each with real state and real interaction — not a static screenshot. */
export function StatusHealthGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <PlatformHealthDemo />
      <PublishingHealthDemo />
      <CommerceHealthDemo />
      <ProviderHealthDemo />
      <SyncStatusDemo />
      <ValidationHealthDemo />
      <OperationalDashboardDemo />
      <IncidentViewDemo />
    </div>
  );
}
