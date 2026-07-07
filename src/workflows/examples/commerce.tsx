import { BookOpen, ShoppingCart, Factory, Truck, BarChart3 } from "lucide-react";
import type { Workflow } from "../types";

/** Branching flow: Orders is a decision step, routing to Production (make-to-order) or straight to Fulfillment (from stock). */
export const commerce: Workflow = {
  id: "commerce",
  title: "Commerce",
  description: "How an order moves from the catalog to fulfillment and analytics, with a make-to-order/from-stock split.",
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
      description: "The full set of products available across sales channels.",
    },
    {
      id: "orders",
      title: "Orders",
      subtitle: "Make-to-order or from stock?",
      icon: <ShoppingCart className="size-5" />,
      kind: "decision",
      active: true,
      estimatedDuration: "~1 min",
      description: "Each order is routed based on whether the product is made on demand or already in stock.",
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
      description: "Orders are packed and shipped, whether freshly produced or pulled from stock.",
    },
    {
      id: "analytics",
      title: "Analytics",
      subtitle: "Track sales performance",
      icon: <BarChart3 className="size-5" />,
      estimatedDuration: "ongoing",
      description: "Completed orders feed sales and demand analytics.",
    },
  ],
  connections: [
    { id: "catalog-orders", source: "catalog", target: "orders" },
    { id: "orders-production", source: "orders", target: "production" },
    { id: "orders-fulfillment", source: "orders", target: "fulfillment", label: "From stock" },
    { id: "production-fulfillment", source: "production", target: "fulfillment" },
    { id: "fulfillment-analytics", source: "fulfillment", target: "analytics" },
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
