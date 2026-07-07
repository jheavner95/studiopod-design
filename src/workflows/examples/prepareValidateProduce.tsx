import { Package, ShieldCheck, Factory } from "lucide-react";
import type { Workflow } from "../types";

/** The canonical StudioPOD workflow: linear, three-stage, no branches. */
export const prepareValidateProduce: Workflow = {
  id: "prepare-validate-produce",
  title: "Prepare, Validate, Produce",
  description: "The core StudioPOD loop that turns a design into a finished, shippable product.",
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
      description: "Upload artwork, choose a product template, and set placement and print options.",
    },
    {
      id: "validate",
      title: "Validate",
      subtitle: "Automated production readiness checks",
      icon: <ShieldCheck className="size-5" />,
      active: true,
      health: "healthy",
      estimatedDuration: "~2 min",
      description: "Safe zone, resolution, and color profile are checked automatically before anything is produced.",
    },
    {
      id: "produce",
      title: "Produce",
      subtitle: "Send to fulfillment",
      icon: <Factory className="size-5" />,
      estimatedDuration: "~1–2 days",
      description: "Once validated, the order is routed to the production queue and fulfilled.",
    },
  ],
  connections: [
    { id: "prepare-validate", source: "prepare", target: "validate" },
    { id: "validate-produce", source: "validate", target: "produce" },
  ],
};
