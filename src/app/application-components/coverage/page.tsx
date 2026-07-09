import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { Card, Badge, Body, Caption } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { CoverageMatrix } from "../_components/CoverageMatrix";
import { COVERAGE_ROWS, PLATFORMS, type CoverageState } from "../_data/coverage";

const STATE_TONE: Record<CoverageState, "success" | "warning" | "neutral"> = {
  Used: "success",
  Partial: "warning",
  Planned: "neutral",
};

const STATE_DESCRIPTIONS: Record<CoverageState, string> = {
  Used: "A finished, reusable version of the component is applied to this platform today.",
  Partial: "A related pattern exists and is relevant here, but isn't a dedicated finished component yet.",
  Planned: "Not built, or not yet relevant enough to this platform to prioritize.",
};

export default function CoveragePage() {
  const totalCells = COVERAGE_ROWS.length * PLATFORMS.length;
  const counts = (Object.keys(STATE_TONE) as CoverageState[]).map((state) => ({
    state,
    count: COVERAGE_ROWS.reduce(
      (sum, row) => sum + PLATFORMS.filter((platform) => row.cells[platform] === state).length,
      0,
    ),
  }));

  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · coverage"
          title="Platform coverage matrix"
          description="Which of StudioPOD's 8 platforms each reusable component is used on today. Every cell is derived from the component's own inventory status plus which platforms it's domain-relevant to — not hand-typed one at a time."
        >
          <div className="flex flex-wrap gap-3 pt-2">
            {counts.map(({ state, count }) => (
              <Badge key={state} tone={STATE_TONE[state]} size="md">
                {count} {state}
              </Badge>
            ))}
            <Caption className="text-ink-tertiary">of {totalCells} cells</Caption>
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="md" divider>
        <CardGrid columns={3}>
          {(Object.keys(STATE_DESCRIPTIONS) as CoverageState[]).map((state) => (
            <Card key={state} className="flex flex-col gap-1.5">
              <Badge tone={STATE_TONE[state]} size="sm" className="w-fit">
                {state}
              </Badge>
              <Body size="sm" muted>
                {STATE_DESCRIPTIONS[state]}
              </Body>
            </Card>
          ))}
        </CardGrid>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <Caption className="text-ink-tertiary">Scroll horizontally to see every platform on narrow screens.</Caption>
          <CoverageMatrix />
        </div>
      </SectionShell>
    </PageShell>
  );
}
