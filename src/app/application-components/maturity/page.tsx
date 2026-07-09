import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { Card, Badge, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { MaturityTable } from "../_components/MaturityTable";
import { MATURITY_LEVELS, MATURITY_ROWS, type MaturityLevel } from "../_data/maturity";

const LEVEL_TONE: Record<MaturityLevel, "neutral" | "warning" | "success" | "accent"> = {
  Concept: "neutral",
  Prototype: "warning",
  "Production Ready": "success",
  Certified: "accent",
  Locked: "accent",
};

export default function MaturityPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · maturity"
          title="Component maturity model"
          description="Five stages every component moves through, from named-but-unbuilt to locked-and-stable. The sample table below maps every inventory item to its current stage — derived from its Exists/Partial/Needed status, not scored separately."
        />
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
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
            eyebrow={<Eyebrow tone="accent">Sample table</Eyebrow>}
            title="Every inventory item, mapped"
            description={`${MATURITY_ROWS.length} components. Zero reach Certified or Locked today — that requires real usage in a shipped screen, not just existing, and no Application Component has been used in a real screen yet.`}
            descriptionMaxWidth={false}
          />
          <MaturityTable />
        </div>
      </SectionShell>
    </PageShell>
  );
}
