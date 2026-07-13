/**
 * @studiopod/design-system/illustrations — one merged entry point for the
 * illustration engine and all four data-driven diagram-engine libraries
 * built on it (workflows, platforms, production, capabilities). These are
 * kept as a single entry point rather than four separate ones: all four
 * are built on the same illustration primitives and none has yet proven
 * an independent consumer need for its own import path.
 *
 * Note: this entry point is not fully self-contained — several primitives
 * here (e.g. illustrations/primitives/HealthIndicator, most of
 * components/illustration) depend on "@/components/ui" and
 * "@/components/motion", which live in the root entry point. That's
 * expected, not a boundary problem.
 *
 * Each of workflows/platforms/production/capabilities re-exports from
 * four subfolders — types, utils, components, and examples. "examples"
 * is deliberately excluded: it's canned demo scenario data
 * (artworkProduction, publishing, canonicalProductionFlow, etc.) built
 * for the documentation site's own galleries, sourced from
 * "@/lib/canonical.ts" (the doc-site's example vocabulary) — mock
 * content, not reusable presentation code. Importing from each domain's
 * "types"/"utils"/"components" subpaths directly, instead of the
 * combined barrel, excludes "examples" (and therefore canonical.ts)
 * without needing an explicit per-symbol list.
 */
export * from "@/illustrations";
export * from "@/components/illustration";
export * from "@/workflows/types";
export * from "@/workflows/utils";
export * from "@/workflows/components";
export * from "@/platforms/types";
export * from "@/platforms/utils";
export * from "@/platforms/components";
export * from "@/production/types";
export * from "@/production/utils";
export * from "@/production/components";
export * from "@/capabilities/types";
export * from "@/capabilities/utils";
export * from "@/capabilities/components";

// The four diagram-engine domains above each define a status/compile
// bridge function under the same bare name for their own domain:
// `toSystemStatus` (workflows, production, capabilities), `toNodeStatus`
// (production, capabilities), and `compileFlowToWorkflow` /
// `compileRelationshipToConnection` / `CompileRelationshipOptions`
// (platforms, capabilities). Star-exporting all of their "utils" as
// above creates an ambiguous re-export for these 5 identifiers;
// resolved by keeping one domain's version under the bare name
// (workflows for toSystemStatus, production for toNodeStatus, platforms
// for the compile* functions/type) and re-exporting every other
// domain's version under an explicit domain-prefixed name.
export { toSystemStatus } from "@/workflows/utils";
export { toSystemStatus as productionToSystemStatus, toNodeStatus } from "@/production/utils";
export {
  toSystemStatus as capabilityToSystemStatus,
  toNodeStatus as capabilityToNodeStatus,
  compileFlowToWorkflow as compileCapabilityFlowToWorkflow,
  compileRelationshipToConnection as compileCapabilityRelationshipToConnection,
} from "@/capabilities/utils";
export type { CompileRelationshipOptions as CompileCapabilityRelationshipOptions } from "@/capabilities/utils";
export { compileFlowToWorkflow, compileRelationshipToConnection } from "@/platforms/utils";
export type { CompileRelationshipOptions } from "@/platforms/utils";
