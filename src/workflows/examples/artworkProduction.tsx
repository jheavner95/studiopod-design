import { Lightbulb, FolderOpen, Layers, ShieldCheck, Download } from "lucide-react";
import type { Workflow } from "../types";

/** Linear, five-stage flow from a creative brief to an exported, ready-to-print file. */
export const artworkProduction: Workflow = {
  id: "artwork-production",
  title: "Artwork Production",
  description: "How a creative brief becomes a validated, exportable print file.",
  pattern: "linear",
  completion: 0.4,
  steps: [
    {
      id: "creative-brief",
      title: "Creative Brief",
      subtitle: "Define the concept and constraints",
      icon: <Lightbulb className="size-5" />,
      completed: true,
      estimatedDuration: "~30 min",
      description: "Capture the concept, target product, and brand constraints before any design work starts.",
    },
    {
      id: "artwork-project",
      title: "Artwork Project",
      subtitle: "Set up the working file",
      icon: <FolderOpen className="size-5" />,
      completed: true,
      estimatedDuration: "~5 min",
      description: "A project is created with the correct canvas size, bleed, and color profile for the target product.",
    },
    {
      id: "composition",
      title: "Composition",
      subtitle: "Arrange artwork and layout",
      icon: <Layers className="size-5" />,
      active: true,
      estimatedDuration: "~1–3 hrs",
      description: "Layers, text, and imagery are composed within the product's safe zone.",
    },
    {
      id: "validation",
      title: "Validation",
      subtitle: "Automated print-readiness checks",
      icon: <ShieldCheck className="size-5" />,
      health: "healthy",
      estimatedDuration: "~2 min",
      description: "Resolution, bleed, and color checks run automatically before export is allowed.",
    },
    {
      id: "export",
      title: "Export",
      subtitle: "Generate the production-ready file",
      icon: <Download className="size-5" />,
      estimatedDuration: "~1 min",
      description: "A print-ready file is generated and attached to the product for fulfillment.",
    },
  ],
  connections: [
    { id: "brief-project", source: "creative-brief", target: "artwork-project" },
    { id: "project-composition", source: "artwork-project", target: "composition" },
    { id: "composition-validation", source: "composition", target: "validation" },
    { id: "validation-export", source: "validation", target: "export" },
  ],
};
