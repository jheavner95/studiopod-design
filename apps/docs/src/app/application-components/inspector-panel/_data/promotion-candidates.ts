export interface InspectorPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified all six named domains
 * (Production, Publishing, Commerce, Products, QA, Settings) against
 * src/app — every one came back clean, no full inspector-panel
 * implementation exists there. The one real finding came from following a
 * lead in the DS-0.2 inventory's own "Inspector Panel" entry (status:
 * "Partial", noting the pattern "recurs domain-by-domain") into
 * src/platforms, src/capabilities, and src/workflows directly — a genuine,
 * grep-verified duplication, distinct from the app-level pages.
 */
export const INSPECTOR_PROMOTION_CANDIDATES: InspectorPromotionCandidate[] = [
  {
    id: "expandable-detail-panel",
    pattern: "Expandable object detail panel",
    files: [
      "src/platforms/components/PlatformDetailsPanel.tsx (95 lines)",
      "src/capabilities/components/CapabilityDetails.tsx (78 lines)",
      "src/workflows/components/WorkflowStepDetails.tsx (29 lines)",
    ],
    description:
      "All three wrap the motion engine's Expand primitive around an identical hand-rolled shell — a flex-col div with rounded-lg border border-border bg-surface p-4, a StatusBadge/HealthIndicator row, a muted Body description, and one or more uppercase-Caption-labeled <ul> lists of related items (Capabilities/Domains/Incoming/Outgoing for Platforms; Inputs/Outputs/Providers for Capabilities). An earlier component inventory already flagged this exact recurrence (\"Inspector Panel\" status: \"Partial\") before this family existed to fix it.",
    migrationNote:
      "A real candidate for a future Foundation adoption effort: the shell each one hand-rolls is exactly InspectorSection's job, and each labeled list is exactly InspectorGroup + InspectorProperty's job. Not migrated here, since this initial build only adds new components and does not touch src/platforms, src/capabilities, or src/workflows.",
  },
];

export const INSPECTOR_CLEAN_FINDINGS: string[] = [
  "Production: the only real UI is a diagram gallery (ValidationDiagram, HealthDashboardDiagram, ArtifactLifecycleDiagram) — the page's own copy states every diagram renders from a plain data value, no inspector-shaped panel exists.",
  "Publishing & Commerce: PublishingAndCommerceSection renders PublishingDiagram/CommerceDiagram, explicitly \"generic, category-scoped views with zero provider-specific rendering code\" — a registry/diagram component, not a detail panel. Every other hit is a prose mention (\"Publishing Queue\", \"Commerce configuration\") in an unrelated docs page.",
  "Products: only marketing copy, a search-input placeholder, and prose listing \"Products\" as a table/grid domain example — data-grid's own audit already confirmed no Products grid exists either.",
  "QA: every hit is a literal status-badge label (e.g. { label: \"QA\", status: \"active\" }) in an unrelated diagram registry, or a motion-testing caption — nothing inspector-related.",
  "Settings: a disabled demo Tab, a Command Palette sample item, and prose naming \"Settings\" as a form-system use case — no rendered settings panel anywhere.",
  "The Inspector Workspace doc page itself is entirely prose/data — its own page.tsx states plainly this is documentation only, not a rendered inspector; InspectorAnatomyExplorer/VariantCard/PlatformExampleCard are all Card-based text renderers, not an inspector implementation.",
];
