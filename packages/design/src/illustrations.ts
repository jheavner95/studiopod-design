/**
 * @studiopod/design/illustrations — one merged entry point for the
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
 * three subfolders — types, utils, and components. Until DH-2 each also
 * carried an "examples" subfolder of canned demo scenario data
 * (artworkProduction, publishing, canonicalProductionFlow, …) built for
 * the documentation site's galleries and sourced from the doc-site's own
 * example vocabulary. This entry point had to route around it by
 * importing the three subpaths individually instead of the combined
 * barrel, and the package build had to alias the barrel away on top of
 * that. Those examples now live in the documentation application, so the
 * barrels no longer carry them and the build alias is gone. The subpath
 * imports are kept because they state exactly what this entry contains.
 *
 * "@/illustrations" is imported the same way, from its "types"/"layout"/
 * "utils"/"primitives" subpaths rather than its combined barrel, to
 * exclude its "dev" subfolder (IllustrationDevProvider/useIllustrationDev/
 * useIllustrationDevControls/IllustrationDevState) — a diagram-authoring
 * debug overlay (node bounds, anchor points, connector routing, grid,
 * animation-path visualization) explicitly scoped to the documentation
 * playground in its own source comments, not consumer-facing API.
 */
export * from "@/illustrations/types";
export * from "@/illustrations/layout";
export * from "@/illustrations/utils";
export * from "@/illustrations/primitives";
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
