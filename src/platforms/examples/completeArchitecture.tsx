import { Database, ClipboardList, Palette, Factory, Rocket, ShoppingCart, Sparkles } from "lucide-react";
import type { PlatformArchitecture } from "../types";

/** The full StudioPOD system: one continuous chain from the foundation layer, through the value chain, into intelligence. */
export const completeArchitecture: PlatformArchitecture = {
  id: "complete-architecture",
  title: "Complete StudioPOD Architecture",
  description: "Every platform, from the shared foundation through the value chain to intelligence.",
  layers: [
    { id: "foundation", title: "Foundation layer", order: 0 },
    { id: "value-chain", title: "Value chain", description: "Planning through commerce.", order: 1 },
    { id: "intelligence", title: "Intelligence layer", order: 2 },
  ],
  platforms: [
    {
      id: "foundation",
      name: "Foundation Platform",
      shortName: "Foundation",
      description: "Shared identity, storage, and infrastructure services every other platform depends on.",
      layer: "foundation",
      status: "complete",
      health: "healthy",
      icon: <Database className="size-5" />,
      capabilities: [
        { id: "identity", title: "Identity and access" },
        { id: "storage", title: "Asset storage" },
      ],
    },
    {
      id: "planning",
      name: "Planning",
      description: "Briefs, calendars, and product roadmaps.",
      layer: "value-chain",
      status: "complete",
      icon: <ClipboardList className="size-5" />,
    },
    {
      id: "creative",
      name: "Creative",
      description: "Artwork creation and composition.",
      layer: "value-chain",
      status: "active",
      icon: <Palette className="size-5" />,
    },
    {
      id: "production",
      name: "Production",
      description: "Validation and manufacturing.",
      layer: "value-chain",
      status: "idle",
      icon: <Factory className="size-5" />,
    },
    {
      id: "publishing",
      name: "Publishing",
      description: "Marketplace listings and syndication.",
      layer: "value-chain",
      status: "idle",
      icon: <Rocket className="size-5" />,
    },
    {
      id: "commerce",
      name: "Commerce",
      description: "Orders, fulfillment, and revenue.",
      layer: "value-chain",
      status: "idle",
      icon: <ShoppingCart className="size-5" />,
    },
    {
      id: "intelligence",
      name: "Intelligence",
      description: "Learns from every platform and feeds recommendations back into the chain.",
      layer: "intelligence",
      status: "idle",
      health: "healthy",
      icon: <Sparkles className="size-5" />,
    },
  ],
  relationships: [
    { id: "foundation-planning", source: "foundation", target: "planning", relationshipType: "data-flow" },
    { id: "planning-creative", source: "planning", target: "creative", relationshipType: "data-flow" },
    { id: "creative-production", source: "creative", target: "production", relationshipType: "data-flow" },
    { id: "production-publishing", source: "production", target: "publishing", relationshipType: "data-flow" },
    { id: "publishing-commerce", source: "publishing", target: "commerce", relationshipType: "data-flow" },
    { id: "commerce-intelligence", source: "commerce", target: "intelligence", relationshipType: "data-flow" },
  ],
};
