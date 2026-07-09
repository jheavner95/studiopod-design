import { FOUNDATION_COMPONENTS, type FoundationComponent } from "./catalog";

export interface FoundationBlocker {
  id: string;
  targetPackage: string;
  targetDescription: string;
  /** Component ids resolved live against FOUNDATION_COMPONENTS — never a restated name/status. */
  blockingComponentIds: string[];
}

/**
 * The four DS-2.x packages this catalog directly blocks, none of which are
 * built yet — listed here so a reader can see exactly what has to exist
 * first, not just that "more work" is coming.
 */
export const FOUNDATION_BLOCKERS: FoundationBlocker[] = [
  {
    id: "ds-2-2",
    targetPackage: "DS-2.2 Asset Components",
    targetDescription: "Library browsing, asset cards, and selection — not yet built.",
    blockingComponentIds: ["table", "chip", "avatar", "empty-state", "skeleton", "checkbox"],
  },
  {
    id: "ds-2-3",
    targetPackage: "DS-2.3 Inspector Components",
    targetDescription: "Property editing, region switching, and structured detail — not yet built.",
    blockingComponentIds: ["tabs", "description-list", "combobox", "divider", "tooltip"],
  },
  {
    id: "ds-2-4",
    targetPackage: "DS-2.4 Workflow Components",
    targetDescription: "Queue tables, job cards, and multi-step approval — not yet built.",
    blockingComponentIds: ["table", "progress", "stepper", "toast", "menu", "dropdown-button"],
  },
  {
    id: "ds-2-5",
    targetPackage: "DS-2.5 Operational Components",
    targetDescription: "Diagnostics, health summaries, and platform-wide status — not yet built.",
    blockingComponentIds: ["alert", "spinner", "table", "list", "popover", "chip"],
  },
];

export function resolveBlockers(blocker: FoundationBlocker): FoundationComponent[] {
  return blocker.blockingComponentIds
    .map((id) => FOUNDATION_COMPONENTS.find((c) => c.id === id))
    .filter((c): c is FoundationComponent => c !== undefined);
}
