import { Layers, Globe, Store, Rocket } from "lucide-react";
import type { CapabilityRegistry } from "../types";

/** WordPress and Shopify are both interchangeable implementations of the Publishing capability, with room for future providers to slot in without a new diagram. */
export const publishingCapability: CapabilityRegistry = {
  id: "publishing-capability",
  title: "Publishing Capability",
  description: "How a StudioPOD listing reaches a storefront, regardless of which platform hosts it.",
  capabilities: [
    {
      id: "publishing",
      name: "Publishing",
      description: "Pushes a product listing to a storefront and keeps it in sync.",
      category: "publishing",
      status: "healthy",
      direction: "output",
      inputs: ["Product listing"],
      outputs: ["Live storefront listing"],
      providers: ["wordpress", "shopify", "future-publishing-provider"],
      icon: <Rocket className="size-5" />,
    },
  ],
  providers: [
    {
      id: "studiopod",
      name: "StudioPOD",
      icon: <Layers className="size-5" />,
      status: "available",
      available: true,
    },
    {
      id: "wordpress",
      name: "WordPress",
      capabilities: ["publishing"],
      health: "healthy",
      status: "preferred",
      priority: 1,
      available: true,
      icon: <Globe className="size-5" />,
    },
    {
      id: "shopify",
      name: "Shopify",
      capabilities: ["publishing"],
      health: "healthy",
      status: "available",
      priority: 2,
      available: true,
      icon: <Store className="size-5" />,
    },
    {
      id: "future-publishing-provider",
      name: "Future Providers",
      capabilities: ["publishing"],
      status: "fallback",
      priority: 3,
      available: false,
      icon: <Globe className="size-5" />,
    },
  ],
  adapters: [
    { id: "publishing-wordpress", source: "publishing", target: "wordpress", capability: "publishing", health: "healthy", status: "preferred", latency: "310ms", version: "3.4" },
    { id: "publishing-shopify", source: "publishing", target: "shopify", capability: "publishing", health: "healthy", status: "available", latency: "260ms", version: "2.9" },
    { id: "publishing-future", source: "publishing", target: "future-publishing-provider", capability: "publishing", status: "fallback" },
  ],
  relationships: [{ id: "studiopod-publishing", source: "studiopod", target: "publishing", relationshipType: "depends-on" }],
};
