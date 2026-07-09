import { INVENTORY_GROUPS, type InventoryStatus } from "../inventory/_data/inventory";

const ALL_ITEMS = INVENTORY_GROUPS.flatMap((group) => group.items);

export const PLATFORMS = [
  "Publishing",
  "Commerce",
  "Production",
  "Assets",
  "Integrations",
  "Admin",
  "Intelligence",
  "Operations",
] as const;

export type Platform = (typeof PLATFORMS)[number];
export type CoverageState = "Used" | "Partial" | "Planned";

interface CoverageRowDef {
  itemName: string;
  /**
   * Platforms this component is domain-relevant to. Cross-cutting
   * components (Section Header, Filter Bar, etc.) list every platform.
   * A platform outside this list can never show "Used" or "Partial" at
   * a level above the item's own inventory status allows — see
   * `deriveCoverageState`.
   */
  relevantPlatforms: readonly Platform[];
}

const ALL_PLATFORMS = PLATFORMS;

const COVERAGE_ROW_DEFS: CoverageRowDef[] = [
  { itemName: "Workspace Shell", relevantPlatforms: ALL_PLATFORMS },
  { itemName: "Workspace Header", relevantPlatforms: ALL_PLATFORMS },
  { itemName: "Workspace Navigation", relevantPlatforms: ALL_PLATFORMS },
  { itemName: "Section Header", relevantPlatforms: ALL_PLATFORMS },
  { itemName: "Inspector Panel", relevantPlatforms: ["Production", "Assets", "Integrations", "Operations"] },
  { itemName: "Library Grid", relevantPlatforms: ALL_PLATFORMS },
  { itemName: "Library Table", relevantPlatforms: ALL_PLATFORMS },
  { itemName: "Asset Card", relevantPlatforms: ["Publishing", "Commerce", "Production", "Assets"] },
  { itemName: "Filter Bar", relevantPlatforms: ALL_PLATFORMS },
  { itemName: "Queue Table", relevantPlatforms: ["Production", "Integrations", "Operations"] },
  { itemName: "Job Status Card", relevantPlatforms: ["Production", "Integrations", "Operations"] },
  { itemName: "Batch Action Bar", relevantPlatforms: ["Production", "Assets", "Operations"] },
  { itemName: "Activity Timeline", relevantPlatforms: ["Production", "Assets", "Admin", "Operations"] },
  { itemName: "Health Summary", relevantPlatforms: ["Production", "Integrations", "Operations"] },
  { itemName: "Validation Panel", relevantPlatforms: ["Production", "Assets"] },
  { itemName: "QA Finding Card", relevantPlatforms: ["Production", "Assets"] },
  { itemName: "Provider Card", relevantPlatforms: ["Integrations", "Admin", "Operations"] },
  { itemName: "Capability Matrix", relevantPlatforms: ["Integrations", "Admin", "Intelligence"] },
  { itemName: "Diagnostics Panel", relevantPlatforms: ["Integrations", "Admin", "Operations"] },
  { itemName: "Metrics Card", relevantPlatforms: ALL_PLATFORMS },
];

export interface CoverageRow {
  itemName: string;
  status: InventoryStatus;
  cells: Record<Platform, CoverageState>;
}

/**
 * Deriving, not hand-typing, 160 cells: an item's inventory status sets a
 * ceiling (Needed → Planned everywhere; nothing can show as more built
 * than the inventory says it is), and domain relevance decides which
 * platforms sit at that ceiling vs. one tier below it.
 */
function deriveCoverageState(status: InventoryStatus, isRelevant: boolean): CoverageState {
  if (status === "Needed") return "Planned";
  if (status === "Partial") return isRelevant ? "Partial" : "Planned";
  return isRelevant ? "Used" : "Partial";
}

export const COVERAGE_ROWS: CoverageRow[] = COVERAGE_ROW_DEFS.map((def) => {
  const item = ALL_ITEMS.find((i) => i.name === def.itemName);
  if (!item) throw new Error(`Coverage matrix references unknown inventory item: ${def.itemName}`);

  const cells = Object.fromEntries(
    PLATFORMS.map((platform) => [
      platform,
      deriveCoverageState(item.status, def.relevantPlatforms.includes(platform)),
    ]),
  ) as Record<Platform, CoverageState>;

  return { itemName: def.itemName, status: item.status, cells };
});
