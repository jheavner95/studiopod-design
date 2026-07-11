export interface PlatformFutureExtension {
  title: string;
  description: string;
}

export const PLATFORM_FUTURE_EXTENSIONS: PlatformFutureExtension[] = [
  { title: "Cross-platform components", description: "A component genuinely needed by more than one platform (not yet observed, since no platform has any real components today) would need a home above individual platforms but below Business Features — deferred until a real, repeated case appears rather than designed speculatively." },
  { title: "Shared platform packages", description: "If cross-platform components accumulate, packaging them as their own importable unit (distinct from any single platform's own component set) — deferred pending real demand." },
  { title: "Platform SDK", description: "A documented, versioned API surface for building new platforms against Platform Rules programmatically (scaffolding, lint rules enforcing the allowed/forbidden import boundaries) rather than by convention alone — deferred until at least one real platform exists to generalize from." },
  { title: "Marketplace extensions", description: "Third-party or partner-built components that plug into a platform's own extension points — meaningless before a platform has real extension points in production, so deferred." },
  { title: "Plugin architecture", description: "A formal registration/discovery mechanism for Business Features to extend Platform components without modifying Platform source at all — the most speculative item here, deferred pending real usage the same way every earlier system in this design system deferred AI assistance and simulation modes." },
];
