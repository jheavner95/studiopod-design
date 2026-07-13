import type { Workflow } from "../types";
import { CANONICAL_PRODUCTION_FLOW_ICONS } from "@/lib/canonical";

const {
  "creative-brief": Lightbulb,
  "artwork-project": FolderOpen,
  composition: Layers,
  validation: ShieldCheck,
  "production-package": Package,
} = CANONICAL_PRODUCTION_FLOW_ICONS;

/** Linear, five-stage flow — the first five stages of StudioPOD's canonical production flow, from a creative brief to a packaged, manufacturing-ready artifact. */
export const artworkProduction: Workflow = {
  id: "artwork-production",
  title: "Artwork Production",
  description: "How a Creative Brief becomes a validated Production Package, ready for manufacturing.",
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
      description: "The Trailhead mug wrap's working file opens against the drinkware template.",
    },
    {
      id: "composition",
      title: "Composition",
      subtitle: "Arrange artwork and layout",
      icon: <Layers className="size-5" />,
      active: true,
      estimatedDuration: "~1–3 hrs",
      description: "Marcus D. arranges layers, text, and imagery within the wrap's safe zone.",
    },
    {
      id: "validation",
      title: "Validation",
      subtitle: "Automated print-readiness checks",
      icon: <ShieldCheck className="size-5" />,
      health: "healthy",
      estimatedDuration: "~2 min",
      description: "Resolution, bleed, and color checks run automatically before the artifact can be packaged.",
    },
    {
      id: "production-package",
      title: "Production Package",
      subtitle: "Bundle the validated artifact for manufacturing",
      icon: <Package className="size-5" />,
      estimatedDuration: "~1 min",
      description: "The Trailhead mug wrap is packaged as MUG-TH-014 and added to Batch run #204.",
    },
  ],
  connections: [
    { id: "brief-project", source: "creative-brief", target: "artwork-project" },
    { id: "project-composition", source: "artwork-project", target: "composition" },
    { id: "composition-validation", source: "composition", target: "validation" },
    { id: "validation-production-package", source: "validation", target: "production-package" },
  ],
};
