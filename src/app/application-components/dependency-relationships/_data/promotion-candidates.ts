export interface DependencyPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified six named domains — Production,
 * Publishing, Commerce, Planning, Intelligence, Automation — plus a full
 * read of every capability/platform relationship diagram and their
 * underlying typed-relationship schemas, since "dependency graph" and
 * "relationship diagram" are exactly what the illustration-canvas layer
 * already renders elsewhere in this repo. Unlike most prior Workflow
 * Component Library packages this session, this audit found real,
 * substantial prior art — architecturally a different rendering layer
 * (coordinate-positioned SVG, not this family's own DOM flex/Grid), but
 * modeling the same real-world relationships this package now
 * canonicalizes at the component-library tier.
 */
export const DEPENDENCY_PROMOTION_CANDIDATES: DependencyPromotionCandidate[] = [
  {
    id: "platform-relationship-map",
    pattern: "The illustration engine's own \"dependency-only\" platform relationship diagram",
    files: [
      "src/platforms/types/platform.ts (PlatformRelationshipType, PlatformRelationship)",
      "src/platforms/components/PlatformRelationshipMap.tsx",
      "src/platforms/components/PlatformDetailsPanel.tsx",
      "src/platforms/examples/platformDependencyView.tsx",
      "src/platforms/utils/relationships.ts (getIncoming, getOutgoing)",
    ],
    description: "PlatformRelationshipMap's own doc comment calls itself \"a dependency-only view: every platform's authored status is ignored, so the diagram emphasizes purely how platforms relate to each other,\" defaulting to a radial layout \"since dependency graphs have no single directional flow.\" PlatformRelationshipType is a real, typed relationship vocabulary (dependency/data-flow/integration/composition) with a dedicated \"dependency\" value, styled dashed by the compiler. platformDependencyView.tsx is a hand-authored example wiring 9 real dependency-typed edges across seven platforms. PlatformDetailsPanel already computes and displays a selected platform's incoming and outgoing relationships — functionally \"what does this depend on, and what depends on this,\" the same job this package's own DependencyInspector does.",
    migrationNote: "Not a literal duplicate — this renders through the illustration-canvas engine (IllustrationCanvas, coordinate-positioned nodes, real SVG path connectors with arrowhead markers), an entirely different rendering model from this package's own DOM flex/Grid composition. PlatformRelationshipMap remains the right choice for an animated, radially-laid-out architecture diagram on a marketing or platform-overview page; this new DependencyGraph/RelationshipView family is the right choice when a screen needs an interactive, composable, DOM-based node list with a real focus-ring-accessible Inspector rather than a rendered canvas diagram. The two can coexist — a future screen might show PlatformRelationshipMap for an at-a-glance architecture overview and this package's own DependencyGraph for the interactive detail view of a selected platform's own dependencies.",
  },
  {
    id: "capability-depends-on-edges",
    pattern: "The Capability registry's own typed depends-on/routes-to/implements/fails-over-to relationship edges",
    files: [
      "src/capabilities/types/capability.ts (CapabilityRelationshipType, CapabilityRelationship)",
      "src/capabilities/components/CapabilityRegistryDiagram.tsx",
      "src/capabilities/components/ProviderDiagram.tsx",
      "src/capabilities/components/AdapterDiagram.tsx",
      "src/capabilities/examples/completeCapabilityArchitecture.tsx",
    ],
    description: "CapabilityRelationshipType is a real, typed edge vocabulary (implements/routes-to/depends-on/fails-over-to) with depends-on edges already styled dashed by the compiler. Real depends-on example data exists today (six edges from the studiopod root capability to generation/publishing/commerce/notifications/storage/payments). CapabilityRegistryDiagram can render every depends-on edge in a registry today, with a focusId prop that dims everything not touching a given capability — functionally a filtered dependency view, though not a dedicated one.",
    migrationNote: "Not a literal duplicate, same reasoning as the platform-relationship-map finding above — a different rendering layer (illustration-canvas) modeling the same real-world depends-on concept. No dedicated \"show capability X's dependencies in isolation\" component exists there (unlike PublishingDiagram/CommerceDiagram's own category-scoping), so this new package's own DependencyGraph/DependencyFilters fills a genuine gap for an interactive, DOM-composed alternative rather than duplicating an existing one.",
  },
];

export const DEPENDENCY_CLEAN_FINDINGS: string[] = [
  "Production: ProductionArtifact (src/production/types/production.ts) has source/destination fields for pipeline-flow position, not artifact-to-artifact dependency edges — a full grep of src/production/ for \"dependen\" returns zero matches anywhere in file contents. ArtifactLifecycleDiagram renders a linear lifecycle chain (Creative Brief → … → Commercial Performance) via the Workflow Diagram Library, not a dependency graph. This package's own \"Artwork Dependencies\" gallery demo has no prior art to reuse or collide with — genuinely new ground.",
  "Publishing, Commerce: PublishingDiagram.tsx/CommerceDiagram.tsx are category-scoped views of the same CapabilityRegistry covered above — no publishing- or commerce-specific dependency UI beyond what's already documented as a Promotion Candidate.",
  "Planning: no src/planning/ directory or component exists anywhere in the repo — reconfirmed via a full directory search.",
  "Intelligence: the only \"intelligence\"-named file remains a static PlatformArchitecture example using only data-flow edges (Observe→Analyze→Recommend→Automate) — no dependency-typed edges touch Intelligence specifically, reconfirmed unchanged since prior audits.",
  "Automation: no src/automation/ directory exists anywhere in the repo — reconfirmed via a full directory search.",
  "Foundation Metadata's own RelationshipList (src/components/metadata/RelationshipList.tsx) is a flat list of {label, href?, meta?} rows — no node positions, no edges, no graph, no status vocabulary — a fundamentally different shape from this package's own node/edge composition, confirmed by direct read rather than assumed from the name. RelationshipView is built fresh, not on top of RelationshipList, and documents this distinction explicitly in its own doc comment.",
  "The illustration-canvas primitives (IllustrationNode/IllustrationConnection/IllustrationGroup in src/illustrations/primitives/) render via a coordinate-positioning layout engine and real SVG path connectors — confirmed structurally different from this package's own DOM-composed DependencyNode/DependencyEdge/DependencyGroup, the same rendering-layer distinction already established for Pipeline Components' own audit of the illustration engine's DiagramPipeline primitive.",
];
