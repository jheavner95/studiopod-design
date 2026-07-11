export type BusinessFeatureVerdict = "Pass" | "Partial" | "Fail";

export interface BusinessFeatureCheck {
  part: string;
  verdict: BusinessFeatureVerdict;
  evidence: string;
}

/**
 * The same thirteen Composition Framework parts Application Composition
 * Certification checked, re-run against the pilot's CURRENT source rather
 * than reused from that page's own report — the pilot's own files have
 * changed since (see Adoption). Every evidence string below was
 * independently re-confirmed by reading the file directly during this
 * audit.
 */
export const BUSINESS_FEATURE_CHECKS: BusinessFeatureCheck[] = [
  { part: "Workspace", verdict: "Pass", evidence: "ProductionFeatureWorkspace.tsx still calls the hook once and composes ProductionWorkspace as the single outer shell page.tsx mounts — unchanged." },
  { part: "Navigation", verdict: "Pass", evidence: "ProductionFeatureNavigation.tsx still composes Foundation's own Tabs for Pipeline/Queue/Dashboard view switching — unchanged." },
  { part: "Views", verdict: "Pass", evidence: "ProductionFeatureCanvas.tsx still switches between the three feature-owned views — the file changed (34 lines) this session but the three-view structure itself did not." },
  { part: "Dialogs", verdict: "Pass", evidence: "ProductionFeatureDialogs.tsx still implements all five named dialogs; its own diff this session added per-dialog announcement text via the hook's confirmDialog, not new dialog types." },
  { part: "Inspector", verdict: "Pass", evidence: "ProductionFeatureInspector.tsx still composes ProductionInspector with the selected artwork's properties — plus a new focus-restoration fix for the delete-while-selected case, independently re-verified present (emptyStateRef + hadArtworkRef + a useEffect that moves focus only on the had-a-selection → lost-it transition, not on first mount)." },
  { part: "Commands", verdict: "Pass", evidence: "ProductionFeatureActions.tsx still exposes the same five commands — unchanged." },
  { part: "Validation", verdict: "Pass", evidence: "ProductionFeatureValidation.tsx still renders gate status and the live quality-issue checklist — unchanged." },
  { part: "Metrics", verdict: "Pass", evidence: "ProductionFeatureMetrics.tsx still renders feature-computed KPIs at columns={2}, the fix Application Composition Certification's own promotion review already recorded — re-confirmed still present, not regressed." },
  { part: "Actions", verdict: "Pass", evidence: "Still the same single component serving both Commands and Actions, per the framework's own small-feature exception." },
  { part: "Selection", verdict: "Pass", evidence: "selectedId / selectArtwork in the hook still drive Inspector, Validation, and row highlighting together — now additionally announced via useAnnounce on every change, independently re-verified present." },
  { part: "Feature state", verdict: "Pass", evidence: "The full artworks array, view, dialog state, and undo/redo history still live in useProductionWorkspace and nowhere else — the hook grew by 53 lines this session (the announce wiring) without moving any state out of itself." },
  { part: "Repository boundary", verdict: "Pass", evidence: "mock-production.ts's own transform functions are still the pilot's only data-access layer — re-confirmed zero fetch/axios/XMLHttpRequest anywhere in the pilot directory by direct grep." },
  { part: "API boundary", verdict: "Pass", evidence: "Still no API layer anywhere in the pilot — re-confirmed." },
];

export const BUSINESS_FEATURE_NEW_FINDINGS = [
  {
    title: "Live-region wiring, verified present and functioning as designed",
    detail: "useProductionWorkspace now calls useAnnounce() from the shared LiveRegionProvider on selection changes (\"<name> selected.\"), stage advances (\"<name> moved to <stage>.\"), validation transitions (\"<name> validation: <status>.\"), and dialog-confirm completions — 8 call sites, all inside the hook (the feature's own Services layer), not scattered across presentation components. This independently closes the exact gap Application Composition Certification's own promotion-review.ts recorded as Deferred (\"No aria-live wiring for feature-level state changes\") — that entry should be read as resolved as of this audit, not as still open.",
  },
  {
    title: "Focus-restoration fix for delete-while-selected, not previously documented anywhere",
    detail: "Deleting the selected artwork (confirmDialog's delete case) nulls selectedId in the same commit that removes the artwork, unmounting the Inspector's own trigger buttons before Dialog's shared useFocusTrap cleanup runs its focus-restoration step — focus()'ing an already-detached node is a no-op, so focus was silently dropping to <body>. ProductionFeatureInspector.tsx now moves focus to its own empty-state message on exactly the had-a-selection → lost-it transition. This was found by reading the current diff directly during this audit; it is not recorded in Application Composition Certification, Accessibility Certification, or any other prior page.",
  },
];

export const BUSINESS_FEATURE_SUMMARY =
  "All thirteen Composition Framework parts still clear a clean Pass against the pilot's current source — the same result Application Composition Certification reported, independently re-verified rather than assumed unchanged. Two genuine improvements landed in the pilot since that page was written (live-region announcement wiring and a focus-restoration fix), neither previously disclosed anywhere; both are real, source-verified, and net positive. No new defect was found in the pilot during this pass.";
