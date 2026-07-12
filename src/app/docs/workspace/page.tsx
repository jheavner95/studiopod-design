import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-workspace")!;

// DS-7.1: Workspace Shell is its own architecture group (it always was distinct from the
// Foundation/Operational/Workflow/Platform tier-model group) — but its old group id
// ("workspace-architecture") no longer exists. The "related regions" section below
// cross-links the rest of the real "workspace-shell" group instead.
const workspaceShellEntries = getGroupEntries("workspace-shell");
const siblingShellPages = workspaceShellEntries.filter((e) => e.id !== entry.id);

const primaryEntryPoints = [getEntry("workspace-framework")!, getEntry("workspace-header")!];
const relatedGroups = [getGroup("components-overview")!, getGroup("applications-overview")!, getGroup("architecture-overview")!];

// Real counts, verified against src/app/application-components/workspace-framework/_data/regions.ts
// (7 region entries) and src/components/platform/*/ (8 *Workspace.tsx files: Commerce, Publishing,
// Intelligence, Admin, Product, Operations, Integrations, Production).
const STATS = [
  { label: "Pages in Workspace Shell", value: String(workspaceShellEntries.length) },
  { label: "Workspace regions", value: "7" },
  { label: "Platform workspaces built on it", value: "8" },
];

export default function DocsWorkspacePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={workspaceShellEntries} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="This page is architecture documentation explaining the workspace shell's own anatomy — it is not the primary way to browse the components that implement each region; for that, use the Components section. Workspace Shell documents the seven-region blueprint — Global Navigation, Header, Toolbar, Library, Primary Workspace, Inspector, and Status — that every StudioPOD platform screen is composed from. Eight platform workspaces already build on it, from Publishing and Commerce to Admin and Integrations, presented in the Applications section, which is the proof that a single anatomy can hold across domains that otherwise share nothing. This page walks through each region on its own and the layout rules governing how they resize and collapse."
        whatYoullLearn={[
          "The seven regions and what each one owns, from persistent Global Navigation down to the ambient Status region.",
          "How Header and Toolbar responsibilities are split apart — page-level context versus in-page interaction.",
          "The ten layout rules governing region sizing, breakpoints, and collapse behavior.",
          "How the Library, Primary Workspace, and Inspector regions work together as a browse-to-detail chain.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="workspace-shell"
            eyebrow={<Eyebrow tone="accent">Workspace shell</Eyebrow>}
            title="Other workspace shell pages"
            descriptionMaxWidth={false}
          />
          <DocsEntryGrid entries={siblingShellPages} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
