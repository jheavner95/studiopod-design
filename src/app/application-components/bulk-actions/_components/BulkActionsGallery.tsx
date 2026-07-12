"use client";

import { useEffect, useState } from "react";
import { Archive, Download, Trash2 } from "lucide-react";
import { Card, Body, Checkbox, Badge } from "@/components/ui";
import {
  BulkActionBar,
  BulkActionGroup,
  BulkActionButton,
  BulkActionMenu,
  BulkActionConfirmation,
  BulkProgress,
  BulkStatus,
  BulkResults,
  BulkConflictList,
  BulkUndo,
  useDataGridSelection,
  DataGrid,
  DataGridToolbar,
  DataGridBulkActions,
  type DataGridColumn,
  type BulkStatusValue,
  type BulkConflictEntry,
} from "@/components/operational";

interface Item {
  id: string;
  name: string;
  status: string;
}

const ITEMS: Item[] = [
  { id: "1", name: "Trailhead mug wrap", status: "Printing" },
  { id: "2", name: "Studio Tee — Black / M", status: "Shipped" },
  { id: "3", name: "Sunset ridge tee — front print", status: "Queued" },
  { id: "4", name: "Poster proof #118", status: "Shipped" },
  { id: "5", name: "Batch run #204", status: "Queued" },
  { id: "6", name: "Holiday collection", status: "Shipped" },
];

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

function SimpleSelectionDemo() {
  const { selectedIds, setSelectedIds, clear } = useDataGridSelection();

  function toggle(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  return (
    <GalleryCard title="Simple Selection" description="A plain list with checkboxes — BulkActionBar appears only once something is checked.">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          {ITEMS.slice(0, 4).map((item) => (
            <label key={item.id} className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-surface-hover">
              <Checkbox checked={selectedIds.has(item.id)} onChange={() => toggle(item.id)} />
              <span className="text-body-sm text-ink-primary">{item.name}</span>
            </label>
          ))}
        </div>
        <BulkActionBar count={selectedIds.size} onClear={clear}>
          <BulkActionGroup>
            <BulkActionButton icon={<Archive className="size-3.5" />}>Archive</BulkActionButton>
            <BulkActionButton icon={<Trash2 className="size-3.5" />} destructive>
              Delete
            </BulkActionButton>
          </BulkActionGroup>
        </BulkActionBar>
      </div>
    </GalleryCard>
  );
}

function LibraryBulkActionsDemo() {
  const { selectedIds, setSelectedIds, clear } = useDataGridSelection();

  function toggle(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  return (
    <GalleryCard title="Library Bulk Actions" description="A card-grid library selection with a primary action row plus an overflow menu for secondary actions.">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={`flex flex-col gap-1 rounded-lg border p-3 text-left transition-colors ${selectedIds.has(item.id) ? "border-accent-500 bg-accent-soft/20" : "border-border-subtle"}`}
            >
              <span className="text-body-sm font-medium text-ink-primary">{item.name}</span>
              <Badge size="sm" tone="neutral">
                {item.status}
              </Badge>
            </button>
          ))}
        </div>
        <BulkActionBar count={selectedIds.size} onClear={clear}>
          <BulkActionGroup>
            <BulkActionButton icon={<Download className="size-3.5" />}>Export</BulkActionButton>
          </BulkActionGroup>
          <BulkActionMenu
            items={[
              { id: "archive", label: "Archive", onSelect: () => {} },
              { id: "delete", label: "Delete", destructive: true, onSelect: () => {} },
            ]}
          />
        </BulkActionBar>
      </div>
    </GalleryCard>
  );
}

function GridBulkActionsDemo() {
  const { selectedIds, setSelectedIds, clear } = useDataGridSelection();
  const columns: DataGridColumn<Item>[] = [
    { id: "name", header: "Name", accessor: (row) => row.name },
    { id: "status", header: "Status", accessor: (row) => <Badge size="sm">{row.status}</Badge> },
  ];

  return (
    <GalleryCard title="Grid Bulk Actions" description="BulkActionButton composed directly into Data Grid's own bulk-mode toolbar, not a second bar drawn beside it.">
      <div className="flex flex-col gap-3">
        <DataGridToolbar selectedCount={selectedIds.size} onClearSelection={clear} bulkActions={
          <DataGridBulkActions count={selectedIds.size} onClear={clear}>
            <BulkActionButton icon={<Archive className="size-3.5" />}>Archive</BulkActionButton>
          </DataGridBulkActions>
        }>
          <span className="text-body-sm text-ink-tertiary">Select rows to reveal bulk actions.</span>
        </DataGridToolbar>
        <DataGrid caption="Assets" columns={columns} rows={ITEMS} getRowId={(row) => row.id} selectable selectedIds={selectedIds} onSelectionChange={setSelectedIds} />
      </div>
    </GalleryCard>
  );
}

