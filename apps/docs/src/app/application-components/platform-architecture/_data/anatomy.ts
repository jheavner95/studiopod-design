export interface PlatformAnatomyRegion {
  name: string;
  layer: "Platform" | "Business Features";
  description: string;
}

/**
 * Six regions, split across the two layers this package defines the
 * boundary between — the same "which layer owns this" question DS-3.9's
 * own Component Ownership section already answered one tier down.
 */
export const PLATFORM_ANATOMY: PlatformAnatomyRegion[] = [
  {
    name: "Platform Shell",
    layer: "Platform",
    description: "The outer chrome for one platform — its own navigation, header, and top-level layout, composing Workspace Architecture's own six-tier blueprint (Global Navigation, Header, Toolbar) scoped to a single platform rather than the whole StudioPOD app.",
  },
  {
    name: "Platform Workspace",
    layer: "Platform",
    description: "The primary work area within a platform's own shell — an Asset Workspace, Primary Workspace, Inspector Workspace, or Status Workspace region (Workspace Architecture's own four workspace tiers) populated with that platform's own domain objects.",
  },
  {
    name: "Platform Services",
    layer: "Platform",
    description: "Cross-cutting, non-visual concerns scoped to one platform — permission checks, platform-specific data-shape validation, cache keys. Not UI at all, but part of what this layer owns: a Business Feature composing a Platform component should not need to re-derive platform-level rules the Platform layer already encodes.",
  },
  {
    name: "Platform Components",
    layer: "Platform",
    description: "The reusable, domain-specific UI this whole package is about — an OrderInspector, an ArtworkDependencyGraph, a ProviderConnectionCard — each composed from Foundation/Operational/Workflow, each reusable anywhere within its own platform.",
  },
  {
    name: "Business Components",
    layer: "Business Features",
    description: "Feature-specific but still reusable within one feature area — narrower than a Platform component (used across a handful of related screens, not the whole platform), still composed from Platform/Workflow/Operational/Foundation rather than reimplementing any of them.",
  },
  {
    name: "Feature Components",
    layer: "Business Features",
    description: "The leaf implementation — one-off UI specific to a single screen or flow, not intended for reuse anywhere else. This is where real data fetching, business rules, and side effects finally live; everything below this region is deliberately reusable and side-effect-free.",
  },
];
