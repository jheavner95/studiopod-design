import { completeArchitecture } from "./completeArchitecture";
import { platformLayers } from "./platformLayers";
import { valueChain } from "./valueChain";
import { intelligencePlatform } from "./intelligencePlatform";
import { artifactFlowArchitecture } from "./artifactFlow";
import { platformDependencyView } from "./platformDependencyView";
import type { PlatformArchitecture } from "../types";

export { completeArchitecture } from "./completeArchitecture";
export { platformLayers } from "./platformLayers";
export { valueChain } from "./valueChain";
export { intelligencePlatform } from "./intelligencePlatform";
export { artifactFlowArchitecture } from "./artifactFlow";
export { platformDependencyView } from "./platformDependencyView";

/** Every example architecture, for the Developer Playground's "show all architectures" gallery. */
export const exampleArchitectures: PlatformArchitecture[] = [
  completeArchitecture,
  platformLayers,
  valueChain,
  intelligencePlatform,
  artifactFlowArchitecture,
  platformDependencyView,
];
