"use client";

import { Card, Body, Badge, Button } from "@/components/ui";
import {
  IntegrationsWorkspace,
  IntegrationsHeader,
  IntegrationsProviders,
  IntegrationsConnections,
  IntegrationsMappings,
  IntegrationsSync,
  IntegrationsDiagnostics,
  IntegrationsInspector,
  IntegrationsMetrics,
  IntegrationsSummary,
  IntegrationsActions,
} from "@/components/platform/integrations";
import { WorkflowFooter, RelationshipNode, RelationshipEdge } from "@/components/workflow";
import type { DataGridColumn } from "@/components/operational";
import type { ProviderHealthRow } from "@/components/operational";
import type { SyncSource } from "@/components/operational";
import type { HealthIssueEntry } from "@/components/operational";

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

interface ProviderRow {
  id: string;
  name: string;
  category: string;
  authMethod: string;
  status: "Available" | "Connected";
}

const PROVIDER_ROWS: ProviderRow[] = [
  { id: "1", name: "Shopify", category: "Commerce", authMethod: "OAuth 2.0", status: "Connected" },
  { id: "2", name: "Printify", category: "Production", authMethod: "API Key", status: "Connected" },
  { id: "3", name: "Gelato", category: "Production", authMethod: "API Key", status: "Available" },
];

function ProviderRegistryDemo() {
  const columns: DataGridColumn<ProviderRow>[] = [
    { id: "name", header: "Provider", accessor: (row) => row.name },
    { id: "category", header: "Category", accessor: (row) => row.category },
    { id: "authMethod", header: "Auth method", accessor: (row) => row.authMethod, nowrap: true },
    {
      id: "status",
      header: "Status",
      accessor: (row) => (
        <Badge tone={row.status === "Connected" ? "success" : "neutral"} size="sm">
          {row.status}
        </Badge>
      ),
    },
  ];
  return (
    <GalleryCard title="Provider Registry" description="IntegrationsProviders is Operational's own DataGrid, re-exported — heterogeneous, caller-defined columns a browsable registry needs.">
      <IntegrationsWorkspace header={<IntegrationsHeader name="Providers" type="Integrations" />}>
        <div className="p-2">
          <IntegrationsProviders<ProviderRow> columns={columns} rows={PROVIDER_ROWS} getRowId={(row) => row.id} caption="Available providers" />
        </div>
      </IntegrationsWorkspace>
    </GalleryCard>
  );
}

const CONNECTION_ROWS: ProviderHealthRow[] = [
  { id: "1", name: "Shopify", status: "healthy", latency: "82ms", uptime: "99.98%" },
  { id: "2", name: "Printify", status: "warning", latency: "410ms", uptime: "97.2%" },
  { id: "3", name: "Gelato", status: "offline", latency: "—", uptime: "—" },
];

function ConnectionManagementDemo() {
  return (
    <GalleryCard title="Connection Management" description="IntegrationsConnections is Status & Health's own ProviderHealthPanel, re-exported — a uniform per-connection health row.">
      <div className="h-full overflow-y-auto p-2">
        <IntegrationsConnections providers={CONNECTION_ROWS} caption="Connection health" />
      </div>
    </GalleryCard>
  );
}

function FieldMappingsDemo() {
  return (
    <GalleryCard title="Field Mappings" description="IntegrationsMappings is Dependency & Relationship Views' own RelationshipView — a peer mapping, not a strict dependency.">
      <IntegrationsMappings header={<IntegrationsHeader name="Shopify → StudioPOD" type="Integrations" />}>
        <div className="flex flex-col gap-1 p-2">
          <RelationshipNode label="Shopify: customer.email" status="connected" />
          <RelationshipEdge orientation="vertical" direction="bidirectional" status="complete" />
          <RelationshipNode label="StudioPOD: Customer.Email" status="healthy" />
          <RelationshipEdge orientation="vertical" direction="bidirectional" status="complete" />
          <RelationshipNode label="StudioPOD: Customer.MarketingOptIn" status="warning" />
        </div>
      </IntegrationsMappings>
    </GalleryCard>
  );
}

