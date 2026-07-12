import { BookOpen, ShoppingCart, Factory, Truck, Sparkles } from "lucide-react";
import type { Workflow } from "../types";

/** Branching flow: Orders is a decision step, routing to Production (make-to-order) or straight to Fulfillment (from stock). */
export const commerce: Workflow = {
  id: "commerce",
  title: "Commerce Lifecycle",
  description: "How a Studio Tee order moves from the catalog to fulfillment, split by whether it's made to order or already in stock.",
  pattern: "branching",
  completion: 0.25,
  steps: [
    {
      id: "catalog",
      title: "Catalog",
      subtitle: "Products available for sale",
      icon: <BookOpen className="size-5" />,
      completed: true,
      estimatedDuration: "ongoing",
      description: "Studio Tee — Black / M and every other product available across sales channels.",
    },
    {
      id: "orders",
      title: "Orders",
      subtitle: "Make-to-order or from stock?",
      icon: <ShoppingCart className="size-5" />,
      kind: "decision",
      active: true,
      estimatedDuration: "~1 min",
      description: "A Studio Tee order comes in, routed by whether it's made on demand or already in stock.",
    },
    {
      id: "production",
      title: "Production",
      subtitle: "Make-to-order path",
      icon: <Factory className="size-5" />,
      estimatedDuration: "~1–2 days",
      description: "Orders without existing stock are produced before fulfillment.",
    },
    {
      id: "fulfillment",
      title: "Fulfillment",
      subtitle: "Pack and ship",
      icon: <Truck className="size-5" />,
      estimatedDuration: "~1 day",
      description: "The order is packed and shipped, whether freshly produced or pulled from stock.",
    },
    {
      id: "performance-intelligence",
      title: "Performance Intelligence",
      subtitle: "Track sales performance",
      icon: <Sparkles className="size-5" />,
      estimatedDuration: "ongoing",
      description: "Completed orders feed sell-through data back into the next Creative Brief.",
    },
  ],
  connections: [
    { id: "catalog-orders", source: "catalog", target: "orders" },
    { id: "orders-production", source: "orders", target: "production" },
    { id: "orders-fulfillment", source: "orders", target: "fulfillment", label: "From stock" },
    { id: "production-fulfillment", source: "production", target: "fulfillment" },
    { id: "fulfillment-performance-intelligence", source: "fulfillment", target: "performance-intelligence" },
  ],
  branches: [
    {
      id: "orders-branch",
      from: "orders",
      to: ["production", "fulfillment"],
      label: "Make-to-order vs. from stock",
    },
  ],
};
