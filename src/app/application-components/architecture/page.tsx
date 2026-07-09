import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { FamilyCard } from "../_components/FamilyCard";
import { DependencyChainRow, DependencyFanoutBlock } from "../_components/DependencyMap";
import { COMPONENT_FAMILIES } from "../_data/families";
import { DEPENDENCY_CHAINS, DEPENDENCY_FANOUTS } from "../_data/dependency-map";

export default function ArchitecturePage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · architecture"
          title="Operational component architecture"
          description="The Application Component Library organized as nine families — what each one owns, what it's built from today, and how it will fit together. Completion percentages are computed live from the component inventory, not hand-typed."
        />
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Families</Eyebrow>}
            title="Component families"
            description="Six map directly onto the 40-item inventory. Analytics and Platform Templates are net-new — 0% isn't a bug, it's an honest reading of what exists today."
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
            eyebrow={<Eyebrow tone="accent">Dependency map</Eyebrow>}
            title="How the pieces fit together"
            description="Not every family stands alone — a Workspace Shell is an assembly of the others, and Library/Inspector/Workflow each break down further."
            descriptionMaxWidth={false}
          />

          <div className="rounded-lg border border-border-subtle bg-surface p-4 sm:p-6">
            {DEPENDENCY_CHAINS.map((chain) => (
              <DependencyChainRow key={chain.id} chain={chain} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {DEPENDENCY_FANOUTS.map((fanout) => (
              <DependencyFanoutBlock key={fanout.id} fanout={fanout} />
            ))}
          </div>
        </div>
      </SectionShell>
    </PageShell>
  );
}
