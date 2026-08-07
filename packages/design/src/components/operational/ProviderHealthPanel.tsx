import type { ReactNode } from "react";
import { DataGrid } from "./DataGrid";
import type { DataGridColumn } from "./DataGridColumn";
import { HealthIndicator, type HealthStatusValue } from "./HealthIndicator";

export interface ProviderHealthRow {
  id: string;
  name: string;
  status: HealthStatusValue;
  latency?: string;
  uptime?: string;
}

interface ProviderHealthPanelProps {
  providers: ProviderHealthRow[];
  caption: ReactNode;
  className?: string;
}

/**
 * A tabular operational view of every provider's current health — built
 * directly on Operational Data Grid rather than a bespoke table. Distinct
 * from Capabilities' own ProviderCard (an illustration/diagram-canvas card
 * for the Capability Library's provider diagrams, a different family and a
 * different presentation): this is the dashboard/ops-review shape, not a
 * diagram node.
 */
export function ProviderHealthPanel({ providers, caption, className }: ProviderHealthPanelProps) {
  const columns: DataGridColumn<ProviderHealthRow>[] = [
    { id: "name", header: "Provider", accessor: (row) => row.name },
    { id: "status", header: "Status", accessor: (row) => <HealthIndicator value={row.status} /> },
    { id: "latency", header: "Latency", accessor: (row): ReactNode => row.latency ?? "—", nowrap: true },
    { id: "uptime", header: "Uptime", accessor: (row): ReactNode => row.uptime ?? "—", nowrap: true },
  ];

  return <DataGrid caption={caption} columns={columns} rows={providers} getRowId={(row) => row.id} className={className} />;
}
