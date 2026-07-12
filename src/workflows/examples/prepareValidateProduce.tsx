import { Package, ShieldCheck, Factory } from "lucide-react";
import type { Workflow } from "../types";

/** The canonical StudioPOD workflow: linear, three-stage, no branches. */
export const prepareValidateProduce: Workflow = {
  id: "prepare-validate-produce",
  title: "Prepare, Validate, Produce",
  description: "The three-step loop every order — from a Trailhead mug wrap to a Holiday collection batch — moves through on its way to fulfillment.",
  pattern: "linear",
  completion: 0.66,
  steps: [
    {
      id: "prepare",
      title: "Prepare",
      subtitle: "Assemble the artwork and product spec",
      icon: <Package className="size-5" />,
      completed: true,
      estimatedDuration: "~10 min",
      description: "The Trailhead mug wrap's artwork and product template are assembled, print options set.",
    },
    {
      id: "validate",
      title: "Validate",
      subtitle: "Automated production readiness checks",
      icon: <ShieldCheck className="size-5" />,
      active: true,
      health: "healthy",
      estimatedDuration: "~2 min",
      description: "Bleed, resolution, and color profile are checked automatically — the same gate every artwork clears before it can be produced.",
    },
    {
      id: "produce",
      title: "Produce",
      subtitle: "Send to fulfillment",
      icon: <Factory className="size-5" />,
      estimatedDuration: "~1–2 days",
      description: "Batch run #204 picks up the validated order and routes it to fulfillment.",
    },
  ],
  connections: [
    { id: "prepare-validate", source: "prepare", target: "validate" },
    { id: "validate-produce", source: "validate", target: "produce" },
  ],
};
