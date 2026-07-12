"use client";

import { useMemo, useState } from "react";
import { Card, Body, Badge, Button } from "@/components/ui";
import {
  DataGrid,
  DataGridToolbar,
  DataGridSearch,
  DataGridFilters,
  DataGridPagination,
  useDataGridSelection,
  type DataGridColumn,
} from "@/components/operational";
import type { SortDirection } from "@/components/table";

interface AssetRow {
  id: string;
  name: string;
  type: string;
  status: "Shipped" | "Queued" | "Archived" | "Printing";
  size: string;
  updatedAt: string;
}

const STATUS_TONE: Record<AssetRow["status"], "success" | "neutral" | "warning" | "accent"> = {
  Shipped: "success",
  Queued: "neutral",
  Archived: "neutral",
  Printing: "accent",
};

/** The render queue — the same canonical products and jobs reused across the documentation, not a generic asset library. */
const ASSETS: AssetRow[] = [
  { id: "a1", name: "Trailhead mug wrap", type: "Drinkware", status: "Printing", size: "24 units", updatedAt: "2h ago" },
  { id: "a2", name: "Studio Tee — Black / M", type: "Apparel", status: "Shipped", size: "48 units", updatedAt: "5m ago" },
  { id: "a3", name: "Sunset ridge tee — front print", type: "Apparel", status: "Queued", size: "12 units", updatedAt: "1d ago" },
  { id: "a4", name: "Poster proof #118", type: "Proof", status: "Shipped", size: "1 unit", updatedAt: "3d ago" },
  { id: "a5", name: "Batch run #204", type: "Batch", status: "Queued", size: "96 units", updatedAt: "6h ago" },
  { id: "a6", name: "Holiday collection", type: "Batch", status: "Shipped", size: "250 units", updatedAt: "1w ago" },
  { id: "a7", name: "Launch campaign", type: "Batch", status: "Archived", size: "60 units", updatedAt: "2mo ago" },
  { id: "a8", name: "Catalog refresh", type: "Batch", status: "Shipped", size: "340 units", updatedAt: "4d ago" },
];

function baseColumns(): DataGridColumn<AssetRow>[] {
  return [
    { id: "name", header: "Name", accessor: (row) => row.name, sticky: true },
    { id: "type", header: "Type", accessor: (row) => row.type },
    { id: "status", header: "Status", accessor: (row) => <Badge tone={STATUS_TONE[row.status]} size="sm">{row.status}</Badge> },
    { id: "size", header: "Qty", accessor: (row) => row.size, align: "right", nowrap: true },
    { id: "updatedAt", header: "Updated", accessor: (row) => row.updatedAt, align: "right", nowrap: true },
  ];
}

function SimpleGridDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Simple Grid</span>
      <Body size="sm" muted>
        Just columns and rows — no toolbar, selection, or pagination.
      </Body>
      <DataGrid caption="Print jobs" columns={baseColumns()} rows={ASSETS} getRowId={(row) => row.id} />
    </Card>
  );
}

function SelectableGridDemo() {
  const { selectedIds, setSelectedIds } = useDataGridSelection();
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Selectable Grid</span>
      <Body size="sm" muted>
        {selectedIds.size} of {ASSETS.length} selected — try the header checkbox for select-all.
      </Body>
      <DataGrid
        caption="Print jobs"
        columns={baseColumns()}
        rows={ASSETS}
        getRowId={(row) => row.id}
        getRowLabel={(row) => row.name}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
    </Card>
  );
}

function FilterableGridDemo() {
  const [status, setStatus] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const activeFilters = { status, type };

  const rows = useMemo(
    () => ASSETS.filter((row) => (status ? row.status === status : true) && (type ? row.type === type : true)),
    [status, type],
  );

  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Filterable Grid</span>
      <Body size="sm" muted>
        Two independent filter dimensions, applied at once.
      </Body>
      <DataGridToolbar>
        <DataGridFilters
          filters={[
            { key: "status", label: "Status", options: [...new Set(ASSETS.map((row) => row.status))].map((value) => ({ value, label: value })) },
            { key: "type", label: "Type", options: [...new Set(ASSETS.map((row) => row.type))].map((value) => ({ value, label: value })) },
          ]}
          activeFilters={activeFilters}
          onChange={(key, value) => (key === "status" ? setStatus(value) : setType(value))}
          onReset={() => {
            setStatus(null);
            setType(null);
          }}
        />
      </DataGridToolbar>
      <DataGrid caption="Print jobs" columns={baseColumns()} rows={rows} getRowId={(row) => row.id} emptyVariant="no-results" />
    </Card>
  );
}

