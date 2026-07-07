import { Layers, ShoppingCart, Package, Factory } from "lucide-react";
import type { CapabilityRegistry } from "../types";

/** Printify, Gelato, and Printful are interchangeable implementations of the Commerce capability's fulfillment leg. */
export const commerceCapability: CapabilityRegistry = {
  id: "commerce-capability",
  title: "Commerce Capability",
  description: "How a StudioPOD order gets fulfilled, regardless of which print partner produces it.",
  capabilities: [
    {
      id: "commerce",
      name: "Commerce",
      description: "Routes an order to a fulfillment partner and tracks it through production.",
      category: "commerce",
      status: "healthy",
      direction: "bidirectional",
      inputs: ["Order"],
      outputs: ["Fulfillment status"],
      providers: ["printify", "gelato", "printful", "future-commerce-provider"],
      icon: <ShoppingCart className="size-5" />,
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
      id: "printify",
      name: "Printify",
      capabilities: ["commerce"],
      health: "healthy",
      status: "preferred",
      priority: 1,
      available: true,
      icon: <Factory className="size-5" />,
    },
    {
      id: "gelato",
      name: "Gelato",
      capabilities: ["commerce"],
      health: "healthy",
      status: "available",
      priority: 2,
      available: true,
      icon: <Package className="size-5" />,
    },
    {
      id: "printful",
      name: "Printful",
      capabilities: ["commerce"],
      health: "warning",
      status: "fallback",
      priority: 3,
      available: true,
      icon: <Factory className="size-5" />,
    },
    {
      id: "future-commerce-provider",
      name: "Future Providers",
      capabilities: ["commerce"],
      status: "fallback",
      priority: 4,
      available: false,
      icon: <Package className="size-5" />,
    },
  ],
  adapters: [
    { id: "commerce-printify", source: "commerce", target: "printify", capability: "commerce", health: "healthy", status: "preferred", latency: "420ms", version: "5.2" },
    { id: "commerce-gelato", source: "commerce", target: "gelato", capability: "commerce", health: "healthy", status: "available", latency: "480ms", version: "4.0" },
    { id: "commerce-printful", source: "commerce", target: "printful", capability: "commerce", health: "warning", status: "fallback", latency: "610ms", version: "3.7" },
    { id: "commerce-future", source: "commerce", target: "future-commerce-provider", capability: "commerce", status: "fallback" },
  ],
  relationships: [{ id: "studiopod-commerce", source: "studiopod", target: "commerce", relationshipType: "depends-on" }],
};
