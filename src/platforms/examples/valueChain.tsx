import { ClipboardList, Palette, Factory, Rocket, ShoppingCart } from "lucide-react";
import type { PlatformArchitecture } from "../types";

/** The five platforms a product moves through, with no layer grouping, a flat sequential chain. */
export const valueChain: PlatformArchitecture = {
  id: "value-chain",
  title: "Value Chain",
  description: "Planning through commerce, the path every StudioPOD product follows.",
  platforms: [
    {
      id: "planning",
      name: "Planning",
      description: "Briefs, calendars, and product roadmaps.",
      status: "complete",
      icon: <ClipboardList className="size-5" />,
    },
    {
      id: "creative",
      name: "Creative",
      description: "Artwork creation and composition.",
      status: "complete",
      icon: <Palette className="size-5" />,
    },
    {
      id: "production",
      name: "Production",
      description: "Validation and manufacturing.",
      status: "active",
      icon: <Factory className="size-5" />,
    },
    {
      id: "publishing",
      name: "Publishing",
      description: "Marketplace listings and syndication.",
      status: "idle",
      icon: <Rocket className="size-5" />,
    },
    {
      id: "commerce",
      name: "Commerce",
      description: "Orders, fulfillment, and revenue.",
      status: "idle",
      icon: <ShoppingCart className="size-5" />,
    },
  ],
  relationships: [
    { id: "planning-creative", source: "planning", target: "creative", relationshipType: "data-flow" },
    { id: "creative-production", source: "creative", target: "production", relationshipType: "data-flow" },
    { id: "production-publishing", source: "production", target: "publishing", relationshipType: "data-flow" },
    { id: "publishing-commerce", source: "publishing", target: "commerce", relationshipType: "data-flow" },
  ],
};