function SearchableGridDemo() {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => ASSETS.filter((row) => row.name.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Searchable Grid</span>
      <Body size="sm" muted>
        Free-text filtering across row names — try &ldquo;tee&rdquo;.
      </Body>
      <DataGridToolbar>
        <DataGridSearch value={query} onChange={setQuery} placeholder="Search the queue" />
      </DataGridToolbar>
      <DataGrid caption="Print jobs" columns={baseColumns()} rows={rows} getRowId={(row) => row.id} emptyVariant="no-results" />
    </Card>
  );
}

function BulkActionGridDemo() {
  const { selectedIds, setSelectedIds, clear } = useDataGridSelection();
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Bulk Action Grid</span>
      <Body size="sm" muted>
        Select a row to switch the toolbar into a bulk-action bar.
      </Body>
      <DataGridToolbar
        selectedCount={selectedIds.size}
        onClearSelection={clear}
        bulkActions={
          <>
            <Button size="sm" variant="secondary">
              Archive
            </Button>
            <Button size="sm" variant="ghost">
              Delete
            </Button>
          </>
        }
      >
        <DataGridSearch value="" onChange={() => {}} placeholder="Search the queue" />
      </DataGridToolbar>
      <DataGrid
        caption="Print jobs"
        columns={baseColumns()}
        rows={ASSETS}
        getRowId={(row) => row.id}
        getRowLabel={(row) => row.name}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
    </Card>
  );
}

function DenseGridDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Dense Grid</span>
      <Body size="sm" muted>
        Foundation Table&rsquo;s dense density — more rows visible per screen.
      </Body>
      <DataGrid caption="Print jobs" columns={baseColumns()} rows={ASSETS} getRowId={(row) => row.id} density="dense" />
    </Card>
  );
}

function InspectorGridDemo() {
  const [sortColumnId, setSortColumnId] = useState("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const columns = useMemo<DataGridColumn<AssetRow>[]>(
    () => [
      { id: "name", header: "Name", accessor: (row) => row.name, sortable: true },
      { id: "status", header: "Status", accessor: (row) => <Badge tone={STATUS_TONE[row.status]} size="sm">{row.status}</Badge> },
      { id: "updatedAt", header: "Updated", accessor: (row) => row.updatedAt, align: "right", nowrap: true, sortable: true },
    ],
    [],
  );

  const rows = useMemo(() => {
    const sorted = [...ASSETS].sort((a, b) => (sortColumnId === "name" ? a.name.localeCompare(b.name) : a.updatedAt.localeCompare(b.updatedAt)));
    return sortDirection === "desc" ? sorted.reverse() : sorted;
  }, [sortColumnId, sortDirection]);

  function handleSortChange(columnId: string) {
    if (columnId === sortColumnId) {
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
    } else {
      setSortColumnId(columnId);
      setSortDirection("asc");
    }
  }

  return (
    <Card className="flex max-w-md flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Inspector Grid</span>
      <Body size="sm" muted>
        A narrower, sortable grid — the shape an Inspector Workspace panel would embed.
      </Body>
      <DataGrid
        caption="Print jobs"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        density="compact"
        minWidth="360px"
        sortColumnId={sortColumnId}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
    </Card>
  );
}

const LARGE_DATASET: AssetRow[] = Array.from({ length: 250 }, (_, index) => ({
  id: `large-${index}`,
  name: `Print job #${1000 + index}`,
  type: index % 3 === 0 ? "Apparel" : index % 3 === 1 ? "Drinkware" : "Proof",
  status: (["Shipped", "Queued", "Archived", "Printing"] as const)[index % 4],
  size: `${(index % 40) + 1} units`,
  updatedAt: `${(index % 30) + 1}d ago`,
}));

function LargeDatasetGridDemo() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const pageCount = Math.ceil(LARGE_DATASET.length / pageSize);
  const rows = LARGE_DATASET.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Large Dataset Grid</span>
      <Body size="sm" muted>
        250 rows, paginated at 10 per page — only one page&rsquo;s worth ever renders at once.
      </Body>
      <DataGrid
        caption="Print jobs"
        columns={baseColumns()}
        rows={rows}
        getRowId={(row) => row.id}
        footer={
          <DataGridPagination page={page} pageCount={pageCount} pageSize={pageSize} totalCount={LARGE_DATASET.length} onPageChange={setPage} colSpan={5} />
        }
      />
    </Card>
  );
}

/** Every named gallery variant in this system, each with real state and real interaction — not a static screenshot. */
export function DataGridGallery() {
  return (
    <div className="flex flex-col gap-6">
      <SimpleGridDemo />
      <SelectableGridDemo />
      <FilterableGridDemo />
      <SearchableGridDemo />
      <BulkActionGridDemo />
      <DenseGridDemo />
      <InspectorGridDemo />
      <LargeDatasetGridDemo />
    </div>
  );
}
