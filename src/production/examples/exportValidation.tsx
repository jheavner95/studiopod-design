import { RectangleHorizontal, Crop, ScanLine, Camera, FileType, CheckCircle2 } from "lucide-react";
import type { ProductionPipeline } from "../types";

/** The final checks a file passes through on its way out of StudioPOD and into production. */
export const exportValidation: ProductionPipeline = {
  id: "export-validation",
  title: "Export Validation",
  description: "The last checks a file clears before it leaves StudioPOD.",
  stages: [
    {
      id: "canvas",
      title: "Canvas",
      description: "Confirms the canvas matches the product's required dimensions.",
      status: "completed",
      icon: <RectangleHorizontal className="size-5" />,
    },
    {
      id: "bleed",
      title: "Bleed",
      description: "Checks the bleed margin is present on every edge.",
      status: "completed",
      icon: <Crop className="size-5" />,
    },
    {
      id: "safe-area",
      title: "Safe Area",
      description: "Confirms critical content stays inside the safe area.",
      status: "passed",
      blocking: true,
      icon: <ScanLine className="size-5" />,
    },
    {
      id: "camera-check",
      title: "Camera Check",
      description: "Renders a camera-accurate preview for 3D mockup products.",
      status: "running",
      progress: 0.4,
      icon: <Camera className="size-5" />,
    },
    {
      id: "format",
      title: "Format",
      description: "Confirms the output file format matches what the printer expects.",
      status: "pending",
      icon: <FileType className="size-5" />,
    },
    {
      id: "ready",
      title: "Ready",
      description: "Cleared for production.",
      status: "pending",
      icon: <CheckCircle2 className="size-5" />,
    },
  ],
};
