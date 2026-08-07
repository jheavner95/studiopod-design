export interface BulkPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified all seven named domains
 * (Production, Publishing, Commerce, Products, Assets, Queues, Libraries)
 * — every one came back clean. The four MS-2.x Library Playground pages
 * were specifically re-checked (not assumed clean from a prior audit) and
 * confirmed to hold only single-item diagram-focus selection state, never
 * a Set, checkbox, or count — no multi-select bulk-action bar anywhere.
 */
export const BULK_PROMOTION_CANDIDATES: BulkPromotionCandidate[] = [];

export const BULK_CLEAN_FINDINGS: string[] = [
  "Production, Publishing, Commerce, Products, Assets, Queues: no hand-rolled bulk-action UI found anywhere in src/app or the matching src/{production,platforms,capabilities,workflows} component libraries — Publishing/Commerce/Assets/Queues appear only as static diagram examples (CommerceDiagram.tsx, PublishingDiagram.tsx, QueueFlow.tsx) or narrative text, never as selectable-list UI.",
  "Libraries (Workflow/Platform/Production/Capability Playground pages): every _sections file's selectedId/onSelect state (e.g. WorkflowGallerySection.tsx, PipelineGallerySection.tsx, RegistryGallerySection.tsx, NavigatorSection.tsx) is single-item selection for a diagram detail panel — never a Set, checkbox, or count. The shared ControlDock.tsx across all four is a playback toolbar only (speed/pause/replay/dev overlay toggles), not a bulk-action bar.",
  "grep -rn for independent bulk-bar implementations (selected.*Button|bulkActions|BulkAction|onClearSelection|confirmDelete|ConfirmDialog) returned only the already-known canonical pieces this package composes from — DataGridBulkActions.tsx, DataGridSelection.tsx, DataGridToolbar.tsx, and their existing gallery/consumer usages. No independent implementation exists.",
  "Confirmation-before-destructive-action: no hand-rolled \"Delete N items?\" dialog exists anywhere (grep for delete.*item|are you sure returned zero hits) — the only prior art is example copy inside the Foundation Overlay System's own Dialog gallery demo (\"This can't be undone...\"), not a component.",
  "Progress-during-bulk-operation and undo affordances: no \"processing X of Y\" pattern and no undo component/toast exists anywhere — the only \"undo\" text hits are static warning-tone copy strings inside FeedbackGallery.tsx and OverlayGallery.tsx demo content, not functional affordances.",
  "The component inventory tracked in inventory.ts (both the application-components and foundation-audit copies) has zero \"bulk\" mentions in either file — no pre-existing Exists/Partial/Needed note to reconcile, this is genuinely new capability tracked nowhere before now.",
];
