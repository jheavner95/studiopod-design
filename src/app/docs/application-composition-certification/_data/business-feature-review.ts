export type BusinessFeatureVerdict = "Pass" | "Partial" | "Fail";

export interface BusinessFeatureCheck {
  part: string;
  verdict: BusinessFeatureVerdict;
  evidence: string;
}

/**
 * The thirteen parts this package's own work order names under BUSINESS
 * FEATURE REVIEW, each checked against the pilot's own real file, not a
 * description of what the file is supposed to do.
 */
export const BUSINESS_FEATURE_CHECKS: BusinessFeatureCheck[] = [
  { part: "Workspace", verdict: "Pass", evidence: "ProductionFeatureWorkspace.tsx calls the hook once and composes ProductionWorkspace as the outer shell — the single component page.tsx mounts." },
  { part: "Navigation", verdict: "Pass", evidence: "ProductionFeatureNavigation.tsx composes Foundation's own Tabs for Pipeline/Queue/Dashboard view switching, verified working via click interaction in browser QA." },
  { part: "Views", verdict: "Pass", evidence: "ProductionFeatureCanvas.tsx switches between three feature-owned views (pipeline, queue, dashboard) — verified all three render correctly in browser QA." },
  { part: "Dialogs", verdict: "Pass", evidence: "ProductionFeatureDialogs.tsx implements all five named dialogs (Validation, Delete, Publish, Export, Confirmation), switching on one piece of hook-owned state — the Advance Stage confirmation flow was manually exercised end to end in the pilot's own browser QA." },
  { part: "Inspector", verdict: "Pass", evidence: "ProductionFeatureInspector.tsx composes ProductionInspector with the selected artwork's own properties and this feature's own Actions in its footer slot." },
  { part: "Commands", verdict: "Pass", evidence: "ProductionFeatureActions.tsx exposes five commands (Advance stage, Advance validation, Publish, Export, Delete), each opening the correct dialog or invoking the correct hook action." },
  { part: "Validation", verdict: "Pass", evidence: "ProductionFeatureValidation.tsx renders the gate status and a live quality-issue checklist, with issue toggling verified working in browser QA." },
  { part: "Metrics", verdict: "Pass", evidence: "ProductionFeatureMetrics.tsx renders feature-computed KPIs; the one real defect found and fixed this session (columns={4} overflowing its container) is documented in Promotion Review." },
  { part: "Actions", verdict: "Pass", evidence: "Distinct from Commands only in naming — ProductionFeatureActions.tsx is the single component serving both; the framework's own Feature Architecture treats Commands and Actions as the same concern for a feature this size, and the pilot follows that." },
  { part: "Selection", verdict: "Pass", evidence: "selectedId / selectArtwork in the hook, verified working end to end: clicking an artwork updates the Inspector, Validation panel, and the ring highlight on the selected row." },
  { part: "Feature state", verdict: "Pass", evidence: "The full artworks array, view, dialog state, and undo/redo history all live in useProductionWorkspace and nowhere else." },
  { part: "Repository boundary", verdict: "Pass", evidence: "mock-production.ts's own transform functions (advanceProductionStage, advanceValidationStatus, toggleIssueResolved, publishArtwork, exportArtwork) are the pilot's only data-access layer, and are pure and synchronous — no fetch/axios/XHR anywhere, confirmed by direct grep." },
  { part: "API boundary", verdict: "Pass", evidence: "No API layer exists in this pilot, correctly — the work order explicitly forbids one (\"Do NOT call APIs\"), and none was built." },
];
