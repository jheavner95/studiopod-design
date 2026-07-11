export interface MetadataPromotionCandidate {
  id: string;
  title: string;
  files: string[];
  count: number;
  findingCommand: string;
  description: string;
  migrationEffort: "Low" | "Medium" | "High";
  migrationNote: string;
}

/**
 * Real findings against this repository at the time this page was
 * written — every count is grep-verifiable with findingCommand. Same
 * methodology Foundation Table's own Promotion Candidates section used.
 */
export const METADATA_PROMOTION_CANDIDATES: MetadataPromotionCandidate[] = [
  {
    id: "identity-regions",
    title: "Ad hoc Identity regions",
    files: ["workspace-header/_data/regions.ts", "inspector-workspace/_data/regions.ts", "workspace-framework/_data/regions.ts"],
    count: 3,
    findingCommand: "grep -l \"Identity\" src/app/application-components/*/_data/regions.ts",
    description: "Every workspace's own anatomy explorer renders an icon + name + type + status region by hand — the same shape, no shared component, once per workspace.",
    migrationEffort: "Medium",
    migrationNote: "Each *AnatomyExplorer.tsx's region-card renderer would need to route its \"identity\"-shaped regions through IdentityBlock — more involved than a drop-in swap since each explorer has its own selection state.",
  },
  {
    id: "platform-cards",
    title: "Near-duplicate platform example cards",
    files: [
      "inspector-workspace/_components/PlatformExampleCard.tsx",
      "status-workspace/_components/PlatformExampleCard.tsx",
      "primary-workspace/_components/PlatformExampleCard.tsx",
      "workspace-framework/_components/PlatformPreviewCard.tsx",
    ],
    count: 4,
    findingCommand: 'find src/app/application-components -iname "*PlatformExampleCard.tsx" -o -iname "*PlatformPreviewCard.tsx"',
    description: "Four separate components (19–40 lines each), all rendering a title plus 1–3 labeled text fields — a PropertyGroup or a couple of MetadataRows in a Card, reimplemented four times with slightly different field names.",
    migrationEffort: "Medium",
    migrationNote: "Field names differ (purpose/sharedAnatomy/primaryData vs. purpose-only) so migration means normalizing each page's own data shape, not just swapping the component.",
  },
  {
    id: "relationship-links",
    title: "Ad hoc reuseLinks relationship lists",
    files: [
      "asset-workspace/_data/regions.ts",
      "primary-workspace/_data/regions.ts",
      "inspector-workspace/_data/regions.ts",
      "workspace-framework/_data/regions.ts",
      "workspace-toolbar/_data/regions.ts",
      "status-workspace/_data/regions.ts",
      "workspace-header/_data/regions.ts",
    ],
    count: 7,
    findingCommand: "grep -l \"reuseLinks\" src/app/application-components/*/_data/regions.ts",
    description: "Every workspace's regions.ts defines a reuseLinks: RegionLink[] array, rendered inline by that workspace's own anatomy explorer — the same \"list of related links\" shape RelationshipList now generalizes.",
    migrationEffort: "Low",
    migrationNote: "Each RegionLink array already has the label/href shape RelationshipItem expects — the lowest-effort migration on this list.",
  },
  {
    id: "health-summary-catalog",
    title: "Health Summary catalogued but not generalized",
    files: ["application-components/inventory/_data/inventory.ts", "src/production/components/HealthDashboardDiagram.tsx"],
    count: 1,
    findingCommand: 'grep -n "Health Summary" src/app/application-components/inventory/_data/inventory.ts',
    description: "The component inventory already tracks \"Health Summary\" as Exists, pointing at Production's own HealthDashboardDiagram — a domain-specific implementation, not a general-purpose foundation primitive. The new HealthSummary component fills that specific gap.",
    migrationEffort: "Low",
    migrationNote: "No migration needed — HealthDashboardDiagram stays as Production's own richer visualization; HealthSummary is additive, for contexts that only need the passive-indicator-grid version.",
  },
];

export function totalPromotionFiles(): number {
  return METADATA_PROMOTION_CANDIDATES.reduce((sum, candidate) => sum + candidate.count, 0);
}

export interface ResolvedMetadataMigration {
  id: string;
  title: string;
  filesMigrated: number;
  resolvedIn: string;
  note: string;
}

/**
 * Real migrations completed against this repository — not projected, not planned.
 * Kept separate from METADATA_PROMOTION_CANDIDATES above (which tracks current,
 * unresolved duplication) so the audit trail survives even after a candidate
 * is fully migrated.
 */
export const METADATA_RESOLVED_MIGRATIONS: ResolvedMetadataMigration[] = [
  {
    id: "accessibility-dl",
    title: "Hand-rolled Accessibility sections",
    filesMigrated: 9,
    resolvedIn: "the DescriptionList adoption pass",
    note: "All 9 files that hand-rolled the dl/dt/dd Accessibility block — including foundation-layout/page.tsx and foundation-components/page.tsx, the two pages that introduced and catalog DescriptionList but hadn't adopted it themselves — now render <DescriptionList items={...} /> directly, imported from @/components/metadata. Re-verified via grep immediately before migrating; the count hadn't drifted from the original finding. This is the Foundation Metadata System's first production adoption — status is Adoption In Progress, not Certified, since DescriptionList is one of 16 Metadata components and the rest of the family remains unadopted.",
  },
];
