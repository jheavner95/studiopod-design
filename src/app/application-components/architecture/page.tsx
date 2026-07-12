import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { FamilyCard } from "../_components/FamilyCard";
import { DependencyChainRow, DependencyFanoutBlock } from "../_components/DependencyMap";
import { COMPONENT_FAMILIES } from "../_data/families";
import { DEPENDENCY_CHAINS, DEPENDENCY_FANOUTS } from "../_data/dependency-map";

const entry = getEntry("architecture-doc")!;
const relatedComponents = [getEntry("inventory")!, getEntry("coverage")!, getEntry("templates")!];

export default function ArchitecturePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Nine component families"
            description="Six map directly onto the 40-item inventory. Analytics and Platform Templates currently have no items mapped to them, so both families score 0% by definition of the weighting formula."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {COMPONENT_FAMILIES.map((family) => (
              <div key={family.id} id={family.id} className="scroll-mt-24">
                <FamilyCard family={family} />
              </div>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="how-this-fits-together"
            eyebrow={<Eyebrow tone="accent">How this fits together</Eyebrow>}
            title="Not every family stands alone"
            description="A Workspace Shell is an assembly of the others — the chain below reads left to right, in the order the pieces actually come together."
            descriptionMaxWidth={false}
          />
          <div className="rounded-lg border border-border-subtle bg-surface p-4 sm:p-6">
            {DEPENDENCY_CHAINS.map((chain) => (
              <DependencyChainRow key={chain.id} chain={chain} />
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Three families, expanded one level"
            description="Library, Inspector, and Workflow are worth seeing broken down further — each fans out below into the real child components it's assembled from."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="sm">
            {DEPENDENCY_FANOUTS.map((fanout) => (
              <DependencyFanoutBlock key={fanout.id} fanout={fanout} />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="How completion is scored"
            description="Every completion bar on the cards above is a weighted average against the live component inventory, not a hand-set number."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              {
                label: "Scoring weights",
                value: "Exists = 1, Partial = 0.5, Needed = 0 — averaged across every inventory item the family names.",
              },
              {
                label: "Families with no inventory items",
                value: "Score 0% by definition — Analytics and Platform Templates currently have no items mapped to them, so the formula returns 0% for both.",
              },
              {
                label: "Priority split",
                value: "5 of the 9 families are High priority, 3 are Medium, 1 (Platform Templates) is Low — the composition layer sits last because it depends on everything above it.",
              },
            ]}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
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
    </DocsShell>
  );
}
