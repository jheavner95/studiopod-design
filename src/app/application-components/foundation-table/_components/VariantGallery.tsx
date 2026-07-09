"use client";

import { useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import { Card, Badge, Body, Caption, Heading, Button } from "@/components/ui";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead, TableSelectionCell, TableStatusCell, TableActionCell } from "@/components/table";
import { Pencil, Trash2 } from "lucide-react";
import { TABLE_VARIANTS, type TableVariant } from "../_data/variants";

interface DemoItem {
  id: string;
  name: string;
  type: string;
  status: string;
  tone: "success" | "warning" | "error" | "neutral";
  metric: number;
}

const DEMO_ITEMS: DemoItem[] = [
  { id: "1", name: "Homepage Banner", type: "Artwork Project", status: "Published", tone: "success", metric: 128 },
  { id: "2", name: "Q4 Campaign", type: "Style", status: "Draft", tone: "neutral", metric: 42 },
  { id: "3", name: "Spring Catalog", type: "Ratio Set", status: "In Review", tone: "warning", metric: 76 },
  { id: "4", name: "Product Photography", type: "Asset", status: "Failed", tone: "error", metric: 9 },
];

function SimpleTableDemo() {
  return (
    <Table caption="Simple table example">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEMO_ITEMS.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function SelectableTableDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  const allSelected = selected.length === DEMO_ITEMS.length;
  const someSelected = selected.length > 0 && !allSelected;

  return (
    <Table caption="Selectable table example">
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            as="th"
            checked={allSelected}
            indeterminate={someSelected}
            label="Select all rows"
            onChange={(checked) => setSelected(checked ? DEMO_ITEMS.map((i) => i.id) : [])}
          />
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEMO_ITEMS.map((item) => (
          <TableRow key={item.id} selected={selected.includes(item.id)}>
            <TableSelectionCell
              checked={selected.includes(item.id)}
              label={`Select ${item.name}`}
              onChange={(checked) =>
                setSelected((prev) => (checked ? [...prev, item.id] : prev.filter((id) => id !== item.id)))
              }
            />
            <TableCell>{item.name}</TableCell>
            <TableStatusCell label={item.status} tone={item.tone} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function CompactTableDemo() {
  return (
    <Table density="compact" caption="Compact table example">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEMO_ITEMS.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableStatusCell label={item.status} tone={item.tone} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DenseTableDemo() {
  return (
    <Table density="dense" caption="Dense table example">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEMO_ITEMS.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableStatusCell label={item.status} tone={item.tone} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function StickyHeaderTableDemo() {
  return (
    <div className="max-h-40 overflow-y-auto rounded-lg">
      <Table caption="Sticky header table example">
        <TableHeader sticky>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...DEMO_ITEMS, ...DEMO_ITEMS].map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ScrollableTableDemo() {
  return (
    <Table minWidth="900px" caption="Scrollable table example">
      <TableHeader>
        <TableRow>
          {["Name", "Type", "Status", "Owner", "Created", "Updated", "Size"].map((label) => (
            <TableHead key={label}>{label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEMO_ITEMS.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableStatusCell label={item.status} tone={item.tone} />
            <TableCell nowrap>J. Heavner</TableCell>
            <TableCell nowrap>3 days ago</TableCell>
            <TableCell nowrap>1 hour ago</TableCell>
            <TableCell align="right" nowrap>
              2.4 MB
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function InspectorTableDemo() {
  return (
    <div className="max-w-xs">
      <Table caption="Inspector table example">
        <TableBody>
          {[
            ["Type", "Artwork Project"],
            ["Owner", "J. Heavner"],
            ["Created", "3 days ago"],
          ].map(([label, value]) => (
            <TableRow key={label}>
              <TableCell className="font-medium text-ink-primary">{label}</TableCell>
              <TableCell align="right">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function QueueTableDemo() {
  return (
    <Table caption="Queue table example">
      <TableHeader>
        <TableRow>
          <TableHead>Job</TableHead>
          <TableHead>Status</TableHead>
          <TableHead align="right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEMO_ITEMS.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableStatusCell label={item.status} tone={item.tone} />
            <TableActionCell>
              <Button variant="ghost" size="sm" aria-label={`Retry ${item.name}`}>
                <Pencil className="size-3.5" aria-hidden />
              </Button>
              <Button variant="ghost" size="sm" aria-label={`Cancel ${item.name}`}>
                <Trash2 className="size-3.5" aria-hidden />
              </Button>
            </TableActionCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function MetricsTableDemo() {
  return (
    <Table caption="Metrics table example">
      <TableHeader>
        <TableRow>
          <TableHead>Platform</TableHead>
          <TableHead align="right">Jobs</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEMO_ITEMS.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.type}</TableCell>
            <TableCell align="right" nowrap>
              {item.metric}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const DEMO_BY_ID: Record<string, ComponentType> = {
  simple: SimpleTableDemo,
  selectable: SelectableTableDemo,
  compact: CompactTableDemo,
  dense: DenseTableDemo,
  "sticky-header": StickyHeaderTableDemo,
  scrollable: ScrollableTableDemo,
  inspector: InspectorTableDemo,
  queue: QueueTableDemo,
  metrics: MetricsTableDemo,
};

function PillButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "focus-ring rounded-full border px-3 py-1.5 text-caption font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        active
          ? "border-accent-500/60 bg-accent-soft/30 text-accent-300"
          : "border-border-subtle bg-surface text-ink-tertiary hover:text-ink-secondary",
      )}
    >
      {label}
    </button>
  );
}

/** Select a variant to see its purpose, advantages, and typical platforms alongside a real, live instance of that variant. */
export function VariantGallery() {
  const [selectedId, setSelectedId] = useState(TABLE_VARIANTS[0].id);
  const selected: TableVariant = TABLE_VARIANTS.find((v) => v.id === selectedId) ?? TABLE_VARIANTS[0];
  const Demo = DEMO_BY_ID[selected.id];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {TABLE_VARIANTS.map((variant) => (
          <PillButton key={variant.id} label={variant.name} active={variant.id === selectedId} onClick={() => setSelectedId(variant.id)} />
        ))}
      </div>

      <Card padding="lg" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Heading level={3}>{selected.name}</Heading>
          <Body muted>{selected.purpose}</Body>
        </div>

        <div className="rounded-lg border border-dashed border-border-subtle bg-canvas/40 p-6">{Demo ? <Demo /> : null}</div>

        <div className="grid grid-cols-1 gap-6 border-t border-border-subtle pt-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">Advantages</Caption>
            <ul className="flex flex-col gap-1">
              {selected.advantages.map((advantage) => (
                <li key={advantage} className="flex gap-2 text-body-sm text-ink-secondary">
                  <span className="text-ink-tertiary" aria-hidden>
                    –
                  </span>
                  <span className="min-w-0 break-words">{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">Typical platforms</Caption>
            <div className="flex flex-wrap gap-1.5">
              {selected.typicalPlatforms.map((platform) => (
                <Badge key={platform} tone="accent" size="sm">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
