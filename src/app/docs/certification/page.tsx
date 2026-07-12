import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries, getGroupsForSection, getRelated } from "@/lib/design-system-navigation";

const entry = getEntry("docs-certification")!;

// The full nine-capstone certification story — one per tier (Workspace through
// Application Composition), the two cross-cutting audits, and the terminal
// synthesis — read off the Final Enterprise Certification's own `related` list
// rather than a group query, since six of the nine capstones are filed under
// Architecture alongside the tier docs they close out, not under Quality's own
// "certifications" group (see below).
const finalCertification = getEntry("final-certification")!;
const capstones = [...getRelated(finalCertification), finalCertification];

// Quality's two real content groups: "certifications" (the capstones that live
// natively in this section — the Final Enterprise Certification plus the two
// cross-cutting audits) and "tracking" (inventory/coverage/maturity).
// quality-overview is this page itself, so it's excluded from the browsable
// list below.
const qualityGroups = getGroupsForSection("quality").filter((group) => group.id !== "quality-overview");
const trackingEntries = getGroupEntries("tracking");

const primaryEntryPoints = [
  getEntry("final-certification")!,
  getEntry("workspace-certification")!,
  getEntry("accessibility-certification")!,
  getEntry("inventory")!,
];

const relatedGroups = [getGroup("architecture-overview")!, getGroup("components-overview")!, getGroup("applications-overview")!];

const STATS = [
  { label: "Capstone reviews", value: String(capstones.length) },
  { label: "Certified capstones", value: `${capstones.filter((e) => e.status === "certified").length} of ${capstones.length}` },
  { label: "Tracking views", value: String(trackingEntries.length) },
  { label: "Certified components (Foundation–Platform)", value: "393" },
];

export default function DocsCertificationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={capstones} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Quality is the design system's own evidence trail: every certification, audit, and coverage or maturity report it has produced about itself, gathered in one place. It's a rollup rather than a tier. Six of the nine capstone reviews that close out each layer — from the Workspace shell up through Application Composition — live at the end of their own tier's Architecture documentation, while the two cross-cutting audits and the Final Enterprise Certification that synthesizes everything live natively here, alongside the Component Inventory, Coverage Matrix, and Maturity Model that keep the record current between certifications. This section is for anyone who needs to know whether the system is actually production-ready, not just documented as such. Start with the Final Enterprise Certification for the overall verdict, then drill into a specific audit or tracking view below."
        whatYoullLearn={[
          "The nine-capstone certification story: one per tier — Workspace, Foundation, Operational, Workflow, Platform, and Application Composition — plus the cross-cutting Accessibility & Interaction Quality and Enterprise Architecture & Adoption audits, synthesized by the Final Enterprise Certification.",
          "Quality's own two groups: Certifications (the Final Enterprise Certification and the two cross-cutting audits filed natively in this section) and Tracking (the Component Inventory, Coverage Matrix, and Maturity Model views).",
          "Where the other six tier capstones actually live now — filed under Architecture alongside the tier documentation they close out, cross-linked from here rather than duplicated.",
          "What a Certified verdict actually requires — Foundation, Operational, and Workflow compliance plus accessibility verified in code, with no open exceptions, not just documented.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      {qualityGroups.map((group) => (
        <SectionShell key={group.id} spacing="lg" divider>
          <div className="flex flex-col gap-6">
            <SectionHeader
              id={group.id}
              eyebrow={<Eyebrow tone="accent">Browse by group</Eyebrow>}
              title={group.title}
              description={group.description}
              descriptionMaxWidth={false}
            />
            <DocsEntryGrid entries={getGroupEntries(group.id)} />
          </div>
        </SectionShell>
      ))}
    </DocsShell>
  );
}
