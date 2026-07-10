export interface FeedbackPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified all seven target categories
 * (health panels, validation panels, status badges, loading indicators,
 * skeletons, empty states, notifications) against src/app — every one came
 * back clean. This is a genuinely different result from every prior
 * Foundation package's audit (Table, Metadata, Forms, Navigation all found
 * real duplication) — recorded honestly rather than manufacturing findings
 * to match the pattern.
 */
export const FEEDBACK_PROMOTION_CANDIDATES: FeedbackPromotionCandidate[] = [
  {
    id: "unsaved-changes-banner",
    pattern: "Persistent message + actions bar",
    files: ["src/components/form/UnsavedChangesBanner.tsx (27 lines)"],
    description:
      "A real, already-shipped instance of exactly the Banner shape (role=\"status\", message + primary/discard actions) — built directly on Surface + Inline rather than this package's new Banner primitive. Not duplicated anywhere else: grep -rln \"UnsavedChangesBanner\" src/app returns zero matches, so it's a single bespoke instance, not a pattern repeated across pages.",
    migrationNote:
      "A one-file candidate for a future adoption pilot to rebuild on Banner, not a multi-file duplication problem. Left untouched in this package, which only builds new components and does not migrate existing ones.",
  },
];

export const FEEDBACK_CLEAN_FINDINGS: string[] = [
  "Health panels: every hit (15 files) already composes HealthIndicator, StatusBadge, HealthSummary, HealthDashboardDiagram, or MetricsComposition variant=\"health\" — no hand-rolled dot+label markup found.",
  "Validation panels: foundation-forms/_components/ValidationDemo.tsx correctly imports the real ValidationSummary from @/components/form; every other hit uses the unrelated Production package's ValidationDiagram/ValidationTimeline/ValidationLegend (pipeline-stage visualization, not a validation-list UI).",
  "Status badges: no hand-rolled function ...Badge() helpers exist anywhere in src/app — every hit uses the shared TableStatusCell or illustration StatusBadge.",
  "Loading indicators: no hand-rolled Loader2/animate-spin markup — every hit uses Button's built-in loading prop, SearchInput's loading prop, or TableLoadingState.",
  "Skeletons: the one file using skeleton markup outside src/components (design-system/_sections/ComponentGallerySection.tsx) correctly composes the shared Skeleton — it's a documentation gallery for the primitive, not a reimplementation.",
  "Empty states: foundation-table's StatesDemo uses the shared TableEmptyState; asset-workspace/page.tsx's EMPTY_STATES data is documentation content describing planned empty states, not a rendered placeholder block; compositions/_lib/registry.tsx correctly uses EmptyComposition.",
  "Notifications: no notification-list/toast UI exists anywhere in src/app to duplicate — the Operational Status Notifications region and the Foundation Component Catalog's toast/alert entries were, until this package, purely planned (status: \"Needed\"), not built and copy-pasted.",
];
