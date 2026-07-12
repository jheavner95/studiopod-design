import { Package, Rocket, Store, Activity } from "lucide-react";
import type { Workflow } from "../types";

/** Looping flow: Monitoring feeds back into Publishing, since a live listing is continuously refreshed rather than published once. */
export const publishing: Workflow = {
  id: "publishing",
  title: "Publishing Pipeline",
  description: "How a Production Package becomes a live marketplace listing — and stays healthy afterward.",
  pattern: "looping",
  completion: 0.5,
  steps: [
    {
      id: "production-package",
      title: "Production Package",
      subtitle: "The validated artifact ready to publish",
      icon: <Package className="size-5" />,
      completed: true,
      estimatedDuration: "~1 min",
      description: "Poster proof #118 arrives from production, ready to list.",
    },
    {
      id: "publishing-step",
      title: "Publishing",
      subtitle: "Create the listing and syndicate it",
      icon: <Rocket className="size-5" />,
      active: true,
      estimatedDuration: "~1 min",
      description: "The listing is created once and syndicated to every connected sales channel.",
    },
    {
      id: "marketplace-listing",
      title: "Marketplace Listing",
      subtitle: "Live on the storefront",
      icon: <Store className="size-5" />,
      estimatedDuration: "instant",
      description: "Poster proof #118 goes live as a marketplace listing on Etsy and Shopify.",
    },
    {
      id: "monitoring",
      title: "Monitoring",
      subtitle: "Track listing health",
      icon: <Activity className="size-5" />,
      health: "healthy",
      estimatedDuration: "ongoing",
      description: "Listing performance and provider health are tracked continuously, feeding updates back into Publishing.",
    },
  ],
  connections: [
    { id: "package-publishing", source: "production-package", target: "publishing-step" },
    { id: "publishing-listing", source: "publishing-step", target: "marketplace-listing" },
    { id: "listing-monitoring", source: "marketplace-listing", target: "monitoring" },
    { id: "monitoring-publishing-loop", source: "monitoring", target: "publishing-step", loop: true },
  ],
};
