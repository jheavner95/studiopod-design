import { Lightbulb, FolderOpen, Layers, ShieldCheck, Package, Rocket, ShoppingCart, Sparkles } from "lucide-react";
import type { Workflow } from "../types";
import { CANONICAL_PRODUCTION_FLOW } from "@/lib/canonical";

const ICONS: Record<string, React.ReactNode> = {
  "creative-brief": <Lightbulb className="size-5" />,
  "artwork-project": <FolderOpen className="size-5" />,
  composition: <Layers className="size-5" />,
  validation: <ShieldCheck className="size-5" />,
  "production-package": <Package className="size-5" />,
  publishing: <Rocket className="size-5" />,
  commerce: <ShoppingCart className="size-5" />,
  "performance-intelligence": <Sparkles className="size-5" />,
};

/**
 * The canonical, official StudioPOD production flow — every layer of the
 * design system builds toward this, from a Creative Brief through to the
 * intelligence that feeds the next one. This is the one flow other pages
 * (the homepage hero, architecture pages) should reuse rather than drawing
 * a competing version of "how work moves through StudioPOD."
 */
export const canonicalProductionFlow: Workflow = {
  id: "canonical-production-flow",
  title: "The production flow",
  description: "How a Creative Brief becomes a shipped, selling product — the one flow every layer of StudioPOD builds toward.",
  pattern: "linear",
  steps: CANONICAL_PRODUCTION_FLOW.map((stage, index) => ({
    id: stage.id,
    title: stage.title,
    subtitle: stage.description,
    icon: ICONS[stage.id],
    active: index === CANONICAL_PRODUCTION_FLOW.length - 1,
  })),
  connections: CANONICAL_PRODUCTION_FLOW.slice(1).map((stage, index) => ({
    id: `${CANONICAL_PRODUCTION_FLOW[index].id}-${stage.id}`,
    source: CANONICAL_PRODUCTION_FLOW[index].id,
    target: stage.id,
  })),
};
