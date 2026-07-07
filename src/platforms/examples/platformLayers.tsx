import { Database, Layers, Cloud, Activity } from "lucide-react";
import type { PlatformArchitecture } from "../types";

/** The four foundational layers of the underlying platform stack, independent of the value chain built on top. */
export const platformLayers: PlatformArchitecture = {
  id: "platform-layers",
  title: "Foundation, Core, SaaS, Operations",
  description: "The layered stack every StudioPOD platform is built on.",
  layers: [
    { id: "foundation-layer", title: "Foundation Platform", order: 0 },
    { id: "core-layer", title: "Core Platform", order: 1 },
    { id: "saas-layer", title: "SaaS Platform", order: 2 },
    { id: "operations-layer", title: "Operations Platform", order: 3 },
  ],
  platforms: [
    {
      id: "foundation-platform",
      name: "Foundation Platform",
      description: "Identity, storage, and shared infrastructure primitives.",
      layer: "foundation-layer",
      status: "complete",
      health: "healthy",
      icon: <Database className="size-5" />,
    },
    {
      id: "core-platform",
      name: "Core Platform",
      description: "Domain models and business logic shared across every product surface.",
      layer: "core-layer",
      status: "complete",
      health: "healthy",
      icon: <Layers className="size-5" />,
    },
    {
      id: "saas-platform",
      name: "SaaS Platform",
      description: "Multi-tenant workspace, billing, and account management.",
      layer: "saas-layer",
      status: "active",
      icon: <Cloud className="size-5" />,
    },
    {
      id: "operations-platform",
      name: "Operations Platform",
      description: "Monitoring, alerting, and reliability across the whole stack.",
      layer: "operations-layer",
      status: "active",
      health: "healthy",
      icon: <Activity className="size-5" />,
    },
  ],
  relationships: [
    { id: "core-foundation", source: "core-platform", target: "foundation-platform", relationshipType: "dependency" },
    { id: "saas-core", source: "saas-platform", target: "core-platform", relationshipType: "dependency" },
    {
      id: "operations-foundation",
      source: "operations-platform",
      target: "foundation-platform",
      relationshipType: "integration",
      direction: "bidirectional",
      label: "Telemetry",
    },
    {
      id: "operations-core",
      source: "operations-platform",
      target: "core-platform",
      relationshipType: "integration",
      direction: "bidirectional",
      label: "Telemetry",
    },
    {
      id: "operations-saas",
      source: "operations-platform",
      target: "saas-platform",
      relationshipType: "integration",
      direction: "bidirectional",
      label: "Telemetry",
    },
  ],
};
