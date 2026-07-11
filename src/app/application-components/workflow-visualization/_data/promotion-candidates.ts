export interface WorkflowVizPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * Two dispatched research agents grep-verified six named domains —
 * Production, Publishing, Commerce, Planning, Automation, Intelligence —
 * plus a full read of the Illustration Library's own IllustrationCanvas
 * and dev-mode context, since this package's own instructions explicitly
 * require that audit. No genuine canvas/viewport/pan-state/minimap/
 * multi-select implementation was found anywhere outside
 * src/components/workflow/ — see WORKFLOW_VIZ_CLEAN_FINDINGS below for what
 * was actually checked.
 */
export const WORKFLOW_VIZ_PROMOTION_CANDIDATES: WorkflowVizPromotionCandidate[] = [];

export const WORKFLOW_VIZ_CLEAN_FINDINGS: string[] = [
  "Illustration Library (src/illustrations/primitives/IllustrationCanvas.tsx, src/illustrations/dev/context.tsx), read in full per this package's own explicit instruction to audit it: layout is one-shot (computeLayout via useMemo, no transform/offset state, no drag/wheel/pinch handlers), overflow is handled by native browser scroll rather than a tracked pan state, selection is a single onSelectNode?: (id) => void callback with no Set/multi-select, and there is no minimap, toolbar, or zoom/fit-to-view concept anywhere in the primitives or the dev-mode context (which is a flat set of six debug-overlay booleans — grid/anchorPoints/nodeBounds/etc. — for a documentation playground, not a viewport toolbar). Confirmed zero overlap with this package's own Canvas/Viewport/MiniMap/Selection/Controls concerns.",
  "Production (src/production/): ArtifactLifecycleDiagram/ProductionPipelineDiagram/QualityGateDiagram/HealthDashboardDiagram are either thin IllustrationCanvas wrappers or plain CSS grids of status cards — no pan/zoom/viewport/selection state anywhere in the domain.",
  "Publishing, Commerce: no src/publishing/ or src/commerce/ directories exist. All matches are business-domain labels inside capability/platform diagram data (PublishingDiagram.tsx, CommerceDiagram.tsx), themselves thin IllustrationCanvas wrappers with the same single-select-only ceiling as the Illustration Library itself.",
  "Planning, Automation: no src/planning/ or src/automation/ directory exists anywhere in the repo — reconfirmed via a full directory search, consistent with every prior Workflow Component Library audit this session.",
  "Intelligence: the only \"intelligence\"-named file remains a static PlatformArchitecture example fed into IllustrationCanvas — no standalone module, no canvas logic.",
  "src/platforms/components/PlatformMiniMap.tsx and src/workflows/components/WorkflowMiniMap.tsx are misleadingly named: both read on full inspection as label-less AnimatedNode/AnimatedConnector status strips, not spatial viewport-position thumbnails — no coordinate system, no click-to-navigate behavior. Confirmed as a naming-collision-only risk (this package's own WorkflowMiniMap and the plural src/workflows/ family's WorkflowMiniMap/WorkflowLegend live at different import paths and render differently), not a duplicate to migrate away from — each new file's own doc comment names this explicitly, the same distinct-scope-same-name treatment WorkflowProgress.tsx and WorkflowTimeline.tsx already established for their own src/workflows/ namesakes.",
  "src/platforms/components/PlatformRelationshipMap.tsx and src/capabilities/components/CapabilityRegistryDiagram.tsx (DS-3.7's own Promotion Candidates, about dependency-edge modeling) were re-checked against this package's different concerns — canvas/viewport/minimap/multi-select — and confirmed those concerns do not apply: both remain thin IllustrationCanvas wrappers with single-select only.",
  "Foundation's own Data Grid selection helpers (toggleSelection/selectAll/isAllSelected/isPartiallySelected/useDataGridSelection, src/components/operational/DataGridSelection.tsx) and Bulk Actions System's own BulkActionBar were confirmed as a real, generic, already-built selection-state shape — not a duplicate to remove, but the reuse target WorkflowSelection is built directly on rather than a bespoke selection model.",
];
