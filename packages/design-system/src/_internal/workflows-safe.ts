/**
 * Build-time replacement for "@/workflows" used ONLY by this package's
 * build (see tsup.config.ts). Some platforms/production/capabilities
 * components import the full "@/workflows" barrel internally (e.g.
 * PlatformFlowDiagram.tsx, PlatformCard.tsx, PlatformMiniMap.tsx,
 * ArtifactLifecycleDiagram.tsx, CapabilityFlowDiagram.tsx), which
 * includes "./examples" — canned demo scenario data sourced from
 * "@/lib/canonical.ts" that must not ship in the package (see
 * illustrations.ts). This omits only "./examples".
 */
export * from "@/workflows/types";
export * from "@/workflows/utils";
export * from "@/workflows/components";
