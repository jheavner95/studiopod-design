import { Sparkles, Bot, Rocket, Globe, Store, ShoppingCart, Factory, Package } from "lucide-react";
import type { CapabilityRegistry } from "../types";

/** Every provider behind Generation, Publishing, and Commerce, with a full spread of health and availability states. */
export const capabilityRegistry: CapabilityRegistry = {
  id: "capability-registry",
  title: "Capability Registry",
  description: "Every interchangeable provider adapter StudioPOD can route through, and its current health.",
  groups: [
    { id: "ai-group", title: "AI", memberIds: ["generation", "openai", "stability-ai"] },
    { id: "publishing-group", title: "Publishing", memberIds: ["publishing", "wordpress", "shopify"] },
    { id: "commerce-group", title: "Commerce", memberIds: ["commerce", "printify", "gelato"] },
  ],
  capabilities: [
    {
      id: "generation",
      name: "Generation",
      category: "ai",
      status: "healthy",
      providers: ["openai", "stability-ai"],
      icon: <Sparkles className="size-5" />,
    },
    {
      id: "publishing",
      name: "Publishing",
      category: "publishing",
      status: "healthy",
      providers: ["wordpress", "shopify"],
      icon: <Rocket className="size-5" />,
    },
    {
      id: "commerce",
      name: "Commerce",
      category: "commerce",
      status: "warning",
      providers: ["printify", "gelato"],
      icon: <ShoppingCart className="size-5" />,
    },
  ],
  providers: [
    { id: "openai", name: "OpenAI", capabilities: ["generation"], health: "healthy", status: "preferred", priority: 1, available: true, icon: <Bot className="size-5" /> },
    { id: "stability-ai", name: "Stability AI", capabilities: ["generation"], health: "healthy", status: "available", priority: 2, available: true, icon: <Bot className="size-5" /> },
    { id: "wordpress", name: "WordPress", capabilities: ["publishing"], health: "healthy", status: "preferred", priority: 1, available: true, icon: <Globe className="size-5" /> },
    { id: "shopify", name: "Shopify", capabilities: ["publishing"], health: "healthy", status: "available", priority: 2, available: true, icon: <Store className="size-5" /> },
    { id: "printify", name: "Printify", capabilities: ["commerce"], health: "warning", status: "preferred", priority: 1, available: true, icon: <Factory className="size-5" /> },
    { id: "gelato", name: "Gelato", capabilities: ["commerce"], health: "offline", status: "unavailable", priority: 2, available: false, icon: <Package className="size-5" /> },
  ],
  adapters: [
    { id: "generation-openai", source: "generation", target: "openai", capability: "generation", health: "healthy", status: "preferred", latency: "1.8s", version: "2.1" },
    { id: "generation-stability", source: "generation", target: "stability-ai", capability: "generation", health: "healthy", status: "available", latency: "2.4s", version: "1.6" },
    { id: "publishing-wordpress", source: "publishing", target: "wordpress", capability: "publishing", health: "healthy", status: "preferred", latency: "310ms", version: "3.4" },
    { id: "publishing-shopify", source: "publishing", target: "shopify", capability: "publishing", health: "healthy", status: "available", latency: "260ms", version: "2.9" },
    { id: "commerce-printify", source: "commerce", target: "printify", capability: "commerce", health: "warning", status: "preferred", latency: "420ms", version: "5.2" },
    { id: "commerce-gelato", source: "commerce", target: "gelato", capability: "commerce", health: "offline", status: "unavailable", latency: "timed out", version: "4.0" },
  ],
};
