import { AlertTriangle, ShoppingCart, RefreshCw, Package } from "lucide-react";
import type { CapabilityFlow } from "../types";

/** What happens automatically when a preferred provider goes down: the capability layer routes around it without StudioPOD noticing. */
export const providerFailover: CapabilityFlow = {
  id: "provider-failover",
  title: "Provider Failover",
  description: "When Printify goes offline, Commerce routes to Gelato automatically.",
  stages: [
    {
      id: "provider-unavailable",
      title: "Provider Unavailable",
      subtitle: "Printify",
      description: "The preferred provider stops responding.",
      status: "unavailable",
      refId: "printify",
      icon: <AlertTriangle className="size-5" />,
    },
    {
      id: "capability-layer",
      title: "Capability Layer",
      subtitle: "Commerce",
      description: "Detects the failure and looks for the next available provider.",
      status: "warning",
      refId: "commerce",
      icon: <ShoppingCart className="size-5" />,
    },
    {
      id: "automatic-routing",
      title: "Automatic Routing",
      description: "Traffic is rerouted with no change required from StudioPOD or the customer.",
      status: "available",
      icon: <RefreshCw className="size-5" />,
    },
    {
      id: "alternative-provider",
      title: "Alternative Provider",
      subtitle: "Gelato",
      description: "The order completes through the next provider in the failover chain.",
      status: "healthy",
      refId: "gelato",
      icon: <Package className="size-5" />,
    },
  ],
};
