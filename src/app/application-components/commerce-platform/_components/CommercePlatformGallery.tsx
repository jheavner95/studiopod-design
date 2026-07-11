"use client";

import { useState } from "react";
import { Card, Body, Badge, Button } from "@/components/ui";
import {
  CommerceWorkspace,
  CommerceHeader,
  CommerceCatalog,
  CommerceOrders,
  CommerceInventory,
  CommerceFulfillment,
  CommercePricing,
  CommerceInspector,
  CommerceMetrics,
  CommerceSummary,
  CommerceActions,
} from "@/components/platform/commerce";
import { WorkflowFooter, WorkflowStep } from "@/components/workflow";
import { InspectorHeader, PropertyRow, PropertyNumber } from "@/components/operational";
import type { DataGridColumn } from "@/components/operational";

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

interface CatalogRow {
  id: string;
  name: string;
  sku: string;
  status: "Ready" | "Syncing" | "Failed";
  lastSynced: string;
}

const CATALOG_ROWS: CatalogRow[] = [
  { id: "1", name: "Studio Tee — Black", sku: "TEE-BLK-001", status: "Ready", lastSynced: "2 min ago" },
  { id: "2", name: "Studio Hoodie", sku: "HOO-GRY-001", status: "Syncing", lastSynced: "syncing now" },
  { id: "3", name: "Studio Tote Bag", sku: "TOT-NAT-001", status: "Failed", lastSynced: "1 hour ago" },
];

function catalogTone(status: CatalogRow["status"]) {
  return status === "Ready" ? "success" : status === "Syncing" ? "accent" : "error";
}

function CatalogSyncDemo() {
  const columns: DataGridColumn<CatalogRow>[] = [
    { id: "name", header: "Product", accessor: (row) => row.name },
    { id: "sku", header: "SKU", accessor: (row) => row.sku },
    { id: "lastSynced", header: "Last synced", accessor: (row) => row.lastSynced, nowrap: true },
    {
      id: "status",
      header: "Status",
      accessor: (row) => (
        <Badge tone={catalogTone(row.status)} size="sm">
          {row.status}
        </Badge>
      ),
    },
  ];
  return (
    <GalleryCard title="Catalog Sync" description="CommerceCatalog is Operational's own DataGrid, re-exported — real rows over real columns.">
      <CommerceWorkspace header={<CommerceHeader name="Studio catalog" type="Commerce" />}>
        <div className="p-2">
          <CommerceCatalog<CatalogRow> columns={columns} rows={CATALOG_ROWS} getRowId={(row) => row.id} caption="Synced catalog" />
        </div>
      </CommerceWorkspace>
    </GalleryCard>
  );
}

interface OrderRow {
  id: string;
  orderNumber: string;
  customer: string;
  total: string;
  status: "Processing" | "Completed" | "Cancelled";
}

const ORDER_ROWS: OrderRow[] = [
  { id: "1", orderNumber: "#10231", customer: "A. Rivera", total: "$56.00", status: "Processing" },
  { id: "2", orderNumber: "#10230", customer: "J. Chen", total: "$28.00", status: "Completed" },
  { id: "3", orderNumber: "#10229", customer: "M. Osei", total: "$82.00", status: "Cancelled" },
];

function orderTone(status: OrderRow["status"]) {
  return status === "Completed" ? "success" : status === "Processing" ? "accent" : "error";
}

function OrderManagementDemo() {
  const columns: DataGridColumn<OrderRow>[] = [
    { id: "orderNumber", header: "Order", accessor: (row) => row.orderNumber, nowrap: true },
    { id: "customer", header: "Customer", accessor: (row) => row.customer },
    { id: "total", header: "Total", accessor: (row) => row.total, align: "right" },
    {
      id: "status",
      header: "Status",
      accessor: (row) => (
        <Badge tone={orderTone(row.status)} size="sm">
          {row.status}
        </Badge>
      ),
    },
  ];
  return (
    <GalleryCard title="Order Management" description="CommerceOrders is Operational's own DataGrid, re-exported — structured transactional records, not a job queue.">
      <div className="h-full overflow-y-auto p-2">
        <CommerceOrders<OrderRow> columns={columns} rows={ORDER_ROWS} getRowId={(row) => row.id} caption="Recent orders" />
      </div>
    </GalleryCard>
  );
}

interface InventoryRow {
  id: string;
  sku: string;
  location: string;
  quantity: number;
}

const INVENTORY_ROWS: InventoryRow[] = [
  { id: "1", sku: "TEE-BLK-001", location: "Warehouse A", quantity: 142 },
  { id: "2", sku: "HOO-GRY-001", location: "Warehouse A", quantity: 8 },
  { id: "3", sku: "TOT-NAT-001", location: "Warehouse B", quantity: 0 },
];

