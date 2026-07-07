import { Image as ImageIcon, ScanLine, Camera, Download, CheckCircle2 } from "lucide-react";
import type { Workflow } from "../types";

/** Linear flow with one optional step: Camera Check only applies to products with a 3D mockup preview. */
export const qualityAssurance: Workflow = {
  id: "quality-assurance",
  title: "Quality Assurance",
  description: "The checks every piece of artwork passes through before it is marked ready to produce.",
  pattern: "linear",
  completion: 0.5,
  steps: [
    {
      id: "artwork",
      title: "Artwork",
      subtitle: "Source file",
      icon: <ImageIcon className="size-5" />,
      completed: true,
      estimatedDuration: "~1 min",
      description: "The uploaded artwork file is queued for review.",
    },
    {
      id: "safe-zone",
      title: "Safe Zone",
      subtitle: "Placement and bleed check",
      icon: <ScanLine className="size-5" />,
      completed: true,
      estimatedDuration: "~30 sec",
      description: "Confirms artwork stays within the printable safe zone.",
    },
    {
      id: "camera-check",
      title: "Camera Check",
      subtitle: "3D mockup preview only",
      icon: <Camera className="size-5" />,
      kind: "optional",
      active: true,
      estimatedDuration: "~1 min",
      description: "Skipped for products without a 3D mockup preview; otherwise renders a camera-accurate preview.",
    },
    {
      id: "export",
      title: "Export",
      subtitle: "Generate the final file",
      icon: <Download className="size-5" />,
      estimatedDuration: "~1 min",
      description: "A production-ready file is generated once all checks pass.",
    },
    {
      id: "ready",
      title: "Ready",
      subtitle: "Cleared for production",
      icon: <CheckCircle2 className="size-5" />,
      health: "healthy",
      estimatedDuration: "instant",
      description: "The artwork is marked ready and can move into the production queue.",
    },
  ],
  connections: [
    { id: "artwork-safezone", source: "artwork", target: "safe-zone" },
    { id: "safezone-camera", source: "safe-zone", target: "camera-check" },
    { id: "camera-export", source: "camera-check", target: "export" },
    { id: "export-ready", source: "export", target: "ready" },
  ],
};
