import {
  Layers,
  Sparkles,
  Bot,
  Rocket,
  Globe,
  ShoppingCart,
  Factory,
  Bell,
  Send,
  Database,
  Cloud,
  CreditCard,
} from "lucide-react";
import type { CapabilityRegistry } from "../types";

/** Every capability StudioPOD depends on, all reached through the same provider-agnostic abstraction. */
export const completeCapabilityArchitecture: CapabilityRegistry = {
  id: "complete-capability-architecture",
  title: "Complete Capability Architecture",
  description: "AI, publishing, commerce, notifications, storage, and payments, all connected through capability abstractions.",
  capabilities: [
    { id: "generation", name: "Generation", category: "ai", status: "healthy", providers: ["openai"], icon: <Sparkles className="size-5" /> },
    { id: "publishing", name: "Publishing", category: "publishing", status: "healthy", providers: ["wordpress"], icon: <Rocket className="size-5" /> },
    { id: "commerce", name: "Commerce", category: "commerce", status: "healthy", providers: ["printify"], icon: <ShoppingCart className="size-5" /> },
    { id: "notifications", name: "Notifications", category: "notifications", status: "healthy", providers: ["twilio"], icon: <Bell className="size-5" /> },
    { id: "storage", name: "Storage", category: "storage", status: "healthy", providers: ["cloud-storage"], icon: <Database className="size-5" /> },
    { id: "payments", name: "Payments", category: "payments", status: "healthy", providers: ["stripe"], icon: <CreditCard className="size-5" /> },
  ],
  providers: [
    { id: "studiopod", name: "StudioPOD", icon: <Layers className="size-5" />, status: "available", available: true },
    { id: "openai", name: "OpenAI", capabilities: ["generation"], health: "healthy", status: "preferred", priority: 1, available: true, icon: <Bot className="size-5" /> },
    { id: "wordpress", name: "WordPress", capabilities: ["publishing"], health: "healthy", status: "preferred", priority: 1, available: true, icon: <Globe className="size-5" /> },
    { id: "printify", name: "Printify", capabilities: ["commerce"], health: "healthy", status: "preferred", priority: 1, available: true, icon: <Factory className="size-5" /> },
    { id: "twilio", name: "Twilio", capabilities: ["notifications"], health: "healthy", status: "preferred", priority: 1, available: true, icon: <Send className="size-5" /> },
    { id: "cloud-storage", name: "Cloud Storage", capabilities: ["storage"], health: "healthy", status: "preferred", priority: 1, available: true, icon: <Cloud className="size-5" /> },
    { id: "stripe", name: "Stripe", capabilities: ["payments"], health: "healthy", status: "preferred", priority: 1, available: true, icon: <CreditCard className="size-5" /> },
  ],
  adapters: [
    { id: "generation-openai", source: "generation", target: "openai", capability: "generation", health: "healthy", status: "preferred" },
    { id: "publishing-wordpress", source: "publishing", target: "wordpress", capability: "publishing", health: "healthy", status: "preferred" },
    { id: "commerce-printify", source: "commerce", target: "printify", capability: "commerce", health: "healthy", status: "preferred" },
    { id: "notifications-twilio", source: "notifications", target: "twilio", capability: "notifications", health: "healthy", status: "preferred" },
    { id: "storage-cloud", source: "storage", target: "cloud-storage", capability: "storage", health: "healthy", status: "preferred" },
    { id: "payments-stripe", source: "payments", target: "stripe", capability: "payments", health: "healthy", status: "preferred" },
  ],
  relationships: [
    { id: "studiopod-generation", source: "studiopod", target: "generation", relationshipType: "depends-on" },
    { id: "studiopod-publishing", source: "studiopod", target: "publishing", relationshipType: "depends-on" },
    { id: "studiopod-commerce", source: "studiopod", target: "commerce", relationshipType: "depends-on" },
    { id: "studiopod-notifications", source: "studiopod", target: "notifications", relationshipType: "depends-on" },
    { id: "studiopod-storage", source: "studiopod", target: "storage", relationshipType: "depends-on" },
    { id: "studiopod-payments", source: "studiopod", target: "payments", relationshipType: "depends-on" },
  ],
};
