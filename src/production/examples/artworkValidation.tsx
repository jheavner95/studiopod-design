import { Upload, Sparkles, ScanLine, Camera, FileCheck, CheckCircle2 } from "lucide-react";
import type { ProductionPipeline } from "../types";

/** The automated checks a single piece of artwork passes through before it is marked ready to produce. */
export const artworkValidation: ProductionPipeline = {
  id: "artwork-validation",
  title: "Artwork Validation",
  description: "What happens automatically between an artwork upload and a ready-to-produce file.",
  stages: [
    {
      id: "upload",
      title: "Upload",
      description: "The artwork file is received and queued.",
      status: "completed",
      icon: <Upload className="size-5" />,
    },
    {
      id: "ai-analysis",
      title: "AI Analysis",
      description: "Detects subject placement, background, and likely print issues.",
      status: "completed",
      icon: <Sparkles className="size-5" />,
    },
    {
      id: "safe-zone",
      title: "Safe Zone",
      description: "Confirms artwork stays within the printable safe zone.",
      status: "warning",
      severity: "warning",
      blocking: true,
      progress: 1,
      icon: <ScanLine className="size-5" />,
      rules: [
        { id: "within-bounds", title: "Artwork stays within the safe zone", severity: "error" },
        { id: "min-margin", title: "Minimum margin is maintained", severity: "warning" },
      ],
    },
    {
      id: "camera-cutout",
      title: "Camera Cutout",
      description: "Renders a camera-accurate preview for 3D mockup products.",
      status: "running",
      progress: 0.6,
      icon: <Camera className="size-5" />,
    },
    {
      id: "export-validation",
      title: "Export Validation",
      description: "Resolution and color profile are checked before export.",
      status: "pending",
      blocking: true,
      icon: <FileCheck className="size-5" />,
      rules: [{ id: "resolution-check", title: "Resolution meets the print minimum", severity: "error" }],
    },
    {
      id: "ready",
      title: "Ready",
      description: "Cleared for production.",
      status: "pending",
      icon: <CheckCircle2 className="size-5" />,
    },
  ],
  results: [
    { id: "safe-zone-bounds", ruleId: "within-bounds", stageId: "safe-zone", passed: true, severity: "error" },
    {
      id: "safe-zone-margin",
      ruleId: "min-margin",
      stageId: "safe-zone",
      passed: false,
      severity: "warning",
      message: "Margin is 2px under the minimum on the left edge.",
    },
  ],
};
