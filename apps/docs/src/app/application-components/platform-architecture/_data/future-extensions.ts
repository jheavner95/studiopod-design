export interface PlatformFutureExtension {
  title: string;
  description: string;
}

export const PLATFORM_FUTURE_EXTENSIONS: PlatformFutureExtension[] = [
  { title: "Cross-platform components", description: "A component genuinely needed by more than one platform would need a home above individual platforms but below Business Features. Not designed until a real, repeated case appears." },
  { title: "Shared platform packages", description: "If cross-platform components accumulate, packaging them as their own importable unit, distinct from any single platform's own component set. Not built until real demand appears." },
  { title: "Platform SDK", description: "A documented, versioned API surface for building new platforms against Platform Rules programmatically — scaffolding, lint rules enforcing the allowed/forbidden import boundaries — rather than by convention alone. Not yet built." },
  { title: "Marketplace extensions", description: "Third-party or partner-built components that plug into a platform's own extension points. Not yet built." },
  { title: "Plugin architecture", description: "A formal registration/discovery mechanism for Business Features to extend Platform components without modifying Platform source at all. Not yet built." },
];