function InventoryManagementDemo() {
  const columns: DataGridColumn<InventoryRow>[] = [
    { id: "sku", header: "SKU", accessor: (row) => row.sku },
    { id: "location", header: "Location", accessor: (row) => row.location },
    { id: "quantity", header: "Quantity", accessor: (row) => String(row.quantity), align: "right", nowrap: true },
  ];
  return (
    <GalleryCard title="Inventory Management" description="CommerceInventory is Operational's own DataGrid, re-exported — per-SKU stock levels over real columns.">
      <div className="h-full overflow-y-auto p-2">
        <CommerceInventory<InventoryRow> columns={columns} rows={INVENTORY_ROWS} getRowId={(row) => row.id} caption="Stock levels" />
      </div>
    </GalleryCard>
  );
}

function FulfillmentDemo() {
  return (
    <GalleryCard title="Fulfillment" description="CommerceFulfillment composes Pipeline Components' own PipelineStage — the caller arranges stage content, the shell doesn't.">
      <CommerceWorkspace header={<CommerceHeader name="Order #10231" type="Commerce" />}>
        <div className="flex flex-col gap-3 p-2">
          <CommerceFulfillment title="Picked" status="completed">
            <WorkflowStep label="Items picked from Warehouse A" status="completed" />
          </CommerceFulfillment>
          <CommerceFulfillment title="Packed" status="running">
            <WorkflowStep label="Packing in progress" status="running" />
          </CommerceFulfillment>
          <CommerceFulfillment title="Shipped" status="not-started">
            <WorkflowStep label="Awaiting carrier pickup" status="not-started" />
          </CommerceFulfillment>
        </div>
      </CommerceWorkspace>
    </GalleryCard>
  );
}

function PricingDemo() {
  const [basePrice, setBasePrice] = useState(28);
  const [salePrice, setSalePrice] = useState(22);
  return (
    <GalleryCard title="Pricing" description="CommercePricing is Operational's own PropertyPanel, re-exported — real controlled fields, not a mock form.">
      <CommercePricing header={<InspectorHeader name="Studio Tee — Black" type="Pricing" />}>
        <PropertyRow editor={<PropertyNumber label="Base price (USD)" value={basePrice} onChange={setBasePrice} min={0} step={1} />} />
        <PropertyRow editor={<PropertyNumber label="Sale price (USD)" value={salePrice} onChange={setSalePrice} min={0} step={1} />} />
        <PropertyRow label="Margin" value={`$${(basePrice - salePrice).toFixed(2)} below base`} />
      </CommercePricing>
    </GalleryCard>
  );
}

function CommerceDashboardDemo() {
  return (
    <GalleryCard title="Commerce Dashboard" description="CommerceSummary (overview row) and CommerceMetrics (measured numbers) composed together.">
      <CommerceWorkspace header={<CommerceHeader name="This week's commerce" type="Commerce" />}>
        <div className="flex flex-col gap-4 p-2">
          <CommerceSummary items={[{ value: "58", label: "Orders" }, { value: "3", label: "Cancelled" }]} columns={2} />
          <CommerceMetrics items={[{ value: "$3,240", label: "Revenue" }, { value: "1.2d", label: "Avg. fulfillment time" }]} columns={2} />
        </div>
      </CommerceWorkspace>
    </GalleryCard>
  );
}

function CommerceReviewDemo() {
  return (
    <GalleryCard title="Commerce Review" description="CommerceInspector showing a single order's own lifecycle detail.">
      <CommerceInspector
        name="Order #10230"
        type="Commerce"
        status="completed"
        properties={[
          { id: "1", label: "Customer", value: "J. Chen" },
          { id: "2", label: "Fulfilled by", value: "Warehouse A" },
        ]}
      />
    </GalleryCard>
  );
}

function CompletedCommerceDemo() {
  return (
    <GalleryCard title="Completed Commerce" description="A commerce record across its full lifecycle, CommerceActions available in the footer.">
      <CommerceWorkspace
        header={<CommerceHeader name="Order #10230" type="Commerce" />}
        footer={
          <WorkflowFooter>
            <CommerceActions>
              <Button variant="secondary" size="sm">
                Archive
              </Button>
            </CommerceActions>
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
            Syncing
          </Badge>
          <Badge tone="warning" size="sm">
            Processing
          </Badge>
          <Badge tone="success" size="sm">
            Completed
          </Badge>
          <Badge tone="neutral" size="sm">
            Archived
          </Badge>
        </div>
      </CommerceWorkspace>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function CommercePlatformGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <CatalogSyncDemo />
      <OrderManagementDemo />
      <InventoryManagementDemo />
      <FulfillmentDemo />
      <PricingDemo />
      <CommerceDashboardDemo />
      <CommerceReviewDemo />
      <CompletedCommerceDemo />
    </div>
  );
}
