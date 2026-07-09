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
    id: "accessibility-dl",
    title: "Hand-rolled Accessibility sections",
    files: [
      "status-workspace/page.tsx",
      "workspace-toolbar/page.tsx",
      "primary-workspace/page.tsx",
      "foundation-layout/page.tsx",
      "workspace-layout/page.tsx",
      "asset-workspace/page.tsx",
      "workspace-header/page.tsx",
      "inspector-workspace/page.tsx",
      "foundation-components/page.tsx",
    ],
    count: 9,
    findingCommand: String.raw`grep -rl 'dl className="flex flex-col"' src/app/application-components/`,
    description: "Nine pages still hand-roll the dl/dt/dd Accessibility block — including foundation-layout and foundation-components, the two pages that introduced and catalog DescriptionList itself, but never adopted it for their own Accessibility section.",
    migrationEffort: "Low",
    migrationNote: "Each is a direct swap to <DescriptionList items={...} /> — the exact migration Foundation Layout's own page already proves out in its Cell Types and other sections.",
  },
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
    description: "The DS-0.2 inventory already tracks \"Health Summary\" as Exists, pointing at Production's own HealthDashboardDiagram — a domain-specific implementation, not a general-purpose foundation primitive. The new HealthSummary component fills that specific gap.",
    migrationEffort: "Low",
    migrationNote: "No migration needed — HealthDashboardDiagram stays as Production's own richer visualization; HealthSummary is additive, for contexts that only need the passive-indicator-grid version.",
  },
];

export function totalPromotionFiles(): number {
  return METADATA_PROMOTION_CANDIDATES.reduce((sum, candidate) => sum + candidate.count, 0);
}
