export interface BlueprintNode {
  id: string;
  tier: number;
  name: string;
  href: string | null;
  purpose: string;
  relationship: string;
}

/**
 * The canonical StudioPOD workspace tree, six tiers top to bottom. Tier 4
 * is the only tier with more than one node — Asset, Primary, and Inspector
 * sit side by side as peers. Every node with a documented DS-1 page links
 * to it; Global Navigation links to the inventory group it lives in
 * instead, since it doesn't have a dedicated DS-1 page of its own.
 */
export const BLUEPRINT_NODES: BlueprintNode[] = [
  {
    id: "global-navigation",
    tier: 1,
    name: "Global Navigation",
    href: "/application-components/inventory#workspace-structure",
    purpose: "Getting from one part of StudioPOD to another — the one region that sits outside any single workspace.",
    relationship: "Everything below it lives inside whichever destination Global Navigation points to.",
  },
  {
    id: "workspace-header",
    tier: 2,
    name: "Workspace Header",
    href: "/application-components/workspace-header",
    purpose: "Confirms platform, status, and context the instant a workspace loads.",
    relationship: "Sits directly beneath Global Navigation, above everything specific to this workspace.",
  },
  {
    id: "workspace-toolbar",
    tier: 3,
    name: "Workspace Toolbar",
    href: "/application-components/workspace-toolbar",
    purpose: "Carries the interaction the Header intentionally leaves out.",
    relationship: "Reads the Header's context to decide which actions are available, without repeating that context itself.",
  },
  {
    id: "asset-workspace",
    tier: 4,
    name: "Asset Workspace",
    href: "/application-components/asset-workspace",
    purpose: "Browsing and selecting from a library of assets, where the platform has one.",
    relationship: "A peer of Primary and Inspector — feeds a selection into the Primary Workspace and Inspector, doesn't replace either.",
  },
  {
    id: "primary-workspace",
    tier: 4,
    name: "Primary Workspace",
    href: "/application-components/primary-workspace",
    purpose: "The one focused working surface for whatever task is active right now.",
    relationship: "The center peer of the row — Asset feeds it a selection, Inspector edits what it's currently showing.",
  },
  {
    id: "inspector-workspace",
    tier: 4,
    name: "Inspector Workspace",
    href: "/application-components/inspector-workspace",
    purpose: "Contextual detail and editing for whatever is currently selected.",
    relationship: "A peer of Asset and Primary — has no purpose without a current selection from either of them.",
  },
  {
    id: "status-workspace",
    tier: 6,
    name: "Operational Status Workspace",
    href: "/application-components/status-workspace",
    purpose: "Ambient awareness of background work, notifications, and platform health.",
    relationship: "Sits beneath the entire working row — reports on all three peers without interrupting any of them.",
  },
];

export interface BlueprintSupport {
  id: string;
  name: string;
  href: string;
  role: string;
}

/** The two DS-1 pages that don't appear as boxes in the tree because they aren't regions themselves — they're the rules governing how every tier above composes. */
export const BLUEPRINT_SUPPORTING_PAGES: BlueprintSupport[] = [
  {
    id: "workspace-framework",
    name: "Workspace Framework",
    href: "/application-components/workspace-framework",
    role: "Defines the shell every tier in this blueprint is mounted inside.",
  },
  {
    id: "workspace-layout",
    name: "Workspace Layout",
    href: "/application-components/workspace-layout",
    role: "Defines the width, density, and responsive rules that make every tier compose consistently.",
  },
];
