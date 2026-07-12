import { artworkProduction } from "./artworkProduction";
import { publishing } from "./publishing";
import { commerce } from "./commerce";
import { qualityAssurance } from "./qualityAssurance";
import { multiChannelPublishing } from "./multiChannelPublishing";
import type { Workflow } from "../types";

export { prepareValidateProduce } from "./prepareValidateProduce";
export { artworkProduction } from "./artworkProduction";
export { publishing } from "./publishing";
export { commerce } from "./commerce";
export { qualityAssurance } from "./qualityAssurance";
export { multiChannelPublishing } from "./multiChannelPublishing";
/** The canonical, official end-to-end production flow — a signature workflow rendered full-width on /workflows, and reused directly by the homepage and architecture pages. Not part of the pattern-gallery examples below. */
export { canonicalProductionFlow } from "./canonicalFlow";
/** The loop that closes the canonical flow — also a signature workflow, not part of the pattern-gallery examples below. */
export { productionIntelligenceLoop } from "./productionIntelligence";

/** The pattern-gallery examples — every WorkflowPattern still represented, once the three signature workflows above are rendered on their own. */
export const exampleWorkflows: Workflow[] = [
  artworkProduction,
  publishing,
  commerce,
  qualityAssurance,
  multiChannelPublishing,
];
