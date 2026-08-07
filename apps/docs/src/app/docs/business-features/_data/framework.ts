export interface FrameworkTopic {
  label: string;
  text: string;
}

/**
 * The six framework topics this package's own work order names. DS-5.1
 * (Application Composition Architecture) defined what a Business Feature
 * is and where it sits in the composition chain; this page defines how one
 * is actually built — the internal structure, the standard part list, the
 * reusable shapes, and the rules governing composition. These topics are
 * deliberately framed as "restates X, adds Y" against DS-5.1 rather than
 * duplicating it — see each topic's own cross-reference.
 */
export const FRAMEWORK_TOPICS: FrameworkTopic[] = [
  {
    label: "Purpose",
    text: "Application Composition Architecture established what a Business Feature is, where it sits in the Foundation → Operational → Workflow → Platform → Business Features → Application chain, and which of the ten prospective features already have a Platform ready to compose. This page is the framework every one of those features is actually built with — the canonical internal structure (Feature Architecture), the concrete standard template (Feature Template), the nine reusable shapes a real feature falls into (Feature Categories), and the composition rules governing how a feature reaches down into the four certified tiers beneath it.",
  },
  {
    label: "Responsibilities",
    text: "A Business Feature owns exactly what Application Composition Architecture's own Application Boundaries assigned it, and nothing else: local state, repositories, API calls, domain logic, business-rule validation, and feature-specific orchestration across the components it composes. It never re-implements what Platform, Workflow, Operational, or Foundation already certifies — Feature Architecture, below, turns that boundary into ten concrete parts a feature's own source tree contains.",
  },
  {
    label: "Lifecycle",
    text: "Every Business Feature moves through the same seven stages, detailed in full in Feature Lifecycle below: Planning, Composition, Implementation, Validation, Testing, Certification, Maintenance — the same Concept → Prototype → Production Ready → Certified → Locked maturity ladder every certified tier below it already uses, extended one tier further so a feature has the same accountable finish line a Platform library does.",
  },
  {
    label: "Composition philosophy",
    text: "A Business Feature is assembled, not authored. Its own code should be almost entirely business logic — data fetching, validation rules, orchestration across composed components, permission checks — wired to already-certified UI. Platform is composed first; Workflow, Operational, and Foundation are composed directly only when no Platform-tier equivalent exists yet for that need. This restates Application Composition Architecture's own Composition Rules as the default posture behind every Feature Category below, not a new rule.",
  },
  {
    label: "Reuse strategy",
    text: "Two reuse paths exist side by side. Where a domain's own Platform library is Certified — six of Application Composition Architecture's ten Adoption Targets qualify today — a feature composes that Platform directly. Where no Platform exists yet — Settings, Automation, Planning, and Creative, per Application Composition Architecture's own findings — a feature composes Workflow, Operational, or Foundation directly and skips the Platform tier entirely. Both paths are legitimate; a feature is never blocked waiting on a Platform library that doesn't exist yet.",
  },
  {
    label: "Ownership boundaries",
    text: "This page does not repeat Application Composition Architecture's own nine-concern Application Boundaries table — see Application Boundaries in Application Composition Architecture for the full breakdown of Routing, State, Repositories, API, Domain logic, Presentation, Interaction, Validation, and Persistence. Feature Architecture, below, is that ownership model turned into the ten concrete parts every feature's own source tree actually contains.",
  },
];
