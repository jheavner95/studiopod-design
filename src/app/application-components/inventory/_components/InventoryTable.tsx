import { Badge, Body, Caption, Metadata } from "@/components/ui";
import type { InventoryItem, InventoryPriority, InventoryStatus } from "../_data/inventory";

const STATUS_TONE: Record<InventoryStatus, "success" | "warning" | "neutral"> = {
  Exists: "success",
  Partial: "warning",
  Needed: "neutral",
};

const PRIORITY_TONE: Record<InventoryPriority, "error" | "warning" | "neutral"> = {
  High: "error",
  Medium: "warning",
  Low: "neutral",
};

const ROW_COLUMNS = "sm:grid-cols-[1.1fr_2.2fr_0.9fr_1.8fr_0.7fr]";

/** Column labels, shown only at sm+ — below that every row stacks as a labeled mini-card. */
function TableHeader() {
  return (
    <div className={`hidden min-w-0 border-b border-border pb-3 sm:grid sm:gap-4 ${ROW_COLUMNS}`}>
      <Metadata>Component</Metadata>
      <Metadata>Purpose</Metadata>
      <Metadata>Status</Metadata>
      <Metadata>Source</Metadata>
      <Metadata>Priority</Metadata>
    </div>
  );
}

function InventoryRow({ item }: { item: InventoryItem }) {
  return (
    <div
      className={`grid min-w-0 grid-cols-1 gap-2 border-b border-border-subtle py-4 last:border-b-0 sm:items-center sm:gap-4 sm:py-3 ${ROW_COLUMNS}`}
    >
      <div className="flex min-w-0 flex-col gap-1 sm:contents">
        <Caption className="text-ink-tertiary sm:hidden">Component</Caption>
        <span className="text-body-sm font-medium text-ink-primary">{item.name}</span>
      </div>

      <div className="flex min-w-0 flex-col gap-1 sm:contents">
        <Caption className="text-ink-tertiary sm:hidden">Purpose</Caption>
        <Body size="sm" muted>
          {item.purpose}
        </Body>
      </div>

      <div className="flex min-w-0 flex-col gap-1 sm:contents">
        <Caption className="text-ink-tertiary sm:hidden">Status</Caption>
        <Badge tone={STATUS_TONE[item.status]} size="sm" className="w-fit">
          {item.status}
        </Badge>
      </div>

      <div className="flex min-w-0 flex-col gap-1 sm:contents">
        <Caption className="text-ink-tertiary sm:hidden">Source</Caption>
        <Caption className="min-w-0 break-words font-mono text-ink-tertiary">{item.source ?? "—"}</Caption>
      </div>

      <div className="flex min-w-0 flex-col gap-1 sm:contents">
        <Caption className="text-ink-tertiary sm:hidden">Priority</Caption>
        <Badge tone={PRIORITY_TONE[item.priority]} size="sm" className="w-fit">
          {item.priority}
        </Badge>
      </div>
    </div>
  );
}

/** A responsive component/purpose/status/source/priority table — five columns at sm+, labeled stacked cards below it. */
export function InventoryTable({ items }: { items: InventoryItem[] }) {
  return (
    <div className="rounded-lg border border-border-subtle bg-surface p-4 sm:p-6">
      <TableHeader />
      <div className="flex flex-col">
        {items.map((item) => (
          <InventoryRow key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
