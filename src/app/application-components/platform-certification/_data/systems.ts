export type SystemReadiness = "Certified" | "Architecture";

export interface PlatformSystem {
  code: string;
  name: string;
  href: string;
  componentCount: number;
  readiness: SystemReadiness;
  composesFrom: string[];
  keyGaps: string[];
}

/**
 * The nine packages this review covers, in build order — Platform
 * Architecture (DS-4.1), the blueprint every following package built
 * against, plus the eight domain platform libraries (DS-4.2–DS-4.9).
 * Platform Architecture has no component count of its own (it is
 * documentation, not a component library) and is reviewed separately in
 * the Layering Review rather than scored on the same 13-dimension
 * scorecard the eight real libraries get. Component counts, readiness
 * labels, and gaps below are the direct output of nine independent DS-4.10
 * audit passes (one per package, each re-reading every component file
 * rather than trusting that package's own docs page) — not estimated or
 * carried over from memory.
 */
export const PLATFORM_SYSTEMS: PlatformSystem[] = [
  {
    code: "DS-4.1",
    name: "Platform Architecture",
    href: "/application-components/platform-architecture",
    componentCount: 0,
    readiness: "Architecture",
    composesFrom: [],
    keyGaps: ["Several of this package's own data files asserted \"zero real platforms exist today,\" true when first written but stale once DS-4.2–DS-4.9 shipped — corrected at this certification (adoption.ts, architecture.ts, certification.ts, layers.ts, ownership.ts)."],
  },
  {
    code: "DS-4.2",
    name: "Production Platform",
    href: "/application-components/production-platform",
    componentCount: 12,
    readiness: "Certified",
    composesFrom: ["Workflow Framework", "Pipeline Components", "State Machine", "Workflow Visualization", "Operational Queue & Job"],
    keyGaps: ["ProductionPipeline (component) shares its exact identifier with a pre-existing TypeScript interface of the same name in src/production/types/production.ts — a real, previously-undisclosed same-name collision (no compile-time conflict), now disclosed in this package's own promotion-candidates.ts."],
  },
  {
    code: "DS-4.3",
    name: "Product Platform",
    href: "/application-components/product-platform",
    componentCount: 12,
    readiness: "Certified",
    composesFrom: ["Workflow Framework", "Dependency & Relationship Views", "State Machine", "Pipeline Components", "Operational Data Grid/Asset Browser/Property Panel"],
    keyGaps: [],
  },
  {
    code: "DS-4.4",
    name: "Publishing Platform",
    href: "/application-components/publishing-platform",
    componentCount: 12,
    readiness: "Certified",
    composesFrom: ["Workflow Framework", "State Machine", "Pipeline Components", "Operational Data Grid/Queue/Status & Health"],
    keyGaps: [],
  },
  {
    code: "DS-4.5",
    name: "Commerce Platform",
    href: "/application-components/commerce-platform",
    componentCount: 12,
    readiness: "Certified",
    composesFrom: ["Workflow Framework", "Pipeline Components", "State Machine", "Operational Data Grid/Property Panel"],
    keyGaps: [],
  },
  {
    code: "DS-4.6",
    name: "Intelligence Platform",
    href: "/application-components/intelligence-platform",
    componentCount: 12,
    readiness: "Certified",
    composesFrom: ["Workflow Framework", "State Machine", "Pipeline Components", "Operational Data Grid/Status & Health/Dashboard Widgets"],
    keyGaps: [],
  },
  {
    code: "DS-4.7",
    name: "Operations Platform",
    href: "/application-components/operations-platform",
    componentCount: 12,
    readiness: "Certified",
    composesFrom: ["Workflow Framework", "Pipeline Components", "State Machine", "Operational Status & Health/Queue & Job"],
    keyGaps: ["This package's own States section and its Foundation catalog entry both asserted \"zero disclosed vocabulary gaps\" while its own states.ts correctly disclosed Monitoring as a close-analog-only gap — a self-contradiction, corrected at this certification."],
  },
  {
    code: "DS-4.8",
    name: "Admin Platform",
    href: "/application-components/admin-platform",
    componentCount: 12,
    readiness: "Certified",
    composesFrom: ["Workflow Framework", "Approval & Review", "State Machine", "Pipeline Components", "Operational Data Grid/Property Panel"],
    keyGaps: ["This package's own docs and Foundation catalog entry both called Admin \"the first Platform package with two genuine vocabulary gaps\" — false; Commerce disclosed two three packages earlier, Product disclosed four. Corrected at this certification."],
  },
  {
    code: "DS-4.9",
    name: "Integrations Platform",
    href: "/application-components/integrations-platform",
    componentCount: 12,
    readiness: "Certified",
    composesFrom: ["Workflow Framework", "Dependency & Relationship Views", "State Machine", "Pipeline Components", "Operational Data Grid/Status & Health"],
    keyGaps: ["This package's own docs, states.ts comment, and Foundation catalog entry all claimed \"7 of 8 states verbatim, Connecting the only gap\" — the actual count is 6 of 8, with Archived a second, undisclosed-in-the-summary gap already visible in the same file's own Archived row. Corrected at this certification."],
  },
];

export const TOTAL_COMPONENT_COUNT = PLATFORM_SYSTEMS.reduce((sum, system) => sum + system.componentCount, 0);
