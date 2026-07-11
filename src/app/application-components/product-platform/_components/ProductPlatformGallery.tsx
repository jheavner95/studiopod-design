"use client";

import { useState } from "react";
import { Shirt } from "lucide-react";
import { Card, Body, Badge, Button } from "@/components/ui";
import {
  ProductWorkspace,
  ProductHeader,
  ProductLibrary,
  ProductInspector,
  ProductCatalog,
  ProductVariantPanel,
  ProductProviderMappings,
  ProductValidationPanel,
  ProductMetrics,
  ProductSummary,
  ProductActions,
} from "@/components/platform/product";
import { WorkflowFooter, RelationshipNode, RelationshipEdge } from "@/components/workflow";
import { InspectorHeader, PropertyRow, PropertySelect } from "@/components/operational";
import type { AssetViewMode, DataGridColumn } from "@/components/operational";

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

interface Product {
  id: string;
  name: string;
  sku: string;
  price: string;
  status: "Draft" | "Ready" | "Published" | "Archived";
}

const PRODUCTS: Product[] = [
  { id: "1", name: "Studio Tee — Black", sku: "TEE-BLK-001", price: "$28.00", status: "Published" },
  { id: "2", name: "Studio Tee — White", sku: "TEE-WHT-001", price: "$28.00", status: "Ready" },
  { id: "3", name: "Studio Hoodie", sku: "HOO-GRY-001", price: "$54.00", status: "Draft" },
];

function statusTone(status: Product["status"]) {
  return status === "Published" ? "success" : status === "Ready" ? "accent" : "neutral";
}

function ProductLibraryDemo() {
  const [viewMode, setViewMode] = useState<AssetViewMode>("grid");
  return (
    <GalleryCard title="Product Library" description="ProductLibrary is Operational's own AssetBrowser, re-exported — real search/filter/grid-list toggle, not a mock browser.">
      <ProductWorkspace header={<ProductHeader name="Product library" type="Product" />}>
        <div className="p-2">
          <ProductLibrary<Product>
            rows={PRODUCTS}
            render={{
              getId: (row) => row.id,
              getName: (row) => row.name,
              getSecondary: (row) => [row.sku],
              getThumbnailFallbackIcon: () => <Shirt className="size-4" aria-hidden />,
              getStatus: (row) => (
                <Badge tone={statusTone(row.status)} size="sm">
                  {row.status}
                </Badge>
              ),
            }}
            caption="Product library"
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
      </ProductWorkspace>
    </GalleryCard>
  );
}

function CatalogManagementDemo() {
  const columns: DataGridColumn<Product>[] = [
    { id: "name", header: "Name", accessor: (row) => row.name },
    { id: "sku", header: "SKU", accessor: (row) => row.sku },
    { id: "price", header: "Price", accessor: (row) => row.price, align: "right" },
    {
      id: "status",
      header: "Status",
      accessor: (row) => (
        <Badge tone={statusTone(row.status)} size="sm">
          {row.status}
        </Badge>
      ),
    },
  ];
  return (
    <GalleryCard title="Catalog Management" description="ProductCatalog is Operational's own DataGrid, re-exported — sortable columns over real rows.">
      <div className="h-full overflow-y-auto p-2">
        <ProductCatalog<Product> columns={columns} rows={PRODUCTS} getRowId={(row) => row.id} caption="Product catalog" />
      </div>
    </GalleryCard>
  );
}

function VariantManagementDemo() {
  const [size, setSize] = useState("m");
  const [color, setColor] = useState("black");
  return (
    <GalleryCard title="Variant Management" description="ProductVariantPanel is Operational's own PropertyPanel, re-exported — real controlled selects, not a mock form.">
      <ProductVariantPanel header={<InspectorHeader name="Studio Tee" type="Variants" />}>
        <PropertyRow
          editor={
            <PropertySelect
              label="Size"
              value={size}
              onChange={setSize}
              options={[
                { value: "s", label: "Small" },
                { value: "m", label: "Medium" },
                { value: "l", label: "Large" },
              ]}
            />
          }
        />
        <PropertyRow
          editor={
            <PropertySelect
              label="Color"
              value={color}
              onChange={setColor}
              options={[
                { value: "black", label: "Black" },
                { value: "white", label: "White" },
              ]}
            />
          }
        />
        <PropertyRow label="SKU" value={`TEE-${color.slice(0, 3).toUpperCase()}-${size.toUpperCase()}`} />
      </ProductVariantPanel>
    </GalleryCard>
  );
}

