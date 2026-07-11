export interface NamingEntry {
  name: string;
  system: string;
  collidesWith: string;
  verdict: "Intentional, disclosed" | "Real gap found this audit";
  detail: string;
}

/**
 * Every naming collision found across all eight platforms, checked
 * directly against five specific collision zones per this package's own
 * explicit instructions: the Illustration Library (src/illustrations/),
 * the Workflow Diagram Library (src/workflows/), Foundation, Operational,
 * and Workflow. Zero collisions were found against Foundation, Operational,
 * or Workflow component names anywhere in the tier — every Platform
 * component name is a domain-prefixed name (AdminUsers, CommerceCatalog,
 * IntegrationsSync) that does not collide with the lower-tier component it
 * re-exports.
 */
export const NAMING_COLLISIONS: NamingEntry[] = [
  {
    name: "ProductionPipeline",
    system: "Production Platform (DS-4.2)",
    collidesWith: "src/production/types/production.ts's own ProductionPipeline interface (the pre-existing diagram-compilation data shape)",
    verdict: "Real gap found this audit",
    detail: "Same identifier, different module — a component (re-exporting Pipeline Components' own Pipeline) and a plain data-shape interface. No compile-time conflict (never imported together), and the type is data-only with no rendering code, but this was not previously disclosed in Production Platform's own promotion-candidates.ts. Disclosed there now, the same class of finding Pipeline Components' own DS-3.5 audit already disclosed for PipelineStep vs. the Illustration Library's PipelineStep.",
  },
  {
    name: "\"Operations\" (platform) vs. \"Operational\" (component-library tier)",
    system: "Operations Platform (DS-4.7)",
    collidesWith: "This design system's own Operational Component Library tier, one layer below Platform",
    verdict: "Intentional, disclosed",
    detail: "A surface-level name collision between the business platform \"Operations\" and the design-system tier \"Operational,\" sharing a name only by coincidence. Pre-disclosed explicitly in Platform Architecture's own templates.ts before Operations Platform was built, and re-confirmed here: both src/components/operational/ and src/components/platform/operations/ coexist exactly as anticipated.",
  },
  {
    name: "ProviderHealthPanel reused for non-literal \"providers\"",
    system: "Operations Platform (DS-4.7), Integrations Platform (DS-4.9)",
    collidesWith: "N/A — not a name collision, a deliberate domain-generalized reuse",
    verdict: "Intentional, disclosed",
    detail: "OperationsMonitoring reuses Operational's own ProviderHealthPanel for generic multi-system monitoring (name/status/latency/uptime), not literally external providers — confirmed structurally sound by reading ProviderHealthPanel's own source directly (its row type has no \"provider\" concept baked in, only the name). The same component is also reused literally (for real providers) by Publishing Platform's own PublishingProviders and Integrations Platform's own IntegrationsConnections. Disclosed in each platform's own implementation-guidance.ts.",
  },
  {
    name: "\"Providers\" concept overlap with the Capability Library",
    system: "Integrations Platform (DS-4.9)",
    collidesWith: "src/capabilities/ (the pre-existing Capability Library, MS-2.6) — also models \"providers\"",
    verdict: "Intentional, disclosed",
    detail: "Conceptual overlap, not a naming collision — grepped IntegrationsProviders/Connections/Mappings/Sync against src/capabilities/ directly and found zero export-name hits. The Capability Library's own providers are illustration-diagram data (CapabilityProvider fixtures); Integrations Platform's own IntegrationsProviders is a real Data Grid registry. Disclosed directly in ProviderHealthPanel.tsx's own docstring and in Integrations Platform's own promotion-candidates.ts.",
  },
];

/**
 * Confirmed by direct source read during this certification: the
 * Illustration Library (src/illustrations/) and the plural Workflow
 * Diagram Library (src/workflows/) share zero export names with any of the
 * 96 Platform-tier components — every collision this tier actually has
 * traces one layer down, to a naming decision the Workflow/Operational
 * component it re-exports already made (and, in most cases, already
 * disclosed) before any Platform package existed.
 */
export const NAMING_SUMMARY =
  "One real, previously-undisclosed naming collision was found across all eight platforms and 96 components — Production Platform's own ProductionPipeline vs. a pre-existing TypeScript interface of the same name — now disclosed. Two further items are conceptual-overlap-only, not collisions, both pre-disclosed before the colliding platform was built (the Operations/Operational tier-name coincidence, and Integrations Platform's own conceptual overlap with the Capability Library's own \"providers\"). Zero collisions were found against the Illustration Library or the Workflow Diagram Library at the Platform tier itself — every apparent overlap in those two libraries belongs to a lower tier's own already-disclosed naming decision (e.g. WorkflowTimeline, PipelineStep), inherited unchanged rather than reintroduced here.";
