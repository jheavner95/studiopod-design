import { SectionShell, CardGrid } from "@/components/layout";
import { SectionHeader, Eyebrow, Body, Card, Badge, Caption } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { INVENTORY_GROUPS, type InventoryStatus } from "./_data/inventory";
import { InventoryTable } from "./_components/InventoryTable";

const STATUS_ORDER: InventoryStatus[] = ["Exists", "Partial", "Needed"];
const STATUS_TONE: Record<InventoryStatus, "success" | "warning" | "neutral"> = {
  Exists: "success",
  Partial: "warning",
  Needed: "neutral",
};

const ALL_ITEMS = INVENTORY_GROUPS.flatMap((group) => group.items);
const STATUS_COUNTS = STATUS_ORDER.map((status) => ({
  status,
  count: ALL_ITEMS.filter((item) => item.status === status).length,
}));

const entry = getEntry("inventory")!;

/**
 * A planning/inventory page for the Application Components package — not
 * implementation. Every status was verified against the actual codebase
 * (see the conversation this was built from), not assumed from a name.
 */
export default function ApplicationComponentsInventoryPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <div className="flex flex-wrap gap-3 pt-2">
          {STATUS_COUNTS.map(({ status, count }) => (
            <Badge key={status} tone={STATUS_TONE[status]} size="md">
              {count} {status}
            </Badge>
          ))}
          <Caption className="text-ink-tertiary">of {ALL_ITEMS.length} total</Caption>
        </div>
      </DocsPageHeader>

      <SectionShell spacing="md" divider>
        <CardGrid columns={3}>
          <Card className="flex flex-col gap-1.5">
            <span className="text-body-sm font-medium text-ink-primary">Status</span>
            <Body size="sm" muted>
              <span className="font-medium text-success">Exists</span> — built and in use.{" "}
              <span className="font-medium text-warning">Partial</span> — a related pattern exists but isn&rsquo;t a
              standalone reusable component yet. <span className="font-medium text-ink-secondary">Needed</span> —
              nothing found in the codebase.
            </Body>
          </Card>
          <Card className="flex flex-col gap-1.5">
            <span className="text-body-sm font-medium text-ink-primary">Source</span>
            <Body size="sm" muted>
              The closest existing file or route this can build on or migrate from — omitted where nothing relevant
              exists.
            </Body>
          </Card>
          <Card className="flex flex-col gap-1.5">
            <span className="text-body-sm font-medium text-ink-primary">Priority</span>
            <Body size="sm" muted>
              A judgment call on how much it blocks real app screens from shipping — not a commitment or schedule.
            </Body>
          </Card>
        </CardGrid>
      </SectionShell>

      {INVENTORY_GROUPS.map((group, index) => (
        <SectionShell key={group.id} id={group.id} spacing="lg" divider={index > 0}>
          <div className="flex flex-col gap-8">
            <SectionHeader
              id={`toc-${group.id}`}
              eyebrow={<Eyebrow tone="accent">{group.title}</Eyebrow>}
              title={group.title.replace(/^\d+\.\s*/, "")}
              description={group.description}
              descriptionMaxWidth={false}
            />
            <InventoryTable items={group.items} />
          </div>
        </SectionShell>
      ))}
    </DocsShell>
  );
}
