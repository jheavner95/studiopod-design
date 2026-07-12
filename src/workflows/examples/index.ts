import { prepareValidateProduce } from "./prepareValidateProduce";
import { artworkProduction } from "./artworkProduction";
import { publishing } from "./publishing";
import { commerce } from "./commerce";
import { qualityAssurance } from "./qualityAssurance";
import { betaUserJourney } from "./betaUserJourney";
import type { Workflow } from "../types";

export { prepareValidateProduce } from "./prepareValidateProduce";
export { artworkProduction } from "./artworkProduction";
export { publishing } from "./publishing";
export { commerce } from "./commerce";
export { qualityAssurance } from "./qualityAssurance";
export { betaUserJourney } from "./betaUserJourney";
/** The canonical, official end-to-end production flow — not part of the pattern-gallery examples above, reused directly by the homepage and architecture pages. */
export { canonicalProductionFlow } from "./canonicalFlow";

/** Every example workflow, for the Developer Playground's "show all workflows" gallery. */
export const exampleWorkflows: Workflow[] = [
  prepareValidateProduce,
  artworkProduction,
  publishing,
  commerce,
  qualityAssurance,
  betaUserJourney,
];
