import Link from "next/link";
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
const relatedComponents = [getEntry("architecture-doc")!, getEntry("coverage")!, getEntry("maturity")!];

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
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="A working inventory of every operational UI pattern the application layer needs — each status checked against real files in the codebase, not assumed from a component's name."
            descriptionMaxWidth={false}
          />
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
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related pages</Eyebrow>}
            title="Related pages"
            description="Where to go next to understand how these patterns fit into the wider component system."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {relatedComponents.map((related) => (
              <Link key={related.id} href={related.href} className="focus-ring block rounded-lg">
                <Card interactive className="flex h-full flex-col gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{related.title}</span>
                  <Body size="sm" muted>
                    {related.description}
                  </Body>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="reference"
            eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>}
            title="Reference"
            description="Every pattern in the inventory, grouped by the domain it serves — six categories, checked one by one against the codebase."
            descriptionMaxWidth={false}
          />
          {INVENTORY_GROUPS.map((group) => (
            <div key={group.id} id={group.id} className="flex flex-col gap-8">
              <SectionHeader
                id={`toc-${group.id}`}
                title={group.title.replace(/^\d+\.\s*/, "")}
                description={group.description}
                descriptionMaxWidth={false}
              />
              <InventoryTable items={group.items} />
            </div>
          ))}
        </div>
      </SectionShell>
    </DocsShell>
  );
}
