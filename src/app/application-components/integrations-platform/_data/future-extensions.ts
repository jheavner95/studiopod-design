export interface IntegrationsFutureExtension {
  title: string;
  description: string;
}

export const INTEGRATIONS_FUTURE_EXTENSIONS: IntegrationsFutureExtension[] = [
  { title: "Live synchronization", description: "Real sync-job execution, polling, and scheduling behind IntegrationsSync's own display-only sources prop — this audit confirmed no sync-job engine or polling loop exists anywhere in the repo (see Promotion Candidates), so this is genuinely greenfield, deferred pending real usage. Platform Component Architecture's own template already scopes real API calls to Business Features." },
  { title: "Webhook monitoring", description: "Real webhook receivers and delivery-log tracking for provider-initiated events — this audit confirmed zero real webhook handling code exists anywhere in the repo, deferred pending real usage." },
  { title: "Provider failover", description: "Automatic re-routing to a backup provider when a primary connection fails — the Capability Library's own providerFailover.tsx example is a static illustration-diagram fixture, not executable failover logic; a real implementation is deferred pending real usage." },
  { title: "Schema comparison", description: "A structured diff between a source and target schema, beyond IntegrationsMappings' own caller-composed node/edge visualization — depends on real schema introspection existing first; deferred pending that groundwork." },
  { title: "Integration analytics", description: "Trend analysis and historical reporting across IntegrationsDiagnostics' own issue list and IntegrationsSync's own sync history — belongs to the Intelligence platform template (DS-4.1's own architecture), not this one; deferred here rather than duplicated." },
  { title: "AI integration assistant", description: "Automated mapping suggestions or anomaly detection across IntegrationsMappings and IntegrationsDiagnostics — a genuinely different capability layer (external AI service calls) from this package's own single-connection, prop-driven components; deferred pending real usage, the same stance Admin Platform's own \"AI administration assistant\" extension already took." },
];
