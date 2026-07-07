import { FileText, Layers, PackageCheck, FileCheck, Store, TrendingUp, Palette, Factory, Rocket, ShoppingCart } from "lucide-react";
import type { PlatformArchitecture } from "../types";

/** Shows one artifact moving between platforms: a creative brief becomes a listing, then a performance record. */
export const artifactFlowArchitecture: PlatformArchitecture = {
  id: "artifact-flow-architecture",
  title: "Artifact Flow",
  description: "How a single artifact changes shape as it moves between platforms.",
  platforms: [
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
    { id: "creative-production", source: "creative", target: "production", relationshipType: "data-flow" },
    { id: "production-publishing", source: "production", target: "publishing", relationshipType: "data-flow" },
    { id: "publishing-commerce", source: "publishing", target: "commerce", relationshipType: "data-flow" },
  ],
  flows: [
    {
      id: "artifact-flow",
      title: "Artifact Flow",
      description: "A single artifact's lifecycle, from creative brief to commercial performance.",
      steps: [
        {
          id: "creative-brief",
          title: "Creative Brief",
          platformId: "creative",
          icon: <FileText className="size-5" />,
          description: "The concept, constraints, and target product for a new design.",
        },
        {
          id: "artwork-project",
          title: "Artwork Project",
          platformId: "creative",
          icon: <Layers className="size-5" />,
          description: "The working file where the brief becomes real artwork.",
        },
        {
          id: "production-package",
          title: "Production Package",
          platformId: "production",
          icon: <PackageCheck className="size-5" />,
          description: "A validated, print-ready file bundled for manufacturing.",
        },
        {
          id: "publication-manifest",
          title: "Publication Manifest",
          platformId: "publishing",
          icon: <FileCheck className="size-5" />,
          description: "The metadata and assets required to publish a listing.",
        },
        {
          id: "marketplace-listing",
          title: "Marketplace Listing",
          platformId: "publishing",
          icon: <Store className="size-5" />,
          description: "The live listing a customer can discover and buy.",
        },
        {
          id: "commercial-performance",
          title: "Commercial Performance",
          platformId: "commerce",
          icon: <TrendingUp className="size-5" />,
          description: "Sales, margin, and demand data rolled up from every order.",
        },
      ],
    },
  ],
};