const SYNC_SOURCES: SyncSource[] = [
  { id: "1", name: "Shopify orders", status: "syncing", progress: 0.42 },
  { id: "2", name: "Printify catalog", status: "healthy", lastSynced: "2 minutes ago" },
  { id: "3", name: "Gelato inventory", status: "warning", lastSynced: "3 hours ago" },
];

function SynchronizationMonitorDemo() {
  return (
    <GalleryCard title="Synchronization Monitor" description="IntegrationsSync is Status & Health's own SyncStatusPanel, re-exported — its first real Platform-tier consumer.">
      <div className="h-full overflow-y-auto p-2">
        <IntegrationsSync sources={SYNC_SOURCES} />
      </div>
    </GalleryCard>
  );
}

const DIAGNOSTIC_ISSUES: HealthIssueEntry[] = [
  { id: "1", title: "Gelato connection offline", detail: "Last successful ping 3 hours ago.", severity: "critical" },
  { id: "2", title: "Printify sync latency elevated", detail: "410ms average, above the 200ms threshold.", severity: "warning" },
  { id: "3", title: "Shopify webhook retry scheduled", detail: "1 of 3 retries used.", severity: "info" },
];

function DiagnosticsDemo() {
  return (
    <GalleryCard title="Diagnostics" description="IntegrationsDiagnostics is Status & Health's own HealthIssueList, re-exported — ranked by the caller, not re-sorted.">
      <div className="h-full overflow-y-auto p-2">
        <IntegrationsDiagnostics issues={DIAGNOSTIC_ISSUES} />
      </div>
    </GalleryCard>
  );
}

function IntegrationDashboardDemo() {
  return (
    <GalleryCard title="Integration Dashboard" description="IntegrationsSummary (overview row) and IntegrationsMetrics (measured numbers) composed together.">
      <IntegrationsWorkspace header={<IntegrationsHeader name="This week's integrations" type="Integrations" />}>
        <div className="flex flex-col gap-4 p-2">
          <IntegrationsSummary items={[{ value: "6", label: "Connected providers" }, { value: "1", label: "Needs attention" }]} columns={2} />
          <IntegrationsMetrics items={[{ value: "1.2k", label: "Records synced today" }, { value: "99.1%", label: "Sync success rate" }]} columns={2} />
        </div>
      </IntegrationsWorkspace>
    </GalleryCard>
  );
}

function IntegrationReviewDemo() {
  return (
    <GalleryCard title="Integration Review" description="IntegrationsInspector showing a single connection's own lifecycle detail.">
      <IntegrationsInspector
        name="Shopify"
        type="Integrations"
        status="active"
        properties={[
          { id: "1", label: "Auth method", value: "OAuth 2.0" },
          { id: "2", label: "Connected", value: "8 months ago" },
        ]}
      />
    </GalleryCard>
  );
}

function CompletedIntegrationDemo() {
  return (
    <GalleryCard title="Completed Integration" description="A connection across its full lifecycle, IntegrationsActions available in the footer.">
      <IntegrationsWorkspace
        header={<IntegrationsHeader name="Gelato" type="Integrations" />}
        footer={
          <WorkflowFooter>
            <IntegrationsActions>
              <Button variant="secondary" size="sm">
                Disconnect
              </Button>
            </IntegrationsActions>
          </WorkflowFooter>
        }
      >
        <div className="flex flex-wrap gap-2 p-2">
          <Badge tone="neutral" size="sm">
            Disconnected
          </Badge>
          <Badge tone="accent" size="sm">
            Connecting
          </Badge>
          <Badge tone="success" size="sm">
            Connected
          </Badge>
          <Badge tone="accent" size="sm">
            Syncing
          </Badge>
          <Badge tone="success" size="sm">
            Healthy
          </Badge>
          <Badge tone="warning" size="sm">
            Warning
          </Badge>
          <Badge tone="error" size="sm">
            Failed
          </Badge>
          <Badge tone="neutral" size="sm">
            Archived
          </Badge>
        </div>
      </IntegrationsWorkspace>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function IntegrationsPlatformGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ProviderRegistryDemo />
      <ConnectionManagementDemo />
      <FieldMappingsDemo />
      <SynchronizationMonitorDemo />
      <DiagnosticsDemo />
      <IntegrationDashboardDemo />
      <IntegrationReviewDemo />
      <CompletedIntegrationDemo />
    </div>
  );
}
