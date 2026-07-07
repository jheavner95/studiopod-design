import { Eye, LineChart, Lightbulb, Bot } from "lucide-react";
import type { PlatformArchitecture } from "../types";

/** The Intelligence Platform's own internal loop: a continuous observe, analyze, recommend, automate cycle. */
export const intelligencePlatform: PlatformArchitecture = {
  id: "intelligence-platform",
  title: "Intelligence Platform",
  description: "How Intelligence turns raw signal from every other platform into automated action.",
  layers: [{ id: "intelligence-loop", title: "Continuous loop", order: 0 }],
  platforms: [
    {
      id: "observe",
      name: "Observe",
      description: "Collects signal from every platform in the value chain.",
      layer: "intelligence-loop",
      status: "active",
      icon: <Eye className="size-5" />,
    },
    {
      id: "analyze",
      name: "Analyze",
      description: "Detects patterns and anomalies across the collected signal.",
      layer: "intelligence-loop",
      status: "idle",
      icon: <LineChart className="size-5" />,
    },
    {
      id: "recommend",
      name: "Recommend",
      description: "Surfaces suggested actions to the people running each platform.",
      layer: "intelligence-loop",
      status: "idle",
      icon: <Lightbulb className="size-5" />,
    },
    {
      id: "automate",
      name: "Automate",
      description: "Applies high-confidence recommendations without manual approval.",
      layer: "intelligence-loop",
      status: "idle",
      health: "healthy",
      icon: <Bot className="size-5" />,
    },
  ],
  relationships: [
    { id: "observe-analyze", source: "observe", target: "analyze", relationshipType: "data-flow" },
    { id: "analyze-recommend", source: "analyze", target: "recommend", relationshipType: "data-flow" },
    { id: "recommend-automate", source: "recommend", target: "automate", relationshipType: "data-flow" },
    {
      id: "automate-observe-loop",
      source: "automate",
      target: "observe",
      relationshipType: "data-flow",
      direction: "backward",
      label: "Continuous loop",
    },
  ],
};
