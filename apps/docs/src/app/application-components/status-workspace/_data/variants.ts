export interface StatusVariant {
  id: string;
  title: string;
  purpose: string;
  sharedAnatomy: string;
  uniqueAdditions: string;
}

export const STATUS_VARIANTS: StatusVariant[] = [
  {
    id: "production-monitor",
    title: "Production Monitor",
    purpose: "Continuous awareness of every job moving through Production.",
    sharedAnatomy: "All seven regions, Background Jobs and Operational Health leading.",
    uniqueAdditions: "Diagnostics is more prominent than most variants — Production issues often need the API/connectivity detail directly.",
  },
  {
    id: "publishing-operations",
    title: "Publishing Operations",
    purpose: "Tracking publish jobs across every channel at once.",
    sharedAnatomy: "Background Jobs and Notifications lead, matching the Publishing Inspector's own Health-forward emphasis.",
    uniqueAdditions: "Activity Timeline filters to Publishing Events by default.",
  },
  {
    id: "commerce-operations",
    title: "Commerce Operations",
    purpose: "Monitoring sync status and order flow across sales channels.",
    sharedAnatomy: "Operational Health leads, mirroring Commerce Dashboard's own Monitor-mode emphasis.",
    uniqueAdditions: "Workspace Status includes per-channel Connection Status, not just one aggregate.",
  },
  {
    id: "admin-operations",
    title: "Admin Operations",
    purpose: "Cross-cutting oversight for administrators — users, permissions, and platform-wide configuration changes.",
    sharedAnatomy: "Notifications and Activity Timeline lead; Background Jobs is comparatively quiet.",
    uniqueAdditions: "Diagnostics is visible by default rather than permission-gated, since every viewer here already has elevated access.",
  },
  {
    id: "queue-monitor",
    title: "Queue Monitor",
    purpose: "A narrow, single-purpose view of one queue's throughput.",
    sharedAnatomy: "Background Jobs is nearly the entire workspace.",
    uniqueAdditions: "Console shows Job Output directly, since triaging a queue often means reading raw output.",
  },
  {
    id: "automation-console",
    title: "Automation Console",
    purpose: "Authoring and monitoring the automation rules acting on other workspaces.",
    sharedAnatomy: "Console is the dominant region, not an optional afterthought.",
    uniqueAdditions: "The one variant where Console is the Primary Working Surface's own peer, not a secondary region.",
  },
  {
    id: "analytics-monitor",
    title: "Analytics Monitor",
    purpose: "Ambient awareness for an Intelligence platform's own background report generation.",
    sharedAnatomy: "Background Jobs and Notifications lead.",
    uniqueAdditions: "Operational Health tracks report-generation latency rather than provider or queue health.",
  },
];
