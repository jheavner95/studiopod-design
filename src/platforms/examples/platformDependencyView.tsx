import { Database, ClipboardList, Palette, Factory, Rocket, ShoppingCart, Sparkles } from "lucide-react";
import type { PlatformArchitecture } from "../types";

/** The same seven platforms as the complete architecture, but wired as a genuine dependency graph rather than a single chain, for a relationship-only view with no workflow emphasis. */
export const platformDependencyView: PlatformArchitecture = {
  id: "platform-dependency-view",
  title: "Platform Dependency View",
  description: "Every platform's dependencies and integrations, independent of workflow order.",
  platforms: [
    {
      id: "foundation",
      name: "Foundation",
      description: "Shared identity, storage, and infrastructure services.",
      icon: <Database className="size-5" />,
    },
    {
      id: "planning",
      name: "Planning",
      description: "Briefs, calendars, and product roadmaps.",
      icon: <ClipboardList className="size-5" />,
    },
    {
      id: "creative",
      name: "Creative",
      description: "Artwork creation and composition.",
      icon: <Palette className="size-5" />,
    },
    {
      id: "production",
      name: "Production",
      description: "Validation and manufacturing.",
      icon: <Factory className="size-5" />,
    },
    {
      id: "publishing",
      name: "Publishing",
      description: "Marketplace listings and syndication.",
      icon: <Rocket className="size-5" />,
    },
    {
      id: "commerce",
      name: "Commerce",
      description: "Orders, fulfillment, and revenue.",
      icon: <ShoppingCart className="size-5" />,
    },
    {
      id: "intelligence",
      name: "Intelligence",
      description: "Learns from every platform and feeds recommendations back.",
      icon: <Sparkles className="size-5" />,
    },
  ],
  relationships: [
    { id: "planning-foundation", source: "planning", target: "foundation", relationshipType: "dependency" },
    { id: "creative-foundation", source: "creative", target: "foundation", relationshipType: "dependency" },
    { id: "production-foundation", source: "production", target: "foundation", relationshipType: "dependency" },
    { id: "publishing-foundation", source: "publishing", target: "foundation", relationshipType: "dependency" },
    { id: "commerce-foundation", source: "commerce", target: "foundation", relationshipType: "dependency" },
    { id: "creative-planning", source: "creative", target: "planning", relationshipType: "dependency" },
    { id: "production-creative", source: "production", target: "creative", relationshipType: "dependency" },
    { id: "publishing-production", source: "publishing", target: "production", relationshipType: "dependency" },
    { id: "commerce-publishing", source: "commerce", target: "publishing", relationshipType: "dependency" },
    { id: "intelligence-planning", source: "intelligence", target: "planning", relationshipType: "data-flow" },
    { id: "intelligence-creative", source: "intelligence", target: "creative", relationshipType: "data-flow" },
    { id: "intelligence-production", source: "intelligence", target: "production", relationshipType: "data-flow" },
    { id: "intelligence-publishing", source: "intelligence", target: "publishing", relationshipType: "data-flow" },
    { id: "intelligence-commerce", source: "intelligence", target: "commerce", relationshipType: "data-flow" },
    {
      id: "intelligence-foundation",
      source: "intelligence",
      target: "foundation",
      relationshipType: "integration",
      direction: "bidirectional",
      label: "Shared telemetry",
    },
  ],
};
