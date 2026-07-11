import { SectionShell, CardGrid } from "@/components/layout";
import { Card, Badge, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { MaturityTable } from "../_components/MaturityTable";
import { MATURITY_LEVELS, MATURITY_ROWS, type MaturityLevel } from "../_data/maturity";

const LEVEL_TONE: Record<MaturityLevel, "neutral" | "warning" | "success" | "accent"> = {
  Concept: "neutral",
  Prototype: "warning",
  "Production Ready": "success",
  Certified: "accent",
  Locked: "accent",
};

const entry = getEntry("maturity")!;

export default function MaturityPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="levels"
            eyebrow={<Eyebrow tone="accent">Levels</Eyebrow>}
            title="The five stages"
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
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="sample-table"
            eyebrow={<Eyebrow tone="accent">Sample table</Eyebrow>}
            title="Every inventory item, mapped"
            description={`${MATURITY_ROWS.length} components. Zero reach Certified or Locked today — that requires real usage in a shipped screen, not just existing, and no Application Component has been used in a real screen yet.`}
            descriptionMaxWidth={false}
          />
          <MaturityTable />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
