import Link from "next/link";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { MaturityTable } from "../_components/MaturityTable";
import { MATURITY_LEVELS, MATURITY_ROWS, MATURITY_FROM_STATUS, type MaturityLevel } from "../_data/maturity";

const LEVEL_TONE: Record<MaturityLevel, "neutral" | "warning" | "success" | "accent"> = {
  Concept: "neutral",
  Prototype: "warning",
  "Production Ready": "success",
  Certified: "accent",
  Locked: "accent",
};

const entry = getEntry("maturity")!;
const relatedComponents = [getEntry("inventory")!, getEntry("coverage")!, getEntry("templates")!];

const STATUS_MAPPING = (Object.keys(MATURITY_FROM_STATUS) as (keyof typeof MATURITY_FROM_STATUS)[]).map((status) => ({
  status,
  level: MATURITY_FROM_STATUS[status],
}));

export default function MaturityPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="The five-stage ladder"
            description="Five stages, from nothing built yet to an API stable enough to treat as a contract — every component in the inventory sits on exactly one of them."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {MATURITY_LEVELS.map(({ level, description }) => (
              <Card key={level} className="flex flex-col gap-3">
                <Badge tone={LEVEL_TONE[level]} size="md" className="w-fit">
                  {level}
                </Badge>
                <Body size="sm" muted>
                  {description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="how-this-fits-together"
            eyebrow={<Eyebrow tone="accent">How this fits together</Eyebrow>}
            title="How this fits together"
            description="Component Inventory tracks each entry's real-world status — Needed, Partial, or Exists. Coverage Matrix cross-references that same status against every platform. This page takes the inventory status one step further: it sets a component's starting rung on the maturity ladder, and Behavior below shows exactly how that mapping works."
            descriptionMaxWidth={false}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Every inventory item, mapped"
            description={`${MATURITY_ROWS.length} components. Zero reach Certified or Locked today — that requires real usage in a shipped screen, not just existing, and no Application Component has been used in a real screen yet.`}
            descriptionMaxWidth={false}
          />
          <MaturityTable />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="A component's inventory status sets a ceiling, not a guarantee — the mapping below is automatic, and everything past it is earned by hand."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              ...STATUS_MAPPING.map(({ status, level }) => ({
                label: status,
                value: `Every "${status}" component in the inventory defaults to ${level} here — no separate maturity value is typed in by hand.`,
              })),
              {
                label: "Certified & Locked",
                value:
                  "Never assigned by the mapping above — these two stages only come from manual verification (accessibility pass, responsive check, real shipped usage), which is why the sample table below shows zero of either today.",
              },
            ]}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList
            items={[
              {
                label: "State isn't color-only",
                value: "Every maturity level is spelled out as text inside its badge, not conveyed by color alone.",
              },
              {
                label: "Labels repeat on narrow screens",
                value:
                  "Component, Family, and Maturity column labels are repeated above each field once the table collapses to a single column on mobile, instead of relying on grid position alone.",
              },
            ]}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="This page keeps no independent state of its own — it's a derived view over the inventory."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              {
                label: "Reuses inventory data",
                value:
                  "The sample table maps over Component Inventory's own item list rather than keeping a second, independently maintained list — every row here traces back to a real inventory entry.",
              },
              {
                label: "One mapping function",
                value:
                  "Every row passes through the same status-to-level lookup shown in Behavior above — there's no per-component override, so the sample table and the ladder can never drift apart.",
              },
            ]}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
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
        <div className="flex flex-col gap-6">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />
          <DescriptionList
            items={[
              {
                label: "Data source",
                value:
                  "Level and mapping definitions live in application-components/_data/maturity.ts, which reads inventory items directly from application-components/inventory/_data/inventory.ts.",
              },
              {
                label: "Rendering",
                value: "The table itself is application-components/_components/MaturityTable.tsx.",
              },
            ]}
          />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
