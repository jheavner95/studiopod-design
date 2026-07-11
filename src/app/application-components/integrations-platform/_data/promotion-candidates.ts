export interface IntegrationsPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dedicated audit searched the entire repo for real implementations
 * across the seven subdomains this package's own work order names —
 * Integrations platform, Providers, Connections, Mappings,
 * Synchronization, Diagnostics, Infrastructure — before a single
 * Integrations platform component was written. No speculative findings:
 * every entry below traces to specific grep commands and files this audit
 * actually ran and read. Platform Component Architecture's own template
 * (DS-4.1) already carries a planning-schema row for Integrations, and its
 * own adoption audit already independently verdicted the pre-existing
 * Capability Library (src/capabilities/) as "diagram-layer-only" — this
 * audit re-verified that finding directly rather than taking it on faith.
 */
export const INTEGRATIONS_PROMOTION_CANDIDATES: IntegrationsPromotionCandidate[] = [];

export const INTEGRATIONS_CLEAN_FINDINGS: string[] = [
  "Integrations platform (whole-platform level): does not exist, re-confirmed directly. No src/integrations/ or *integration*-named directory exists anywhere. The only footprint is Platform Component Architecture's own planning-schema row (templates.ts), whose extensionBoundary states plainly that real OAuth flows and provider SDK calls stay in Business Features — Platform owns only the connection-management UI.",
  "Providers: no real connector code. A search for class \\w*Provider|class \\w*Connector|class \\w*Adapter returns zero matches, and a search for OAuth returns only two prose hits (both explicit disclaimers that no real provider connections or OAuth flows exist). The pre-existing Capability Library's own providers.ts contains real, working functions (sortByPriority, getPreferredProvider) — but they operate purely on generic illustration-diagram data (CapabilityProvider[] fixtures), with zero network calls or SDK instantiation. Every other \"Provider\" hit is React Context naming noise (MotionProvider, GridOverlayContext), the same false-positive Product Platform's own audit already documented.",
  "Connections: no persistence or CRUD. A search for ConnectionStore|ConnectionRepository|createConnection|deleteConnection|updateConnection returns zero matches, and a search for credential/accessToken/refreshToken/apiKey/clientSecret returns only four demo/prose strings, none of them real credential storage. The repo's 94 broader \"connection\" hits resolve entirely to the illustration engine's own edge-drawing vocabulary (IllustrationConnection, IllustrationCanvas) — a drawn line between two diagram nodes, unrelated to a third-party integration connection record.",
  "Mappings: no mapping engine. A search for mappingEngine|fieldMapping|schemaTransform|mapField|MappingRule returns zero matches. Every one of the repo's 29 \"mapping\" hits is either this design system's own status-vocabulary reconciliation prose (the same \"disclosed close analog, not a forced identical mapping\" language this very states.ts file uses), Product Platform's own ProductProviderMappings explicitly disclaiming real provider synchronization logic, or incidental UI-severity-to-badge helper naming.",
  "Synchronization: display-only, no execution. A search for webhookReceiver|syncJob|pollInterval|handleWebhook|SyncEngine returns zero matches, and every \"webhook\" hit is prose in other packages' own promotion-candidates files independently re-confirming the same zero result. SyncStatusPanel's real source was read directly: it takes a caller-supplied SyncSource[] and renders a HealthIndicator/ProgressBar/caption — zero fetch, zero interval, zero write path.",
  "Diagnostics: no root-cause engine, cross-confirmed by an unrelated prior package. Intelligence Platform's own audit already searched this identical subdomain and found only the Motion Playground's own developer debug overlay (an unrelated concept). A fresh search for runDiagnostic|DiagnosticCheck|classifyError here independently returns zero matches.",
  "Infrastructure: essentially absent. A search for connectionPool|provisionInfrastructure|ConnectionPool returns zero matches. The repo's 8 total \"infrastructure\" hits are generic architectural prose in the Platform Architecture Library's own example fixtures and Foundation Table's own self-referential documentation about its own sticky-column extension — nothing integrations-specific.",
];