function ProviderMappingDemo() {
  return (
    <GalleryCard title="Provider Mapping" description="ProductProviderMappings is Dependency & Relationship Views' own RelationshipView — a peer mapping, not a strict dependency.">
      <ProductProviderMappings header={<ProductHeader name="Studio Tee — Providers" type="Product" />}>
        <div className="flex flex-col gap-1 p-2">
          <RelationshipNode label="Studio Tee — Black" status="connected" />
          <RelationshipEdge orientation="vertical" direction="bidirectional" status="complete" />
          <RelationshipNode label="Printify" status="healthy" />
          <RelationshipEdge orientation="vertical" direction="bidirectional" status="complete" />
          <RelationshipNode label="Gelato" status="warning" />
        </div>
      </ProductProviderMappings>
    </GalleryCard>
  );
}

function ProductValidationDemo() {
  return (
    <GalleryCard title="Product Validation" description={'ProductValidationPanel renders whatever ApprovalStateValue the caller supplies — "Validated" is the approved outcome.'}>
      <ProductWorkspace header={<ProductHeader name="Studio Tee — Listing review" type="Product" />}>
        <div className="flex flex-col gap-4 p-2">
          <ProductValidationPanel title="Image quality gate" status="approved" reason="All images meet the 2000px minimum." actor="QA bot" timestamp="3 min ago" />
          <ProductValidationPanel title="Pricing gate" status="pending" reason="Awaiting margin review." actor="Pricing bot" timestamp="1 min ago" />
        </div>
      </ProductWorkspace>
    </GalleryCard>
  );
}

function ProductDashboardDemo() {
  return (
    <GalleryCard title="Product Dashboard" description="ProductSummary (overview row) and ProductMetrics (measured numbers) composed together.">
      <ProductWorkspace header={<ProductHeader name="This week's catalog" type="Product" />}>
        <div className="flex flex-col gap-4 p-2">
          <ProductSummary items={[{ value: "128", label: "Products live" }, { value: "6", label: "In review" }]} columns={2} />
          <ProductMetrics items={[{ value: "97%", label: "Listing quality" }, { value: "4.1d", label: "Avg. time to publish" }]} columns={2} />
        </div>
      </ProductWorkspace>
    </GalleryCard>
  );
}

function ProductReviewDemo() {
  return (
    <GalleryCard title="Product Review" description="ProductInspector showing a single product's own lifecycle detail.">
      <ProductInspector
        name="Studio Tee — Black"
        type="Product"
        status="completed"
        properties={[
          { id: "1", label: "SKU", value: "TEE-BLK-001" },
          { id: "2", label: "Validated by", value: "QA bot" },
        ]}
      />
    </GalleryCard>
  );
}

function CompletedProductDemo() {
  return (
    <GalleryCard title="Completed Product" description="A product record across its full publish lifecycle, ProductActions available in the footer.">
      <ProductWorkspace
        header={<ProductHeader name="Studio Tote Bag" type="Product" />}
        footer={
          <WorkflowFooter>
            <ProductActions>
              <Button variant="secondary" size="sm">
                Retire
              </Button>
            </ProductActions>
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
          <Badge tone="success" size="sm">
            Published
          </Badge>
          <Badge tone="neutral" size="sm">
            Archived
          </Badge>
          <Badge tone="error" size="sm">
            Retired
          </Badge>
        </div>
      </ProductWorkspace>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function ProductPlatformGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ProductLibraryDemo />
      <CatalogManagementDemo />
      <VariantManagementDemo />
      <ProviderMappingDemo />
      <ProductValidationDemo />
      <ProductDashboardDemo />
      <ProductReviewDemo />
      <CompletedProductDemo />
    </div>
  );
}
