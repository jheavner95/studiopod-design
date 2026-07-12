import { Package, Store, Rocket } from "lucide-react";
import type { Workflow } from "../types";

/** Parallel flow: the same Production Package publishes to three channels at once, reconverging once all three are live. */
export const multiChannelPublishing: Workflow = {
  id: "multi-channel-publishing",
  title: "Multi-Channel Publishing",
  description: "How the Holiday collection publishes to Etsy, Shopify, and Amazon at once, instead of one channel at a time.",
  pattern: "parallel",
  completion: 0.4,
  steps: [
    {
      id: "production-package",
      title: "Production Package",
      subtitle: "Ready to publish",
      icon: <Package className="size-5" />,
      completed: true,
      estimatedDuration: "~1 min",
      description: "The Holiday collection's production packages are ready to publish.",
    },
    {
      id: "etsy-listing",
      title: "Etsy Listing",
      subtitle: "Publish to Etsy",
      icon: <Store className="size-5" />,
      active: true,
      estimatedDuration: "~1 min",
      description: "Each product in the Holiday collection is listed on Etsy.",
    },
    {
      id: "shopify-listing",
      title: "Shopify Listing",
      subtitle: "Publish to Shopify",
      icon: <Store className="size-5" />,
      active: true,
      estimatedDuration: "~1 min",
      description: "The same collection is listed on Shopify, in parallel.",
    },
    {
      id: "amazon-listing",
      title: "Amazon Listing",
      subtitle: "Publish to Amazon",
      icon: <Store className="size-5" />,
      active: true,
      estimatedDuration: "~1 min",
      description: "And syndicated to Amazon — all three channels publish at once.",
    },
    {
      id: "live",
      title: "Live",
      subtitle: "Selling everywhere at once",
      icon: <Rocket className="size-5" />,
      estimatedDuration: "instant",
      description: "The Holiday collection is live and selling across all three channels.",
    },
  ],
  connections: [
    { id: "package-etsy", source: "production-package", target: "etsy-listing" },
    { id: "package-shopify", source: "production-package", target: "shopify-listing" },
    { id: "package-amazon", source: "production-package", target: "amazon-listing" },
    { id: "etsy-live", source: "etsy-listing", target: "live" },
    { id: "shopify-live", source: "shopify-listing", target: "live" },
    { id: "amazon-live", source: "amazon-listing", target: "live" },
  ],
  branches: [
    {
      id: "channel-branch",
      from: "production-package",
      to: ["etsy-listing", "shopify-listing", "amazon-listing"],
      label: "In parallel",
    },
  ],
};
