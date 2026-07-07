import { Ruler, ScanLine, Maximize2, Blend, Crop, FileCheck, BadgeCheck } from "lucide-react";
import type { ProductionPipeline, QualityGate } from "../types";

export const qualityGates: QualityGate[] = [
  { id: "geometry", title: "Geometry", passed: 3, icon: <Ruler className="size-5" /> },
  { id: "safe-zones", title: "Safe Zones", passed: 2, warning: 1, icon: <ScanLine className="size-5" /> },
  { id: "resolution", title: "Resolution", passed: 4, icon: <Maximize2 className="size-5" /> },
  { id: "transparency", title: "Transparency", warning: 1, icon: <Blend className="size-5" /> },
  { id: "bleed", title: "Bleed", passed: 2, icon: <Crop className="size-5" /> },
  { id: "export", title: "Export", failed: 1, icon: <FileCheck className="size-5" /> },
  { id: "approval", title: "Approval", required: true, icon: <BadgeCheck className="size-5" /> },
];

/** The seven checks every artwork passes through before it can be produced. */
export const qualityGatesPipeline: ProductionPipeline = {
  id: "quality-gates",
  title: "Quality Gates",
  description: "Every automated check an artwork must clear before it reaches Approval.",
  stages: [],
  gates: qualityGates,
};
