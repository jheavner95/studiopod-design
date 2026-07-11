import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-operational")!;
const children = getGroupEntries("operational-systems").filter((e) => e.id !== entry.id);

const primaryEntryPoints = children.filter((e) => e.id === "data-grid" || e.id === "inspector-panel" || e.id === "operational-certification");
const commonPages = children.filter((e) => !primaryEntryPoints.includes(e));
const relatedGroups = [getGroup("foundation-systems")!, getGroup("workflow-systems")!, getGroup("certification")!];

// Real counts, verified against src/components/operational/ (113 component files,
// excluding index.ts) and this tier's own capstone data at
// application-components/operational-certification/_data/systems.ts and certification.ts.
const STATS = [
  { label: "Pages in this section", value: String(children.length) },
  { label: "Real components", value: "113" },
  { label: "Certified systems", value: "4 of 9" },
];

export default function DocsOperationalPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={children} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Operational Systems is the tier of nine composed, ready-to-use panels and screens built entirely on Foundation — Data Grid, Inspector Panel, Property Panel, Asset Browser, Filter & Search, Bulk Actions, Status & Health, Queue & Job, and Dashboard Widgets. Where Foundation supplies generic, business-agnostic primitives, Operational assembles them into the concrete screen fragments — sortable tables, detail panels, search bars, bulk-action toolbars, health widgets — that Workflow and Platform then compose into full processes and domain-specific screens."
        whatYoullLearn={[
          "The nine operational systems and what each owns — tabular data, detail inspection, structured editing, asset browsing, search and filtering, bulk actions, health and status, background jobs, and dashboard summaries.",
          "How the systems compose from each other — five of the nine build directly on Data Grid, and both Property Panel and Status & Health build on Inspector Panel.",
          "Which four of the nine systems (Data Grid, Filter & Search, Bulk Actions, Queue & Job) earned this tier's Certified rating, versus the five still rated Production Ready.",
          "The one gap common to all nine systems — none implements a first-party live-region announcement pattern — and why that keeps the tier as a whole at Production Ready rather than Certified.",
          "Where to find the full scorecard across all eleven verification dimensions for the whole tier.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="common-pages"
            eyebrow={<Eyebrow tone="accent">Browse by system</Eyebrow>}
            title="Most commonly used pages"
            descriptionMaxWidth={false}
          />
          <DocsEntryGrid entries={commonPages} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