function QueueBulkActionsDemo() {
  const { selectedIds, setSelectedIds, clear } = useDataGridSelection();

  function toggle(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  return (
    <GalleryCard title="Queue Bulk Actions" description="A publishing-queue shape — retry and cancel actions for whatever's currently selected.">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          {ITEMS.slice(0, 3).map((item) => (
            <label key={item.id} className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-surface-hover">
              <Checkbox checked={selectedIds.has(item.id)} onChange={() => toggle(item.id)} />
              <span className="text-body-sm text-ink-primary">{item.name}</span>
              <BulkStatus value="failed" className="ml-auto" />
            </label>
          ))}
        </div>
        <BulkActionBar count={selectedIds.size} onClear={clear}>
          <BulkActionGroup secondary={<BulkActionButton destructive>Cancel</BulkActionButton>}>
            <BulkActionButton>Retry</BulkActionButton>
          </BulkActionGroup>
        </BulkActionBar>
      </div>
    </GalleryCard>
  );
}

function ConfirmationFlowDemo() {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  return (
    <GalleryCard title="Confirmation Flow" description="A destructive action gated behind BulkActionConfirmation before it runs.">
      <div className="flex flex-col gap-3">
        <BulkActionBar count={3}>
          <BulkActionGroup>
            <BulkActionButton icon={<Trash2 className="size-3.5" />} destructive onClick={() => setOpen(true)}>
              Delete
            </BulkActionButton>
          </BulkActionGroup>
        </BulkActionBar>
        {deleted ? (
          <Body size="sm" muted>
            3 Production Packages deleted.
          </Body>
        ) : null}
        <BulkActionConfirmation
          open={open}
          onOpenChange={setOpen}
          title="Delete 3 Production Packages?"
          description="This can't be undone. Production Packages will be removed from every platform they're published to."
          confirmLabel="Delete"
          destructive
          onConfirm={() => setDeleted(true)}
        />
      </div>
    </GalleryCard>
  );
}

function ProgressFlowDemo() {
  const [started, setStarted] = useState(false);
  const [processed, setProcessed] = useState(0);
  const total = 8;
  const isRunning = started && processed < total;

  useEffect(() => {
    if (!isRunning) return;
    const timeout = setTimeout(() => setProcessed((value) => value + 1), 400);
    return () => clearTimeout(timeout);
  }, [isRunning, processed]);

  const status: BulkStatusValue = !started ? "idle" : isRunning ? "processing" : "completed";

  return (
    <GalleryCard title="Progress Flow" description="Start a run to see BulkStatus and BulkProgress advance together.">
      <div className="flex flex-col gap-3">
        <BulkStatus value={status} />
        <BulkProgress processed={processed} total={total} />
        <div>
          <BulkActionButton
            onClick={() => {
              setProcessed(0);
              setStarted(true);
            }}
            disabled={isRunning}
          >
            {isRunning ? "Running…" : "Start"}
          </BulkActionButton>
        </div>
      </div>
    </GalleryCard>
  );
}

function ConflictResolutionDemo() {
  const conflicts: BulkConflictEntry[] = [
    { id: "1", name: "Studio Tee — Black / M", reason: "Locked by another editor" },
    { id: "2", name: "Batch run #204", reason: "Missing required metadata" },
  ];

  return (
    <GalleryCard title="Conflict Resolution" description="BulkResults' partial-success summary paired with BulkConflictList's itemized detail.">
      <div className="flex flex-col gap-3">
        <BulkResults succeeded={4} failed={2} itemLabel="Production Packages" />
        <BulkConflictList entries={conflicts} />
      </div>
    </GalleryCard>
  );
}

function UndoFlowDemo() {
  const [deleted, setDeleted] = useState(false);
  const [restored, setRestored] = useState(false);

  return (
    <GalleryCard title="Undo Flow" description="After a completed action, a time-limited chance to reverse it.">
      <div className="flex flex-col gap-3">
        <div>
          <BulkActionButton
            icon={<Trash2 className="size-3.5" />}
            destructive
            onClick={() => {
              setDeleted(true);
              setRestored(false);
            }}
            disabled={deleted}
          >
            Delete 5 Production Packages
          </BulkActionButton>
        </div>
        {deleted && !restored ? (
          <BulkUndo
            message="5 Production Packages deleted."
            secondsRemaining={8}
            onUndo={() => {
              setRestored(true);
              setDeleted(false);
            }}
            onDismiss={() => setDeleted(false)}
          />
        ) : null}
        {restored ? (
          <Body size="sm" muted>
            Restored.
          </Body>
        ) : null}
      </div>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each with real state and real interaction — not a static screenshot. */
export function BulkActionsGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <SimpleSelectionDemo />
      <LibraryBulkActionsDemo />
      <GridBulkActionsDemo />
      <QueueBulkActionsDemo />
      <ConfirmationFlowDemo />
      <ProgressFlowDemo />
      <ConflictResolutionDemo />
      <UndoFlowDemo />
    </div>
  );
}
