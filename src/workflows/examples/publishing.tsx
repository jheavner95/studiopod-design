import { Package, Store, Rocket, Activity } from "lucide-react";
import type { Workflow } from "../types";

/** Looping flow: Monitoring feeds back into Product, since published listings are continuously refined. */
export const publishing: Workflow = {
  id: "publishing",
  title: "Publishing",
  description: "How a product listing goes live on a marketplace and stays healthy afterward.",
  pattern: "looping",
  completion: 0.5,
  steps: [
    {
      id: "product",
      title: "Product",
      subtitle: "Define the sellable item",
      icon: <Package className="size-5" />,
      completed: true,
      estimatedDuration: "~10 min",
      description: "Pricing, variants, and product metadata are defined.",
    },
    {
      id: "marketplace",
      title: "Marketplace",
      subtitle: "Choose a sales channel",
      icon: <Store className="size-5" />,
      active: true,
      estimatedDuration: "~5 min",
      description: "Connect the product to one or more marketplace channels.",
    },
    {
      id: "publishing-step",
      title: "Publishing",
      subtitle: "Push the listing live",
      icon: <Rocket className="size-5" />,
      estimatedDuration: "~1 min",
      description: "The listing is submitted and goes live on the selected channel.",
    },
    {
      id: "monitoring",
      title: "Monitoring",
      subtitle: "Track listing health",
      icon: <Activity className="size-5" />,
      health: "healthy",
      estimatedDuration: "ongoing",
      description: "Listing performance and health are tracked continuously, feeding updates back into the product.",
    },
  ],
  connections: [
    { id: "product-marketplace", source: "product", target: "marketplace" },
    { id: "marketplace-publishing", source: "marketplace", target: "publishing-step" },
    { id: "publishing-monitoring", source: "publishing-step", target: "monitoring" },
    { id: "monitoring-product-loop", source: "monitoring", target: "product", loop: true },
  ],
};
