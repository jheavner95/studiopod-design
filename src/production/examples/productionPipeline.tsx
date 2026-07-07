import { FileText, Layers, Wand2, ShieldCheck, Download, Rocket } from "lucide-react";
import type { ProductionPipeline } from "../types";

/** The general path a product takes from a creative brief to a published listing. */
export const productionPipeline: ProductionPipeline = {
  id: "production-pipeline",
  title: "Production Pipeline",
  description: "How a creative brief becomes a published, sellable product.",
  stages: [
    {
      id: "creative-brief",
      title: "Creative Brief",
      description: "The concept, constraints, and target product.",
      status: "completed",
      icon: <FileText className="size-5" />,
    },
    {
      id: "artwork-project",
      title: "Artwork Project",
      description: "The working file where the brief becomes real artwork.",
      status: "completed",
      icon: <Layers className="size-5" />,
    },
    {
      id: "composition",
      title: "Composition",
      description: "Layers, text, and imagery are arranged on the product.",
      status: "running",
      progress: 0.75,
      icon: <Wand2 className="size-5" />,
    },
    {
      id: "validation",
      title: "Validation",
      description: "Automated production readiness checks.",
      status: "pending",
      blocking: true,
      icon: <ShieldCheck className="size-5" />,
    },
    {
      id: "export",
      title: "Export",
      description: "A production-ready file is generated.",
      status: "pending",
      icon: <Download className="size-5" />,
    },
    {
      id: "publishing",
      title: "Publishing",
      description: "The listing is pushed live to the marketplace.",
      status: "pending",
      icon: <Rocket className="size-5" />,
    },
  ],
};
