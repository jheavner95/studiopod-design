import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { CatalogExplorer } from "./_components/CatalogExplorer";
import { stateFrequency, accessibilityFrequency } from "./_data/catalog";
import { FOUNDATION_BLOCKERS, resolveBlockers } from "./_data/readiness";
import { MATURITY_LEVELS } from "../_data/maturity";
import { FOUNDATION_DESIGN_RULES } from "./_data/design-rules";
import { FOUNDATION_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const requiredStateCounts = stateFrequency(3);
const accessibilityCounts = accessibilityFrequency(2);
const entry = getEntry("foundation-components")!;
const relatedComponents = [getEntry("foundation-layout")!, getEntry("foundation-table")!, getEntry("foundation-metadata")!];

export default function FoundationComponentsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="The generic layer everything else builds from"
            description="Foundation components carry zero business or workflow awareness — a Button doesn't know it's confirming an order, a Table doesn't know it's listing jobs. That's what makes them reusable: Operational, Workflow, and Platform components compose these directly rather than reaching for raw HTML or one-off styling."
            descriptionMaxWidth={false}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The rules that decide whether a pattern belongs in this Foundation layer, or graduates into an Operational, Workflow, or Platform component built on top of it."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {FOUNDATION_DESIGN_RULES.map((rule) => (
              <Card key={rule.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{rule.title}</span>
                <Body size="sm" muted>
                  {rule.explanation}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Examples"
            description="Filter by group or status, then select any component for its full spec — purpose, source, required states and variants, and its accessibility contract."
            descriptionMaxWidth={false}
          />
          <CatalogExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="The states specified most often across every component's own required-states list — the behavioral contract this catalog repeats regardless of which group a component belongs to."
            descriptionMaxWidth={false}
          />
          <Card className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Required states, by frequency across the catalog</Caption>
            <div className="flex flex-wrap gap-1.5">
              {requiredStateCounts.map((entry) => (
                <Badge key={entry.label} tone="neutral" size="sm">
                  {entry.label} · {entry.count}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="accessibility"
            eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>}
            title="Accessibility"
            description="Accessibility requirements repeated word-for-word across more than one component in the catalog — real overlap, not aspirational guidance."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={accessibilityCounts.map((entry) => ({
              label: entry.label,
              value: `Shared by ${entry.count} components`,
            }))}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="Which components each higher-tier group is composed from — grounded in the same catalog above, not a separate list."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {FOUNDATION_BLOCKERS.map((blocker) => (
              <Card key={blocker.id} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-body-md font-medium text-ink-primary">{blocker.targetPackage}</span>
                  <Body size="sm" muted>
                    {blocker.targetDescription}
                  </Body>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {resolveBlockers(blocker).map((component) => (
                    <Badge key={component.id} tone={component.status === "Needed" ? "neutral" : "warning"} size="sm">
                      {component.name} · {component.status}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
            description="The next few Foundation-tier pages, in catalog order."
            descriptionMaxWidth={false}
          />
          <DocsRelatedGrid entries={relatedComponents} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="maturity-model"
              title="Maturity model"
              description="The same five levels used consistently across every tier's own maturity model — reused directly here, not restated."
              descriptionMaxWidth={false}
            />
            <DescriptionList items={MATURITY_LEVELS.map((entry) => ({ label: entry.level, value: entry.description }))} />
            <Caption className="text-ink-tertiary">
              Certified requires an accessibility audit and adoption across at least two Operational or Workflow
              surfaces; Locked requires Certified plus a stable API with no breaking changes for two release cycles.
            </Caption>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Capabilities this system does not currently include:"
              descriptionMaxWidth={false}
            />
            <CardGrid columns={4}>
              {FOUNDATION_FUTURE_EXTENSIONS.map((extension) => (
                <Card key={extension.title} className="flex flex-col gap-2 border-dashed">
                  <span className="text-body-sm font-medium text-ink-primary">{extension.title}</span>
                  <Body size="sm" muted>
                    {extension.description}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
