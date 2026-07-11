import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getRelated } from "@/lib/design-system-navigation";

const entry = getEntry("docs-certification")!;
const capstones = getRelated(entry);

const primaryEntryPoints = capstones.filter(
  (e) => e.id === "workspace-certification" || e.id === "foundation-audit" || e.id === "final-certification",
);
const remainingCapstones = capstones.filter((e) => !primaryEntryPoints.includes(e));
const relatedGroups = [getGroup("workspace-architecture")!, getGroup("foundation-systems")!, getGroup("platform-systems")!];

// Real per-tier component counts, verified against each capstone's own executive-summary.ts:
// Operational 113 (nine systems), Workflow 92 (eight systems), Platform 96 (eight platforms),
// Foundation 92 (seven families, per src/app/docs/foundation/page.tsx). Workspace and Application
// Composition don't publish a comparable raw component count, so they're excluded from the sum.
const STATS = [
  { label: "Capstone reviews", value: String(capstones.length) },
  { label: "Certified tiers", value: `${capstones.filter((e) => e.status === "certified").length} of ${capstones.length}` },
  { label: "Certified components (Foundation–Platform)", value: "393" },
];

export default function DocsCertificationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={capstones} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Certification is the cross-cutting rollup that closes out each tier of the design system — one capstone review per tier, from the Workspace shell up through Application Composition, two cross-cutting audits, and the 9th and FINAL capstone, DS-6.5 Final Enterprise Certification, which closes the Design System certification effort. Each capstone independently re-audits its tier's own real source rather than trusting that tier's own docs pages, and publishes a verdict, a scorecard, and any real defects it found along the way."
        whatYoullLearn={[
          "The nine-capstone structure: one per tier — Workspace, Foundation, Operational, Workflow, Platform, and Application Composition — plus the cross-cutting Accessibility & Interaction Quality and Enterprise Architecture & Adoption audits, and DS-6.5 Final Enterprise Certification, the terminal synthesis of all nine.",
          "What a Certified verdict actually requires — Foundation/Operational/Workflow compliance and accessibility verified in code, with no open exceptions, not just documented.",
          "The real component counts each capstone independently verified: 113 Operational components, 92 Workflow components, and 96 Platform components, among others.",
          "Where each capstone found and fixed real defects during its own audit pass — for example, five documentation defects fixed during Platform Certification, two real defects resolved during Application Composition Certification, and a multi-generation aria-describedby claim reopened by DS-6.5 after surviving two prior certifications.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="remaining-capstones"
            eyebrow={<Eyebrow tone="accent">Browse by tier</Eyebrow>}
            title="The remaining capstone reviews"
            descriptionMaxWidth={false}
          />
          <DocsEntryGrid entries={remainingCapstones} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
