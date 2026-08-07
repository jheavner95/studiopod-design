export interface PlatformExample {
  id: string;
  title: string;
  purpose: string;
  primaryData: string;
  sharedAnatomy: string;
}

export const PLATFORM_EXAMPLES: PlatformExample[] = [
  {
    id: "production-status",
    title: "Production Status",
    purpose: "At-a-glance awareness of every job currently moving through Production.",
    primaryData: "Background Jobs (active job count) and Operational Health (Queue Health).",
    sharedAnatomy: "Full seven-region anatomy, Diagnostics more prominent than most.",
  },
  {
    id: "publishing-operations",
    title: "Publishing Operations",
    purpose: "Tracking publish jobs across channels without opening each one individually.",
    primaryData: "Background Jobs (per-channel progress) and Notifications (failures).",
    sharedAnatomy: "Activity Timeline filtered to Publishing Events by default.",
  },
  {
    id: "commerce-monitoring",
    title: "Commerce Monitoring",
    purpose: "Watching sync status and order flow across every sales channel at once.",
    primaryData: "Operational Health (Synchronization) and Workspace Status (per-channel Connection Status).",
    sharedAnatomy: "Mirrors Commerce Dashboard's own Monitor-mode emphasis.",
  },
  {
    id: "admin-diagnostics",
    title: "Admin Diagnostics",
    purpose: "Cross-cutting technical visibility for administrators.",
    primaryData: "Diagnostics (visible by default, not gated) and Activity Timeline.",
    sharedAnatomy: "Background Jobs is comparatively quiet here.",
  },
  {
    id: "queue-activity",
    title: "Queue Activity",
    purpose: "A focused, single-queue throughput view.",
    primaryData: "Background Jobs, nearly the entire workspace.",
    sharedAnatomy: "Console shows Job Output directly for fast triage.",
  },
  {
    id: "automation-timeline",
    title: "Automation Timeline",
    purpose: "Monitoring what an Automation Console has triggered, and when.",
    primaryData: "Activity Timeline (Automation Events) and Console (live output).",
    sharedAnatomy: "The one example where Console is a peer region, not an afterthought.",
  },
];
