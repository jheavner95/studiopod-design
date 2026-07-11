import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-workspace")!;
const children = getGroupEntries("workspace-architecture").filter((e) => e.id !== entry.id);

const primaryEntryPoints = children.filter((e) => e.id === "workspace-framework" || e.id === "workspace-certification");
const commonPages = children.filter((e) => !primaryEntryPoints.includes(e));
const relatedGroups = [getGroup("foundation-systems")!, getGroup("operational-systems")!, getGroup("certification")!];

// Real counts, verified against src/app/application-components/workspace-framework/_data/regions.ts
// (7 region entries) and src/components/platform/*/ (8 *Workspace.tsx files: Commerce, Publishing,
// Intelligence, Admin, Product, Operations, Integrations, Production).
const STATS = [
  { label: "Pages in this section", value: String(children.length) },
  { label: "Workspace regions", value: "7" },
  { label: "Platform workspaces built on it", value: "8" },
];

export default function DocsWorkspacePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={children} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Workspace Architecture documents the seven-region shell blueprint — Global Navigation, Header, Toolbar, Library, Primary Workspace, Inspector, and Status — that every StudioPOD platform screen is composed from. Eight platform workspaces already build on it, from Publishing and Commerce to Admin and Integrations, which is the proof that a single anatomy can hold across domains that otherwise share nothing. This section walks through each region on its own, the layout rules governing how they resize and collapse, and the scorecard the whole blueprint is certified against."
        whatYoullLearn={[
          "The seven regions and what each one owns, from persistent Global Navigation down to the ambient Status region.",
          "How Header and Toolbar responsibilities are split apart — page-level context versus in-page interaction.",
          "The ten layout rules governing region sizing, breakpoints, and collapse behavior.",
          "How the Library, Primary Workspace, and Inspector regions work together as a browse-to-detail chain.",
          "How the whole blueprint is scored, and the honest state of the certification matrix across all nine StudioPOD platforms today.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="common-pages"
            eyebrow={<Eyebrow tone="accent">Browse by region</Eyebrow>}
            title="Most commonly used pages"
            descriptionMaxWidth={false}
          />
          <DocsEntryGrid entries={commonPages} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
