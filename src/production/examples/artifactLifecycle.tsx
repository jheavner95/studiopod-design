import { FileText, Layers, PackageCheck, FileCheck, Store, TrendingUp } from "lucide-react";
import type { ProductionArtifact } from "../types";

/** How a single artifact changes shape as it moves from a creative brief to a commercial performance record. */
export const artifactLifecycle: ProductionArtifact[] = [
  {
    id: "creative-brief",
    name: "Creative Brief",
    type: "Planning document",
    status: "completed",
    version: "1.0",
    health: "healthy",
    icon: <FileText className="size-5" />,
  },
  {
    id: "artwork-project",
    name: "Artwork Project",
    type: "Working file",
    status: "completed",
    version: "3.2",
    health: "healthy",
    icon: <Layers className="size-5" />,
  },
  {
    id: "production-package",
    name: "Production Package",
    type: "Print-ready bundle",
    status: "passed",
    version: "1.0",
    health: "healthy",
    icon: <PackageCheck className="size-5" />,
  },
  {
    id: "publication-manifest",
    name: "Publication Manifest",
    type: "Listing metadata",
    status: "running",
    version: "1.0",
    health: "healthy",
    icon: <FileCheck className="size-5" />,
  },
  {
    id: "marketplace-listing",
    name: "Marketplace Listing",
    type: "Live listing",
    status: "pending",
    icon: <Store className="size-5" />,
  },
  {
    id: "commercial-performance",
    name: "Commercial Performance",
    type: "Sales record",
    status: "pending",
    icon: <TrendingUp className="size-5" />,
  },
];
