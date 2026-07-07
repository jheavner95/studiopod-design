import { artworkValidation } from "./artworkValidation";
import { productionPipeline } from "./productionPipeline";
import { qualityGatesPipeline } from "./qualityGates";
import { productionHealth } from "./productionHealth";
import { exportValidation } from "./exportValidation";
import type { ProductionPipeline } from "../types";

export { artworkValidation } from "./artworkValidation";
export { productionPipeline } from "./productionPipeline";
export { qualityGates, qualityGatesPipeline } from "./qualityGates";
export { productionHealth, productionHealthMetrics } from "./productionHealth";
export { artifactLifecycle } from "./artifactLifecycle";
export { exportValidation } from "./exportValidation";

/** Every example pipeline that has a real stage chain, for the Developer Playground's "show all diagrams" gallery. */
export const examplePipelines: ProductionPipeline[] = [
  artworkValidation,
  productionPipeline,
  qualityGatesPipeline,
  productionHealth,
  exportValidation,
];
