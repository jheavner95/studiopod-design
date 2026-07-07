import { Sparkles, Bot, Layers } from "lucide-react";
import type { CapabilityRegistry, CapabilityFlow } from "../types";

/** Every AI provider is an interchangeable implementation of the Generation capability, StudioPOD never depends on a specific one. */
export const aiCapabilityLayer: CapabilityRegistry = {
  id: "ai-capability-layer",
  title: "AI Capability Layer",
  description: "How StudioPOD generates artwork without depending on any single AI provider.",
  capabilities: [
    {
      id: "generation",
      name: "Generation",
      description: "Turns a prompt and reference imagery into a candidate piece of artwork.",
      category: "ai",
      status: "healthy",
      direction: "output",
      inputs: ["Prompt", "Reference imagery"],
      outputs: ["Generated artwork"],
      providers: ["openai", "stability-ai", "midjourney"],
      icon: <Sparkles className="size-5" />,
    },
  ],
  providers: [
    {
      id: "openai",
      name: "OpenAI",
      capabilities: ["generation"],
      health: "healthy",
      status: "preferred",
      priority: 1,
      available: true,
      icon: <Bot className="size-5" />,
    },
    {
      id: "stability-ai",
      name: "Stability AI",
      capabilities: ["generation"],
      health: "healthy",
      status: "available",
      priority: 2,
      available: true,
      icon: <Bot className="size-5" />,
    },
    {
      id: "midjourney",
      name: "Midjourney",
      capabilities: ["generation"],
      health: "warning",
      status: "fallback",
      priority: 3,
      available: true,
      icon: <Bot className="size-5" />,
    },
  ],
  adapters: [
    { id: "generation-openai", source: "generation", target: "openai", capability: "generation", health: "healthy", status: "preferred", latency: "1.8s", version: "2.1" },
    { id: "generation-stability", source: "generation", target: "stability-ai", capability: "generation", health: "healthy", status: "available", latency: "2.4s", version: "1.6" },
    { id: "generation-midjourney", source: "generation", target: "midjourney", capability: "generation", health: "warning", status: "fallback", latency: "3.1s", version: "1.0" },
  ],
};

export const aiCapabilityFlow: CapabilityFlow = {
  id: "ai-capability-flow",
  title: "AI Capability Layer",
  description: "AI providers are interchangeable implementations behind the Generation capability.",
  stages: [
    {
      id: "ai-providers",
      title: "AI Providers",
      subtitle: "Interchangeable implementations",
      icon: <Bot className="size-5" />,
      status: "healthy",
    },
    {
      id: "generation-capability",
      title: "Generation Capability",
      refId: "generation",
      icon: <Sparkles className="size-5" />,
      status: "healthy",
    },
    {
      id: "studiopod",
      title: "StudioPOD",
      icon: <Layers className="size-5" />,
      status: "available",
    },
    {
      id: "artwork-production",
      title: "Artwork Production",
      icon: <Layers className="size-5" />,
      status: "available",
    },
  ],
};
