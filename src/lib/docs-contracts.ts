import { NAV_REGISTRY, type NavEntry } from "./design-system-navigation";

/**
 * The seven documentation archetypes a page can be. This is NOT a new field
 * on NavEntry — it's derived from the two fields that already exist
 * (`pageType`, `badge`). Auditing the registry (DS-1E) found that every one
 * of the 70 entries' (pageType, badge) pairs already maps onto exactly one
 * of these seven without ambiguity; adding a third, hand-maintained
 * classification field would just be one more thing to keep in sync, for
 * data the first two fields already fully determine. See
 * docs/engineering-notes/11-documentation-infrastructure.md §2 for the
 * full (pageType, badge) → archetype mapping table this function encodes.
 */
export type DocArchetype =
  | "landing"
  | "reference"
  | "pattern"
  | "application"
  | "architecture"
  | "playground"
  | "historical-reference";

export function getArchetype(entry: NavEntry): DocArchetype {
  // pageType "landing" wins regardless of badge — a landing page is
  // structurally a landing page (hero title, entry-point grid, no
  // per-component reference content) no matter what it's classified as.
  if (entry.pageType === "landing") return "landing";
  if (entry.badge === "application") return "application";
  if (entry.badge === "architecture") return "architecture";
  if (entry.badge === "playground") return "playground";
  if (entry.badge === "historical-reference") return "historical-reference";
  if (entry.badge === "pattern") return "pattern";
  if (entry.pageType === "pattern") return "pattern";
  if (entry.pageType === "architecture") return "architecture";
  // badge undefined, "reference", "component", or "foundation", with
  // pageType "reference" — the large majority of the catalog.
  return "reference";
}

export interface PageContract {
  archetype: DocArchetype;
  /** What a page of this archetype is for, in one sentence — the test a new page's own scope should be checked against. */
  purpose: string;
  /** Sections a page of this archetype should have. Documentation of intent, not something the validator can see inside a page.tsx's JSX — see docs/DOCUMENTATION.md "What validation can and can't see." */
  expectedSections: string[];
  /** Whether DS_REGISTRY-level fields the validator CAN check are expected to be present. */
  requiresBadge: boolean;
  requiresRelatedOrPrevNext: boolean;
  /** Accessibility expectation specific to this archetype, beyond the site-wide baseline every page already inherits from DocsShell/GlobalNav. */
  accessibilityNote: string;
}

/**
 * One contract per archetype. This is the SPECIFICATION — what future pages
 * of each archetype should contain — used two ways: (1) as the contributor
 * reference in docs/DOCUMENTATION.md, (2) to drive the parts of
 * `design-system-navigation.test.ts` that check archetype-appropriate
 * registry fields (badge, related/previous-next). It does NOT drive
 * content-level enforcement (does this reference page actually render a
 * "when to use" section) — that requires parsing rendered JSX, which is
 * DS-1F's job (component-level certification), not this registry-level
 * validator's.
 */
export const PAGE_CONTRACTS: Record<DocArchetype, PageContract> = {
  landing: {
    archetype: "landing",
    purpose: "Orient a visitor arriving at a section for the first time and route them to the right next page.",
    expectedSections: ["hero title + description", "primary entry points grid", "what you'll learn (optional)"],
    requiresBadge: false,
    requiresRelatedOrPrevNext: false,
    accessibilityNote: "Entry-point cards must satisfy the same not-hover-only affordance every DocsLinkCard already provides.",
  },
  reference: {
    archetype: "reference",
    purpose: "Document one component family's purpose, states, and accessibility contract, with live examples.",
    expectedSections: ["overview", "when to use", "examples", "accessibility", "related components"],
    requiresBadge: true,
    requiresRelatedOrPrevNext: true,
    accessibilityNote: "Every documented state (default/disabled/loading/error/etc.) should be accessibility-relevant, not just visual.",
  },
  pattern: {
    archetype: "pattern",
    purpose: "Show a reusable composition solving a recurring problem, built entirely from already-documented components.",
    expectedSections: ["overview", "when to use", "composition", "related patterns"],
    requiresBadge: true,
    requiresRelatedOrPrevNext: true,
    accessibilityNote: "Should cite the accessibility contract of the components it composes rather than restating it.",
  },
  application: {
    archetype: "application",
    purpose: "Show a real domain platform assembled from the tier stack, as evidence the system produces real screens.",
    expectedSections: ["overview", "composition", "related platforms"],
    requiresBadge: true,
    requiresRelatedOrPrevNext: true,
    accessibilityNote: "Inherits its accessibility contract entirely from the tiers it composes — should not introduce new interaction patterns.",
  },
  architecture: {
    archetype: "architecture",
    purpose: "Explain a composition rule or layering relationship — no live examples, just how the pieces fit.",
    expectedSections: ["the rule or relationship", "why it exists", "related architecture pages"],
    requiresBadge: true,
    requiresRelatedOrPrevNext: true,
    accessibilityNote: "N/A beyond the site-wide baseline — architecture pages are prose and diagrams, not interactive controls.",
  },
  playground: {
    archetype: "playground",
    purpose: "Let someone experiment hands-on with an engine or token set — exploration, not reference lookup.",
    expectedSections: ["interactive controls", "live preview"],
    requiresBadge: true,
    requiresRelatedOrPrevNext: false,
    accessibilityNote: "Every interactive control must be keyboard-operable, and must respect prefers-reduced-motion where animation is involved.",
  },
  "historical-reference": {
    archetype: "historical-reference",
    purpose: "Keep a superseded page reachable for continuity without presenting it as current guidance.",
    expectedSections: ["superseded-by notice", "the archived content itself"],
    requiresBadge: true,
    requiresRelatedOrPrevNext: true,
    accessibilityNote: "N/A beyond the site-wide baseline.",
  },
};

/** Every entry in the registry, grouped by its derived archetype — the shape a coverage report reads directly. */
export function groupByArchetype(): Record<DocArchetype, NavEntry[]> {
  const groups = {
    landing: [],
    reference: [],
    pattern: [],
    application: [],
    architecture: [],
    playground: [],
    "historical-reference": [],
  } as Record<DocArchetype, NavEntry[]>;
  for (const entry of NAV_REGISTRY) {
    groups[getArchetype(entry)].push(entry);
  }
  return groups;
}
