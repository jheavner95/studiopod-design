import { levelForScore, type CertificationLevel } from "./certification-levels";

export interface ScorecardCategory {
  id: string;
  label: string;
  weight: number;
  purpose: string;
  passingCriteria: string;
  href: string | null;
}

/**
 * The nine categories a workspace is scored against. Weights are raw
 * points, not percentages — they sum to 110, not 100 (see
 * TOTAL_POSSIBLE_POINTS below). A category's own passing criteria is a
 * short restatement, not a copy, of the standard its source page already
 * establishes.
 */
export const SCORECARD_CATEGORIES: ScorecardCategory[] = [
  {
    id: "workspace-shell",
    label: "Workspace Shell",
    weight: 15,
    purpose: "Whether the seven-region shell anatomy is present and positioned correctly.",
    passingCriteria: "All required shell regions implemented; region order matches the canonical blueprint.",
    href: "/application-components/workspace-framework",
  },
  {
    id: "workspace-header",
    label: "Workspace Header",
    weight: 10,
    purpose: "Whether the header identifies platform, status, actions, and context without overreaching into interaction.",
    passingCriteria: "Header regions stay contextual; no primary interaction has leaked in from the Toolbar.",
    href: "/application-components/workspace-header",
  },
  {
    id: "workspace-layout",
    label: "Workspace Layout",
    weight: 10,
    purpose: "Whether width, density, scrolling, and spacing follow the documented layout rules.",
    passingCriteria: "Responsive width and density modes match one of the documented rules at every breakpoint.",
    href: "/application-components/workspace-layout",
  },
  {
    id: "workspace-toolbar",
    label: "Workspace Toolbar",
    weight: 10,
    purpose: "Whether the toolbar carries interaction and leaves context to the Header.",
    passingCriteria: "Toolbar contains only actions and interaction affordances; no identity or status content duplicated from the Header.",
    href: "/application-components/workspace-toolbar",
  },
  {
    id: "asset-workspace",
    label: "Asset Workspace",
    weight: 15,
    purpose: "Whether library browsing and selection follow the documented asset anatomy, where the platform uses one.",
    passingCriteria: "Selection model, card anatomy, and empty states match the Asset Workspace documentation.",
    href: "/application-components/asset-workspace",
  },
  {
    id: "primary-workspace",
    label: "Primary Workspace",
    weight: 15,
    purpose: "Whether the primary working surface stays focused on one task at a time.",
    passingCriteria: "The active mode matches a documented Primary Workspace mode; no competing primary task is visible at once.",
    href: "/application-components/primary-workspace",
  },
  {
    id: "inspector-workspace",
    label: "Inspector Workspace",
    weight: 15,
    purpose: "Whether the Inspector responds to selection rather than acting as a second primary workspace.",
    passingCriteria: "Every Inspector region traces back to the current selection; the Inspector never drives navigation on its own.",
    href: "/application-components/inspector-workspace",
  },
  {
    id: "status-workspace",
    label: "Operational Status Workspace",
    weight: 10,
    purpose: "Whether background jobs, notifications, and health stay passive and discoverable rather than interrupting.",
    passingCriteria: "No operational surface steals focus uninvited; severity and priority tiering match the documented rules.",
    href: "/application-components/status-workspace",
  },
  {
    id: "accessibility",
    label: "Accessibility",
    weight: 10,
    purpose: "Whether the workspace meets the accessibility guidance every DS-1 page documents for its own regions.",
    passingCriteria: "Keyboard access, live regions, reduced motion, and focus behavior verified — not just documented as intent.",
    href: null,
  },
];

/** The raw point total every category's weight sums to — 110, not 100. */
export const TOTAL_POSSIBLE_POINTS = SCORECARD_CATEGORIES.reduce((sum, category) => sum + category.weight, 0);

/** A category's share of the full scorecard, expressed as a percentage of TOTAL_POSSIBLE_POINTS. */
export function contributionPercent(category: ScorecardCategory): number {
  return Math.round((category.weight / TOTAL_POSSIBLE_POINTS) * 1000) / 10;
}

export interface ExampleScoreEntry {
  categoryId: string;
  earned: number;
  note: string;
}

/** A hypothetical Commerce workspace's scorecard — illustrative only, not a real certification result. */
export const EXAMPLE_SCORE: ExampleScoreEntry[] = [
  { categoryId: "workspace-shell", earned: 15, note: "Full seven-region shell, correctly ordered." },
  { categoryId: "workspace-header", earned: 8, note: "Provider Status duplicated in the Toolbar — minor overlap." },
  { categoryId: "workspace-layout", earned: 10, note: "All three breakpoints documented and verified." },
  { categoryId: "workspace-toolbar", earned: 7, note: "Same Provider Status duplication counted against it here too." },
  { categoryId: "asset-workspace", earned: 15, note: "Library, selection, and empty states all match the anatomy." },
  { categoryId: "primary-workspace", earned: 12, note: "Focused, but Detail and List modes are reachable simultaneously in one edge case." },
  { categoryId: "inspector-workspace", earned: 15, note: "Fully selection-driven, no independent navigation." },
  { categoryId: "status-workspace", earned: 10, note: "Notifications correctly deprioritized behind Errors and Warnings." },
  { categoryId: "accessibility", earned: 6, note: "Keyboard access verified; reduced-motion behavior still undocumented." },
];

export interface ExampleScoreTotal {
  earned: number;
  possible: number;
  percent: number;
  level: CertificationLevel;
}

export function computeExampleTotal(): ExampleScoreTotal {
  const earned = EXAMPLE_SCORE.reduce((sum, entry) => sum + entry.earned, 0);
  const percent = Math.round((earned / TOTAL_POSSIBLE_POINTS) * 100);
  return { earned, possible: TOTAL_POSSIBLE_POINTS, percent, level: levelForScore(percent) };
}
