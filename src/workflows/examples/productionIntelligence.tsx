import { Sparkles, TrendingUp, Lightbulb } from "lucide-react";
import type { Workflow } from "../types";

/**
 * The loop that closes StudioPOD's production flow — Performance Intelligence
 * doesn't just report what happened, it feeds directly into the next Creative
 * Brief, the same step canonicalProductionFlow opens on.
 */
export const productionIntelligenceLoop: Workflow = {
  id: "production-intelligence-loop",
  title: "Production Intelligence Feedback Loop",
  description: "How sell-through data becomes the next Creative Brief — the loop that closes StudioPOD's production flow.",
  pattern: "looping",
  completion: 0.33,
  steps: [
    {
      id: "performance-intelligence",
      title: "Performance Intelligence",
      subtitle: "Sell-through and engagement data",
      icon: <Sparkles className="size-5" />,
      completed: true,
      estimatedDuration: "ongoing",
      description: "The Trailhead mug wrap's first week of sell-through and engagement data comes in.",
    },
    {
      id: "insight",
      title: "Insight",
      subtitle: "Patterns become a recommendation",
      icon: <TrendingUp className="size-5" />,
      active: true,
      estimatedDuration: "~1 min",
      description: "Strong week-one sell-through is flagged as a signal worth acting on.",
    },
    {
      id: "next-creative-brief",
      title: "Next Creative Brief",
      subtitle: "The insight becomes a new brief",
      icon: <Lightbulb className="size-5" />,
      estimatedDuration: "~30 min",
      description: "The recommendation informs the next Creative Brief before a single new pixel is drawn.",
    },
  ],
  connections: [
    { id: "intelligence-insight", source: "performance-intelligence", target: "insight" },
    { id: "insight-brief", source: "insight", target: "next-creative-brief" },
    { id: "brief-intelligence-loop", source: "next-creative-brief", target: "performance-intelligence", loop: true },
  ],
};
