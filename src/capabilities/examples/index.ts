import { aiCapabilityLayer } from "./aiCapabilityLayer";
import { publishingCapability } from "./publishingCapability";
import { commerceCapability } from "./commerceCapability";
import { capabilityRegistry } from "./capabilityRegistry";
import { completeCapabilityArchitecture } from "./completeCapabilityArchitecture";
import type { CapabilityRegistry } from "../types";

export { aiCapabilityLayer, aiCapabilityFlow } from "./aiCapabilityLayer";
export { publishingCapability } from "./publishingCapability";
export { commerceCapability } from "./commerceCapability";
export { capabilityRegistry } from "./capabilityRegistry";
export { providerFailover } from "./providerFailover";
export { completeCapabilityArchitecture } from "./completeCapabilityArchitecture";

/** Every example registry, for the Developer Playground's "show all examples" gallery. */
export const exampleRegistries: CapabilityRegistry[] = [
  aiCapabilityLayer,
  publishingCapability,
  commerceCapability,
  capabilityRegistry,
  completeCapabilityArchitecture,
];
