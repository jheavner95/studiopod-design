import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
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

const entry = getEntry("coverage")!;
const relatedComponents = [getEntry("inventory")!, getEntry("foundation-table")!, getEntry("maturity")!];

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
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description={`Cross-references every one of the ${COVERAGE_ROWS.length} reusable components tracked in the inventory against StudioPOD's ${PLATFORMS.length} platforms, in one of three states.`}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-wrap items-center gap-3">
            {counts.map(({ state, count }) => (
              <Badge key={state} tone={STATE_TONE[state]} size="md">
                {count} {state}
              </Badge>
            ))}
            <Caption className="text-ink-tertiary">of {totalCells} cells</Caption>
          </div>
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
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="how-this-fits-together"
            eyebrow={<Eyebrow tone="accent">How this fits together</Eyebrow>}
            title="How this fits together"
            description="Component Inventory lists every real entry once, and Architecture explains how the Workspace, Foundation, Operational, Workflow, and Platform tiers compose. This matrix takes that same inventory and cross-references it against each platform, so a gap here always traces back to a real row on the Inventory page. Maturity Model then scores how far along each already-Used component has traveled."
            descriptionMaxWidth={false}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Coverage matrix</Eyebrow>}
            title="Coverage matrix"
            description="Scroll horizontally to see every platform on narrow screens."
            descriptionMaxWidth={false}
          />
          <CoverageMatrix />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Every cell is derived from the inventory's own status, not hand-typed — a component's inventory status sets a ceiling that platform relevance can't exceed."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              {
                label: "Needed",
                value: "Shows Planned on every platform, regardless of how relevant that platform is — nothing built yet means nothing to show.",
              },
              {
                label: "Partial",
                value: "Shows Partial on platforms it's relevant to, and Planned everywhere else.",
              },
              {
                label: "Exists",
                value: "Shows Used on platforms it's relevant to, and Partial everywhere else — the component is real, just not applied there yet.",
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
                label: "Table caption",
                value: "A screen-reader-only caption describes what the matrix shows before any cell is announced.",
              },
              {
                label: "Row headers",
                value: "Each component name is a row header (scope=\"row\"), not a plain cell, so it's announced alongside every state in that row.",
              },
              {
                label: "Sticky column",
                value: "The component-name column stays pinned while scrolling horizontally, matching the sticky header row, so a state is never read without knowing which component and platform it belongs to.",
              },
              {
                label: "State isn't color-only",
                value: "Used, Partial, and Planned are always spelled out as text inside the badge, not conveyed by color alone.",
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
            description="The matrix composes entirely from the shared table primitives — no bespoke grid markup."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              {
                label: "Table shell",
                value: "Table, TableHeader, TableBody, and TableRow from the shared table system provide the scrollable shell, sticky header, and row structure.",
              },
              {
                label: "State cells",
                value: "Each platform column is a TableStatusCell, the same status-badge cell used across every other StudioPOD table.",
              },
              {
                label: "Row data",
                value: "Each row's per-platform states are computed once from a short relevantPlatforms list matched against the live inventory, instead of being typed out cell by cell.",
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
          <DocsRelatedGrid entries={relatedComponents} />
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
                  "Row definitions and the derivation rule live in application-components/_data/coverage.ts; the underlying component list is application-components/inventory/_data/inventory.ts.",
              },
              {
                label: "Rendering",
                value: "The table itself is application-components/_components/CoverageMatrix.tsx.",
              },
            ]}
          />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
