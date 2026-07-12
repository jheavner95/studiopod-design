import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../_components/DocsEntryGrid";
import { DocsLandingSummary } from "../_components/DocsLandingSummary";
import { DocsSectionLanding } from "../_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("docs-operational")!;

// DS-7.1: Operational no longer owns a dedicated top-level group — it's one of nine entries
// inside the Architecture section's "tier-model" group, alongside the other tier pages and
// their capstone certifications. The "related tiers" section below cross-links the rest of
// that group instead of the old (now-nonexistent) operational-systems group.
const tierModelEntries = getGroupEntries("tier-model");
const siblingTierPages = tierModelEntries.filter((e) => e.id !== entry.id);

const primaryEntryPoints = [getEntry("data-grid")!, getEntry("inspector-panel")!, getEntry("operational-certification")!];
const relatedGroups = [getGroup("components-overview")!, getGroup("quality-overview")!, getGroup("architecture-overview")!];

// Real counts, verified against src/components/operational/ (113 component files,
// excluding index.ts) and this tier's own capstone data at
// application-components/operational-certification/_data/systems.ts and certification.ts.
const STATS = [
  { label: "Pages in Tier Model", value: String(tierModelEntries.length) },
  { label: "Real components", value: "113" },
  { label: "Certified systems", value: "4 of 9" },
];

export default function DocsOperationalPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={tierModelEntries} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="This page is architecture documentation explaining how the Operational tier fits into the system — it is not the primary way to browse Operational's actual components; for that, use the Components section. Operational Tier is the tier of nine composed, ready-to-use panels and screens built entirely on Foundation — Data Grid, Inspector Panel, Property Panel, Asset Browser, Filter & Search, Bulk Actions, Status & Health, Queue & Job, and Dashboard Widgets. Where Foundation supplies generic, business-agnostic primitives, Operational assembles them into the concrete screen fragments — sortable tables, detail panels, search bars, bulk-action toolbars, health widgets — that Workflow and Platform then compose into full processes and domain-specific screens."
        whatYoullLearn={[
          "The nine operational systems and what each owns — tabular data, detail inspection, structured editing, asset browsing, search and filtering, bulk actions, health and status, background jobs, and dashboard summaries.",
          "How the systems compose from each other — five of the nine build directly on Data Grid, and both Property Panel and Status & Health build on Inspector Panel.",
          "Which four of the nine systems (Data Grid, Filter & Search, Bulk Actions, Queue & Job) earned this tier's Certified rating, versus the five still rated Production Ready.",
          "The one gap common to all nine systems — none implements a first-party live-region announcement pattern — and why that keeps the tier as a whole at Production Ready rather than Certified.",
          "Where Operational sits relative to Foundation, Workflow, and Platform in the tier model, and where each of those tiers' own architecture pages live.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="tier-model"
            eyebrow={<Eyebrow tone="accent">Tier model</Eyebrow>}
            title="Other tier model pages"
            descriptionMaxWidth={false}
          />
          <DocsEntryGrid entries={siblingTierPages} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
