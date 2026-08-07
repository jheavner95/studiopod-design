import { FOUNDATION_COMPONENTS, type FoundationComponent } from "./catalog";

export interface BacklogBucket {
  id: string;
  title: string;
  description: string;
  items: FoundationComponent[];
}

/** Every bucket is filtered live from FOUNDATION_COMPONENTS — the backlog can never drift from the catalog above it. */
export function buildBacklog(): BacklogBucket[] {
  return [
    {
      id: "high-needed",
      title: "High priority — Needed",
      description: "Nothing exists yet, and the gap is already blocking real work.",
      items: FOUNDATION_COMPONENTS.filter((c) => c.priority === "High" && c.status === "Needed"),
    },
    {
      id: "high-partial",
      title: "High priority — Partial",
      description: "A related pattern exists but hasn't been generalized into its own component.",
      items: FOUNDATION_COMPONENTS.filter((c) => c.priority === "High" && c.status === "Partial"),
    },
    {
      id: "medium-needed",
      title: "Medium priority — Needed",
      description: "Real, but not yet blocking anything urgent.",
      items: FOUNDATION_COMPONENTS.filter((c) => c.priority === "Medium" && c.status === "Needed"),
    },
    {
      id: "low",
      title: "Low priority",
      description: "Worth building eventually — nothing today depends on it.",
      items: FOUNDATION_COMPONENTS.filter((c) => c.priority === "Low" && c.status !== "Exists"),
    },
  ];
}
