export interface IntegrationsFutureExtension {
  title: string;
  description: string;
}

export const INTEGRATIONS_FUTURE_EXTENSIONS: IntegrationsFutureExtension[] = [
  { title: "Live synchronization", description: "Real sync-job execution, polling, and scheduling behind IntegrationsSync's own display-only sources prop is not yet implemented. No sync-job engine or polling loop exists anywhere in the repo yet — Platform's own scope keeps real API calls in Business Features." },
  { title: "Webhook monitoring", description: "Real webhook receivers and delivery-log tracking for provider-initiated events is not yet implemented. No real webhook handling code exists anywhere in the repo yet." },
  { title: "Provider failover", description: "Automatic re-routing to a backup provider when a primary connection fails is not yet implemented — the Capability Library's own providerFailover.tsx example is a static illustration-diagram fixture, not executable failover logic." },
  { title: "Schema comparison", description: "A structured diff between a source and target schema, beyond IntegrationsMappings' own caller-composed node/edge visualization, depends on real schema introspection existing first." },
  { title: "Integration analytics", description: "Trend analysis and historical reporting across IntegrationsDiagnostics' own issue list and IntegrationsSync's own sync history belongs to the Intelligence platform's own components, not this platform's." },
  { title: "AI integration assistant", description: "Automated mapping suggestions or anomaly detection across IntegrationsMappings and IntegrationsDiagnostics — a genuinely different capability layer (external AI service calls) from this package's own single-connection, prop-driven components. Not yet implemented." },
];
