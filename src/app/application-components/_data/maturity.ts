import { INVENTORY_GROUPS, type InventoryStatus } from "../inventory/_data/inventory";

export type MaturityLevel = "Concept" | "Prototype" | "Production Ready" | "Certified" | "Locked";

export const MATURITY_LEVELS: { level: MaturityLevel; description: string }[] = [
  {
    level: "Concept",
    description: "Named and scoped, nothing built. Equivalent to an inventory item marked \"Needed.\"",
  },
  {
    level: "Prototype",
    description:
      "A working version exists, often as a pattern borrowed from an adjacent component rather than its own reusable primitive. Equivalent to \"Partial.\"",
  },
  {
    level: "Production Ready",
    description:
      "A real, reusable component exists and is safe to build a screen with. Equivalent to \"Exists\" — but not yet proven under real usage.",
  },
  {
    level: "Certified",
    description:
      "Production Ready, plus verified: accessibility pass, responsive at all three breakpoints, used in at least one real (non-playground) screen.",
  },
  {
    level: "Locked",
    description:
      "Certified and stable enough that its API is a contract — changing it requires a deliberate migration, not a quick edit. Reserved for the most foundational primitives.",
  },
];

/** The default maturity a component reaches purely from its inventory status — see the page copy for why Certified/Locked have zero entries today. */
export const MATURITY_FROM_STATUS: Record<InventoryStatus, MaturityLevel> = {
  Needed: "Concept",
  Partial: "Prototype",
  Exists: "Production Ready",
};

export interface MaturityRow {
  itemName: string;
  groupTitle: string;
  level: MaturityLevel;
}

/** Every inventory item, mapped to its default maturity level — reused, not duplicated, from the inventory's own status field. */
export const MATURITY_ROWS: MaturityRow[] = INVENTORY_GROUPS.flatMap((group) =>
  group.items.map((item) => ({
    itemName: item.name,
    groupTitle: group.title.replace(/^\d+\.\s*/, ""),
    level: MATURITY_FROM_STATUS[item.status],
  })),
);
