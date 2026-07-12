export type TierScope = "Foundation" | "Operational";

export interface TierReview {
  code: string;
  tier: TierScope;
  name: string;
  href: string;
  filesModified: string[];
  resolvedCount: number;
  deferredCount: number;
  rejectedCount: number;
  summary: string;
}

/**
 * The two tiers this certification independently re-audited for accessibility
 * and interaction quality — Foundation (the generic primitives every other
 * tier composes from) and Operational (the composed panels/screens built on
 * top of Foundation). Workflow and Platform tiers are out of scope for this
 * pass; each is a re-export/composition layer over Foundation and Operational
 * and is called out explicitly in the Roadmap below as the next scope to
 * extend this same audit to, rather than silently assumed clean.
 */
export const TIER_REVIEWS: TierReview[] = [
  {
    code: "DS-6.3a",
    tier: "Foundation",
    name: "Foundation Systems",
    href: "/application-components/foundation-audit",
    filesModified: [
      "src/components/overlay/Tooltip.tsx",
      "src/components/overlay/Popover.tsx",
      "src/components/navigation/NavigationItem.tsx",
      "src/components/layout/ScrollArea.tsx",
      "src/components/form/ValidationSummary.tsx",
      "src/app/application-components/foundation-overlays/_components/OverlayGallery.tsx",
      "src/app/application-components/foundation-audit/_data/inventory.ts",
      "src/app/application-components/foundation-audit/_data/certification.ts",
    ],
    resolvedCount: 8,
    deferredCount: 1,
    rejectedCount: 0,
    summary: "Eight real defects found and fixed in the same pass — two false documentation superlatives, four missing-accessible-name gaps, one missing keyboard stop, and one duplicated feedback-role ternary consolidated onto the shared helper. One genuine but lower-severity keyboard gap (TableRow's mouse-only shift-click range select) disclosed and deferred rather than fixed speculatively.",
  },
  {
    code: "DS-6.3b",
    tier: "Operational",
    name: "Operational Systems",
    href: "/application-components/operational-certification",
    filesModified: ["src/components/operational/PropertyColor.tsx", "src/app/application-components/filter-search/_components/FilterSearchGallery.tsx"],
    resolvedCount: 2,
    deferredCount: 4,
    rejectedCount: 0,
    summary: "Two real defects fixed and verified live in the browser. Four real, verified gaps disclosed and deferred rather than fixed out of scope: a shared Foundation-tier keyboard gap surfacing through DataGrid/Queue, two systemic live-region gaps where useAnnounce() wiring remains unimplemented, and an unconfirmed touch-target sweep across four icon-only affordances.",
  },
];

export const TOTAL_FILES_MODIFIED = new Set(TIER_REVIEWS.flatMap((t) => t.filesModified)).size;
export const TOTAL_RESOLVED = TIER_REVIEWS.reduce((sum, t) => sum + t.resolvedCount, 0);
export const TOTAL_DEFERRED = TIER_REVIEWS.reduce((sum, t) => sum + t.deferredCount, 0);
export const TOTAL_REJECTED = TIER_REVIEWS.reduce((sum, t) => sum + t.rejectedCount, 0);
